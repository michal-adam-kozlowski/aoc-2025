const { readInput, lines } = require("../utils");

const parseRedTiles = (raw) => {
  return lines(raw)
    .filter((line) => line !== "")
    .map((line) => {
      const [xStr, yStr] = line.split(",");
      return {
        x: Number(xStr),
        y: Number(yStr),
      };
    });
}

const buildEdges = (points) => {
  const edges = [];
  const n = points.length;

  for (let i = 0; i < n; i++) {
    const a = points[i];
    const b = points[(i + 1) % n]; 

    const x1 = a.x;
    const y1 = a.y;
    const x2 = b.x;
    const y2 = b.y;

    if (x1 === x2) {
      const sy1 = Math.min(y1, y2);
      const sy2 = Math.max(y1, y2);
      edges.push({
        type: "V",
        x: x1,
        y1: sy1,
        y2: sy2,
      });
    } else if (y1 === y2) {
      // poziom
      const sx1 = Math.min(x1, x2);
      const sx2 = Math.max(x1, x2);
      edges.push({
        type: "H",
        y: y1,
        x1: sx1,
        x2: sx2,
      });
    } else {
      throw new Error(
        `Two consecutive red tiles are not aligned: (${x1},${y1}) -> (${x2},${y2})`
      );
    }
  }

  return edges;
}

const day09part2 = () =>  {
  const raw = readInput("day09/input.txt");
  const reds = parseRedTiles(raw);
  const n = reds.length;

  console.log("Red tiles:", n);

  const edges = buildEdges(reds);
  console.log("Polygon edges:", edges.length);

  let maxArea = 0n;

  function rectangleIsValid(xL, xR, yT, yB) {
    if (xL === xR && yT === yB) return false;

    for (const e of edges) {
      if (e.type === "H") {
        const Y = e.y;
        if (Y <= yT || Y >= yB) continue;

        const sx1 = e.x1;
        const sx2 = e.x2;

        const left = Math.max(sx1, xL);
        const right = Math.min(sx2, xR);

        if (left < right) {
          return false;
        }
      } else {
        const X = e.x;
        if (X <= xL || X >= xR) continue;

        const sy1 = e.y1;
        const sy2 = e.y2;

        const top = Math.max(sy1, yT);
        const bottom = Math.min(sy2, yB);

        if (top < bottom) {
          return false;
        }
      }
    }

    return true;
  }

  for (let i = 0; i < n; i++) {
    const a = reds[i];
    for (let j = i + 1; j < n; j++) {
      const b = reds[j];

      const xL = Math.min(a.x, b.x);
      const xR = Math.max(a.x, b.x);
      const yT = Math.min(a.y, b.y);
      const yB = Math.max(a.y, b.y);

      const width = BigInt(xR - xL + 1);
      const height = BigInt(yB - yT + 1);
      const area = width * height;

      if (area <= maxArea) continue;

      if (!rectangleIsValid(xL, xR, yT, yB)) continue;

      maxArea = area;
    }
  }

  console.log(
    "powierzchnia =",
    maxArea.toString()
  );
}

day09part2();