import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { formkitConfig } from './configs/formkit.config'
import { plugin as formKitPlugin } from '@formkit/vue'
import App from './App.vue'
import router from './router'
import TheToast from '@/components/shared/TheToast.vue'

import './style.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(formKitPlugin, formkitConfig)

app.component('the-toast', TheToast)

app.mount('#app')
