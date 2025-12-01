const { readInput, lines } = require("../utils");

const day01part1 = () => {
  let dialPosition = 50;
  const setDialPostion = (value) => (dialPosition = value);
  let zeroCounter = 0;
  const setZeroCounter = (value) => (zeroCounter = value);

  const dialMin = 0;
  const dialMax = 99;
  const dialSize = dialMax - dialMin + 1; // 100

  const splitCode = (data) => {
    const direction = data.slice(0, 1);
    const value = parseInt(data.slice(1), 10);

    return { direction, value };
  };

  const wrapDial = (value) => {
    return ((((value - dialMin) % dialSize) + dialSize) % dialSize) + dialMin;
  };

  const checkDialMax = (value) => wrapDial(value);
  const checkDialMin = (value) => wrapDial(value);

  const move = (data) => {
    const { direction, value } = splitCode(data);

    let newDialPosition;

    if (direction === "R") {
      newDialPosition = checkDialMax(dialPosition + value);
    } else if (direction === "L") {
      newDialPosition = checkDialMin(dialPosition - value);
    } else {
      return;
    }

    setDialPostion(newDialPosition);

    if (newDialPosition === 0) {
      setZeroCounter(zeroCounter + 1);
    }
  };

  const rawData = readInput("day01/input.txt");
  const arrData = lines(rawData);

  arrData.forEach((instruction) => move(instruction));

  console.log(zeroCounter);
};

day01part1();
