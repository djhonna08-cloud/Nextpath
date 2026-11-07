const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { after, before, test } = require("node:test");
const { createApp } = require("../server");
const { createMailCapture, registerAndVerify } = require("../test-support/registration");
const { createSqliteTestDatabase } = require("../test-support/sqlite-test-database");

let app;
let server;
let baseUrl;
let databaseDir;
let cookie;
let mailCapture;

before(async () => {
  databaseDir = fs.mkdtempSync(path.join(os.tmpdir(), "nextpath-progress-test-"));
  mailCapture = createMailCapture();
  app = createApp({
    database: createSqliteTestDatabase(path.join(databaseDir, "progress.sqlite")),
    mailTransport: mailCapture.transport,
    nvidiaApiKey: "",
  });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  ({ cookie } = await registerAndVerify(baseUrl, mailCapture, {
      firstName: "Sam",
      lastName: "Student",
      email: "sam@example.com",
      password: "test-password",
  }));
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  app.locals.db.close();
  fs.rmSync(databaseDir, { recursive: true, force: true });
});

test("profile customization, saved Course Match sessions, timestamps, and personal analytics", async () => {
  const unauthorized = await fetch(`${baseUrl}/api/course-match/sessions`);
  assert.equal(unauthorized.status, 401);

  const createResponse = await fetch(`${baseUrl}/api/course-match/sessions`, {
    method: "POST",
    headers: { Cookie: cookie },
  });
  assert.equal(createResponse.status, 201);
  const { session: created } = await createResponse.json();
  assert.equal(created.status, "in_progress");
  assert.ok(created.createdAt);
  assert.ok(created.updatedAt);

  const savedProgress = await fetch(`${baseUrl}/api/course-match/sessions/${created.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ answers: [2], currentStep: 1 }),
  });
  assert.equal(savedProgress.status, 200);
  const { session: progress } = await savedProgress.json();
  assert.deepEqual(progress.answers, [2]);
  assert.equal(progress.currentStep, 1);
  assert.equal(progress.status, "in_progress");

  const invalidProgress = await fetch(`${baseUrl}/api/course-match/sessions/${created.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ answers: [8], currentStep: 0 }),
  });
  assert.equal(invalidProgress.status, 400);

  const answers = Array(10).fill(0);
  const finish = await fetch(`${baseUrl}/api/course-match/sessions/${created.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ answers, currentStep: answers.length }),
  });
  assert.equal(finish.status, 200);
  const finishedProgress = await finish.json();
  assert.equal(finishedProgress.session.status, "in_progress");
  assert.deepEqual(finishedProgress.session.answers, answers);

  const incompleteCompletion = await fetch(`${baseUrl}/api/course-match/sessions/${created.id}/complete`, {
    method: "POST",
    headers: { Cookie: cookie },
  });
  assert.equal(incompleteCompletion.status, 200);
  const { status, answers: savedAnswers, result, chatAvailable } = await incompleteCompletion.json();
  assert.equal(status, "completed");
  assert.deepEqual(savedAnswers, answers);
  assert.equal(chatAvailable, false);
  assert.equal(result.length, 3);
  assert.equal(result[0].courseId, "engineering");
  assert.equal(result[0].score, 100);
  assert.ok(result[0].reason);

  const completedIsReadOnly = await fetch(`${baseUrl}/api/course-match/sessions/${created.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ answers, currentStep: 10 }),
  });
  assert.equal(completedIsReadOnly.status, 409);

  const historyResponse = await fetch(`${baseUrl}/api/course-match/sessions`, {
    headers: { Cookie: cookie },
  });
  const { sessions } = await historyResponse.json();
  assert.equal(sessions.length, 1);
  assert.equal(sessions[0].id, created.id);
  assert.deepEqual(sessions[0].answers, answers);

  const profileResponse = await fetch(`${baseUrl}/api/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ displayName: "Sam R.", photoStyle: "ocean" }),
  });
  assert.equal(profileResponse.status, 200);
  const { user } = await profileResponse.json();
  assert.equal(user.name, "Sam R.");
  assert.equal(user.displayName, "Sam R.");
  assert.equal(user.photoStyle, "ocean");

  const badPhotoStyle = await fetch(`${baseUrl}/api/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ displayName: "Sam R.", photoStyle: "https://example.com/photo.png" }),
  });
  assert.equal(badPhotoStyle.status, 400);

  for (const event of [
    { eventType: "page_view", page: "dashboard" },
    { eventType: "course_view", page: "details", courseId: "it" },
  ]) {
    const response = await fetch(`${baseUrl}/api/analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify(event),
    });
    assert.equal(response.status, 201);
  }
  const invalidEvent = await fetch(`${baseUrl}/api/analytics`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ eventType: "login", page: "dashboard" }),
  });
  assert.equal(invalidEvent.status, 400);

  const analyticsResponse = await fetch(`${baseUrl}/api/analytics`, {
    headers: { Cookie: cookie },
  });
  const analytics = await analyticsResponse.json();
  assert.equal(analytics.courseMatch.completedCount, 1);
  assert.equal(analytics.totals.quiz_started, 1);
  assert.equal(analytics.totals.quiz_completed, 1);
  assert.equal(analytics.totals.profile_updated, 1);
  assert.equal(analytics.totals.page_view, 1);
  assert.equal(analytics.totals.course_view, 1);
  assert.ok(analytics.recent.every((event) => event.occurredAt));
});

test("profile photos persist, survive name changes, reject invalid content, and can be removed", async () => {
  const photoData = 'data:image/jpeg;base64,' + Buffer.from([0xff,0xd8,0xff,0xe0,0xff,0xd9]).toString('base64');
  const update = body => fetch(`${baseUrl}/api/profile`, {
    method:'PATCH', headers:{'Content-Type':'application/json',Cookie:cookie},
    body:JSON.stringify({displayName:'Sam',...body}),
  });
  const saved = await update({photoData});
  assert.equal(saved.status,200);
  assert.equal((await saved.json()).user.photoData,photoData);
  const renamed = await update({displayName:'Sam Photo'});
  assert.equal((await renamed.json()).user.photoData,photoData);
  const session = await fetch(`${baseUrl}/api/auth/session`,{headers:{Cookie:cookie}});
  assert.equal((await session.json()).user.photoData,photoData);
  for (const invalid of ['data:image/svg+xml;base64,PHN2Zz4=', 'data:image/jpeg;base64,aGVsbG8=', 'https://example.com/photo.jpg', 42, 'data:image/jpeg;base64,'+'A'.repeat(350001)]) {
    assert.equal((await update({photoData:invalid})).status,400);
  }
  const removed = await update({photoData:null});
  assert.equal(removed.status,200);
  assert.equal((await removed.json()).user.photoData,null);
});
