import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { formkitConfig } from './configs/formkit.config'
import { plugin as formKitPlugin } from '@formkit/vue'
import App from './App.vue'
import router from './router'
import TheLoading from './components/shared/TheLoading.vue'
import Toast, { type PluginOptions, POSITION } from 'vue-toastification'

import 'vue-toastification/dist/index.css'
import './style.scss'
import './index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT
}

app.use(pinia)
app.use(router)
app.use(formKitPlugin, formkitConfig)
app.use(Toast, options)
app.component('the-loading', TheLoading)

router.isReady().then(() => app.mount('#app'))
