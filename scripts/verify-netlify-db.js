const { Pool } = require("pg");

async function verify() {
  if (!process.env.NETLIFY_DB_URL) throw new Error("NETLIFY_DB_URL is missing.");
  const pool = new Pool({ connectionString: process.env.NETLIFY_DB_URL, max: 1 });
  try {
    const tables = ["users", "sessions", "pending_registrations", "password_resets", "courses", "course_match_sessions", "analytics_events", "app_settings"];
    const counts = {};
    for (const table of tables) {
      const result = await pool.query(`SELECT COUNT(*)::int AS count FROM "${table}"`);
      counts[table] = result.rows[0].count;
    }
    console.log(`Production database row counts: ${Object.entries(counts).map(([table, count]) => `${table}=${count}`).join(", ")}`);
  } finally {
    await pool.end();
  }
}

verify().catch((error) => {
  console.error("Database verification failed:", error.message);
  process.exitCode = 1;
});
