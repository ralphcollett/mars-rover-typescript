type Direction = "N" | "E" | "S" | "W";

const toDirection = (input: string): Direction => {
  if (input === "N" || input === "E" || input === "S" || input === "W") {
    return input;
  }
  throw new Error(`Unrecognised direction: ${input}`);
};

const marsRover = (input: string): string => {
  const inputLines = input.split("\n");
  const robotStartDirection: Direction = toDirection(inputLines[1].split(" ")[2]);
  const robotActions = inputLines[2];
  let robotFinishDirection: Direction = robotStartDirection;
  if (robotActions === "R") {
    if (robotStartDirection === "N") robotFinishDirection = "E";
    else if (robotStartDirection === "E") robotFinishDirection = "S";
    else if (robotStartDirection === "S") robotFinishDirection = "W";
    else if (robotStartDirection === "W") robotFinishDirection = "N";
  }
  if (robotActions === "L") {
    if (robotStartDirection === "N") robotFinishDirection = "W";
    else if (robotStartDirection === "E") robotFinishDirection = "N";
    else if (robotStartDirection === "S") robotFinishDirection = "E";
    else if (robotStartDirection === "W") robotFinishDirection = "S";
  }

  return `1 2 ${robotFinishDirection}`;
};

test('no actions means robot stays in starting position', () => {
  expect(marsRover(
      "5 5\n" +
      "1 2 N\n" +
      ""
  )).toBe("1 2 N");
});

test.each([
  ["N", "E"],
  ["E", "S"],
  ["S", "W"],
  ["W", "N"],
])('can move right from %s to %s', (startDir, endDir) => {
  expect(marsRover(
      "5 5\n" +
      `1 2 ${startDir}\n` +
      "R"
  )).toBe(`1 2 ${endDir}`);
});

test.each([
  ["N", "W"],
  ["E", "N"],
  ["S", "E"],
  ["W", "S"],
])('can move left from %s to %s', (startDir, endDir) => {
  expect(marsRover(
      "5 5\n" +
      `1 2 ${startDir}\n` +
      "L"
  )).toBe(`1 2 ${endDir}`);
});

test('throws error for unrecognised direction', () => {
  expect(() => marsRover(
      "5 5\n" +
      "1 2 X\n" +
      ""
  )).toThrow("Unrecognised direction: X");
});