import { Player } from '@/api/Player'
import { board } from '@/api/board'
import { Coordinates } from '@/api/coordinates'
import { ClickHandler } from '../ClickHandler'
import { PlayerTextColors } from '@/api/helper'

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
      // Don't highlight if corpse
      this.isAlive &&
      // Don't highlight if there's a selected piece other than this
      // If there's no piece selected in ClickHandler, then continue with this
      (ClickHandler.selectedPiece?.is(this) ?? true) &&
      // Highlight if Real or Temporal Owner's turn
      (this.temporalOwner?.isAlive ?? false) &&
      (this.temporalOwner?.inTurn ?? false)
    )
  }

  public is(piece: Piece): boolean {
    return this.id === piece.id
  }

  public get temporalOwner(): Player | undefined {
    if (!this.owner.isAlive) return board.powerPlayer

    return this.owner
  }

  public get isCorpse(): boolean {
    return !this.isAlive
  }

  public get maxMovementDistance(): number {
    return Infinity
  }

  public get canInteractWithAlivePiece(): boolean {
    return true
  }

  public get canKillPiece(): boolean {
    return true
  }

  public get canMoveAlivePiece(): boolean {
    return false
  }

  public get canInteractWithCorpse(): boolean {
    return false
  }

  public get canEnterMaze(): boolean {
    return !this.isAlive
  }
}
