import { Piece } from './Piece'

export class Reporter extends Piece {
  public get type(): string {
    return 'Reporter'
  }

  public get canInteractWithAlivePiece(): boolean {
    return false
  }

  public get canKillPiece(): boolean {
    return false
  }
}
