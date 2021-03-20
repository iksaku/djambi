import { Player, PlayerTextColors } from '@/api/player'
import board from '@/api/game/board'
import { Coordinates, ValidateCoordinates } from '@/api/coordinates'

export abstract class Piece {
  public isAlive: boolean = true

  public static pieceCount: number = 0
  public readonly id: number

  // @ts-ignore
  private _coordinates: Coordinates

  public constructor(public readonly owner: Player, coordinates: Coordinates) {
    this.id = ++Piece.pieceCount
    this.setCoordinates(coordinates)
  }

  public abstract get type(): string

  public get color(): string {
    return PlayerTextColors[this.owner.id]
  }

  public get coordinates(): Readonly<Coordinates> {
    return this._coordinates
  }

  public setCoordinates(coordinates: Coordinates): void {
    ValidateCoordinates(coordinates)
    this._coordinates = coordinates
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

    // If owner is requesting, allow
    if (this.owner.isAlive && player.is(this.owner)) return true

    return (
      // If owner is alive, but not requesting, deny
      !this.owner.isAlive &&
      // If owner is not alive, and there's no power player, deny
      board.hasPowerPlayer &&
      // If owner is not alive, and power player is requesting, allow
      player.is(board.playerInPower!)
      // Otherwise, deny
    )
  }
}
