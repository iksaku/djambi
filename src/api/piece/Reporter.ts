import { Piece } from './Piece'

export class Reporter extends Piece {
  public get type(): string {
    return 'Reporter'
  }

  public get canKillDirectly(): boolean {
    return false
  }
}
