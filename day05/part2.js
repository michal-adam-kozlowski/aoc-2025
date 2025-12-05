const { readInput, lines } = require("../utils");

const parseRanges = (raw) => {
  const allLines = lines(raw); 

  const rangeLines = [];
  let inRangesSection = true;

  for (const line of allLines) {
    if (line === "") {
     
      inRangesSection = false;
      continue;
    }

    if (inRangesSection) {
      rangeLines.push(line);
    } else {
      break;
    }
  }

  const ranges = rangeLines.map((line) => {
    const [fromStr, toStr] = line.split("-");
    const from = Number(fromStr);
    const to = Number(toStr);

    if (!Number.isFinite(from) || !Number.isFinite(to)) {
      throw new Error(`Invalid range: "${line}"`);
    }

    return { from, to };
  });

  return ranges;
}

const mergeRanges = (ranges) => {
  if (ranges.length === 0) return [];

  const sorted = [...ranges].sort((a, b) => {
    if (a.from !== b.from) return a.from - b.from;
    return a.to - b.to;
  });

  const merged = [];
  let currentFrom = sorted[0].from;
  let currentTo = sorted[0].to;

  for (let i = 1; i < sorted.length; i++) {
    const { from, to } = sorted[i];

    if (from <= currentTo + 1) {
      if (to > currentTo) {
        currentTo = to;
      }
    } else {
 
      merged.push({ from: currentFrom, to: currentTo });
      currentFrom = from;
      currentTo = to;
    }
  }


  merged.push({ from: currentFrom, to: currentTo });

  return merged;
}

const countFreshIdsFromRanges = (ranges) => {
  const merged = mergeRanges(ranges);

  let total = 0n;

  merged.map(({from, to}) =>  {
    const length = BigInt(to - from + 1);
    total += length;
  })

  return total;
}

const day05part2 = () =>  {
  const raw = readInput("day05/input.txt");
  const ranges = parseRanges(raw);

  const totalFresh = countFreshIdsFromRanges(ranges);

  console.log("swieze id suma:", totalFresh.toString());
}

day05part2();