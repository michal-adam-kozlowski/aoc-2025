const { readInput, lines } = require("../utils");

const parseDatabase = (raw) => {
  const allLines = lines(raw);

  const rangeLines = [];
  const idLines = [];

  let nowInRanges = true;

  for (const line of allLines) {
    if (line === "") {
      nowInRanges = false;
      continue;
    }

    if (nowInRanges) {
      rangeLines.push(line);
    } else {
      idLines.push(line);
    }
  }

  const ranges = rangeLines.map((line) => {
    const [fromStr, toStr] = line.split("-");
    return {
      from: Number(fromStr),
      to: Number(toStr),
    };
  });

  const ids = idLines
    .filter((line) => line !== "")
    .map((line) => Number(line));

  return { ranges, ids };
}

const isFresh=(id, ranges) => {
  for (const { from, to } of ranges) {
    if (id >= from && id <= to) {
      return true;
    }
  }
  return false;
}

const day05part1 = () => {
  const raw = readInput("day05/input.txt");
  const { ranges, ids } = parseDatabase(raw);

  let freshLines = 0;
  const freshIdsSet = new Set();

  for (const id of ids) {
    if (Number.isNaN(id)) continue;

    if (isFresh(id, ranges)) {
      freshLines++;
      freshIdsSet.add(id);
    }
  }

  console.log("swieze id:", freshIdsSet.size);
}

day05part1();