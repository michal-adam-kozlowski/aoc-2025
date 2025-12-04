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


const day04part1 = () => {
  const rawInput = readInput("day04/input.txt");
  const grid = parseGrid(rawInput);

  const accessible = countAccessibleRolls(grid);
  console.log("dostepne rolki:", accessible);
}

day04part1();