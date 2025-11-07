import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...copy({
        targets: [{ src: "routes.json", dest: "dist" }],
        hook: "writeBundle", // run the plugin after all the files are bundled and written to disk
        copyOnce: true,
      }),
      enforce: "post", // run the plugin after all the other plugins
    },
    // Custom plugin to ensure index.html exists after build
    {
      name: "ensure-index-html",
      writeBundle() {
        const indexPath = path.resolve("dist", "index.html");
        const rootIndexPath = path.resolve("index.html");

        setTimeout(() => {
          if (!fs.existsSync(indexPath) && fs.existsSync(rootIndexPath)) {
            fs.copyFileSync(rootIndexPath, indexPath);
            console.log("✅ Restored index.html to dist/");
          }
        }, 1000); // Wait 1 second after build completes
      },
    },
  ],
  server: {
    host: true,
  },
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
          // if (id.includes('src/components')) {
          //   return id.toString().split('src/components/')[1].split('/')[0].toString()
          // }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  ssr: {
    noExternal: ["react-helmet-async", "@reduxjs/toolkit"],
  },
  optimizeDeps: {
    include: ["react-helmet-async", "@reduxjs/toolkit"],
  },
});
