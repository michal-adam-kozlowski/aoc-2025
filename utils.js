const fs = require("fs");
const path = require("path");

function readInput(file = "input.txt") {
  const p = path.join(__dirname, file);
  return fs.readFileSync(p, "utf8").replace(/\r/g, "");
}

function lines(str) {
  return str.trim().split("\n");
}

module.exports = { readInput, lines };
