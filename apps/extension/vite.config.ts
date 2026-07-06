import path from 'node:path'

import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react' // Import the function
import { defineConfig } from 'vite'

import manifest from './manifest.js'

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 5173,
    strictPort: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },

  clearScreen: false,
})
