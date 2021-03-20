<template>
  <div
    class="relative w-full border border-black overflow-hidden"
    :class="bgColor"
    :style="{
      paddingBottom: '100%',
      gridColumnStart: position.x,
      gridRowStart: position.y,
    }"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import {
    Coordinates,
    MazeCoordinates,
    PositionObject,
  } from '@/api/coordinates'
  import { board, turnHandler } from '@/api/game'
  import { PlayerBackgroundColors } from '@/api/player'

  export default defineComponent({
    name: 'Square',

    props: {
      position: {
        type: Object as PropType<PositionObject>,
        required: true,
      },
    },

    setup({ position }) {
      const coordinates = Coordinates.from(position)

      const bgColor = computed((): string => {
        const squarePiece = board.pieceAt(coordinates)

        // Highlight current player's pieces
        if (
          /*squarePiece?.temporalOwner?.isAlive &&
          turnHandler.isTurnOf(squarePiece.temporalOwner)*/
          squarePiece?.shouldHighlight
        )
          return 'bg-pink-400'

        // If it isn't the central (maze) square, just dye gray
        if (!coordinates.is(MazeCoordinates)) return 'bg-gray-300'

        // If there's no Player in Power, or is not alive, dye in black
        if (!board.powerPlayer?.isAlive) return 'bg-gray-700'

        // If there's an alive Power Player, dye in its own color
        return PlayerBackgroundColors[board.powerPlayer!.id]
      })

      return {
        bgColor,
      }
    },
  })
</script>
