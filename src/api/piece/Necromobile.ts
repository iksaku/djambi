import { Piece } from './Piece'

export class Necromobile extends Piece {
  public get type(): string {
    return 'Necromobile'
  }

  public get canKillDirectly(): boolean {
    return false
  }

  public get canMoveCorpse(): boolean {
    return true
  }
}
