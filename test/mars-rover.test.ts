import {marsRover} from "../src/mars-rover";

test('Multiple Mars Rovers Acceptance Test', () => {
    expect(marsRover(
        "5 5\n" +
        "1 2 N\n" +
        "LMLMLMLMM\n" +
        "3 3 E\n" +
        "MMRMMRMRRM"
    )).toBe(
        "1 3 N\n" +
        "5 1 E"
    );
});

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
])('can move right from %s to %s', (startDirection, endDir) => {
  expect(marsRover(
      "5 5\n" +
      `1 2 ${startDirection}\n` +
      "R"
  )).toBe(`1 2 ${endDir}`);
});

test.each([
  ["N", "W"],
  ["E", "N"],
  ["S", "E"],
  ["W", "S"],
])('can move left from %s to %s', (startDirection, endDirection) => {
  expect(marsRover(
      "5 5\n" +
      `1 2 ${startDirection}\n` +
      "L"
  )).toBe(`1 2 ${endDirection}`);
});

test.each([
  ["N", "LR", "N"],
  ["E", "LLL", "S"],
  ["S", "RRRL", "N"],
])('can move rotate multiple times starting %s rotating %s ends %s', (startDir, rotations, endDirection) => {
  expect(marsRover(
      `5 5\n` +
      `1 2 ${startDir}\n` +
      rotations
  )).toBe(`1 2 ${endDirection}`);
});

test.each([
    ["N", "2 3"],
    ["E", "3 2"],
    ["S", "2 1"],
    ["W", "1 2"]
])('can move forward when facing %s', (direction, endCoordinates) => {
    expect(marsRover(
        "5 5\n" +
        `2 2 ${direction}\n` +
        "M"
    )).toBe(`${endCoordinates} ${direction}`);
});

test('throws error for unrecognised direction', () => {
  expect(() => marsRover(
      "5 5\n" +
      "1 2 X\n" +
      ""
  )).toThrow("Unrecognised direction: X");
});

test('throws error for unrecognised action', () => {
  expect(() => marsRover(
      "5 5\n" +
      "1 2 N\n" +
      "LLLX"
  )).toThrow("Unrecognised action: X");
});

test.each([
    ["N", "3 5"],
    ["E", "5 2"],
    ["S", "2 0"],
    ["W", "0 1"]
])('throws error when move out of Mars facing %s', (direction, startingCoordinates) => {
    expect(() => marsRover(
        "5 5\n" +
        `${startingCoordinates} ${direction}\n` +
        "M"
    )).toThrow(`At edge of the grid cannot move ${direction}`);
});

test('throws error if grid size line is missing', () => {
    expect(() => marsRover("")).toThrow("Missing grid size line");
});

test('throws error if position line is missing', () => {
    expect(() => marsRover("5 5")).toThrow("Missing direction from starting position");
});

test('throws error if direction is missing', () => {
    expect(() => marsRover("5 5\n1 2\nM")).toThrow("Unrecognised direction: undefined");
});

test('throws error if coordinates are not numbers', () => {
    expect(() => marsRover("5 5\nA B N\nM")).toThrow("Unrecognised direction: N");
});

test('throws error if action line is missing', () => {
    expect(() => marsRover("5 5\n1 2 N")).toThrow("Missing action line");
});