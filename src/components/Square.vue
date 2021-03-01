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
  import board from '@/api/board'
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
        // It isn't the central square
        if (!isSameCoordinate(coordinates, MazeCoordinates))
          return 'bg-gray-300'

        const playerInPower = board.playerInPower

        // There's no Player in Power
        if (!playerInPower) return 'bg-black'

        return PlayerBackgroundColors[playerInPower]
      })

      return {
        bgColor,
      }
    },
  })
</script>
