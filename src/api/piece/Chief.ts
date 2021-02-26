import { Piece } from './Piece'

export class Chief extends Piece {
  public get canEnterMaze(): boolean {
    return true
  }

  // TODO: Can be used by player?
}
