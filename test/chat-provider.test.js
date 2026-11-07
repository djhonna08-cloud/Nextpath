const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { after, before, test } = require("node:test");
const { createApp, defaultChatFallbackModels } = require("../server");
const { createMailCapture, registerAndVerify } = require("../test-support/registration");
const { createSqliteTestDatabase } = require("../test-support/sqlite-test-database");

let databaseDir;

before(() => {
  databaseDir = fs.mkdtempSync(path.join(os.tmpdir(), "nextpath-provider-test-"));
});

after(() => {
  fs.rmSync(databaseDir, { recursive: true, force: true });
});

test("fallback catalog includes every user-suggested model", () => {
  assert.deepEqual(new Set(defaultChatFallbackModels), new Set([
    "nvidia/nemotron-3.5-super-vl-120b-a12b",
    "nvidia/nemotron-3-ultra-550b-a55b",
    "nvidia/nemotron-3.5-lightning-30b-a3b",
    "nvidia/deepseek-v4.1-flash",
    "z-ai/glm-5.3",
    "z-ai/glm-5.3-flash",
  ]));
});

test("chat falls back after a retired model and uses the next working candidate", async () => {
  const requestedModels = [];
  const mailCapture = createMailCapture();
  const app = createApp({
    database: createSqliteTestDatabase(path.join(databaseDir, "fallback.sqlite")),
    mailTransport: mailCapture.transport,
    nvidiaApiKey: "test-key",
    nvidiaModel: "retired-model",
    fallbackModels: ["working-fallback", "unused-fallback"],
    providerFetch: async (_url, options) => {
      const { model } = JSON.parse(options.body);
      requestedModels.push(model);
      if (model === "retired-model") return Response.json({ title: "Gone" }, { status: 410 });
      return Response.json({ choices: [{ message: { content: "Use Explore courses to browse." } }] });
    },
  });
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    const { cookie: authCookie } = await registerAndVerify(baseUrl, mailCapture, {
        firstName: "Fallback",
        lastName: "User",
        email: "fallback@example.com",
        password: "test-password",
    });
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: authCookie },
      body: JSON.stringify({ message: "How do I browse courses?" }),
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      answer: "Use Explore courses to browse.",
      model: "working-fallback",
    });
    assert.deepEqual(requestedModels, ["retired-model", "working-fallback"]);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    app.locals.db.close();
  }
});

test("chat reports when all configured models are unavailable", async () => {
  const mailCapture = createMailCapture();
  const app = createApp({
    database: createSqliteTestDatabase(path.join(databaseDir, "unavailable.sqlite")),
    mailTransport: mailCapture.transport,
    nvidiaApiKey: "test-key",
    nvidiaModel: "retired-model",
    fallbackModels: ["unavailable-fallback"],
    providerFetch: async () => Response.json({ title: "Gone" }, { status: 410 }),
  });
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  try {
    const { cookie } = await registerAndVerify(baseUrl, mailCapture, {
        firstName: "Retired",
        lastName: "User",
        email: "retired@example.com",
        password: "test-password",
    });
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify({ message: "How do I browse courses?" }),
    });
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /all configured NVIDIA models are retired or unavailable/i);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    app.locals.db.close();
  }
});
