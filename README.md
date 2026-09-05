# Pathfinder

Pathfinder is a student course exploration site with a SQLite-backed registration and login API.

## Run locally

```text
npm install
npm start
```

Open http://localhost:3000.

## Example accounts

All example accounts are seeded on first server start. Passwords are listed here only for local testing:

| Name | Email | Password |
| --- | --- | --- |
| Juan Dela Cruz | juan.delacruz@example.com | PathfinderJuan!2026 |
| Maria Santos | maria.santos@example.com | PathfinderMaria!2026 |
| Angelo Reyes | angelo.reyes@example.com | PathfinderAngelo!2026 |
| Sofia Garcia | sofia.garcia@example.com | PathfinderSofia!2026 |
| Kevin Mendoza | kevin.mendoza@example.com | PathfinderKevin!2026 |

Passwords are stored as bcrypt hashes in `pathfinder.db`; plaintext passwords are never written to the database or browser storage.
