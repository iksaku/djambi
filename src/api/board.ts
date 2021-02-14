import { reactive } from 'vue'
import {
  Coordinates,
  MazeCoordinates,
  ValidateCoordinates,
} from '@/api/coordinates'
import { Piece, PieceType } from '@/api/piece'
import { Player } from '@/api/player'

type BoardMap = Map<number, Map<number, Piece | undefined>>

class Board {
  public readonly map: BoardMap

  constructor() {
    this.map = reactive<BoardMap>(new Map())
  }

  public generate() {
    this.map.clear()

    for (let y = 0; y < 9; ++y) {
      for (let x = 0; x < 9; ++x) {
        this.setPieceAt({ x, y })
      }
    }

    const pieceDistribution = [
      // First Row
      [PieceType.Chief, PieceType.Assassin, PieceType.Militant],
      // Second Row
      [PieceType.Reporter, PieceType.Diplomat, PieceType.Militant],
      // Third Row,
      [PieceType.Militant, PieceType.Militant, PieceType.Necromobile],
    ]

    for (let p of Object.values(Player)) {
      const inUpperRegion = p === Player.Green || p === Player.Yellow
      const inLeftRegion = p === Player.Green || p === Player.Red

      let xStart = inLeftRegion ? 0 : 8
      let yStart = inUpperRegion ? 0 : 8

      let xStep = inLeftRegion ? 1 : -1
      let yStep = inUpperRegion ? 1 : -1

      for (let y = yStart; y >= 0 && y < 9; y += yStep) {
        for (let x = xStart; x >= 0 && x < 9; x += xStep) {
          let row = Math.abs(y - yStart)
          let col = Math.abs(x - xStart)

          let pieceType = pieceDistribution[row]?.[col] ?? undefined

          if (!pieceType) continue

          this.setPieceAt({ x, y }, new Piece(p, pieceType))
        }
      }
    }
  }

  public getPieceAt(coordinates: Coordinates): Piece | undefined {
    ValidateCoordinates(coordinates)

    return this.map.get(coordinates.y)?.get(coordinates.x) ?? undefined
  }

  public setPieceAt(coordinates: Coordinates, piece?: Piece): void {
    ValidateCoordinates(coordinates)

    if (!this.map.get(coordinates.y)) {
      this.map.set(coordinates.y, new Map())
    }

    this.map.get(coordinates.y)?.set(coordinates.x, piece)
  }

  public removePieceFrom(coordinates: Coordinates): void {
    this.setPieceAt(coordinates, undefined)
  }

  public get playerInPower(): Player | undefined {
    return this.getPieceAt(MazeCoordinates)?.owner ?? undefined
  }
}

const board = new Board()

export default board
