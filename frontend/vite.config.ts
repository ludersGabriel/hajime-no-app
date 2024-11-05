import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { VitePWA } from 'vite-plugin-pwa'

import Icons from './public/icons.json'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        name: 'Panelapp',
        short_name: 'Panelapp',
        description: 'This is the PWA for the friends Group Panela!',
        start_url: '/',
        categories: ['friends', 'group', 'panela'],
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: Icons.icons,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        skipWaiting: true,
        clientsClaim: true,
        cacheId: 'panelapp-0.1',
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
  build: {
    rollupOptions: {
      external: ['../backend/src'],
    },
  },
})
