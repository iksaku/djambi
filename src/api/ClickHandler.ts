import { Coordinates, Maze } from '@/api/coordinates'
import { Piece } from '@/api/piece'
import { board } from '@/api/board'
import { ref } from 'vue'
import { TurnHandler } from '@/api/TurnHandler'

export class ClickHandler {
  private static queue = ClickHandler.handlePieceSelection
  private static _selectedPiece = ref<Piece | undefined>()
  public static highlightEmptySquares = ref<boolean>(false)

  public static get selectedPiece(): Piece | undefined {
    return ClickHandler._selectedPiece.value
  }

  public static reset() {
    ClickHandler.queue = ClickHandler.handlePieceSelection
    ClickHandler._selectedPiece.value = undefined
    ClickHandler.highlightEmptySquares.value = false
  }

  public static handle(coordinates: Coordinates) {
    ClickHandler.queue(coordinates)
  }

  private static handlePieceSelection(coordinates: Coordinates): void {
    const piece = board.pieceAt(coordinates)

    if (!piece || piece.isCorpse || !piece.temporalOwner?.inTurn) return

    ClickHandler.queue = ClickHandler.handlePieceMovement
    ClickHandler._selectedPiece.value = piece

    // TODO: Async Calculate possible moves
  }

  private static handlePieceMovement(targetCoordinates: Coordinates): void {
    // Verify Direction + Distance
    const piece = ClickHandler.selectedPiece

    // Unselect piece and restart turn handlers
    if (!piece || piece.coordinates.is(targetCoordinates)) {
      ClickHandler.reset()
      return
    }

    let targetPiece = board.pieceAt(targetCoordinates)

    if (
      piece.temporalOwner &&
      targetPiece?.temporalOwner?.is(piece.temporalOwner)
    ) {
      ClickHandler.handlePieceSelection(targetCoordinates)
      return
    }

    const deltaX = piece.coordinates.x - targetCoordinates.x
    const deltaY = piece.coordinates.y - targetCoordinates.y

    // Verify Direction
    if (
      piece.coordinates.x !== targetCoordinates.x &&
      piece.coordinates.y !== targetCoordinates.y &&
      Math.abs(deltaX) !== Math.abs(deltaY)
    ) {
      alert(
        'Movimiento Inválido.' +
          '\n\n* Solo puedes mover tu pieza en línea Vertical, Horizontal o Diagonal.'
      )
      return
    }

    // Verify Distance
    if (
      Math.abs(deltaX) > piece.maxMovementDistance ||
      Math.abs(deltaY) > piece.maxMovementDistance
    ) {
      alert(
        'Movimiento Inválido.' +
          `\n\n* Esta pieza solo puede moverse hasta ${piece.maxMovementDistance} espacios por turno.`
      )
      return
    }

    // We need to invert the stepping signs, so that we could move forward or backwards properly.
    const stepX = Math.sign(deltaX) * -1
    const stepY = Math.sign(deltaY) * -1

    for (
      let x = piece.coordinates.x + stepX, y = piece.coordinates.y + stepY;
      (x - targetCoordinates.x) * stepX <= 0 &&
      (y - targetCoordinates.y) * stepY <= 0;
      x += stepX, y += stepY
    ) {
      // Ray trace already reached the target position without finding other pieces
      if (x === targetCoordinates.x && y === targetCoordinates.y) break

      // There's a piece obstructing the path.
      if (board.hasPieceAt(Coordinates.from({ x, y }))) {
        alert(
          'Movimiento Inválido.' +
            '\n\n* Hay otra pieza obstruyendo el paso al lugar que deseas mover tu pieza.'
        )
        return
      }
    }

    // Both Direction and Distance is OK. Let's continue...

    if (!targetPiece) {
      // Moving to an open slot
      if (targetCoordinates.is(Maze) && !piece.canEnterMaze) {
        alert('Esta pieza no puede ser colocada en el laberinto.')
        return
      }

      // Move the piece
      piece.coordinates = targetCoordinates
      TurnHandler.nextTurn()
      return
    }

    // Handle Corpse interaction
    if (targetPiece.isCorpse && !piece.canInteractWithCorpse) {
      if (!piece.canInteractWithCorpse) {
        alert(
          'Movimiento Inválido.' +
            '\n\n* Esta pieza no puede interactuar con piezas muertas.'
        )
        return
      }

      alert('Por favor selecciona un lugar a donde deseas mover el cadáver.')

      ClickHandler.highlightEmptySquares.value = true
      ClickHandler.queue = ClickHandler.handleFreePieceRelocation
      return
    }

    // Handle Alive Piece Interaction
    if (!targetPiece.canInteractWithAlivePiece) {
      alert(
        'Movimiento Inválido.' +
          '\n\n* Esta pieza no puede interactuar con piezas vivas.'
      )
      return
    }

    // Handle Piece Killing
    if (targetPiece.canKillPiece) {
      targetPiece.isAlive = false
    }

    alert(
      'Por favor selecciona un lugar a donde deseas mover de la pieza que atacaste.'
    )

    ClickHandler._selectedPiece.value = targetPiece
    ClickHandler.highlightEmptySquares.value = true
    ClickHandler.queue = ClickHandler.handleFreePieceRelocation

    piece.coordinates = targetCoordinates

    if (ClickHandler.queue === ClickHandler.handlePieceMovement) {
      try {
        ClickHandler.verifyMazeIntegrity()
      } catch {
        ClickHandler.queue = ClickHandler.handleMazeExit
        return
      }

      TurnHandler.nextTurn()
    }
  }

  private static handleFreePieceRelocation(coordinates: Coordinates): void {
    if (board.hasPieceAt(coordinates)) {
      alert(
        'Movimiento Inválido.' +
          '\n\n* Este espacio se encuentra ocupado, por favor selecciona un espacio vacío.'
      )
      return
    }

    ClickHandler.selectedPiece!.coordinates = coordinates

    try {
      ClickHandler.verifyMazeIntegrity()
    } catch {
      ClickHandler.queue = ClickHandler.handleMazeExit
      return
    }

    TurnHandler.nextTurn()
  }

  private static verifyMazeIntegrity(): void {
    const pieceAtMaze = board.pieceAt(Maze)

    if (!pieceAtMaze) return

    if (pieceAtMaze.canEnterMaze) return

    alert(
      'Antes de finalizar tu turno, por favor mueve la pieza del laberinto a otro espacio vacío.'
    )

    ClickHandler._selectedPiece.value = pieceAtMaze
    ClickHandler.highlightEmptySquares.value = true

    throw 'Piece in Maze cannot stay there.'
  }

  private static handleMazeExit(coordinates: Coordinates): void {
    if (board.hasPieceAt(coordinates)) {
      alert(
        'Movimiento Inválido.' +
          '\n\n* Este espacio se encuentra ocupado, por favor selecciona un espacio vacío.'
      )
      return
    }

    ClickHandler.selectedPiece!.coordinates = coordinates

    TurnHandler.nextTurn()
  }
}
