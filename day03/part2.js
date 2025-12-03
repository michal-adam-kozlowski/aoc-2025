const { readInput, lines } = require("../utils");

const maxJoltageFromBankLenK = (line, k) => {
  const digits = line.trim().split("").map((c) => parseInt(c, 10));
  const n = digits.length;

  if (k > n) {
    throw new Error(`${n}, ${k}`);
  }

  let toRemove = n - k;
  const stack = [];

  for (const d of digits) {
    while (
      toRemove > 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] < d
    ) {
      stack.pop();
      toRemove--;
    }
    stack.push(d);
  }

  const chosen = stack.slice(0, k);

  const numStr = chosen.join("");
  return BigInt(numStr);
};

const day03part2 = () => {
  const raw = readInput("day03/input.txt");
  const banks = lines(raw).filter(Boolean);

  const K = 12;
  let total = 0n;

  for (const bank of banks) {
    const maxJolt = maxJoltageFromBankLenK(bank, K);
    total += maxJolt;
  }

  console.log("total:", total.toString());
};

day03part2();