const { readInput, lines } = require("../utils");

const day01part2 = () => {
  let dialPosition = 50;
  const setDialPostion = (value) => (dialPosition = value);
  let zeroCounter = 0;
  const setZeroCounter = (value) => (zeroCounter = value);

  const dialMin = 0;
  const dialMax = 99;
  const dialSize = dialMax - dialMin + 1;

  const splitCode = (data) => {
    const direction = data[0].toUpperCase();
    const value = parseInt(data.slice(1), 10);

    return { direction, value };
  };

  const wrapDial = (value) => {
    return ((((value - dialMin) % dialSize) + dialSize) % dialSize) + dialMin;
  };

  const countZerosDuringRotation = (direction, distance, startPos) => {
    const N = dialSize;
    const d = direction === "R" ? 1 : -1;

    let k0 = (((-d * startPos) % N) + N) % N;

    if (k0 === 0) {
      k0 = N;
    }

    if (k0 > distance) {
      return 0;
    }

    return 1 + Math.floor((distance - k0) / N);
  };

  const move = (data) => {
    const { direction, value } = splitCode(data);

    const zerosThisMove = countZerosDuringRotation(
      direction,
      value,
      dialPosition
    );
    setZeroCounter(zeroCounter + zerosThisMove);

    let newDialPosition;
    if (direction === "R") {
      newDialPosition = wrapDial(dialPosition + value);
    } else if (direction === "L") {
      newDialPosition = wrapDial(dialPosition - value);
    } else {
      return;
    }

    setDialPostion(newDialPosition);
  };

  const rawData = readInput("day01/input.txt");
  const arrData = lines(rawData);

  arrData.forEach((instruction) => move(instruction));

  console.log(zeroCounter);
};

day01part2();
