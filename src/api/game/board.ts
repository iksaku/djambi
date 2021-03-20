import { reactive } from 'vue'
import {
  Coordinates,
  isSameCoordinate,
  MazeCoordinates,
} from '@/api/coordinates'
import {
  Piece,
  Assassin,
  Chief,
  Diplomat,
  Militant,
  Necromobile,
  Reporter,
} from '@/api/piece'
import { Player, PlayerId, PlayerOrder } from '@/api/player'

class Board {
  public readonly pieces: Map<number, Piece>

  public constructor() {
    this.pieces = reactive(new Map())
  }

  public generate() {
    // Clear Piece List
    this.pieces.clear()

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
      const inUpperRegion =
        playerId === PlayerId.Green || playerId === PlayerId.Yellow
      const inLeftRegion =
        playerId === PlayerId.Green || playerId === PlayerId.Red

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

          let piece = new pieceType(new Player(playerId), { x, y })
          this.pieces.set(piece.id, piece)
        }
      }
    }
  }

  public getPieceAt(coordinates: Coordinates): Piece | undefined {
    for (let piece of this.pieces.values()) {
      if (isSameCoordinate(piece.coordinates, coordinates)) {
        return piece
      }
    }
  }

  public get playerInPower(): Player | undefined {
    return this.getPieceAt(MazeCoordinates)?.owner
  }

  public get hasPowerPlayer(): boolean {
    return this.playerInPower !== undefined
  }
}

const board = new Board()

export default board
