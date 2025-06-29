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

abstract class MarsRover {
    x: number;
    y: number;
    rightEdge: number;
    upperEdge: number;
    direction: Direction;

    constructor(x: number, y: number, rightEdge: number, upperEdge: number, direction: Direction) {
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
    const [rightEdge, upperEdge] = inputLines[0].split(' ').map(Number);
    const [startX, startY] = inputLines[1].split(' ').map(Number);
    const robotStartDirection: Direction = toDirection(inputLines[1].split(" ")[2]);

    let marsRover = toMarsRover[robotStartDirection](startX, startY, rightEdge, upperEdge)

    const robotActions = inputLines[2].split('');
    for (const robotAction of robotActions) {
        if (robotAction === "R") {
            marsRover = marsRover.turnRight();
        } else if (robotAction === "L") {
            marsRover = marsRover.turnLeft()
        } else if (robotAction === "M") {
            marsRover = marsRover.move();
        } else {
            throw new Error(`Unrecognised action: ${robotAction}`)
        }
    }
    return marsRover.positionAsString();
};