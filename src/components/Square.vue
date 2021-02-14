<template>
  <div
    class="relative w-full overflow-hidden"
    :class="isEven ? 'bg-gray-400' : 'bg-gray-200'"
    style="padding-bottom: 100%"
  >
    <div
      class="absolute inset-0 flex items-center justify-center transform duration-1000 ease-in"
      v-text="piece"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { getPieceAt } from '@/api/board'

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
      const isEven = computed(() => (coordinates.x + coordinates.y) % 2 === 0)

      const piece = computed(() => getPieceAt(coordinates))

      return {
        isEven,
        piece,
      }
    },
  })
</script>
