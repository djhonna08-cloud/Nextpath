const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");
const defaultCourses = require("../course-data");

function createSqliteTestDatabase(databasePath = ":memory:") {
  if (databasePath !== ":memory:") {
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  }
  const db = new Database(databasePath);
  db.pragma("foreign_keys = ON");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL COLLATE NOCASE UNIQUE,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      photo_style TEXT NOT NULL DEFAULT 'placeholder',
      photo_data TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      email_verified INTEGER NOT NULL DEFAULT 1,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pending_registrations (
      email TEXT PRIMARY KEY COLLATE NOCASE,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      code_salt TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts_remaining INTEGER NOT NULL DEFAULT 5,
      sent_at INTEGER NOT NULL,
      resend_count INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS course_match_sessions (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      status TEXT NOT NULL,
      answers_json TEXT NOT NULL DEFAULT '[]',
      current_step INTEGER NOT NULL DEFAULT 0,
      result_json TEXT,
      conversation_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      completed_at TEXT
    );
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL,
      page TEXT,
      course_id TEXT,
      occurred_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT 'book-open',
      description TEXT NOT NULL,
      learn_json TEXT NOT NULL DEFAULT '[]',
      subjects_json TEXT NOT NULL DEFAULT '[]',
      skills_json TEXT NOT NULL DEFAULT '[]',
      careers_json TEXT NOT NULL DEFAULT '[]',
      interests_json TEXT NOT NULL DEFAULT '[]',
      abbreviation TEXT,
      duration TEXT,
      recommended_strand TEXT,
      related_course_ids_json TEXT,
      category_id TEXT,
      main_category_id TEXT,
      match_tags_json TEXT,
      catalog_version TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
    CREATE TABLE IF NOT EXISTS app_settings (
      setting_key TEXT PRIMARY KEY,
      setting_value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS password_resets (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      code_salt TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts_remaining INTEGER NOT NULL DEFAULT 5,
      requested_at INTEGER NOT NULL,
      reset_token_hash TEXT,
      verified_expires_at INTEGER
    );
  `);
  const insertCourse = db.prepare(`
    INSERT OR IGNORE INTO courses (
      id, name, category, icon, description, learn_json, subjects_json,
      skills_json, careers_json, interests_json, abbreviation, duration,
      recommended_strand, related_course_ids_json, category_id, main_category_id,
      match_tags_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const seed = db.transaction(() => {
    for (const course of defaultCourses) {
      insertCourse.run(
        course.id, course.name, course.category, course.icon, course.description,
        JSON.stringify(course.learn), JSON.stringify(course.subjects),
        JSON.stringify(course.skills), JSON.stringify(course.careers), JSON.stringify(course.interests),
        course.abbreviation, course.duration, course.recommendedStrand,
        JSON.stringify(course.relatedCourseIds), course.categoryId, course.mainCategoryId,
        JSON.stringify(course.matchTags),
      );
    }
    const setting = db.prepare("INSERT OR IGNORE INTO app_settings (setting_key, setting_value) VALUES (?, ?)");
    setting.run("site_name", "NextPath");
    setting.run("registration_enabled", "true");
    setting.run("maintenance_mode", "false");
  });
  seed();
  db.dialect = "mysql";
  db.ready = Promise.resolve();
  db.get = (sql, ...parameters) => db.prepare(sql).get(...parameters);
  db.all = (sql, ...parameters) => db.prepare(sql).all(...parameters);
  db.run = (sql, ...parameters) => db.prepare(sql).run(...parameters);
  db.withTransaction = async (callback) => {
    db.exec("BEGIN");
    try {
      const result = await callback({
        get: db.get,
        all: db.all,
        run: db.run,
      });
      db.exec("COMMIT");
      return result;
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  };
  return db;
}

module.exports = { createSqliteTestDatabase };
