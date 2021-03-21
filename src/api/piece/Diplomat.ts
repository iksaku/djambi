import { Piece } from './Piece'

export class Diplomat extends Piece {
  public get type(): string {
    return 'Diplomat'
  }

  public get canKillPiece(): boolean {
    return false
  }
}
