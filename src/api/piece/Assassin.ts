import { Piece } from './Piece'

export class Assassin extends Piece {
  public penalizedTurns: number = 0

  public get type(): string {
    return 'Assassin'
  }

  public get shouldHighlight(): boolean {
    return !this.isPenalized && super.shouldHighlight
  }

  public get isPenalized(): boolean {
    return this.penalizedTurns > 0
  }
}
