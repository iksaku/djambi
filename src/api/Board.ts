import { reactive, ref } from 'vue'
import { Coordinates, Maze } from '@/api/Coordinates'
import {
  Assassin,
  Chief,
  Diplomat,
  Militant,
  Necromobile,
  Piece,
  Reporter,
} from '@/api/piece'
import { Player } from '@/api/Player'
import { PlayerId, PlayerOrder } from '@/api/Helper'
import { TurnHandler } from '@/api/TurnHandler'
import { ClickHandler } from '@/api/ClickHandler'

class Board {
  public readonly pieces: Map<number, Piece>
  public readonly players: Map<PlayerId, Player>
  public isRunning = ref(true)

  public constructor() {
    this.pieces = reactive(new Map())
    this.players = reactive(new Map())
  }

  public generate() {
    this.isRunning.value = true

    // Reset TurnHandler
    TurnHandler.reset()
    ClickHandler.reset()

    // Clear Piece List
    this.pieces.clear()
    this.players.clear()

    const pieceDistribution = [
      // First Row
      [Chief, Assassin, Militant],
      // Second Row
      [Reporter, Diplomat, Militant],
      // Third Row,
      [Militant, Militant, Necromobile],
    ]

    // Loop through the 4 available players
    for (let playerId of PlayerOrder) {
      const player = new Player(playerId)

      this.players.set(player.id, player)

      if (player.id === PlayerId.Yellow) {
        player.isAlive = false
      }

      const inUpperRegion =
        player.id === PlayerId.Green || player.id === PlayerId.Yellow
      const inLeftRegion =
        player.id === PlayerId.Green || player.id === PlayerId.Red

      let xStart = inLeftRegion ? 1 : 9
      let yStart = inUpperRegion ? 1 : 9

      let xStep = inLeftRegion ? 1 : -1
      let yStep = inUpperRegion ? 1 : -1

      for (let y = yStart; y >= 1 && y <= 9; y += yStep) {
        for (let x = xStart; x >= 1 && x <= 9; x += xStep) {
          let row = Math.abs(y - yStart)
          let col = Math.abs(x - xStart)

          let pieceType = pieceDistribution[row]?.[col] ?? undefined

          if (!pieceType) continue

          let piece = new pieceType(player, Coordinates.make(x, y))
          this.pieces.set(piece.id, piece)
        }
      }
    }
  }

  public getPieceAt(coordinates: Coordinates): Piece | undefined {
    for (let piece of this.pieces.values()) {
      if (piece.coordinates.is(coordinates)) {
        return piece
      }
    }
  }

  public hasPieceAt(coordinates: Coordinates): boolean {
    return this.getPieceAt(coordinates) !== undefined
  }

  public getPlayerById(id: PlayerId): Player {
    return this.players.get(id)!
  }

  public get getPowerPlayer(): Player | undefined {
    return this.getPieceAt(Maze)?.owner
  }

  public get hasPowerPlayer(): boolean {
    return this.getPowerPlayer !== undefined
  }
}

export const board = new Board()
