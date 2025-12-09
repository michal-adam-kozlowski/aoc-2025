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

const countSplits = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const { row: startRow, col: startCol } = findStart(grid);

  let activeColumns = new Set([startCol]);
  let splitCount = 0;

  for (let r = startRow + 1; r < rows; r++) {
    const nextActive = new Set();

    for (const col of activeColumns) {
      if (col < 0 || col >= cols) {
        continue;
      }

      const cell = grid[r][col];

      if (cell === "^") {
        splitCount++;

        const leftCol = col - 1;
        const rightCol = col + 1;

        if (leftCol >= 0) {
          nextActive.add(leftCol);
        }
        if (rightCol < cols) {
          nextActive.add(rightCol);
        }
      } else {
        nextActive.add(col);
      }
    }

    activeColumns = nextActive;
    if (activeColumns.size === 0) {
      break;
    }
  }

  return splitCount;
}

function day07part1() {
  const grid = loadGrid();
  const splits = countSplits(grid);
  console.log("efekt = ", splits);
}

day07part1();