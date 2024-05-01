import './assets/main.css'

import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'
import BaseContainer from './UI/BaseContainer.vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('base-container', BaseContainer);
app.use(createPinia())
app.use(router)

app.mount('#app')