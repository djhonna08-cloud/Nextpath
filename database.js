const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const bcrypt = require("bcryptjs");

const db = new DatabaseSync(path.join(__dirname, "pathfinder.db"));
db.exec("PRAGMA journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    date_registered TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const exampleUsers = [
  ["Juan", "Dela Cruz", "juan.delacruz@example.com", "PathfinderJuan!2026"],
  ["Maria", "Santos", "maria.santos@example.com", "PathfinderMaria!2026"],
  ["Angelo", "Reyes", "angelo.reyes@example.com", "PathfinderAngelo!2026"],
  ["Sofia", "Garcia", "sofia.garcia@example.com", "PathfinderSofia!2026"],
  ["Kevin", "Mendoza", "kevin.mendoza@example.com", "PathfinderKevin!2026"],
];

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (first_name, last_name, email, password_hash)
  VALUES (?, ?, ?, ?)
`);
for (const [firstName, lastName, email, password] of exampleUsers) {
  insertUser.run(firstName, lastName, email, bcrypt.hashSync(password, 12));
}

module.exports = { db, bcrypt };
