<template>
  <div
    class="relative w-full h-0 overflow-hidden z-10 transition-transform transform duration-75 ease-in-out"
    :style="{
      paddingBottom: '100%',
      gridColumnStart: piece.coordinates.x,
      gridRowStart: piece.coordinates.y,
    }"
  >
    <component :is="piece.type" :class="piece.color" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Piece } from '@/api/piece'

  import Assassin from './pieces/Assasin.vue'
  import Chief from './pieces/Chief.vue'
  import Diplomat from './pieces/Diplomat.vue'
  import Militant from './pieces/Militant.vue'
  import Necromobile from './pieces/Necromobile.vue'
  import Reporter from './pieces/Reporter.vue'

  export default defineComponent({
    name: 'Piece',

    props: {
      piece: {
        type: Object as PropType<Piece>,
      },
    },

    components: {
      Assassin,
      Chief,
      Diplomat,
      Militant,
      Necromobile,
      Reporter,
    },
  })
</script>

<style scoped></style>
