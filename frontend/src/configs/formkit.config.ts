import { defaultConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin, createMultiStepPlugin } from '@formkit/addons'
import '@formkit/themes/genesis'
import '@formkit/addons/css/multistep'
import '@formkit/addons/css/floatingLabels'

export const formkitConfig = defaultConfig({
  plugins: [
    createMultiStepPlugin(),
    createFloatingLabelsPlugin({
      useAsDefault: false
    })
  ],
  messages: {
    en: {
      validation: {
        required({ name }) {
          return `${name} zorunludur.`
        }
      }
    }
  }
})
