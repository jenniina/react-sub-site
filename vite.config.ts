import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //react(),
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
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
