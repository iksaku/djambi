import { Piece } from './Piece'

export class Reporter extends Piece {
  public get canKillDirectly(): boolean {
    return false
  }
}
