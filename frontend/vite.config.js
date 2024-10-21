import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Import the manifest from the /public directory
import manifest from './public/manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@client': path.resolve(__dirname, './src'),
      '@server': path.resolve(__dirname, '../backend/src'),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, './src/certs/cert.key')
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, './src/certs/cert.crt')
      ),
    },
  },
})
