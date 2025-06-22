const marsRover = (input: string): string => {
  const inputLines = input.split("\n");
  const robotActions = inputLines[2];
  if (robotActions === "R") return "1 2 E"
  return "1 2 N";
};

test('no actions means robot stays in starting position', () => {
  expect(marsRover(
      "5 5\n" +
      "1 2 N\n" +
      ""
  )).toBe("1 2 N");
});


test('can move right', () => {
  expect(marsRover(
      "5 5\n" +
      "1 2 N\n" +
      "R"
  )).toBe("1 2 E");
})