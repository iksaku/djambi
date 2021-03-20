<template>
  <div class="max-w-xl mx-auto">
    <div class="grid grid-cols-9 grid-rows-9 gap-0 border border-black">
      <!-- Board Squares -->
      <template v-for="y in 9">
        <template v-for="x in 9">
          <Square :coordinates="{ x, y }" />
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
  import { board } from '@/api/game'

  import Square from '@/components/Square.vue'
  import Piece from '@/components/Piece.vue'

  export default defineComponent({
    name: 'Board',

    components: {
      Piece,
      Square,
    },

    setup() {
      onMounted(() => {
        board.generate()
      })

      return {
        board,
      }
    },
  })
</script>
