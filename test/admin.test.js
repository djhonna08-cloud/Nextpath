const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { after, before, test } = require("node:test");
const { createApp } = require("../server");
const { createMailCapture, latestVerificationCode, registerAndVerify } = require("../test-support/registration");
const { createSqliteTestDatabase } = require("../test-support/sqlite-test-database");

let app;
let server;
let baseUrl;
let databaseDir;
let mailCapture;

before(async () => {
  databaseDir = fs.mkdtempSync(path.join(os.tmpdir(), "nextpath-admin-test-"));
  mailCapture = createMailCapture();
  app = createApp({
    database: createSqliteTestDatabase(path.join(databaseDir, "admin.sqlite")),
    mailTransport: mailCapture.transport,
    nvidiaApiKey: "",
  });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  app.locals.db.close();
  fs.rmSync(databaseDir, { recursive: true, force: true });
});

test("super admin dashboard is private and provides system statistics and searchable users", async () => {
  const member = await registerAndVerify(baseUrl, mailCapture, {
    firstName: "Casey",
    lastName: "Student",
    email: "casey@example.com",
    password: "student-password",
    role: "super_admin",
  });
  const unauthorized = await fetch(`${baseUrl}/api/admin/overview`);
  assert.equal(unauthorized.status, 401);

  const denied = await fetch(`${baseUrl}/api/admin/users`, {
    headers: { Cookie: member.cookie },
  });
  assert.equal(denied.status, 403);
  assert.equal(member.user.role, "user");

  const salt = crypto.randomBytes(16);
  const adminPassword = "admin123!";
  const passwordHash = crypto.scryptSync(adminPassword, salt, 64);
  app.locals.db.prepare(`
    INSERT INTO users (first_name, last_name, email, password_salt, password_hash, role, email_verified)
    VALUES ('Admin', 'User', 'admin@test.com', ?, ?, 'super_admin', 1)
  `).run(salt.toString("hex"), passwordHash.toString("hex"));

  const login = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@test.com", password: adminPassword }),
  });
  assert.equal(login.status, 200);
  const { user } = await login.json();
  assert.equal(user.role, "super_admin");
  const adminCookie = login.headers.get("set-cookie").split(";")[0];

  const overview = await fetch(`${baseUrl}/api/admin/overview`, {
    headers: { Cookie: adminCookie },
  });
  assert.equal(overview.status, 200);
  const data = await overview.json();
  assert.equal(data.stats.totalUsers, 2);
  assert.equal(data.stats.verifiedUsers, 2);
  assert.ok(Array.isArray(data.registrations));
  assert.ok(Array.isArray(data.popularCourses));
  assert.ok(Array.isArray(data.activity));

  const users = await fetch(`${baseUrl}/api/admin/users?q=casey`, {
    headers: { Cookie: adminCookie },
  });
  assert.equal(users.status, 200);
  const result = await users.json();
  assert.equal(result.total, 1);
  assert.equal(result.users[0].email, "casey@example.com");
  assert.equal(result.users[0].role, "user");
  assert.equal("password_hash" in result.users[0], false);
});

async function login(email, password) {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  assert.equal(response.status, 200);
  return response.headers.get("set-cookie").split(";")[0];
}

async function api(pathname, method, cookie, body) {
  return fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      ...(cookie ? { Cookie: cookie } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

test("role-scoped administration manages accounts, password setup, courses, and settings", async () => {
  const superCookie = await login("admin@test.com", "admin123!");
  const pending = await api("/api/auth/register", "POST", null, {
    firstName: "Pending",
    lastName: "Learner",
    email: "pending@example.com",
    password: "pending-password",
  });
  assert.equal(pending.status, 202);
  const pendingCode = latestVerificationCode(mailCapture.messages);

  const createAdmin = await api("/api/admin/users", "POST", superCookie, {
    firstName: "Course",
    lastName: "Admin",
    email: "course-admin@example.com",
    role: "admin",
  });
  assert.equal(createAdmin.status, 201);
  const requestAdminSetup = await api("/api/auth/request-password-reset", "POST", null, {
    email: "course-admin@example.com",
  });
  assert.equal(requestAdminSetup.status, 202);
  assert.equal(mailCapture.messages.at(-1).to, "course-admin@example.com");
  const verifyAdminSetup = await api("/api/auth/verify-password-reset", "POST", null, {
    email: "course-admin@example.com",
    code: latestVerificationCode(mailCapture.messages),
  });
  assert.equal(verifyAdminSetup.status, 200);
  const setupAdmin = await api("/api/auth/reset-password", "POST", null, {
    email: "course-admin@example.com",
    resetToken: (await verifyAdminSetup.json()).resetToken,
    password: "strong-admin-password",
  });
  assert.equal(setupAdmin.status, 200);
  const adminCookie = await login("course-admin@example.com", "strong-admin-password");

  const createUser = await api("/api/admin/users", "POST", adminCookie, {
    firstName: "Jamie",
    lastName: "Student",
    email: "jamie@example.com",
  });
  assert.equal(createUser.status, 201);
  const requestUserSetup = await api("/api/auth/request-password-reset", "POST", null, {
    email: "jamie@example.com",
  });
  assert.equal(requestUserSetup.status, 202);
  assert.equal(mailCapture.messages.at(-1).to, "jamie@example.com");
  const verifyUserSetup = await api("/api/auth/verify-password-reset", "POST", null, {
    email: "jamie@example.com",
    code: latestVerificationCode(mailCapture.messages),
  });
  assert.equal(verifyUserSetup.status, 200);
  const setupUser = await api("/api/auth/reset-password", "POST", null, {
    email: "jamie@example.com",
    resetToken: (await verifyUserSetup.json()).resetToken,
    password: "strong-user-password",
  });
  assert.equal(setupUser.status, 200);
  const userId = app.locals.db.prepare("SELECT id FROM users WHERE email = ?").get("jamie@example.com").id;

  const scopedUsersResponse = await api("/api/admin/users", "GET", adminCookie);
  assert.equal(scopedUsersResponse.status, 200);
  const scopedUsers = await scopedUsersResponse.json();
  assert.ok(scopedUsers.users.some((user) => user.email === "jamie@example.com"));
  assert.ok(scopedUsers.users.every((user) => user.role === "user"));
  assert.equal((await api("/api/admin/settings", "GET", adminCookie)).status, 403);
  assert.equal((await api(`/api/admin/users/${userId}`, "PATCH", adminCookie, { role: "super_admin" })).status, 403);

  const createdCourseResponse = await api("/api/admin/courses", "POST", adminCookie, {
    name: "Test Course",
    category: "Science",
    description: "A test course description.",
    learn: ["Research"],
    subjects: ["Biology"],
    skills: ["Analysis"],
    careers: ["Researcher"],
    interests: ["Nature"],
  });
  assert.equal(createdCourseResponse.status, 201);
  const createdCourse = (await createdCourseResponse.json()).course;
  assert.ok((await (await api("/api/courses", "GET")).json()).courses.some((course) => course.id === createdCourse.id));
  assert.equal((await api(`/api/admin/courses/${createdCourse.id}`, "PUT", adminCookie, {
    ...createdCourse,
    isActive: false,
  })).status, 200);
  assert.ok(!(await (await api("/api/courses", "GET")).json()).courses.some((course) => course.id === createdCourse.id));
  assert.equal((await api(`/api/admin/courses/${createdCourse.id}`, "PUT", superCookie, {
    ...createdCourse,
    isActive: true,
  })).status, 200);

  const studentCookie = await login("jamie@example.com", "strong-user-password");
  const courseMatch = await api("/api/course-match/sessions", "POST", studentCookie);
  assert.equal(courseMatch.status, 201);
  const courseMatchSession = (await courseMatch.json()).session;
  const answers = Array(10).fill(0);
  const savedCourseMatchProgress = await api(`/api/course-match/sessions/${courseMatchSession.id}`, "PUT", studentCookie, {
    answers,
    currentStep: answers.length,
  });
  assert.equal(savedCourseMatchProgress.status, 200);
  const completedCourseMatch = await api(`/api/course-match/sessions/${courseMatchSession.id}/complete`, "POST", studentCookie, {});
  assert.equal(completedCourseMatch.status, 200);
  const engineering = (await (await api("/api/courses", "GET")).json()).courses
    .find((course) => course.id === "engineering");
  assert.ok(engineering);
  assert.equal((await api("/api/admin/courses/engineering", "PUT", superCookie, {
    ...engineering,
    isActive: false,
  })).status, 200);
  assert.equal((await api(`/api/admin/courses/${createdCourse.id}`, "DELETE", adminCookie)).status, 204);

  const resetSent = await api(`/api/admin/users/${userId}/password-reset`, "POST", adminCookie, {});
  assert.equal(resetSent.status, 200);
  const resetRequest = await api("/api/auth/request-password-reset", "POST", null, {
    email: "jamie@example.com",
  });
  assert.equal(resetRequest.status, 202);
  const rejectedWithoutVerifiedCode = await api("/api/auth/reset-password", "POST", null, {
    email: "jamie@example.com",
    resetToken: "a".repeat(64),
    password: "replacement-password",
  });
  assert.equal(rejectedWithoutVerifiedCode.status, 400);
  const verifiedReset = await api("/api/auth/verify-password-reset", "POST", null, {
    email: "jamie@example.com",
    code: latestVerificationCode(mailCapture.messages),
  });
  assert.equal(verifiedReset.status, 200);
  const resetToken = (await verifiedReset.json()).resetToken;
  const reset = await api("/api/auth/reset-password", "POST", null, {
    email: "jamie@example.com",
    resetToken,
    password: "replacement-password",
  });
  assert.equal(reset.status, 200);
  const reuseToken = await api("/api/auth/reset-password", "POST", null, {
    email: "jamie@example.com",
    resetToken,
    password: "another-password",
  });
  assert.equal(reuseToken.status, 400);
  assert.equal((await login("jamie@example.com", "replacement-password")).startsWith("nextpath_session="), true);

  const deactivate = await api(`/api/admin/users/${userId}`, "DELETE", adminCookie);
  assert.equal(deactivate.status, 204);
  assert.equal(app.locals.db.prepare("SELECT is_active FROM users WHERE id = ?").get(userId).is_active, 0);
  const reactivate = await api(`/api/admin/users/${userId}`, "PATCH", adminCookie, { isActive: true });
  assert.equal(reactivate.status, 200, await reactivate.text());
  const reactivatedStudentCookie = await login("jamie@example.com", "replacement-password");
  const savedSessions = await api("/api/course-match/sessions", "GET", reactivatedStudentCookie);
  assert.equal(savedSessions.status, 200);
  const savedResult = (await savedSessions.json()).sessions.find((session) => session.id === courseMatchSession.id).result[0];
  assert.equal(savedResult.course.name, "Engineering");
  assert.equal(savedResult.score, 100);

  const settings = await api("/api/admin/settings", "PUT", superCookie, {
    siteName: "NextPath Test",
    registrationEnabled: false,
    maintenanceMode: false,
  });
  assert.equal(settings.status, 200);
  const deniedRegistration = await api("/api/auth/register", "POST", null, {
    firstName: "Blocked",
    lastName: "Person",
    email: "blocked@example.com",
    password: "blocked-password",
  });
  assert.equal(deniedRegistration.status, 403);
  const verifyWhileDisabled = await api("/api/auth/verify-registration", "POST", null, {
    email: "pending@example.com",
    code: pendingCode,
  });
  assert.equal(verifyWhileDisabled.status, 201);
});
