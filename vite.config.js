import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/supergroup-dealership-website-2026/' : '/',
  plugins: [vue(), tailwindcss()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})
