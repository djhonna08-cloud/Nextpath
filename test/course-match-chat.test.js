const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { after, before, test } = require("node:test");
const { createApp } = require("../server");
const questions = require("../course-match-questions");
const { calculateCourseMatches, factorWeights } = require("../course-match-scoring");
const { createMailCapture, registerAndVerify } = require("../test-support/registration");
const { createSqliteTestDatabase } = require("../test-support/sqlite-test-database");

let app;
let server;
let baseUrl;
let databaseDir;
let cookie;
let database;
let providerRequests;
let modelAnswers;

before(async () => {
  databaseDir = fs.mkdtempSync(path.join(os.tmpdir(), "nextpath-course-match-chat-"));
  database = createSqliteTestDatabase(path.join(databaseDir, "course-match.sqlite"));
  providerRequests = [];
  modelAnswers = [];
  const mailCapture = createMailCapture();
  app = createApp({
    database,
    mailTransport: mailCapture.transport,
    nvidiaApiKey: "test-course-match-key",
    nvidiaModel: "test-course-match-model",
    fallbackModels: [],
    providerFetch: async (url, options) => {
      providerRequests.push({ url, options, body: JSON.parse(options.body) });
      const answer = modelAnswers.shift();
      return Response.json({
        choices: [{ message: { content: JSON.stringify(answer) } }],
      });
    },
  });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  const registration = await registerAndVerify(baseUrl, mailCapture, {
    firstName: "Course",
    lastName: "Match",
    email: "course-match-chat@example.com",
    password: "test-password",
  });
  cookie = registration.cookie;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  database.close();
  fs.rmSync(databaseDir, { recursive: true, force: true });
});

async function postChat(sessionId, message, authCookie = cookie) {
  return fetch(`${baseUrl}/api/course-match/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(authCookie ? { Cookie: authCookie } : {}) },
    body: JSON.stringify({ sessionId, message }),
  });
}

async function saveQuestionnaire(sessionId, answers, currentStep = answers.length) {
  return fetch(`${baseUrl}/api/course-match/sessions/${sessionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ answers, currentStep }),
  });
}

async function completeSession(sessionId) {
  return fetch(`${baseUrl}/api/course-match/sessions/${sessionId}/complete`, {
    method: "POST",
    headers: { Cookie: cookie },
  });
}

test("Course Match normalizes question groups before applying the four factor weights", () => {
  const answers = Array(questions.length).fill(0);
  const matches = calculateCourseMatches(answers, [{
    id: "it",
    name: "Information Technology",
    categoryId: "computing-information-technology",
  }]);

  assert.deepEqual(factorWeights, {
    interests: 0.35,
    skills: 0.25,
    careerGoals: 0.25,
    personalPreferences: 0.15,
  });
  assert.deepEqual(questions.map(({ factor }) => factor), [
    "interests",
    "personalPreferences",
    "skills",
    "careerGoals",
    "interests",
    "interests",
    "personalPreferences",
    "personalPreferences",
    "personalPreferences",
    "careerGoals",
  ]);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].score, 88);
  assert.equal(matches[0].compatibilityStrength, "Strong Match");
  assert.deepEqual(matches[0].factorScores, {
    interests: 100,
    skills: 50,
    careerGoals: 100,
    personalPreferences: 100,
  });
  assert.deepEqual(calculateCourseMatches(answers, [
    { id: "it", name: "Information Technology", categoryId: "computing-information-technology" },
  ]), matches);
});

test("Course Match ranks ten answers deterministically and grounds explanations and chat in saved results", async () => {
  const answers = Array(questions.length).fill(0);
  const expectedMatches = calculateCourseMatches(answers, database.all("SELECT * FROM courses").map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    icon: row.icon,
    learn: JSON.parse(row.learn_json),
    subjects: JSON.parse(row.subjects_json),
    skills: JSON.parse(row.skills_json),
    careers: JSON.parse(row.careers_json),
    interests: JSON.parse(row.interests_json),
  })));
  assert.equal(questions.length, 10);
  assert.equal(expectedMatches[0].course.id, "engineering");
  assert.equal(expectedMatches[0].score, 100);
  assert.equal(expectedMatches.length, 3);

  const unauthorized = await postChat(1, "Tell me about my recommendations.", "");
  assert.equal(unauthorized.status, 401);

  const createdResponse = await fetch(`${baseUrl}/api/course-match/sessions`, {
    method: "POST",
    headers: { Cookie: cookie },
  });
  assert.equal(createdResponse.status, 201);
  const { session } = await createdResponse.json();
  assert.equal((await postChat(session.id, "I like solving problems.")).status, 409);

  const incomplete = await completeSession(session.id);
  assert.equal(incomplete.status, 409);
  assert.equal(providerRequests.length, 0);

  const invalidProgress = await saveQuestionnaire(session.id, [0, 1, 2, 4]);
  assert.equal(invalidProgress.status, 400);
  const forgedResults = await fetch(`${baseUrl}/api/course-match/sessions/${session.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ answers, currentStep: answers.length, result: [{ courseId: "it", score: 100 }] }),
  });
  assert.equal(forgedResults.status, 400);

  const savedProgress = await saveQuestionnaire(session.id, answers);
  assert.equal(savedProgress.status, 200);
  assert.deepEqual((await savedProgress.json()).session.answers, answers);

  modelAnswers.push({
    explanations: expectedMatches.map(({ course }) => ({
      courseId: course.id,
      reason: `Your answers align with ${course.name}.`,
    })),
    score: 1,
  });
  const completedResponse = await completeSession(session.id);
  const completed = await completedResponse.json();
  assert.equal(completedResponse.status, 200, JSON.stringify(completed));
  assert.deepEqual(completed.result.map((item) => item.courseId), expectedMatches.map((item) => item.course.id));
  assert.deepEqual(completed.result.map((item) => item.score), expectedMatches.map((item) => item.score));
  assert.equal(completed.result[0].score, 100);
  assert.equal(completed.result[0].compatibilityStrength, "Strong Match");
  assert.deepEqual(completed.result[0].factorWeights, {
    interests: 35,
    skills: 25,
    careerGoals: 25,
    personalPreferences: 15,
  });
  assert.deepEqual(completed.result[0].factorScores, {
    interests: 100,
    skills: 100,
    careerGoals: 100,
    personalPreferences: 100,
  });
  assert.ok(completed.result[0].matchingInterests.length > 0);
  assert.ok(completed.result[0].matchingSkills.length > 0);
  assert.equal(completed.result[0].matchedAnswers.length, questions.length);
  assert.equal(completed.chatAvailable, true);
  assert.match(completed.result[0].reason, /Engineering/);

  const explanationRequest = providerRequests[0];
  assert.equal(explanationRequest.url, "https://integrate.api.nvidia.com/v1/chat/completions");
  assert.equal(explanationRequest.body.model, "test-course-match-model");
  assert.match(explanationRequest.body.messages[0].content, /ranks and compatibility scores are fixed/i);
  assert.match(explanationRequest.body.messages[1].content, /rankedCourses/);
  assert.match(explanationRequest.body.messages[1].content, /score/);
  assert.match(explanationRequest.body.messages[1].content, /factorScores/);
  assert.match(explanationRequest.body.messages[1].content, /matchingInterests/);

  modelAnswers.push({ reply: "Engineering is your strongest match because every answer aligned with it." });
  const chatResponse = await postChat(session.id, "Why is Engineering my best match?");
  const chatResult = await chatResponse.json();
  assert.equal(chatResponse.status, 200, JSON.stringify(chatResult));
  assert.equal(chatResult.conversation.length, 2);
  assert.equal(chatResult.conversation[1].content, "Engineering is your strongest match because every answer aligned with it.");
  assert.equal(providerRequests.length, 2);
  const chatSystemPrompt = providerRequests[1].body.messages[0].content;
  assert.match(chatSystemPrompt, /Student's completed questionnaire/);
  assert.match(chatSystemPrompt, /Solving puzzles with logic and technology/);
  assert.match(chatSystemPrompt, /Scored recommendations \(scores are fixed and must not be changed\)/);
  assert.match(chatSystemPrompt, /100/);
  assert.match(chatSystemPrompt, /factorScores/);
  assert.match(chatSystemPrompt, /matchingSkills/);
  assert.match(chatSystemPrompt, /Active course catalog/);

  modelAnswers.push({ reply: "Review subjects such as physics and design systems." });
  const followUpResponse = await postChat(session.id, "What subjects will I study?");
  assert.equal(followUpResponse.status, 200);
  assert.deepEqual(providerRequests[2].body.messages.map((item) => item.role), [
    "system", "user", "assistant", "user",
  ]);
  assert.match(providerRequests[2].body.messages[0].content, /Information Technology/);

  const historyResponse = await fetch(`${baseUrl}/api/course-match/sessions`, {
    headers: { Cookie: cookie },
  });
  const { sessions } = await historyResponse.json();
  assert.equal(sessions[0].status, "completed");
  assert.equal(sessions[0].conversation.length, 4);
  assert.equal(sessions[0].result.length, 3);
  assert.equal(sessions[0].result[0].courseId, "engineering");
  assert.equal(sessions[0].result[0].score, 100);
  assert.equal(sessions[0].answers.length, 10);
});

test("Course Match uses evidence-based explanations if the AI explanation payload is invalid", async () => {
  const createdResponse = await fetch(`${baseUrl}/api/course-match/sessions`, {
    method: "POST",
    headers: { Cookie: cookie },
  });
  const { session } = await createdResponse.json();
  const answers = Array(questions.length).fill(1);
  assert.equal((await saveQuestionnaire(session.id, answers)).status, 200);
  modelAnswers.push({ explanations: [] });
  const completedResponse = await completeSession(session.id);
  const completed = await completedResponse.json();
  assert.equal(completedResponse.status, 200);
  assert.equal(completed.chatAvailable, true);
  assert.ok(completed.result.length > 0);
  assert.ok(completed.result.every((item) => item.explanationSource === "fallback"));
  assert.ok(completed.result.every((item) => item.reason.length > 0));
});

test("Course Match rejects secrets and does not persist a failed chatbot response", async () => {
  const createdResponse = await fetch(`${baseUrl}/api/course-match/sessions`, {
    method: "POST",
    headers: { Cookie: cookie },
  });
  const { session } = await createdResponse.json();
  const secretResponse = await postChat(session.id, `nvapi-${"x".repeat(30)}`);
  assert.equal(secretResponse.status, 400);
  const answers = Array(questions.length).fill(0);
  assert.equal((await saveQuestionnaire(session.id, answers)).status, 200);

  modelAnswers.push({
    explanations: calculateCourseMatches(answers, database.all("SELECT * FROM courses").map((course) => ({
      id: course.id,
      name: course.name,
    }))).map(({ course }) => ({ courseId: course.id, reason: "A grounded explanation." })),
  });
  const completedResponse = await completeSession(session.id);
  assert.equal(completedResponse.status, 200);
  modelAnswers.push(null);
  const failedResponse = await postChat(session.id, "I am interested in technology.");
  assert.equal(failedResponse.status, 503);
  const historyResponse = await fetch(`${baseUrl}/api/course-match/sessions`, {
    headers: { Cookie: cookie },
  });
  const { sessions } = await historyResponse.json();
  assert.equal(sessions[0].status, "completed");
  assert.deepEqual(sessions[0].conversation, []);
});
