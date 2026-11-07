# NextPath

A student course-exploration site. Accounts, password hashes, profiles, and login sessions are stored by the Express server in a MySQL/MariaDB database, such as the MySQL service included with XAMPP. The database schema is exported in `database.sql` and is also initialized automatically when the server connects.

## Local database and accounts

- Registering and logging in are handled by the local server; passwords are hashed with Node.js `scrypt` and are never stored as plain text.
- New registrations must verify their email with a six-digit, one-time code sent by SMTP before an account or login session is created. Codes expire after 10 minutes, have five verification attempts, and can be resent after a 60-second cooldown (up to three resends). Registration and verification requests are limited to 10 per IP address per minute.
- Pending registrations are stored temporarily in `pending_registrations`; the password remains scrypt-hashed, and the verification code is stored only as a salted scrypt hash. Expired pending records are cleaned up opportunistically during registration, verification, and resend requests.
- Profiles live in the `users` table and support a custom display name plus selectable placeholder avatar styles. Profile photo uploads are not enabled yet.
- Login tokens are stored as hashes in the `sessions` table and sent to the browser in an HTTP-only cookie.
- Accounts have server-enforced `user`, `admin`, or `super_admin` roles. Admins can manage ordinary user accounts and the course catalog. Only super admins can manage administrator roles, access global settings, and view system-wide statistics. User list responses never include password hashes or login tokens.
- Super admins can configure the site name, public registration, and maintenance mode. Maintenance mode blocks ordinary user access while leaving administrator access available.
- Administrators can create accounts by sending a one-time password setup code to the user's email, edit names, send password reset codes, and deactivate or reactivate accounts. Deactivation invalidates login sessions but retains Course Match progress and analytics history.
- Course records are stored in the MySQL `courses` table and include course name and abbreviation, one of 15 detailed categories grouped into eight main browsing categories, overview, typical duration, subjects, useful skills, recommended SHS strand, career opportunities, related courses, and interests. The initial proposed catalog contains 65 Filipino college-course options. Startup migration adds the course-detail columns and updates or inserts catalog entries by existing ID/name without deleting courses or changing active status. Administrators can add, edit, and deactivate courses; inactive courses are hidden from the public catalog.
- The course browser opens with eight category cards, then supports search across the complete active catalog, main and detailed category filters, course counts, and course detail pages.
- Signed-in Course Match asks ten multiple-choice questions about interests, strengths, hobbies, learning preferences, personality, and career goals. Direct course matches receive full points and broader detailed-category matches receive half points; the server deterministically ranks up to three active courses and calculates percentages from those weighted points. NVIDIA may provide evidence-based explanations and a results-page chatbot but cannot alter scores or rankings. Answers, progress, scores, explanations, conversations, and timestamps are saved in `course_match_sessions`; users can resume in-progress sessions and review completed recommendations.
- Basic, per-user analytics record page views, course views, Course Match starts/completions, and profile updates. They do not store passwords or API keys. Users can review their activity from My profile & activity.
- `analytics_events` and Course Match session records remain available when an account is deactivated. Permanently deleting an account removes associated data through MySQL foreign-key cascades.
- MySQL data persists across server restarts. Back up the `nextpath` database in phpMyAdmin to preserve local accounts.
- Accounts previously stored in Firebase are not imported. Users need to register again.
- By default the server listens on `127.0.0.1`, so it is available only on the local machine.

## Run locally

Requires Node.js 20 or newer and XAMPP with its MySQL/MariaDB service running.

1. Start **MySQL** from the XAMPP Control Panel.
2. In phpMyAdmin, create a database named `nextpath`. Optionally import `database.sql` into it; the application also creates the tables at startup.
3. Copy `.env.example` to `.env` and set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` to match your XAMPP configuration. XAMPP commonly uses `root` with an empty password for local development.
4. Install and start the application:

```powershell
npm install
npm start
```

Open http://localhost:3000. The `/health` endpoint returns a simple server status at http://localhost:3000/health.

The default database connection is `127.0.0.1:3306`, database `nextpath`. Change the `DB_*` values in `.env` to use a different MySQL/MariaDB server, or set `PORT` to change the app port.

## Super admin

To bootstrap or reset the super admin account without email OTP, set `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` in the ignored local `.env`, then run:

```bash
npm run create-admin
```

The command stores the password as a salted scrypt hash and marks the email verified. It does not print the password. Remove `SUPER_ADMIN_PASSWORD` from `.env` after the one-time bootstrap, and choose a unique, strong password before exposing the server beyond localhost. The administration dashboard is available to `admin` and `super_admin` accounts. Ordinary registration cannot assign either role. Admins manage ordinary users and courses; only super admins may assign roles or change global settings. The dashboard includes 14-day registration and activity charts.

## Account password setup and recovery

Users select **I have a password setup or reset code** on the login page, enter their account email to request a code, verify the emailed six-digit code, and only then choose a new password of at least eight characters. For security, the request response does not disclose whether an account exists. Administrators can create accounts or trigger an email code for account setup/reset. Codes expire after 10 minutes, allow five attempts, and are stored as salted hashes. Successful code verification grants a short-lived, single-use reset token; a successful password change invalidates existing login sessions.

## Course Match and NextPath assistant

Course Match collects ten multiple-choice answers, displaying one question at a time with previous/next navigation. After all answers are saved, the server scores active courses using the shared deterministic answer-to-course map and saves up to three ranked recommendations with compatibility percentages. NVIDIA is used only to explain those fixed results and power a results-page chat grounded in the saved answers, recommendations, and active course catalog. The conversation and results are saved to the signed-in user's session so it can be reviewed later; when NVIDIA is unavailable, evidence-based explanations and scored results remain available. The separate signed-in NextPath assistant answers system-help questions; its messages and up to four previous user questions are sent to NVIDIA for context and are not saved by NextPath.

1. Copy `.env.example` to `.env`. If an NVIDIA key was previously shared in chat, revoke it and create a replacement.
2. Add the key to `.env` as `NVIDIA_API_KEY=...`. Never commit `.env` or place the key in browser code.
3. Set `NVIDIA_MODEL` in `.env` to the preferred model. The default is `z-ai/glm-5.3-flash`; if it is unavailable, the server tries the configured Nemotron, DeepSeek, and GLM fallback models in sequence. Each model request has a timeout and the entire fallback sequence is bounded.

## Email verification

Configure SMTP in `.env` to enable email verification. For Gmail, use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, your full Gmail address as `SMTP_USER`, and a Gmail App Password as `SMTP_PASS`. `SMTP_FROM` is optional; if set, use a sender address allowed by your SMTP account. Restart the server after changing `.env`. Registration returns an explicit configuration error until valid SMTP credentials are configured.

An SMTP account app password was shared in chat. Revoke it in Google Account security settings and create a replacement before adding the new value to the ignored local `.env` file. Never put SMTP credentials in source code, `.env.example`, or browser code.

Both signed-in chat endpoints require an account, allow up to 8 requests per account and IP per minute, limit each message to 1,200 characters, reject common API-key formats, and time out slow upstream calls. Course Match chat is available after the ten-question assessment is completed and sends the saved answers, server-scored recommendations, active course catalog, and current conversation to NVIDIA. Compatibility scores and rankings are never set by the model. Language-model instructions are not a guarantee; do not share secrets or use either assistant for consequential decisions.
