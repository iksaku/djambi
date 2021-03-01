import { Player, PlayerTextColors } from '@/api/player'
import board from '@/api/board'
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

  public get type(): string {
    return this.constructor.name
  }

  public get color(): string {
    return PlayerTextColors[this.owner]
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
    return (
      (this.isAlive && player === this.owner) ||
      (this.isCorpse && player === board.playerInPower)
    )
  }
}
