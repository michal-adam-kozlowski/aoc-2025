const { readInput, lines } = require("../utils");

const NEIGHBOR_DIRECTIONS = [
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [ 0, -1],
  [ 0,  1],
  [ 1, -1],
  [ 1,  0],
  [ 1,  1],
];

const parseGrid = (rawInput) => {
  return lines(rawInput).map((line) => line.split(""));
}


const isInsideGrid =(grid, row, col) =>{
  const rowCount = grid.length;
  const colCount = grid[0].length;
  return row >= 0 && row < rowCount && col >= 0 && col < colCount;
}

const countNeighborRolls = (grid, row, col) => {
  let neighborCount = 0;

  for (const [dRow, dCol] of NEIGHBOR_DIRECTIONS) {
    const nr = row + dRow;
    const nc = col + dCol;

    if (isInsideGrid(grid, nr, nc) && grid[nr][nc] === "@") {
      neighborCount++;
    }
  }

  return neighborCount;
}

const isRollAccessible=(grid, row, col) => {
  if (grid[row][col] !== "@") {
    return false;
  }

  const neighbors = countNeighborRolls(grid, row, col);
  return neighbors < 4;
}

const countAccessibleRolls = (grid) => {
  let accessibleCount = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (isRollAccessible(grid, row, col)) {
        accessibleCount++;
      }
    }
  }

  return accessibleCount;
}

const removeAccessibleRollsOnce = (grid) => {
  const rollsToRemove = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (isRollAccessible(grid, row, col)) {
        rollsToRemove.push([row, col]);
      }
    }
  }

  if (rollsToRemove.length === 0) {
    return 0;
  }

  for (const [row, col] of rollsToRemove) {
    if (grid[row][col] === "@") {
      grid[row][col] = "."; // rolka zniknęła
    }
  }

  return rollsToRemove.length;
}

const removeAccessibleRollsUntilStable = (grid) => {
  let totalRemoved = 0;

  while (true) {
    const removedThisRound = removeAccessibleRollsOnce(grid);
    if (removedThisRound === 0) {
      break; 
    }
    totalRemoved += removedThisRound;
  }

  return totalRemoved;
}


const day04part2 = () => {
  const rawInput = readInput("day04/input.txt");
  const grid = parseGrid(rawInput); 

  const totalRemoved = removeAccessibleRollsUntilStable(grid);
  console.log("usunięte rolki:", totalRemoved);
}

day04part2();