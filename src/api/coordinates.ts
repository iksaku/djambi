export type PositionObject = {
  x: number
  y: number
}

export class Coordinates {
  protected constructor(public readonly x: number, public readonly y: number) {}

  public static from({ x, y }: PositionObject): Coordinates {
    return this.make(x, y)
  }

  public static make(x: number, y: number): Coordinates {
    this.validate(x, y)
    return new Coordinates(x, y)
  }

  protected static validate(x: number, y: number): void {
    if (x < 1 || x > 9) {
      throw 'Invalid X coordinate'
    }

    if (y < 1 || y > 9) {
      throw 'Invalid Y coordinate'
    }
  }

  public is(coordinate: Coordinates): boolean {
    return coordinate.x === this.x && coordinate.y === this.y
  }
}

export const Maze: Coordinates = Coordinates.make(5, 5)
