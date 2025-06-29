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

const move: Record<Direction, (x: number, y: number) => [number, number]> = {
    [Direction.N]: (x, y) => [x, y + 1],
    [Direction.E]: (x, y) => [x + 1, y],
    [Direction.S]: (x, y) => [x, y - 1],
    [Direction.W]: (x, y) => [x - 1, y],
};

export const marsRover = (input: string): string => {
    const inputLines = input.split("\n");
    const [rightEdge, upperEdge] = inputLines[1].split(' ').map(Number);
    const [startX, startY] = inputLines[1].split(' ').map(Number);
    const robotStartDirection: Direction = toDirection(inputLines[1].split(" ")[2]);
    const robotActions = inputLines[2].split('');
    let robotDirection: Direction = robotStartDirection;
    let x = startX;
    let y = startY;
    for (const robotAction of robotActions) {
        if (robotAction === "R") {
            robotDirection = rightOf[robotDirection];
        } else if (robotAction === "L") {
            robotDirection = leftOf[robotDirection];
        } else if (robotAction === "M") {
            [x, y] = move[robotDirection](x, y)
        } else {
            throw new Error(`Unrecognised action: ${robotAction}`)
        }
        if (x < 0 || x > rightEdge || y < 0 || y > upperEdge) {
            throw new Error(`At edge of the grid cannot move ${robotDirection}`)
        }
    }
    return `${x} ${y} ${robotDirection}`;
};