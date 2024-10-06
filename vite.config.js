import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      eslintrc: {
        enabled: true
      },
      dirs: ['./composables'],
      dts: true
    }),
    Components()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // For local development
    proxy: { '/api': 'http://localhost:3002' }
  }
})
