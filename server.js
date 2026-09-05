const express = require("express");
const path = require("node:path");
const { db, bcrypt } = require("./database");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname));

function publicUser(user) {
  return {
    id: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
  };
}

app.post("/api/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !/^\S+@\S+\.\S+$/.test(normalizedEmail || "") ||
    typeof password !== "string" ||
    password.length < 6
  ) {
    return res
      .status(400)
      .json({
        error:
          "Please provide a first name, last name, valid email, and a password of at least 6 characters.",
      });
  }
  try {
    if (
      db
        .prepare("SELECT user_id FROM users WHERE email = ?")
        .get(normalizedEmail)
    ) {
      return res
        .status(409)
        .json({ error: "An account with that email already exists." });
    }
    const passwordHash = bcrypt.hashSync(password, 12);
    const result = db
      .prepare(
        `INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)`,
      )
      .run(firstName.trim(), lastName.trim(), normalizedEmail, passwordHash);
    const user = db
      .prepare("SELECT * FROM users WHERE user_id = ?")
      .get(result.lastInsertRowid);
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.message?.includes("UNIQUE constraint failed: users.email"))
      return res
        .status(409)
        .json({ error: "An account with that email already exists." });
    res.status(500).json({ error: "Unable to create the account right now." });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email?.trim().toLowerCase());
  if (!user || !bcrypt.compareSync(password || "", user.password_hash))
    return res.status(401).json({ error: "Incorrect email or password." });
  res.json({ user: publicUser(user) });
});

app.get("/api/users/count", (_req, res) =>
  res.json({
    count: db.prepare("SELECT COUNT(*) AS count FROM users").get().count,
  }),
);

app.use((_req, res) => res.sendFile(path.join(__dirname, "index.html")));
const server = app.listen(port, () =>
  console.log(`Pathfinder running at http://localhost:${port}`),
);
process.on("SIGINT", () => {
  db.close();
  server.close(() => process.exit(0));
});
