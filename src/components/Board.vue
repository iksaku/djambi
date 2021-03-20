<template>
  <div class="max-w-xl mx-auto">
    <div class="grid grid-cols-9 grid-rows-9 gap-0 border border-black">
      <!-- Board Squares -->
      <template v-for="y in 9">
        <template v-for="x in 9">
          <Square :position="{ x, y }" />
        </template>
      </template>

      <!-- Pieces -->
      <Piece
        v-for="piece of board.pieces.values()"
        :key="piece.id"
        :piece="piece"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { board, turnHandler } from '@/api/game'

  import Square from '@/components/Square.vue'
  import Piece from '@/components/Piece.vue'
  import { Coordinates, MazeCoordinates } from '@/api/coordinates'

  export default defineComponent({
    name: 'Board',

    components: {
      Piece,
      Square,
    },

    setup() {
      onMounted(() => {
        board.generate()

        // setTimeout(() => {
        //   let yellowPieceCoordinates = Coordinates.make(9, 1)
        //   let yellowPiece = board.pieceAt(yellowPieceCoordinates)!
        //
        //   yellowPiece.coordinates = MazeCoordinates
        //
        //   setTimeout(() => {
        //     yellowPiece.coordinates = yellowPieceCoordinates
        //
        //     let piece = board.pieceAt(Coordinates.make(1, 9))!
        //
        //     piece.coordinates = MazeCoordinates
        //   }, 3000)
        // }, 3000)
        //
        // setInterval(() => turnHandler.nextTurn(), 5000)
      })

      return {
        board,
      }
    },
  })
</script>
