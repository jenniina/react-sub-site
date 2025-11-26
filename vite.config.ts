import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import copy from 'rollup-plugin-copy'
import { resolve } from 'node:path'

const isDebug = process.env.NODE_ENV === 'debug'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // {
    // jsxRuntime: "automatic",
    // }
    vike(),
    {
      ...copy({
        targets: [
          {
            src: 'routes.json',
            dest: resolve(__dirname, '../node-bg/dist/frontend'),
          },
        ],
        hook: 'writeBundle', // run the plugin after all the files are bundled and written to disk
        copyOnce: true,
      }),
      enforce: 'post', // run the plugin after all the other plugins
    },
  ],
  server: {
    host: true,
  },
  base: '/',

  // define: {
  //   "process.env.NODE_ENV": '"development"',
  //   __DEV__: true,
  // },

  // resolve: {
  //   alias: {
  //     react: path.resolve("node_modules/react/index.js"),
  //     "react-dom": path.resolve("node_modules/react-dom/index.js"),
  //     "react-dom/server": path.resolve("node_modules/react-dom/server.js"),
  //   },
  //   conditions: ["import", "module", "browser", "default"],
  //   mainFields: ["module", "main"],
  // },

  // // Add define to fix exports issue
  // define: {
  //   // Fix CommonJS exports for ESM
  //   global: "globalThis",
  //   "process.env.NODE_ENV": JSON.stringify(
  //     process.env.NODE_ENV || "development"
  //   ),
  // },

  build: {
    outDir: resolve(__dirname, '../node-bg/dist/frontend'),
    minify: isDebug ? false : 'terser',
    sourcemap: true,
    target: 'es2015',
    rollupOptions: {
      external: [],
      output: isDebug
        ? {
            manualChunks: undefined,
          }
        : {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString()
              }
            },
          },
    },
    emptyOutDir: true,
  },
  ssr: {
    noExternal: true,
  },

  // ssr: {
  //   // Try with specific noExternal instead of true
  //   noExternal: [
  //     "react",
  //     "react-dom",
  //     "react-router-dom",
  //     "react-redux",
  //     "@reduxjs/toolkit",
  //     // Don't bundle Vike - let it handle its own CommonJS
  //   ],
  //   target: "node",
  //   format: "esm",
  // },

  // optimizeDeps: {
  //   // Remove jsx-runtime from include to fix the warning
  //   include: ["react", "react-dom", "react-router-dom"],
  //   force: true,
  //   esbuildOptions: {
  //     target: "es2020",
  //     format: "esm",
  //   },
  // },
})
