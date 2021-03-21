import { Piece } from '@/api/piece'
import { board } from '@/api/Board'
import { TurnHandler } from '@/api/TurnHandler'
import { PlayerId } from '@/api/Helper'

export class Player {
  public isAlive: boolean = true

  public constructor(public readonly id: PlayerId) {}

  public get name(): string {
    switch (this.id) {
      case PlayerId.Green:
        return 'Verde'
      case PlayerId.Yellow:
        return 'Amarillo'
      case PlayerId.Blue:
        return 'Azul'
      case PlayerId.Red:
        return 'Rojo'
    }
  }

  public get inTurn(): boolean {
    return (
      this.id === TurnHandler.current ||
      (TurnHandler.current === 'PowerPlayer' &&
        (board.getPowerPlayer?.is(this) ?? false))
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
