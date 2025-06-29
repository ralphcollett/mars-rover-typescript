const toDirection = (input: string): Direction => {
    if (Object.values(Direction).includes(input as Direction)) {
        return input as Direction;
    }
    throw new SyntaxError(`Unrecognised direction: ${input}`);
};

enum Direction {
    N = "N",
    E = "E",
    S = "S",
    W = "W",
}

abstract class MarsRover {
    x: number;
    y: number;
    rightEdge: number;
    upperEdge: number;
    direction: Direction;

    protected constructor(x: number, y: number, rightEdge: number, upperEdge: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.rightEdge = rightEdge;
        this.upperEdge = upperEdge;
        this.direction = direction;
    }

    abstract turnRight(): MarsRover;
    abstract turnLeft(): MarsRover;
    protected abstract unsafeMove(): MarsRover;

    move(): MarsRover {
        const unsafeMoved = this.unsafeMove();
        if (unsafeMoved.outsideGrid()) {
            throw new Error(`At edge of the grid cannot move ${this.direction}`)
        }
        return unsafeMoved;
    };

    private outsideGrid(): Boolean { return this.x < 0 || this.x > this.rightEdge || this.y < 0 || this.y > this.upperEdge }

    positionAsString() {
        return `${this.x} ${this.y} ${this.direction}`;
    }
}

class NorthFacingMarsRover extends MarsRover {

    constructor(x: number, y: number, rightEdge: number, upperEdge: number) {
        super(x, y, rightEdge, upperEdge, Direction.N);
    }

    unsafeMove(): MarsRover {
        return new NorthFacingMarsRover(this.x, this.y + 1, this.rightEdge, this.upperEdge);
    }

    turnLeft(): MarsRover {
        return new WestFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }

    turnRight(): MarsRover {
        return new EastFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }
}

class EastFacingMarsRover extends MarsRover {

    constructor(x: number, y: number, rightEdge: number, upperEdge: number) {
        super(x, y, rightEdge, upperEdge, Direction.E);
    }

    unsafeMove(): MarsRover {
        return new EastFacingMarsRover(this.x  + 1, this.y, this.rightEdge, this.upperEdge);
    }

    turnLeft(): MarsRover {
        return new NorthFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }

    turnRight(): MarsRover {
        return new SouthFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }
}

class SouthFacingMarsRover extends MarsRover {

    constructor(x: number, y: number, rightEdge: number, upperEdge: number) {
        super(x, y, rightEdge, upperEdge, Direction.S);
    }

    unsafeMove(): MarsRover {
        return new SouthFacingMarsRover(this.x, this.y - 1, this.rightEdge, this.upperEdge);
    }

    turnLeft(): MarsRover {
        return new EastFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }

    turnRight(): MarsRover {
        return new WestFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }
}

class WestFacingMarsRover extends MarsRover {

    constructor(x: number, y: number, rightEdge: number, upperEdge: number) {
        super(x, y, rightEdge, upperEdge, Direction.W);
    }

    unsafeMove(): MarsRover {
        return new WestFacingMarsRover(this.x - 1, this.y, this.rightEdge, this.upperEdge);
    }

    turnLeft(): MarsRover {
        return new SouthFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }

    turnRight(): MarsRover {
        return new NorthFacingMarsRover(this.x, this.y, this.rightEdge, this.upperEdge);
    }
}

const toMarsRover: Record<Direction, (x: number, y: number, rightEdge: number, upperEdge: number) => MarsRover> = {
    [Direction.N]: (x, y, rightEdge, upperEdge) => new NorthFacingMarsRover(x, y, rightEdge, upperEdge),
    [Direction.E]: (x, y, rightEdge, upperEdge) => new EastFacingMarsRover(x, y, rightEdge, upperEdge),
    [Direction.S]: (x, y, rightEdge, upperEdge) => new SouthFacingMarsRover(x, y, rightEdge, upperEdge),
    [Direction.W]: (x, y, rightEdge, upperEdge) => new WestFacingMarsRover(x, y, rightEdge, upperEdge),
};

export const marsRover = (input: string): string => {
    const inputLines = input.split("\n");
    const gridSizeLine = inputLines[0];
    if (!gridSizeLine || gridSizeLine.trim() === "") {
        throw new SyntaxError("Missing grid size line");
    }
    const [rightEdge, upperEdge] = gridSizeLine.split(' ').map(Number);

    const [, ...inputLinesWithoutEdges] = inputLines;
    if (inputLinesWithoutEdges.length === 0 || inputLinesWithoutEdges[0].trim() === "") {
        throw new SyntaxError("Missing direction from starting position");
    }
    let outputPositions: string[] = [];
    for (let i = 0; i < inputLinesWithoutEdges.length; i += 2) {
        const positionLine = inputLinesWithoutEdges[i];
        if (!positionLine || positionLine.trim() === "") {
            throw new SyntaxError("Missing direction from starting position");
        }
        const [x, y, direction] = positionLine.split(' ');
        if (direction === undefined) {
            throw new SyntaxError("Unrecognised direction: undefined");
        }
        if (isNaN(Number(x)) || isNaN(Number(y))) {
            throw new SyntaxError(`Unrecognised direction: ${direction}`);
        }
        const robotStartDirection: Direction = toDirection(direction);
        let marsRover = toMarsRover[robotStartDirection](Number(x), Number(y), rightEdge, upperEdge);
        const robotActionsLine = inputLinesWithoutEdges[i + 1];
        if (robotActionsLine === undefined) {
            throw new SyntaxError("Missing action line");
        }
        const robotActions = robotActionsLine.split('');
        for (const robotAction of robotActions) {
            if (robotAction === "R") {
                marsRover = marsRover.turnRight();
            } else if (robotAction === "L") {
                marsRover = marsRover.turnLeft();
            } else if (robotAction === "M") {
                marsRover = marsRover.move();
            } else if (robotAction !== "") {
                throw new SyntaxError(`Unrecognised action: ${robotAction}`);
            }
        }
        outputPositions.push(marsRover.positionAsString());
    }
    return outputPositions.join("\n");
};