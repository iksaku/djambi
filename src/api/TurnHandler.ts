import { Player } from '@/api/Player'
import { board } from '@/api/board'
import { ref } from 'vue'
import { ClickHandler } from '@/api/ClickHandler'
import { PlayerId, PlayerOrder } from '@/api/helper'

type TurnPlayer = PlayerId | 'PowerPlayer'

export const TurnOrder: Readonly<TurnPlayer[]> = [
  ...PlayerOrder,
  'PowerPlayer',
] as const

export class TurnHandler {
  private static turn = ref<TurnPlayer>(PlayerId.Green)

  public static get current(): TurnPlayer {
    return TurnHandler.turn.value
  }

  public static isTurnOf(player: Player): boolean {
    return (
      // If it's current player's ID turn, allow
      player.id === this.current ||
      // Otherwise, if player is the Power Player and its Power Player's turn, allow
      (this.current === 'PowerPlayer' &&
        (board.powerPlayer?.is(player) ?? false))
    )
  }

  public static nextTurn(): void {
    TurnHandler.onTurnEnd()

    // Thank God for ES6's Labeled Blocks...
    // This block will run independently, and will exit when hitting any `return` statement,
    // then, it'll continue executing the rest of the function.
    // In this case, it'll follow the next flow:
    //    onTurnEnd() -> `TurnHandle` Block -> onTurnStart()
    TurnHandle: {
      // TODO: Turn Skip dead players
      // TODO: End game when there's only one player alive

      let next: number = TurnOrder.indexOf(TurnHandler.turn.value) + 1

      if (!(next in TurnOrder)) {
        TurnHandler.turn.value = TurnOrder[0]
        break TurnHandle
      }

      let nextPlayer = TurnOrder[next]

      if (nextPlayer === 'PowerPlayer' && !board.hasPowerPlayer) {
        nextPlayer = TurnOrder[0]
      }

      TurnHandler.turn.value = nextPlayer
    }

    TurnHandler.onTurnStart()
  }

  private static onTurnStart(): void {
    ClickHandler.reset()
  }

  private static onTurnEnd(): void {}
}
