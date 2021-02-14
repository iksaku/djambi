import { App } from 'vue'

import Assassin from './Assasin.vue'
import Chief from './Chief.vue'
import Diplomat from './Diplomat.vue'
import Militant from './Militant.vue'
import Necromobile from './Necromobile.vue'
import Reporter from './Reporter.vue'

export function registerPieces(app: App) {
  app.component('piece-assassin', Assassin)
  app.component('piece-chief', Chief)
  app.component('piece-diplomat', Diplomat)
  app.component('piece-militant', Militant)
  app.component('piece-necromobile', Necromobile)
  app.component('piece-reporter', Reporter)
}
