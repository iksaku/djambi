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
  import { computed, defineComponent } from 'vue'
  import board from '@/api/board'
  import { MazeCoordinates } from '@/api/coordinates'
  import { Piece } from '@/api/piece'

  type Props = {
    coordinates: {
      x: number
      y: number
    }
  }

  export default defineComponent({
    name: 'Square',

    props: {
      coordinates: {
        type: Object,
        required: true,
      },
    } as Props,

    setup({ coordinates }: Props) {
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
