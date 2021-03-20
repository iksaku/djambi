import { Player, PlayerId, PlayerOrder } from '@/api/player'
import board from '@/api/game/board'
import { Ref, ref } from 'vue'

type TurnPlayer = PlayerId | 'PowerPlayer'

export const TurnOrder: Readonly<TurnPlayer[]> = [
  ...PlayerOrder,
  'PowerPlayer',
] as const

class TurnHandler {
  private turn: Ref<TurnPlayer>

  public constructor() {
    this.turn = ref<TurnPlayer>(PlayerId.Green)
  }

  public get current(): TurnPlayer {
    return this.turn.value
  }

  public isTurnOf(player: Player): boolean {
    return (
      // If it's current player's ID turn, allow
      player.id === this.current ||
      // Otherwise, if player is the Power Player and its Power Player's turn, allow
      (this.current === 'PowerPlayer' &&
        (board.powerPlayer?.is(player) ?? false))
    )
  }

  public nextTurn(): void {
    this.onTurnEnd()

    // Thank God for ES6's Labeled Blocks...
    // This block will run independently, and will exit when hitting any `return` statement,
    // then, it'll continue executing the rest of the function.
    // In this case, it'll follow the next flow:
    //    onTurnEnd() -> `TurnHandle` Block -> onTurnStart()
    TurnHandle: {
      let next: number = TurnOrder.indexOf(this.turn.value) + 1

      if (!(next in TurnOrder)) {
        this.turn.value = TurnOrder[0]
        break TurnHandle
      }

      let nextPlayer = TurnOrder[next]

      if (nextPlayer === 'PowerPlayer' && !board.hasPowerPlayer) {
        nextPlayer = TurnOrder[0]
      }

      this.turn.value = nextPlayer
    }

    this.onTurnStart()
  }

  private onTurnStart(): void {
    // TODO
    console.log(`Starting Turn for '${this.current}' Player`)
  }

  private onTurnEnd(): void {
    // TODO
    console.log(`Ending Turn for '${this.current}' Player`)
  }
}

const turnHandler = new TurnHandler()

export default turnHandler
