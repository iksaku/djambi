import { Piece } from './Piece'

export class Necromobile extends Piece {
  public get type(): string {
    return 'Necromobile'
  }

  public get canInteractWithAlivePiece(): boolean {
    return false
  }

  public get canInteractWithCorpse(): boolean {
    return true
  }
}
