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
    if (rootA === rootB) return;

    if (this.rank[rootA] < this.rank[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;

    if (this.rank[rootA] === this.rank[rootB]) {
      this.rank[rootA]++;
    }
  }
}

const parsePoints = (raw) =>
  lines(raw)
    .filter(line => line !== "")
    .map(line => {
      const [xStr, yStr, zStr] = line.split(",");
      return {
        x: Number(xStr),
        y: Number(yStr),
        z: Number(zStr),
      };
    });

const squaredDistanceBigInt = (a, b) => {
  const dx = BigInt(a.x) - BigInt(b.x);
  const dy = BigInt(a.y) - BigInt(b.y);
  const dz = BigInt(a.z) - BigInt(b.z);
  return dx * dx + dy * dy + dz * dz;
};

export function day08part1() {
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

  edges.sort((a, b) => (a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0));

  const dsu = new DSU(n);
  const K = 1000;
  const limit = Math.min(K, edges.length);

  for (let idx = 0; idx < limit; idx++) {
    const { i, j } = edges[idx];
    dsu.union(i, j);
  }

  const componentSize = new Map();
  for (let i = 0; i < n; i++) {
    const root = dsu.find(i);
    componentSize.set(root, (componentSize.get(root) || 0) + 1);
  }

  const sizes = [...componentSize.values()].sort((a, b) => b - a);

  if (sizes.length < 3) {
    throw new Error("Less than 3 circuits — puzzle expects at least 3.");
  }

  const [a, b, c] = sizes;
  const result = a * b * c;

  console.log("efekt =", result);
}

day08part1();