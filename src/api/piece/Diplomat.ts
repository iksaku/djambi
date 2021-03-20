import { Piece } from './Piece'

export class Diplomat extends Piece {
  public get type(): string {
    return 'Diplomat'
  }

  public get canKillDirectly(): boolean {
    return false
  }

  public get canMovePiece(): boolean {
    return true
  }
}
