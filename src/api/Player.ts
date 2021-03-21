import { Piece } from '@/api/piece'
import { board } from '@/api/board'
import { TurnHandler } from '@/api/TurnHandler'
import { PlayerId } from '@/api/helper'

export class Player {
  public isAlive: boolean = true

  public constructor(public readonly id: PlayerId) {}

  public get inTurn(): boolean {
    return (
      this.id === TurnHandler.current ||
      (TurnHandler.current === 'PowerPlayer' &&
        (board.powerPlayer?.is(this) ?? false))
    )
  }

  public is(player: Player): boolean {
    return player.id === this.id
  }

  public get pieces(): Piece[] {
    return Array.from(board.pieces.values()).filter((piece) =>
      piece.owner.is(this)
    )
  }
}
