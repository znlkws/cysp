import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import LazyImage from '@/components/LazyImage.vue'

const app = createApp(App)
app.component('LazyImage', LazyImage)
app.use(router).mount('#app')
