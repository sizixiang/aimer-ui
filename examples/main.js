import { createApp } from 'vue'
import App from './App.vue'
import AimerUI from '../packages'

const app = createApp(App)
app.use(AimerUI)
app.mount('#app')
