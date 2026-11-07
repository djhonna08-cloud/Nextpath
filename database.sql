SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  password_salt CHAR(32) NOT NULL,
  password_hash CHAR(128) NOT NULL,
  display_name VARCHAR(120) NULL,
  photo_style VARCHAR(40) NOT NULL DEFAULT 'placeholder',
  photo_data LONGTEXT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  email_verified TINYINT(1) NOT NULL DEFAULT 1,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessions (
  token_hash CHAR(64) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  expires_at BIGINT NOT NULL,
  PRIMARY KEY (token_hash),
  KEY sessions_user_id_idx (user_id),
  CONSTRAINT sessions_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pending_registrations (
  email VARCHAR(254) NOT NULL,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  password_salt CHAR(32) NOT NULL,
  password_hash CHAR(128) NOT NULL,
  code_salt CHAR(32) NOT NULL,
  code_hash CHAR(128) NOT NULL,
  expires_at BIGINT NOT NULL,
  attempts_remaining INT NOT NULL DEFAULT 5,
  sent_at BIGINT NOT NULL,
  resend_count INT NOT NULL DEFAULT 0,
  PRIMARY KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_resets (
  user_id BIGINT UNSIGNED NOT NULL,
  code_salt CHAR(32) NOT NULL,
  code_hash CHAR(128) NOT NULL,
  expires_at BIGINT NOT NULL,
  attempts_remaining INT NOT NULL DEFAULT 5,
  requested_at BIGINT NOT NULL,
  reset_token_hash CHAR(64) NULL,
  verified_expires_at BIGINT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT password_resets_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(80) NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(80) NOT NULL,
  icon VARCHAR(40) NOT NULL DEFAULT 'book-open',
  description VARCHAR(1000) NOT NULL,
  learn_json LONGTEXT NOT NULL,
  subjects_json LONGTEXT NOT NULL,
  skills_json LONGTEXT NOT NULL,
  careers_json LONGTEXT NOT NULL,
  interests_json LONGTEXT NOT NULL,
  abbreviation VARCHAR(30) NULL,
  duration VARCHAR(100) NULL,
  recommended_strand VARCHAR(160) NULL,
  related_course_ids_json LONGTEXT NULL,
  category_id VARCHAR(80) NULL,
  main_category_id VARCHAR(80) NULL,
  match_tags_json LONGTEXT NULL,
  catalog_version VARCHAR(40) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY courses_active_name_idx (is_active, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS course_match_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'in_progress',
  answers_json LONGTEXT NOT NULL,
  current_step INT NOT NULL DEFAULT 0,
  result_json LONGTEXT NULL,
  conversation_json LONGTEXT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  completed_at DATETIME(3) NULL,
  PRIMARY KEY (id),
  KEY course_match_sessions_user_updated_idx (user_id, updated_at),
  CONSTRAINT course_match_sessions_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  event_type VARCHAR(40) NOT NULL,
  page VARCHAR(40) NULL,
  course_id VARCHAR(80) NULL,
  occurred_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY analytics_events_user_occurred_idx (user_id, occurred_at),
  CONSTRAINT analytics_events_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_settings (
  setting_key VARCHAR(80) NOT NULL,
  setting_value VARCHAR(1000) NOT NULL,
  PRIMARY KEY (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
