CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_salt CHAR(32) NOT NULL,
  password_hash CHAR(128) NOT NULL,
  display_name VARCHAR(120),
  photo_style VARCHAR(40) NOT NULL DEFAULT 'placeholder',
  photo_data TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  email_verified SMALLINT NOT NULL DEFAULT 1,
  is_active SMALLINT NOT NULL DEFAULT 1,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash CHAR(64) PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

CREATE TABLE IF NOT EXISTS pending_registrations (
  email VARCHAR(254) PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  password_salt CHAR(32) NOT NULL,
  password_hash CHAR(128) NOT NULL,
  code_salt CHAR(32) NOT NULL,
  code_hash CHAR(128) NOT NULL,
  expires_at BIGINT NOT NULL,
  attempts_remaining INT NOT NULL DEFAULT 5,
  sent_at BIGINT NOT NULL,
  resend_count INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS password_resets (
  user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  code_salt CHAR(32) NOT NULL,
  code_hash CHAR(128) NOT NULL,
  expires_at BIGINT NOT NULL,
  attempts_remaining INT NOT NULL DEFAULT 5,
  requested_at BIGINT NOT NULL,
  reset_token_hash CHAR(64),
  verified_expires_at BIGINT
);

CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(80) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(80) NOT NULL,
  icon VARCHAR(40) NOT NULL DEFAULT 'book-open',
  description VARCHAR(1000) NOT NULL,
  learn_json TEXT NOT NULL,
  subjects_json TEXT NOT NULL,
  skills_json TEXT NOT NULL,
  careers_json TEXT NOT NULL,
  interests_json TEXT NOT NULL,
  abbreviation VARCHAR(30),
  duration VARCHAR(100),
  recommended_strand VARCHAR(160),
  related_course_ids_json TEXT,
  category_id VARCHAR(80),
  main_category_id VARCHAR(80),
  match_tags_json TEXT,
  catalog_version VARCHAR(40),
  is_active SMALLINT NOT NULL DEFAULT 1,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS courses_active_name_idx ON courses(is_active, name);

CREATE TABLE IF NOT EXISTS course_match_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'in_progress',
  answers_json TEXT NOT NULL DEFAULT '[]',
  current_step INT NOT NULL DEFAULT 0,
  result_json TEXT,
  conversation_json TEXT,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP(3)
);
CREATE INDEX IF NOT EXISTS course_match_sessions_user_updated_idx ON course_match_sessions(user_id, updated_at);

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(40) NOT NULL,
  page VARCHAR(40),
  course_id VARCHAR(80),
  occurred_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS analytics_events_user_occurred_idx ON analytics_events(user_id, occurred_at);

CREATE TABLE IF NOT EXISTS app_settings (
  setting_key VARCHAR(80) PRIMARY KEY,
  setting_value VARCHAR(1000) NOT NULL
);

CREATE OR REPLACE FUNCTION nextpath_touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS courses_touch_updated_at ON courses;
CREATE TRIGGER courses_touch_updated_at BEFORE UPDATE ON courses
FOR EACH ROW EXECUTE FUNCTION nextpath_touch_updated_at();

DROP TRIGGER IF EXISTS course_match_sessions_touch_updated_at ON course_match_sessions;
CREATE TRIGGER course_match_sessions_touch_updated_at BEFORE UPDATE ON course_match_sessions
FOR EACH ROW EXECUTE FUNCTION nextpath_touch_updated_at();
