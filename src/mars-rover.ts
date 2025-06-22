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

export const marsRover = (input: string): string => {
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