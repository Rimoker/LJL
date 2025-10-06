// Simple local server to accept iteration logs and append to README.md
const http = require("http");
const fs = require("fs");
const path = require("path");
const repoRoot = path.resolve(__dirname, "..");
const readme = path.join(repoRoot, "README.md");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/log") {
    let body = "";
    req.on("data", (ch) => (body += ch));
    req.on("end", () => {
      const note = body || "Iteration update from web";
      const time = new Date().toISOString();
      const line = `- [${time}] ${note}\n`;
      fs.appendFileSync(readme, "\n" + "### Iteration log\n" + line, {
        encoding: "utf8",
      });
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log("Iteration log server listening on http://localhost:" + port)
);
