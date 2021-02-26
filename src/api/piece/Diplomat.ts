import { Piece } from './Piece'

export class Diplomat extends Piece {
  public get canKillDirectly(): boolean {
    return false
  }

  public get canMovePiece(): boolean {
    return true
  }
}
