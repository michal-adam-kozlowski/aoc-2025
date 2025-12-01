const { readInput, lines } = require("../utils");

const day01part2 = () => {
  let dialPosition = 50;
  const setDialPostion = (value) => (dialPosition = value);
  let zeroCounter = 0;
  const setZeroCounter = (value) => (zeroCounter = value);

  const dialMin = 0;
  const dialMax = 99;
  const dialSize = dialMax - dialMin + 1; // 100 pozycji

  const splitCode = (data) => {
    const direction = data[0].toUpperCase(); // na wszelki wypadek, gdyby było "r"/"l"
    const value = parseInt(data.slice(1), 10); // dystans

    return { direction, value };
  };

  const wrapDial = (value) => {
    // zawijanie w zakresie 0..99
    return ((((value - dialMin) % dialSize) + dialSize) % dialSize) + dialMin;
  };

  // liczy ile razy podczas tej rotacji dial wskoczy na 0
  const countZerosDuringRotation = (direction, distance, startPos) => {
    const N = dialSize;
    const d = direction === "R" ? 1 : -1;

    // Szukamy k z zakresu [1, distance], takich że:
    // (startPos + d * k) % N === 0
    //
    // Rozwiązanie daje:
    // k ≡ -d * startPos (mod N)

    let k0 = (((-d * startPos) % N) + N) % N; // w zakresie 0..N-1

    if (k0 === 0) {
      k0 = N; // pierwsze trafienie w 0 wypada po N krokach
    }

    if (k0 > distance) {
      return 0;
    }

    // k = k0, k0 + N, k0 + 2N, ...
    // ile takich k mieści się w [1, distance]?
    return 1 + Math.floor((distance - k0) / N);
  };

  const move = (data) => {
    const { direction, value } = splitCode(data);

    // ile razy podczas TEJ rotacji trafiamy w 0?
    const zerosThisMove = countZerosDuringRotation(
      direction,
      value,
      dialPosition
    );
    setZeroCounter(zeroCounter + zerosThisMove);

    // aktualizujemy pozycję końcową (jak w części 1)
    let newDialPosition;
    if (direction === "R") {
      newDialPosition = wrapDial(dialPosition + value);
    } else if (direction === "L") {
      newDialPosition = wrapDial(dialPosition - value);
    } else {
      return; // ignorujemy bzdurny kierunek
    }

    setDialPostion(newDialPosition);
  };

  const rawData = readInput("day01/input.txt");
  const arrData = lines(rawData);

  arrData.forEach((instruction) => move(instruction));

  console.log(zeroCounter);
};

day01part2();
