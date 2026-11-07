const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const publishDirectory = path.join(root, "public");
const publicFiles = [
  "index.html",
  "app.js",
  "styles.css",
  "clean-theme.css",
  "course-data.js",
  "course-match-questions.js",
  "course-taxonomy.js",
  "favicon.svg",
];

fs.rmSync(publishDirectory, { recursive: true, force: true });
fs.mkdirSync(publishDirectory, { recursive: true });
for (const file of publicFiles) {
  fs.copyFileSync(path.join(root, file), path.join(publishDirectory, file));
}
fs.cpSync(
  path.join(root, "images", "categories"),
  path.join(publishDirectory, "images", "categories"),
  { recursive: true },
);
