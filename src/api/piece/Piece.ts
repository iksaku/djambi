import { Player, PlayerTextColors } from '@/api/player'
import board from '@/api/game/board'
import { Coordinates } from '@/api/coordinates'
import { turnHandler } from '@/api/game'

export abstract class Piece {
  private _isAlive: boolean = true

  public static pieceCount: number = 0
  public readonly id: number

  public constructor(
    public readonly owner: Player,
    public coordinates: Coordinates
  ) {
    this.id = ++Piece.pieceCount
  }

  public abstract get type(): string

  public get isAlive(): boolean {
    return this._isAlive
  }

  public set isAlive(value: boolean) {
    this._isAlive = value
  }

  public get color(): string {
    if (this.isCorpse) return 'text-black'

    if (this.temporalOwner?.isAlive)
      return PlayerTextColors[this.temporalOwner.id]

    return 'text-gray-500 opacity-50'
  }

  public get shouldHighlight(): boolean {
    return (
      this.isAlive &&
      (this.temporalOwner?.isAlive ?? false) &&
      turnHandler.isTurnOf(this.temporalOwner!)
    )
  }

  public get temporalOwner(): Player | undefined {
    if (!this.owner.isAlive) return board.powerPlayer

    return this.owner
  }

  public get isCorpse(): boolean {
    return !this.isAlive
  }

  public get canKillDirectly(): boolean {
    return true
  }

  public get canMovePiece(): boolean {
    return false
  }

  public get canMoveCorpse(): boolean {
    return false
  }

  public get canEnterMaze(): boolean {
    return !this.isAlive
  }

  public canBeUsedByPlayer(player: Player): boolean {
    // If dead, deny
    if (!this.isAlive) return false

    // Temporal Owner returns either the real Owner or the Power Player if real Owner is not alive.
    // If temporal owner is requesting, allow
    // Otherwise, deny
    return this.temporalOwner?.is(player) ?? false
  }
}
