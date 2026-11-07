const assert = require("node:assert/strict");

function createMailCapture() {
  const messages = [];
  return {
    messages,
    transport: {
      sendMail: async (message) => {
        messages.push(message);
      },
    },
  };
}

function latestVerificationCode(messages) {
  const match = messages.at(-1)?.text.match(/\b(\d{6})\b/);
  assert.ok(match, "expected a 6-digit code in the captured email");
  return match[1];
}

async function registerAndVerify(baseUrl, mailCapture, details) {
  const registration = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
  assert.equal(registration.status, 202);
  const code = latestVerificationCode(mailCapture.messages);
  const verification = await fetch(`${baseUrl}/api/auth/verify-registration`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: details.email, code }),
  });
  assert.equal(verification.status, 201);
  return {
    user: (await verification.json()).user,
    cookie: verification.headers.get("set-cookie").split(";")[0],
  };
}

module.exports = { createMailCapture, latestVerificationCode, registerAndVerify };
