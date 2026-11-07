const fs = require("node:fs");
const path = require("node:path");
const mysql = require("mysql2/promise");

function mysqlSql(sql) {
  return sql
    .replace(/INSERT OR IGNORE INTO/gi, "INSERT IGNORE INTO")
    .replace(/ON CONFLICT\(([^)]+)\) DO UPDATE SET/gi, "ON DUPLICATE KEY UPDATE")
    .replace(/\bexcluded\.([a-z_]+)/gi, "VALUES($1)")
    .replace(/COLLATE NOCASE/gi, "")
    .replace(/strftime\('%Y-%m-%dT%H:%M:%fZ', 'now', '-(\d+) days'\)/gi,
      "DATE_SUB(UTC_TIMESTAMP(3), INTERVAL $1 DAY)")
    .replace(/strftime\('%Y-%m-%dT%H:%M:%fZ', 'now'\)/gi, "UTC_TIMESTAMP(3)")
    .replace(/date\(([^)]+)\)/gi, "DATE($1)");
}

function normalizeRows(rows) {
  return rows.map((row) => {
    for (const [key, value] of Object.entries(row)) {
      if (value instanceof Date) {
        row[key] = value.toISOString();
      } else if (key.endsWith("_at") && typeof value === "string" &&
          /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(value)) {
        row[key] = `${value.replace(" ", "T")}Z`;
      }
    }
    return row;
  });
}

function createMySqlDatabase({
  host = process.env.DB_HOST || "127.0.0.1",
  port = Number(process.env.DB_PORT || 3306),
  user = process.env.DB_USER || "root",
  password = process.env.DB_PASSWORD || "",
  database = process.env.DB_NAME || "nextpath",
} = {}) {
  const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true,
    timezone: "Z",
    multipleStatements: true,
  });

  async function execute(connection, sql, params) {
    const [result] = await connection.query(mysqlSql(sql), params);
    return result;
  }

  const db = {
    dialect: "mysql",
    ready: Promise.resolve(),
    async get(sql, ...params) {
      const result = await execute(pool, sql, params);
      return Array.isArray(result) ? normalizeRows(result)[0] : undefined;
    },
    async all(sql, ...params) {
      const result = await execute(pool, sql, params);
      return Array.isArray(result) ? normalizeRows(result) : [];
    },
    async run(sql, ...params) {
      const result = await execute(pool, sql, params);
      return {
        changes: result.affectedRows,
        lastInsertRowid: result.insertId,
      };
    },
    async withTransaction(callback) {
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        const transaction = {
          get: async (sql, ...params) => {
            const result = await execute(connection, sql, params);
            return Array.isArray(result) ? normalizeRows(result)[0] : undefined;
          },
          all: async (sql, ...params) => {
            const result = await execute(connection, sql, params);
            return Array.isArray(result) ? normalizeRows(result) : [];
          },
          run: async (sql, ...params) => {
            const result = await execute(connection, sql, params);
            return {
              changes: result.affectedRows,
              lastInsertRowid: result.insertId,
            };
          },
        };
        const result = await callback(transaction);
        await connection.commit();
        return result;
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    },
    async close() {
      await pool.end();
    },
  };

  db.ready = (async () => {
    const schemaPath = path.join(__dirname, "database.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    const photoColumn = await db.get("SELECT 1 FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'photo_data'");
    if (!photoColumn) await pool.query("ALTER TABLE users ADD COLUMN photo_data LONGTEXT NULL");
    const conversationColumn = await db.get(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = DATABASE()
        AND table_name = 'course_match_sessions'
        AND column_name = 'conversation_json'
    `);
    if (!conversationColumn) {
      await pool.query("ALTER TABLE course_match_sessions ADD COLUMN conversation_json LONGTEXT NULL");
    }
    const courseColumns = [
      ["abbreviation", "VARCHAR(30) NULL"],
      ["duration", "VARCHAR(100) NULL"],
      ["recommended_strand", "VARCHAR(160) NULL"],
      ["related_course_ids_json", "LONGTEXT NULL"],
      ["category_id", "VARCHAR(80) NULL"],
      ["main_category_id", "VARCHAR(80) NULL"],
      ["match_tags_json", "LONGTEXT NULL"],
      ["catalog_version", "VARCHAR(40) NULL"],
    ];
    for (const [column, definition] of courseColumns) {
      const exists = await db.get(`
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = DATABASE()
          AND table_name = 'courses'
          AND column_name = ?
      `, column);
      if (!exists) await pool.query(`ALTER TABLE courses ADD COLUMN ${column} ${definition}`);
    }
    const repairedAnswers = await db.run(`
      UPDATE course_match_sessions
      SET answers_json = '[]'
      WHERE answers_json IS NULL OR TRIM(answers_json) = ''
    `);
    const repairedTimestamps = await db.run(`
      UPDATE course_match_sessions
      SET created_at = CASE WHEN created_at IS NULL OR TRIM(created_at) = ''
                            THEN UTC_TIMESTAMP(3) ELSE created_at END,
          updated_at = CASE WHEN updated_at IS NULL OR TRIM(updated_at) = ''
                            THEN UTC_TIMESTAMP(3) ELSE updated_at END
      WHERE created_at IS NULL OR TRIM(created_at) = ''
         OR updated_at IS NULL OR TRIM(updated_at) = ''
    `);
    if (repairedAnswers.changes || repairedTimestamps.changes) {
      console.warn(
        `Repaired legacy Course Match session data: ${repairedAnswers.changes} empty answer record(s), ${repairedTimestamps.changes} empty timestamp record(s).`,
      );
    }
    await db.withTransaction(async (transaction) => {
      for (const course of require("./course-data")) {
        const names = [course.name, ...course.legacyNames].map((name) => name.toLowerCase());
        const placeholders = names.map(() => "?").join(", ");
        const existing = await transaction.get(`
          SELECT id, catalog_version FROM courses
          WHERE id = ? OR LOWER(name) IN (${placeholders})
          ORDER BY CASE WHEN id = ? THEN 0 ELSE 1 END
          LIMIT 1
        `, course.id, ...names, course.id);
        const values = [
          course.name,
          course.category,
          course.icon,
          course.description,
          JSON.stringify(course.learn),
          JSON.stringify(course.subjects),
          JSON.stringify(course.skills),
          JSON.stringify(course.careers),
          JSON.stringify(course.interests),
          course.abbreviation,
          course.duration,
          course.recommendedStrand,
          JSON.stringify(course.relatedCourseIds),
          course.categoryId,
          course.mainCategoryId,
          JSON.stringify(course.matchTags),
        ];
        if (existing && existing.catalog_version !== "filipino-catalog-v1") {
          await transaction.run(`
            UPDATE courses
            SET name = ?, category = ?, icon = ?, description = ?, learn_json = ?,
                subjects_json = ?, skills_json = ?, careers_json = ?, interests_json = ?,
                abbreviation = ?, duration = ?, recommended_strand = ?,
                related_course_ids_json = ?, category_id = ?, main_category_id = ?,
                match_tags_json = ?, catalog_version = ?
            WHERE id = ?
          `, ...values, "filipino-catalog-v1", existing.id);
        } else if (!existing) {
          await transaction.run(`
            INSERT INTO courses (
              id, name, category, icon, description, learn_json, subjects_json,
              skills_json, careers_json, interests_json, abbreviation, duration,
              recommended_strand, related_course_ids_json, category_id,
              main_category_id, match_tags_json, catalog_version
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, course.id, ...values, "filipino-catalog-v1");
        }
      }
      for (const [key, value] of [
        ["site_name", "NextPath"],
        ["registration_enabled", "true"],
        ["maintenance_mode", "false"],
      ]) {
        await transaction.run(
          "INSERT OR IGNORE INTO app_settings (setting_key, setting_value) VALUES (?, ?)",
          key,
          value,
        );
      }
    });
  })();

  return db;
}

module.exports = { createMySqlDatabase, mysqlSql };
