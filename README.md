# Mars Rover Technical Challenge

## Problem Description

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.  
This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position is represented by a combination of an `x` and `y` coordinate and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation.  
An example position might be `0 0 N`, which means the rover is in the bottom left corner and facing North.

NASA sends a simple string of letters to control a rover. The possible letters are:

- `L`: Spin 90 degrees left
- `R`: Spin 90 degrees right
- `M`: Move forward one grid point, maintaining the same heading

Assume that the square directly North from `(x, y)` is `(x, y+1)`.

## Input

- The first line of input is the upper-right coordinates of the plateau. The lower-left coordinates are assumed to be `0 0`.
- The rest of the input is information pertaining to the rovers that have been deployed.  
  Each rover has two lines of input:
  1. The rover's position: two integers and a letter separated by spaces (e.g., `1 2 N`)
  2. A series of instructions (e.g., `LMLMLMLMM`)

Each rover will be finished sequentially; the second rover won't start to move until the first one has finished moving.

## Output

The output for each rover should be its final coordinates and heading.

## Example

**Test Input:**

```
5 5

1 2 N

LMLMLMLMM

3 3 E

MMRMMRMRRM
```

**Expected Output:**

```
1 3 N

5 1 E
```

## Notes

- You are free to implement any mechanism for feeding input into your solution (e.g., hardcoded data within a unit test).
- Provide sufficient evidence that your solution is complete by, at a minimum, indicating that it works correctly against the supplied test data.
- We highly recommend using a unit testing framework such as JUnit or NUnit. Even if you have not used it before, it is simple to learn and incredibly useful.
- The code you write should be of production quality, and most importantly, it should be code you are proud of.