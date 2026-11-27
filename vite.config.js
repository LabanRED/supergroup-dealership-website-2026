import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/supergroup-dealership-website-2026/' : '/',
  plugins: [vue(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api/conexa': {
        target: 'https://conexa.r-e-d.co.za/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/conexa/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      '/api/conexa': {
        target: 'https://conexa.r-e-d.co.za/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/conexa/, ''),
      },
    },
  },
})
