import { Piece } from './Piece'

export class Necromobile extends Piece {
  public get canKillDirectly(): boolean {
    return false
  }

  public get canMoveCorpse(): boolean {
    return true
  }
}
