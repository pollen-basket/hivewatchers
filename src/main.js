import VueAwesomePaginate from 'vue-awesome-paginate'
import Markdown from 'vue3-markdown-it'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './main.css'
import './global.css'
import 'vue-awesome-paginate/dist/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.use(Markdown)
app.mount('#app')
