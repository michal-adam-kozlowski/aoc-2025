const { readInput } = require("../utils");

const isInvalidId = (id) => {
  const s = String(id);
  const n = s.length;

  for (let len = 1; len <= Math.floor(n / 2); len++) {
    if (n % len !== 0) continue;

    const repeats = n / len;
    if (repeats < 2) continue;

    const chunk = s.slice(0, len);

    if (chunk.repeat(repeats) === s) {
      return true;
    }
  }

  return false;
};

const day02part2 = () => {
  const raw = readInput("day02/input.txt").trim();
  const ranges = raw.split(",").filter(Boolean);

  let sum = 0;

  for (const range of ranges) {
    const [startStr, endStr] = range.split("-");
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);

    for (let n = start; n <= end; n++) {
      if (isInvalidId(n)) {
        sum += n;
      }
    }
  }

  console.log("Sum of invalid IDs (part 2):", sum);
};

day02part2();