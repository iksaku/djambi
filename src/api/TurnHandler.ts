import { Player } from '@/api/Player'
import { board } from '@/api/Board'
import { ref } from 'vue'
import { ClickHandler } from '@/api/ClickHandler'
import { PlayerId, PlayerOrder } from '@/api/Helper'
import { Assassin, Piece } from './piece'

type TurnPlayer = PlayerId | 'PowerPlayer'

export const TurnOrder: Readonly<TurnPlayer[]> = [
  ...PlayerOrder,
  'PowerPlayer',
] as const

export class TurnHandler {
  private static turn = ref<TurnPlayer>(TurnOrder[0])

  public static get current(): TurnPlayer {
    return TurnHandler.turn.value
  }

  public static reset(): void {
    TurnHandler.turn.value = TurnOrder[0]
  }

  public static nextTurn(): void {
    TurnHandler.onTurnEnd()

    let next: TurnPlayer = TurnHandler.current

    while (true) {
      let nextIndex: number = TurnOrder.indexOf(next) + 1

      next = TurnOrder[nextIndex] ?? PlayerId.Green

      if (next === 'PowerPlayer' && !board.hasPowerPlayer) {
        // Skip to search for the next ID
        continue
      }

      let player: Player

      if (next === 'PowerPlayer' && board.hasPowerPlayer) {
        player = board.getPowerPlayer!
      }

      player ??= board.getPlayerById(next as PlayerId)

      if (player.isAlive) break
    }

    TurnHandler.turn.value = next

    TurnHandler.onTurnStart()
  }

  private static onTurnStart(): void {
    let player: Player

    if (TurnHandler.current === 'PowerPlayer' && board.hasPowerPlayer) {
      player = board.getPowerPlayer!
    }

    player ??= board.getPlayerById(TurnHandler.current as PlayerId)

    // Remove a Penalization on turn Loop
    let assassin: Assassin | undefined = Array.from(board.pieces.values()).find(
      (p: Piece) => p.owner.is(player) && p instanceof Assassin
    ) as Assassin

    if (assassin && assassin.penalizedTurns > 0) {
      --assassin.penalizedTurns

      console.log(assassin.penalizedTurns)
    }
  }

  private static onTurnEnd(): void {
    let alivePlayers = Array.from(board.players.values()).filter(
      (player: Player) => player.isAlive
    )

    if (alivePlayers.length <= 1) {
      board.isRunning.value = false

      if (alivePlayers.length < 1) {
        alert('Todos los jugadores han perdido. ¡Empate!')
      } else {
        alert(`¡El jugador ${alivePlayers[0].name} ha sido el ganador!`)
      }

      let startNewGame = confirm('¿Desea iniciar una nueva partida?')

      if (startNewGame) {
        board.generate()
      }
    }

    ClickHandler.reset()
  }
}
