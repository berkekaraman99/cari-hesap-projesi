import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './dist'),
  base: './',
  server: { host: true },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
