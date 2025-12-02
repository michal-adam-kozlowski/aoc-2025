const { readInput } = require("../utils");

const isInvalidId = (id) => {
  const s = String(id);
  if (s.length % 2 !== 0) return false;

  const half = s.length / 2;
  const first = s.slice(0, half);
  const second = s.slice(half);

  return first === second;
};

const day02part1 = () => {
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

  console.log("Sum of invalid IDs:", sum);
};

day02part1();