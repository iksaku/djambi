import { Piece } from './Piece'

export class Chief extends Piece {
  public get type(): string {
    return 'Chief'
  }

  public get canEnterMaze(): boolean {
    return true
  }

  public get isAlive(): boolean {
    return this.owner.isAlive
  }

  public set isAlive(value: boolean) {
    this.owner.isAlive = false
  }
}
