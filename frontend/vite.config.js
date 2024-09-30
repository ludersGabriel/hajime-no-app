import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
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
