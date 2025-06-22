const marsRover = (input: string): string => {
  const inputLines = input.split("\n");
  const robotStartDirection = inputLines[1].split(" ")[2];
  const robotActions = inputLines[2];
  let robotFinishDirection = robotStartDirection;
  if (robotActions === "R") {
    if (robotStartDirection === "N") robotFinishDirection = "E";
    else if (robotStartDirection === "E") robotFinishDirection = "S";
    else if (robotStartDirection === "S") robotFinishDirection = "W";
    else if (robotStartDirection === "W") robotFinishDirection = "N";
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