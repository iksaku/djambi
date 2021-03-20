<template>
  <div
    class="relative w-full border border-black overflow-hidden"
    :class="bgColor"
    :style="{
      paddingBottom: '100%',
      gridColumnStart: coordinates.x,
      gridRowStart: coordinates.y,
    }"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import {
    Coordinates,
    isSameCoordinate,
    MazeCoordinates,
  } from '@/api/coordinates'
  import { board, turnHandler } from '@/api/game'
  import { PlayerBackgroundColors } from '@/api/player'

  export default defineComponent({
    name: 'Square',

    props: {
      coordinates: {
        type: Object as PropType<Coordinates>,
        required: true,
      },
    },

    setup({ coordinates }) {
      const bgColor = computed((): string => {
        // Highlight current player's pieces
        if (board.getPieceAt(coordinates)?.owner === turnHandler.current)
          return 'bg-purple-500'

        // If it isn't the central square, just dye gray
        if (!isSameCoordinate(coordinates, MazeCoordinates))
          return 'bg-gray-300'

        // Get the current player in Power
        const playerInPower = board.playerInPower

        // If there's no Player in Power, dye in black
        if (!playerInPower) return 'bg-black'

        // If there's a player in Power, dye in its own color
        return PlayerBackgroundColors[playerInPower]
      })

      return {
        bgColor,
      }
    },
  })
</script>
