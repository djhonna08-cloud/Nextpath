const fs = require("node:fs");
const path = require("node:path");
const { Pool } = require("pg");

function postgresSql(sql) {
  return sql
    .replace(/INSERT OR IGNORE INTO/gi, "INSERT INTO")
    .replace(/COLLATE NOCASE/gi, "")
    .replace(/strftime\('%Y-%m-%dT%H:%M:%fZ', 'now', '-(\d+) days'\)/gi,
      "(CURRENT_TIMESTAMP - INTERVAL '$1 days')")
    .replace(/strftime\('%Y-%m-%dT%H:%M:%fZ', 'now'\)/gi, "CURRENT_TIMESTAMP")
    .replace(/CAST\(([\s\S]*?) AS BINARY\)/gi, "CAST($1 AS TEXT)")
    .replace(/\bdate\(([^)]+)\)/gi, "DATE($1)")
    .replace(/\?/g, (() => {
      let index = 0;
      return () => `$${++index}`;
    })());
}

function normalizeRows(rows) {
  return rows.map((row) => {
    for (const [key, value] of Object.entries(row)) {
      if (value instanceof Date) row[key] = value.toISOString();
    }
    return row;
  });
}

function createPostgresDatabase({
  connectionString = process.env.NETLIFY_DB_URL || process.env.DATABASE_URL,
  initializeSchema = !process.env.NETLIFY,
  poolOptions = {},
} = {}) {
  if (!connectionString) {
    throw new Error("NETLIFY_DB_URL must be configured to use the hosted PostgreSQL database.");
  }

  const pool = new Pool({
    connectionString,
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    ...poolOptions,
  });

  async function execute(connection, sql, params) {
    try {
      return await connection.query(postgresSql(sql), params);
    } catch (error) {
      if (error.code === "23505") error.code = "ER_DUP_ENTRY";
      throw error;
    }
  }

  function insertTable(sql) {
    return sql.match(/\bINSERT\s+(?:OR\s+IGNORE\s+)?INTO\s+([a-z_]+)/i)?.[1]?.toLowerCase();
  }

  async function run(connection, sql, params) {
    const table = insertTable(sql);
    const needsId = ["users", "course_match_sessions", "analytics_events"].includes(table);
    const statement = needsId && !/\bRETURNING\b/i.test(sql)
      ? `${sql.trim().replace(/;$/, "")} RETURNING id`
      : sql;
    const result = await execute(connection, statement, params);
    return {
      changes: result.rowCount || 0,
      lastInsertRowid: result.rows?.[0]?.id,
    };
  }

  const db = {
    dialect: "postgres",
    ready: Promise.resolve(),
    async get(sql, ...params) {
      const result = await execute(pool, sql, params);
      return normalizeRows(result.rows)[0];
    },
    async all(sql, ...params) {
      const result = await execute(pool, sql, params);
      return normalizeRows(result.rows);
    },
    async run(sql, ...params) {
      return run(pool, sql, params);
    },
    async withTransaction(callback) {
      const connection = await pool.connect();
      try {
        await connection.query("BEGIN");
        const transaction = {
          get: async (sql, ...params) => {
            const result = await execute(connection, sql, params);
            return normalizeRows(result.rows)[0];
          },
          all: async (sql, ...params) => {
            const result = await execute(connection, sql, params);
            return normalizeRows(result.rows);
          },
          run: async (sql, ...params) => run(connection, sql, params),
        };
        const result = await callback(transaction);
        await connection.query("COMMIT");
        return result;
      } catch (error) {
        await connection.query("ROLLBACK");
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
    if (initializeSchema) {
      const schemaPath = path.join(__dirname, "postgres-schema.sql");
      const schema = fs.readFileSync(schemaPath, "utf8");
      await pool.query(schema);
    }

    await db.withTransaction(async (transaction) => {
      const courses = require("./course-data");
      const seeded = await transaction.get(
        "SELECT COUNT(*) AS count FROM courses WHERE catalog_version = ?",
        "filipino-catalog-v1",
      );
      for (const course of Number(seeded?.count) === courses.length ? [] : courses) {
        const names = [course.name, ...course.legacyNames].map((name) => name.toLowerCase());
        const placeholders = names.map((_, index) => `$${index + 2}`).join(", ");
        const existing = await transaction.get(`
          SELECT id, catalog_version FROM courses
          WHERE id = $1 OR LOWER(name) IN (${placeholders})
          ORDER BY CASE WHEN id = $${names.length + 2} THEN 0 ELSE 1 END
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
          "INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?) ON CONFLICT (setting_key) DO NOTHING",
          key,
          value,
        );
      }
    });
  })();

  return db;
}

module.exports = { createPostgresDatabase, postgresSql };
