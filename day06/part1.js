const { readInput, lines } = require("../utils");

/**
 * Zwraca listę bloków kolumn odpowiadających poszczególnym problemom.
 * Każdy blok to obiekt { start, end } -> indeksy kolumn.
 */
function getProblemColumnRanges(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const isEmptyCol = (c) => grid.every((row) => row[c] === " ");

  const ranges = [];
  let inBlock = false;
  let blockStart = 0;

  for (let c = 0; c < cols; c++) {
    const empty = isEmptyCol(c);

    if (!empty && !inBlock) {
      // start nowego problemu
      inBlock = true;
      blockStart = c;
    }

    if (empty && inBlock) {
      // koniec problemu (kolumna przed pustą)
      ranges.push({ start: blockStart, end: c - 1 });
      inBlock = false;
    }
  }

  // jeśli problem się kończy na końcu inputu
  if (inBlock) {
    ranges.push({ start: blockStart, end: cols - 1 });
  }

  return ranges;
}

/**
 * Wyciąga liczby i operator z bloku kolumn [start..end].
 */
function parseProblem(grid, start, end) {
  const h = grid.length;

  // operator jest na ostatniej linii
  const op = grid[h - 1].slice(start, end + 1).replace(/\s+/g, "");

  if (op !== "+" && op !== "*") {
    throw new Error(`Invalid operator: "${op}"`);
  }

  // wszystkie wcześniejsze linie to liczby
  const numbers = [];

  for (let r = 0; r < h - 1; r++) {
    const raw = grid[r].slice(start, end + 1).replace(/\s+/g, "");
    if (raw.length > 0) {
      numbers.push(Number(raw));
    }
  }

  return { op, numbers };
}

/**
 * Oblicza wartość problemu.
 */
function evaluateProblem({ op, numbers }) {
  if (op === "+") {
    return numbers.reduce((a, b) => a + b, 0);
  } else {
    return numbers.reduce((a, b) => a * b, 1);
  }
}

function day06part1() {
  const raw = readInput("day06/input.txt");
  let rows = lines(raw);

  // upewniamy się, że wszystkie linie są tej samej długości
  const maxLen = Math.max(...rows.map((r) => r.length));
  const grid = rows.map((r) => r.padEnd(maxLen, " "));

  // znajdź zakresy kolumn problemów
  const problemRanges = getProblemColumnRanges(grid);

  // sparsuj każdy problem i oblicz wynik
  let grandTotal = 0;

  for (const { start, end } of problemRanges) {
    const problem = parseProblem(grid, start, end);
    const value = evaluateProblem(problem);
    grandTotal += value;
  }

  console.log("Day 6 Part 1 – Grand total:", grandTotal);
}

day06part1();