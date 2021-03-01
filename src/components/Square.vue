<template>
  <div
    class="relative w-full border border-black overflow-hidden"
    :class="isMaze ? 'bg-black' : 'bg-gray-300'"
    style="padding-bottom: 100%"
  >
    <div
      class="absolute inset-0 flex items-center justify-center transform duration-1000 ease-in"
    >
      <component v-if="piece" :is="piece.component" :class="piece.color" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import board from '@/api/board'
  import { Coordinates, MazeCoordinates } from '@/api/coordinates'
  import { Piece } from '@/api/piece'

  export default defineComponent({
    name: 'Square',

    props: {
      coordinates: {
        type: Object as PropType<Coordinates>,
        required: true,
      },
    },

    setup({ coordinates }) {
      const isMaze = computed(
        (): boolean =>
          coordinates.x === MazeCoordinates.x &&
          coordinates.y === MazeCoordinates.y
      )
      const piece = computed((): Piece | undefined =>
        board.getPieceAt(coordinates)
      )

      return {
        isMaze,
        piece,
      }
    },
  })
</script>
