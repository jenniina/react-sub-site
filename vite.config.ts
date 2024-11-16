import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...copy({
        targets: [{ src: 'routes.json', dest: 'dist' }],
        hook: 'writeBundle', // run the plugin after all the files are bundled and written to disk
      }),
      enforce: 'post', // run the plugin after all the other plugins
    },
  ],
  server: {
    host: true,
  },
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react'
            }
            if (id.includes('react-dom')) {
              return 'react-dom'
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom'
            }
            if (id.includes('react-redux')) {
              return 'react-redux'
            }
            if (id.includes('@reduxjs/toolkit')) {
              return 'redux-toolkit'
            }
            if (id.includes('axios')) {
              return 'axios'
            }
            if (id.includes('react-icons')) {
              return 'react-icons'
            }
            if (id.includes('uuid')) {
              return 'uuid'
            }
            return 'vendor'
          }
        },
      },
    },
    // chunkSizeWarningLimit: 500,
  },
})
