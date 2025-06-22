const toDirection = (input: string): Direction => {
  if (Object.values(Direction).includes(input as Direction)) {
    return input as Direction;
  }
  throw new Error(`Unrecognised direction: ${input}`);
};

enum Direction {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

const rightOf: Record<Direction, Direction> = {
  [Direction.N]: Direction.E,
  [Direction.E]: Direction.S,
  [Direction.S]: Direction.W,
  [Direction.W]: Direction.N,
};

const leftOf: Record<Direction, Direction> = {
  [Direction.N]: Direction.W,
  [Direction.E]: Direction.N,
  [Direction.S]: Direction.E,
  [Direction.W]: Direction.S,
};

const marsRover = (input: string): string => {
  const inputLines = input.split("\n");
  const robotStartDirection: Direction = toDirection(inputLines[1].split(" ")[2]);
  const robotActions = inputLines[2];
  let robotFinishDirection: Direction = robotStartDirection;
  if (robotActions === "R") {
    robotFinishDirection = rightOf[robotStartDirection];
  }
  if (robotActions === "L") {
    robotFinishDirection = leftOf[robotStartDirection];
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