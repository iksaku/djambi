export type Coordinates = {
  x: number
  y: number
}

export const MazeCoordinates: Coordinates = {
  x: 5,
  y: 5,
} as const

export function isSameCoordinate(a: Coordinates, b: Coordinates): boolean {
  return a.x === b.x && a.y === b.y
}

export function ValidateCoordinates(coordinate: Coordinates): void {
  if (coordinate.x < 1 || coordinate.x > 9) {
    throw 'Invalid X coordinate'
  }

  if (coordinate.y < 1 || coordinate.y > 9) {
    throw 'Invalid Y coordinate'
  }
}
