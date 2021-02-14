<template>
  <div class="max-w-xl mx-auto">
    <div class="grid grid-cols-9 grid-rows-9 gap-0 border border-black">
      <template v-for="[y, row] of board.map" :key="y">
        <!-- Square -->
        <Square v-for="[x] of row" :key="x" :coordinates="{ x, y }" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import board from '@/api/board'

  import Square from '@/components/Square.vue'

  export default defineComponent({
    name: 'Board',

    components: {
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
