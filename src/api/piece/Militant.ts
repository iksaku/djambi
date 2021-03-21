import { Piece } from './Piece'

export class Militant extends Piece {
  public get type(): string {
    return 'Militant'
  }

  public get maxMovementDistance(): number {
    return 2
  }
}
