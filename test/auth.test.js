const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { after, before, test } = require("node:test");
const { createApp } = require("../server");
const { createMailCapture, latestVerificationCode } = require("../test-support/registration");
const { createSqliteTestDatabase } = require("../test-support/sqlite-test-database");

let app;
let server;
let baseUrl;
let databaseDir;
let databasePath;
let mailCapture;

before(async () => {
  databaseDir = fs.mkdtempSync(path.join(os.tmpdir(), "nextpath-test-"));
  databasePath = path.join(databaseDir, "test.sqlite");
  mailCapture = createMailCapture();
  app = createApp({ database: createSqliteTestDatabase(databasePath), mailTransport: mailCapture.transport });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  app.locals.db.close();
  fs.rmSync(databaseDir, { recursive: true, force: true });
});

test("registration, sessions, logout, and login", async () => {
  const health = await fetch(`${baseUrl}/health`);
  assert.deepEqual(await health.json(), { ok: true, database: "MySQL" });
  const databaseFile = await fetch(`${baseUrl}/data/test.db`);
  assert.equal(databaseFile.status, 404);

  const invalidRegistration = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "invalid", password: "secret1" }),
  });
  assert.equal(invalidRegistration.status, 400);

  const register = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "Alex",
      lastName: "Rivera",
      email: "Alex@example.com",
      password: "secret1",
    }),
  });
  assert.equal(register.status, 202);
  assert.equal(app.locals.db.prepare("SELECT COUNT(*) AS count FROM users").get().count, 0);
  assert.equal(app.locals.db.prepare("SELECT COUNT(*) AS count FROM sessions").get().count, 0);
  assert.equal(app.locals.db.prepare("SELECT COUNT(*) AS count FROM pending_registrations").get().count, 1);
  assert.match(mailCapture.messages[0].subject, /NextPath verification code/);
  assert.equal(mailCapture.messages[0].to, "alex@example.com");
  assert.doesNotMatch(mailCapture.messages[0].text, /password|secret1/i);
  const resendTooSoon = await fetch(`${baseUrl}/api/auth/resend-registration-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "alex@example.com" }),
  });
  assert.equal(resendTooSoon.status, 429);

  const initialCode = latestVerificationCode(mailCapture.messages);
  const incorrectCode = initialCode === "000000" ? "000001" : "000000";
  const wrongCode = await fetch(`${baseUrl}/api/auth/verify-registration`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "alex@example.com", code: incorrectCode }),
  });
  assert.equal(wrongCode.status, 400);
  assert.match((await wrongCode.json()).error, /incorrect/i);

  app.locals.db.prepare("UPDATE pending_registrations SET sent_at = ? WHERE email = ?")
    .run(Date.now() - 61_000, "alex@example.com");
  const resend = await fetch(`${baseUrl}/api/auth/resend-registration-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "alex@example.com" }),
  });
  assert.equal(resend.status, 202);
  assert.equal(mailCapture.messages.length, 2);
  assert.equal(
    app.locals.db.prepare("SELECT resend_count FROM pending_registrations WHERE email = ?").get("alex@example.com").resend_count,
    1,
  );
  const correctCode = latestVerificationCode(mailCapture.messages);
  const verify = await fetch(`${baseUrl}/api/auth/verify-registration`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "ALEX@example.com", code: correctCode }),
  });
  assert.equal(verify.status, 201);
  const { user } = await verify.json();
  assert.deepEqual(user, {
    id: "1",
    firstName: "Alex",
    lastName: "Rivera",
    name: "Alex Rivera",
    displayName: "Alex Rivera",
    photoStyle: "placeholder",
    email: "alex@example.com",
    role: "user",
  });
  const cookie = verify.headers.get("set-cookie").split(";")[0];
  assert.match(verify.headers.get("set-cookie"), /HttpOnly/);
  const storedUser = app.locals.db.prepare("SELECT password_hash FROM users WHERE id = ?").get(user.id);
  assert.notEqual(storedUser.password_hash, "secret1");
  const rawSessionToken = cookie.slice("nextpath_session=".length);
  const storedSession = app.locals.db.prepare("SELECT token_hash FROM sessions WHERE user_id = ?").get(user.id);
  assert.equal(
    storedSession.token_hash,
    crypto.createHash("sha256").update(rawSessionToken).digest("hex"),
  );

  const duplicate = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "Alex",
      lastName: "Rivera",
      email: "ALEX@example.com",
      password: "secret1",
    }),
  });
  assert.equal(duplicate.status, 409);

  const expiredRegistration = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: "Expired",
      lastName: "Student",
      email: "expired@example.com",
      password: "secret1",
    }),
  });
  assert.equal(expiredRegistration.status, 202);
  app.locals.db.prepare("UPDATE pending_registrations SET expires_at = 0 WHERE email = ?")
    .run("expired@example.com");
  const expiredCode = await fetch(`${baseUrl}/api/auth/verify-registration`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "expired@example.com",
      code: latestVerificationCode(mailCapture.messages),
    }),
  });
  assert.equal(expiredCode.status, 400);
  assert.equal(app.locals.db.prepare("SELECT 1 FROM pending_registrations WHERE email = ?").get("expired@example.com"), undefined);

  const session = await fetch(`${baseUrl}/api/auth/session`, { headers: { Cookie: cookie } });
  assert.deepEqual((await session.json()).user, user);

  const logout = await fetch(`${baseUrl}/api/auth/session`, {
    method: "DELETE",
    headers: { Cookie: cookie },
  });
  assert.equal(logout.status, 204);
  const loggedOutSession = await fetch(`${baseUrl}/api/auth/session`, { headers: { Cookie: cookie } });
  assert.equal((await loggedOutSession.json()).user, null);

  const wrongPassword = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: user.email, password: "wrong-password" }),
  });
  assert.equal(wrongPassword.status, 401);

  const login = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "ALEX@example.com", password: "secret1" }),
  });
  assert.equal(login.status, 200);
  assert.deepEqual((await login.json()).user, user);
  const loginCookie = login.headers.get("set-cookie").split(";")[0];

  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  app.locals.db.close();
  app = createApp({ database: createSqliteTestDatabase(databasePath) });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;

  const persistedSession = await fetch(`${baseUrl}/api/auth/session`, { headers: { Cookie: loginCookie } });
  assert.deepEqual((await persistedSession.json()).user, user);
});

test("failed SMTP delivery never creates an account or pending registration", async () => {
  const failedMailer = {
    sendMail: async () => {
      const error = new Error("SMTP authentication failed.");
      error.code = "EAUTH";
      throw error;
    },
  };
  const failedApp = createApp({
    database: createSqliteTestDatabase(path.join(databaseDir, "mail-failure.sqlite")),
    mailTransport: failedMailer,
  });
  const failedServer = failedApp.listen(0, "127.0.0.1");
  await new Promise((resolve) => failedServer.once("listening", resolve));
  try {
    const response = await fetch(`http://127.0.0.1:${failedServer.address().port}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Mail",
        lastName: "Failure",
        email: "mail-failure@example.com",
        password: "secret1",
      }),
    });
    assert.equal(response.status, 503);
    assert.equal(failedApp.locals.db.prepare("SELECT COUNT(*) AS count FROM users").get().count, 0);
    assert.equal(failedApp.locals.db.prepare("SELECT COUNT(*) AS count FROM pending_registrations").get().count, 0);
  } finally {
    await new Promise((resolve, reject) => failedServer.close((error) => error ? reject(error) : resolve()));
    failedApp.locals.db.close();
  }
});

test("registration reports missing SMTP configuration without creating a pending record", async () => {
  const unconfiguredApp = createApp({
    database: createSqliteTestDatabase(path.join(databaseDir, "smtp-unconfigured.sqlite")),
    mailTransport: null,
  });
  const unconfiguredServer = unconfiguredApp.listen(0, "127.0.0.1");
  await new Promise((resolve) => unconfiguredServer.once("listening", resolve));
  try {
    const response = await fetch(`http://127.0.0.1:${unconfiguredServer.address().port}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "No",
        lastName: "SMTP",
        email: "no-smtp@example.com",
        password: "secret1",
      }),
    });
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /SMTP settings/i);
    assert.equal(unconfiguredApp.locals.db.prepare("SELECT COUNT(*) AS count FROM users").get().count, 0);
    assert.equal(unconfiguredApp.locals.db.prepare("SELECT COUNT(*) AS count FROM pending_registrations").get().count, 0);
  } finally {
    await new Promise((resolve, reject) => unconfiguredServer.close((error) => error ? reject(error) : resolve()));
    unconfiguredApp.locals.db.close();
  }
});
