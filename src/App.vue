<template>
  <div class="w-full min-h-screen h-full">
    <Board />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Board from '@/components/Board.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Board,
    },
  })
</script>
