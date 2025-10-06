#!/usr/bin/env node
// Append a timestamped iteration note to README.md
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const readme = path.join(repoRoot, "README.md");

const note = process.argv.slice(2).join(" ") || "Iteration update";
const time = new Date().toISOString();
const line = `- [${time}] ${note}\n`;

fs.appendFileSync(readme, "\n" + "### Iteration log\n" + line, {
  encoding: "utf8",
});
console.log("Appended to README.md:", line.trim());
