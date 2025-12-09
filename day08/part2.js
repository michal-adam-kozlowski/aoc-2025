const { readInput, lines } = require("../utils");

class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA === rootB) return false;

    if (this.rank[rootA] < this.rank[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }
    this.parent[rootB] = rootA;
    if (this.rank[rootA] === this.rank[rootB]) {
      this.rank[rootA]++;
    }
    return true;
  }
}

function parsePoints(raw) {
  return lines(raw)
    .filter((line) => line !== "")
    .map((line) => {
      const [xStr, yStr, zStr] = line.split(",");
      return {
        x: Number(xStr),
        y: Number(yStr),
        z: Number(zStr),
      };
    });
}

function squaredDistanceBigInt(a, b) {
  const dx = BigInt(a.x) - BigInt(b.x);
  const dy = BigInt(a.y) - BigInt(b.y);
  const dz = BigInt(a.z) - BigInt(b.z);
  return dx * dx + dy * dy + dz * dz;
}

function day08part2() {
  const raw = readInput("day08/input.txt");
  const points = parsePoints(raw);
  const n = points.length;

  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = squaredDistanceBigInt(points[i], points[j]);
      edges.push({ i, j, dist });
    }
  }

  edges.sort((a, b) => {
    if (a.dist < b.dist) return -1;
    if (a.dist > b.dist) return 1;
    return 0;
  });

  const dsu = new DSU(n);
  let components = n;

  let lastX1 = null;
  let lastX2 = null;

  for (const { i, j } of edges) {
    const merged = dsu.union(i, j);
    if (!merged) continue;

    components--;

    if (components === 1) {
      lastX1 = points[i].x;
      lastX2 = points[j].x;
      break;
    }
  }

  if (lastX1 === null || lastX2 === null) {
    throw new Error("Nie udało się znaleźć połączenia, które scala wszystkie obwody.");
  }

  const product = lastX1 * lastX2;

  console.log("efekt =", result);
}

day08part2();