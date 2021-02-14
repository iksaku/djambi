import { createApp } from 'vue'
import App from './App.vue'
import 'tailwindcss/tailwind.css'

import { registerPieces } from '@/components/pieces'

const app = createApp(App)

registerPieces(app)

app.mount('#app')
