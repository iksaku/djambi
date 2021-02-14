export type Coordinates = {
  x: number
  y: number
}

export function validateCoordinates(coordinate: Coordinates): void {
  if (coordinate.x < 0 || coordinate.x >= 9) {
    throw 'Invalid X coordinate'
  }

  if (coordinate.y < 0 || coordinate.y >= 9) {
    throw 'Invalid Y coordinate'
  }
}
