const { readInput, lines } = require("../utils");

const getProblemColumnRanges = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const isEmptyCol = (c) => grid.every((row) => row[c] === " ");

  const ranges = [];
  let inBlock = false;
  let blockStart = 0;

  for (let c = 0; c < cols; c++) {
    const empty = isEmptyCol(c);

    if (!empty && !inBlock) {
      inBlock = true;
      blockStart = c;
    }

    if (empty && inBlock) {
      ranges.push({ start: blockStart, end: c - 1 });
      inBlock = false;
    }
  }

  if (inBlock) {
    ranges.push({ start: blockStart, end: cols - 1 });
  }

  return ranges;
}

const parseProblemCephalopod = (grid, start, end) => {
  const height = grid.length;

  const opRaw = grid[height - 1].slice(start, end + 1).replace(/\s+/g, "");
  if (opRaw !== "+" && opRaw !== "*") {
    throw new Error(`Invalid operator: "${opRaw}"`);
  }
  const op = opRaw;

  const numbers = [];

  for (let c = end; c >= start; c--) {
    let digits = "";

    for (let r = 0; r < height - 1; r++) {
      const ch = grid[r][c];
      if (ch >= "0" && ch <= "9") {
        digits += ch;
      }
    }

    if (digits.length > 0) {
      numbers.push(BigInt(digits));
    }
  }

  return { op, numbers };
}

const evaluateProblemBigInt = ({ op, numbers }) =>  {
  if (numbers.length === 0) return 0n;

  if (op === "+") {
    return numbers.reduce((a, b) => a + b, 0n);
  } else {
    return numbers.reduce((a, b) => a * b, 1n);
  }
}

const day06part2 = () => {
  const raw = readInput("day06/input.txt");
  const rows = lines(raw);

  const maxLen = Math.max(...rows.map((r) => r.length));
  const grid = rows.map((r) => r.padEnd(maxLen, " "));

  const problemRanges = getProblemColumnRanges(grid);

  let grandTotal = 0n;

  for (const { start, end } of problemRanges) {
    const problem = parseProblemCephalopod(grid, start, end);
    const value = evaluateProblemBigInt(problem);
    grandTotal += value;
  }

  console.log("total:", grandTotal.toString());
}

day06part2();