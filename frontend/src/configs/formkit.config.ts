import { defaultConfig } from '@formkit/vue'
import {
  createAutoHeightTextareaPlugin,
  createFloatingLabelsPlugin,
  createMultiStepPlugin
} from '@formkit/addons'
import '@formkit/themes/genesis'
import '@formkit/addons/css/multistep'
import '@formkit/addons/css/floatingLabels'

export const formkitConfig = defaultConfig({
  plugins: [
    createMultiStepPlugin(),
    createFloatingLabelsPlugin({
      useAsDefault: false
    }),
    createAutoHeightTextareaPlugin()
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
