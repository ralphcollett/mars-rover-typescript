import {marsRover} from "../src/mars-rover";

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

test.each([
  ["N", "LR", "N"],
  ["E", "LLL", "S"],
  ["S", "RRRL", "N"],
])('can move rotate multiple times starting %s rotating %s ends %s', (startDir, rotations, endDir) => {
  expect(marsRover(
      `5 5\n` +
      `1 2 ${startDir}\n` +
      rotations
  )).toBe(`1 2 ${endDir}`);
});

test('throws error for unrecognised direction', () => {
  expect(() => marsRover(
      "5 5\n" +
      "1 2 X\n" +
      ""
  )).toThrow("Unrecognised direction: X");
});