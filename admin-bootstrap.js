const crypto = require("node:crypto");
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

const { createMySqlDatabase } = require("./mysql-database");
const { createPostgresDatabase } = require("./postgres-database");

const email = typeof process.env.SUPER_ADMIN_EMAIL === "string"
  ? process.env.SUPER_ADMIN_EMAIL.trim().toLowerCase()
  : "";
const password = process.env.SUPER_ADMIN_PASSWORD;

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof password !== "string" || password.length < 8) {
  console.error("Set SUPER_ADMIN_EMAIL and a SUPER_ADMIN_PASSWORD of at least 8 characters in .env.");
  process.exit(1);
}

async function bootstrapAdmin() {
  const db = process.env.NETLIFY_DB_URL || process.env.DATABASE_URL
    ? createPostgresDatabase()
    : createMySqlDatabase();
  try {
    await db.ready;
    const existing = await db.get("SELECT id FROM users WHERE email = ?", email);
    const salt = crypto.randomBytes(16);
    const passwordHash = crypto.scryptSync(password, salt, 64);
    if (existing) {
      await db.run(`
        UPDATE users
        SET password_salt = ?, password_hash = ?, role = 'super_admin', email_verified = 1
        WHERE id = ?
      `, salt.toString("hex"), passwordHash.toString("hex"), existing.id);
      console.log("Super admin credentials were updated for the configured email.");
    } else {
      const name = email.split("@")[0];
      await db.run(`
        INSERT INTO users (first_name, last_name, email, password_salt, password_hash, role, email_verified)
        VALUES (?, 'Admin', ?, ?, ?, 'super_admin', 1)
      `, name, email, salt.toString("hex"), passwordHash.toString("hex"));
      console.log("Super admin account created and email marked verified.");
    }
  } finally {
    await db.close();
  }
}

bootstrapAdmin().catch((error) => {
  console.error("Super admin setup failed:", error.message);
  process.exitCode = 1;
});
