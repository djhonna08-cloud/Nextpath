require("dotenv").config({ quiet: true });

const mysql = require("mysql2/promise");
const { Pool } = require("pg");

const TABLES = [
  ["users", ["id", "first_name", "last_name", "email", "password_salt", "password_hash", "display_name", "photo_style", "photo_data", "role", "email_verified", "is_active", "created_at"]],
  ["sessions", ["token_hash", "user_id", "expires_at"]],
  ["pending_registrations", ["email", "first_name", "last_name", "password_salt", "password_hash", "code_salt", "code_hash", "expires_at", "attempts_remaining", "sent_at", "resend_count"]],
  ["password_resets", ["user_id", "code_salt", "code_hash", "expires_at", "attempts_remaining", "requested_at", "reset_token_hash", "verified_expires_at"]],
  ["courses", ["id", "name", "category", "icon", "description", "learn_json", "subjects_json", "skills_json", "careers_json", "interests_json", "abbreviation", "duration", "recommended_strand", "related_course_ids_json", "category_id", "main_category_id", "match_tags_json", "catalog_version", "is_active", "created_at", "updated_at"]],
  ["course_match_sessions", ["id", "user_id", "status", "answers_json", "current_step", "result_json", "conversation_json", "created_at", "updated_at", "completed_at"]],
  ["analytics_events", ["id", "user_id", "event_type", "page", "course_id", "occurred_at"]],
  ["app_settings", ["setting_key", "setting_value"]],
];
const TIMESTAMP_COLUMNS = new Set(["created_at", "updated_at", "completed_at", "occurred_at"]);

async function migrate() {
  if (!process.env.NETLIFY_DB_URL) {
    throw new Error("NETLIFY_DB_URL is missing. Set it from your Netlify site environment before migrating.");
  }

  const source = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "nextpath",
    dateStrings: true,
    timezone: "Z",
  });
  const target = new Pool({ connectionString: process.env.NETLIFY_DB_URL, max: 1 });
  const client = await target.connect();

  try {
    await client.query("BEGIN");
    const counts = {};
    for (const [table, columns] of TABLES) {
      const [rows] = await source.query(`SELECT ${columns.map((column) => `\`${column}\``).join(", ")} FROM \`${table}\``);
      counts[table] = rows.length;
      if (!rows.length) continue;

      const mutable = columns.filter((column) => !["id", "token_hash", "email", "user_id", "setting_key"].includes(column));
      const key = table === "app_settings" ? "setting_key" : table === "sessions" ? "token_hash" : table === "password_resets" ? "user_id" : table === "pending_registrations" ? "email" : "id";
      const updates = mutable.length
        ? `DO UPDATE SET ${mutable.map((column) => `\"${column}\" = EXCLUDED.\"${column}\"`).join(", ")}`
        : "DO NOTHING";
      for (let offset = 0; offset < rows.length; offset += 100) {
        const batch = rows.slice(offset, offset + 100);
        const values = [];
        const tuples = batch.map((row, rowIndex) => {
          const placeholders = columns.map((column, columnIndex) => {
            let value = row[column] instanceof Date ? row[column].toISOString() : row[column];
            if (TIMESTAMP_COLUMNS.has(column) && typeof value === "string" && !value.trim()) {
              value = column === "updated_at" ? row.created_at || new Date().toISOString()
                : column === "completed_at" ? null
                  : new Date().toISOString();
            }
            values.push(value);
            return `$${rowIndex * columns.length + columnIndex + 1}`;
          });
          return `(${placeholders.join(", ")})`;
        });
        const statement = `INSERT INTO \"${table}\" (${columns.map((column) => `\"${column}\"`).join(", ")}) VALUES ${tuples.join(", ")} ON CONFLICT (\"${key}\") ${updates}`;
        await client.query(statement, values);
      }
    }

    for (const table of ["users", "course_match_sessions", "analytics_events"]) {
      const sequence = await client.query("SELECT pg_get_serial_sequence($1, 'id') AS name", [table]);
      if (sequence.rows[0]?.name) {
        await client.query(`SELECT setval($1::regclass, COALESCE((SELECT MAX(id) FROM \"${table}\"), 1), EXISTS (SELECT 1 FROM \"${table}\"))`, [sequence.rows[0].name]);
      }
    }
    await client.query("COMMIT");
    console.log(`Data migration completed. Row counts: ${Object.entries(counts).map(([table, count]) => `${table}=${count}`).join(", ")}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await target.end();
    await source.end();
  }
}

migrate().catch((error) => {
  console.error("Data migration failed:", error.message);
  process.exitCode = 1;
});
