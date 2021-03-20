import { PlayerId, PlayerOrder } from '@/api/player'
import board from '@/api/game/board'
import { Ref, ref } from 'vue'

type TurnPlayer = PlayerId | 'Power'

export const TurnOrder: Readonly<TurnPlayer[]> = [
  ...PlayerOrder,
  'Power',
] as const

class TurnHandler {
  private turn: Ref<TurnPlayer>

  public constructor() {
    this.turn = ref<TurnPlayer>(PlayerId.Green)
  }

  public get current(): TurnPlayer {
    return this.turn.value
  }

  public nextTurn() {
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

      if (nextPlayer === 'Power' && !board.hasPowerPlayer) {
        nextPlayer = TurnOrder[0]
      }

      this.turn.value = nextPlayer
    }

    this.onTurnStart()
  }

  private onTurnStart(): void {
    // TODO
  }

  private onTurnEnd(): void {
    // TODO
  }
}

const turnHandler = new TurnHandler()

export default turnHandler
