const { readInput, lines } = require("../utils");

function parseRedTiles(raw) {
  return lines(raw)
    .filter((line) => line !== "")
    .map((line) => {
      const [xStr, yStr] = line.split(",");
      return {
        x: Number(xStr),
        y: Number(yStr),
      };
    });
}

function day09part1() {
  const raw = readInput("day09/input.txt");
  const points = parseRedTiles(raw);
  const n = points.length;

  if (n < 2) {
    console.log("Not enough red tiles to form a rectangle.");
    return;
  }

  let maxArea = 0n;

  for (let i = 0; i < n; i++) {
    const { x: x1, y: y1 } = points[i];
    for (let j = i + 1; j < n; j++) {
      const { x: x2, y: y2 } = points[j];

      const width = BigInt(Math.abs(x1 - x2) + 1);
      const height = BigInt(Math.abs(y1 - y2) + 1);
      const area = width * height;

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  console.log(
    "powierzchnia =",
    maxArea.toString()
  );
}

day09part1();