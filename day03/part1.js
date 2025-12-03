const { readInput, lines } = require("../utils");

const maxJoltageFromBank = (line) => {
  const digits = line.trim().split("").map((c) => parseInt(c, 10));
  const n = digits.length;

  let best = -1;        
  let bestSuffix = -1; 

  for (let i = n - 1; i >= 0; i--) {
    const d = digits[i];


    if (bestSuffix !== -1) {
      const candidate = 10 * d + bestSuffix;
      if (candidate > best) {
        best = candidate;
      }
    }

    if (d > bestSuffix) {
      bestSuffix = d;
    }
  }

  return best;
};

const day03part1 = () => {
  const raw = readInput("day03/input.txt"); 
  const banks = lines(raw).filter(Boolean); 

  let total = 0;

  for (const bank of banks) {
    const maxJolt = maxJoltageFromBank(bank);
    total += maxJolt;
  }

  console.log("total:", total);
};

day03part1();