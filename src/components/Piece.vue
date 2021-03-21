<template>
  <div
    @click.stop="onClick"
    class="relative w-full h-0 overflow-hidden transition-transform transform duration-75 ease-in-out"
    :class="{
      'z-10': piece.isCorpse,
      'z-20': piece.isAlive,
    }"
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
  import { ClickHandler } from '@/api/ClickHandler'

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

    setup({ piece }) {
      return {
        onClick: () => ClickHandler.handle(piece.coordinates),
      }
    },
  })
</script>

<style scoped></style>
