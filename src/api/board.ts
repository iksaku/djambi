import { reactive, ref, readonly } from 'vue'
import { Coordinates, validateCoordinates } from '@/api/coordinates'
import { Piece } from '@/api/piece'

export const isLoading = ref<boolean>(true)

const board = reactive<Map<number, Map<number, Piece | undefined>>>(new Map())

export function getBoard() {
  return readonly(board)
}

export function generateBoard(): void {
  board.clear()

  for (let y = 0; y < 9; ++y) {
    for (let x = 0; x < 9; ++x) {
      setPieceAt({ x, y }, `(${x},${y})`)
    }
  }
}

export function getPieceAt(coordinates: Coordinates): Piece | undefined {
  validateCoordinates(coordinates)

  return board.get(coordinates.y)?.get(coordinates.x) ?? undefined
}

export function setPieceAt(coordinates: Coordinates, piece?: Piece): void {
  validateCoordinates(coordinates)

  if (!board.get(coordinates.y)) {
    board.set(coordinates.y, new Map())
  }

  board.get(coordinates.y)?.set(coordinates.x, piece)
}
