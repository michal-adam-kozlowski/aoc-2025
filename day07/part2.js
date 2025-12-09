const { readInput, lines } = require("../utils");

const loadGrid = () => {
  const raw = readInput("day07/input.txt");
  const rowStrings = lines(raw);
  return rowStrings.map((row) => row.split(""));
}

const findStart = (grid) => {
  for (let r = 0; r < grid.length; r++) {
    const c = grid[r].indexOf("S");
    if (c !== -1) {
      return { row: r, col: c };
    }
  }
  throw new Error("Could not find 'S' in the grid");
}

const countTimelines = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const { row: startRow, col: startCol } = findStart(grid);

  let dp = Array(cols).fill(0n);
  dp[startCol] = 1n;

  for (let r = startRow + 1; r < rows; r++) {
    const nextDp = Array(cols).fill(0n);

    for (let c = 0; c < cols; c++) {
      const count = dp[c];
      if (count === 0n) continue;

      const cell = grid[r][c];

      if (cell === "^") {
        const left = c - 1;
        const right = c + 1;

        if (left >= 0) {
          nextDp[left] += count;
        }
        if (right < cols) {
          nextDp[right] += count;
        }
      } else {
        nextDp[c] += count;
      }
    }

    dp = nextDp;
  }

  return dp.reduce((sum, v) => sum + v, 0n);
}

const  day07part2 = () => {
  const grid = loadGrid();
  const timelines = countTimelines(grid);
  console.log("efekt =", timelines.toString());
}

day07part2();