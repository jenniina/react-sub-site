import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vike(),
    //     {
    //     prerender: true, // This enables SSG
    //   }
    {
      ...copy({
        targets: [
          { src: "routes.json", dest: "dist" },
          { src: "staticwebapp.config.json", dest: "dist" },
        ],
        hook: "writeBundle", // run the plugin after all the files are bundled and written to disk
        copyOnce: true,
      }),
      enforce: "post", // run the plugin after all the other plugins
    },
  ],
  server: {
    host: true,
  },
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"], // Remove specific console methods
        unused: true,
        dead_code: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
  },
});
