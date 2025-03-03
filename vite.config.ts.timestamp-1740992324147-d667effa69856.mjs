// vite.config.ts
import { defineConfig } from "file:///E:/ReactJS/jlai-react-subsite/react-sub-site/node_modules/vite/dist/node/index.js";
import react from "file:///E:/ReactJS/jlai-react-subsite/react-sub-site/node_modules/@vitejs/plugin-react/dist/index.mjs";
import copy from "file:///E:/ReactJS/jlai-react-subsite/react-sub-site/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      ...copy({
        targets: [{ src: "routes.json", dest: "dist" }],
        hook: "writeBundle"
        // run the plugin after all the files are bundled and written to disk
      }),
      enforce: "post"
      // run the plugin after all the other plugins
    }
  ],
  server: {
    host: true
  },
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxSZWFjdEpTXFxcXGpsYWktcmVhY3Qtc3Vic2l0ZVxcXFxyZWFjdC1zdWItc2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUmVhY3RKU1xcXFxqbGFpLXJlYWN0LXN1YnNpdGVcXFxccmVhY3Qtc3ViLXNpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1JlYWN0SlMvamxhaS1yZWFjdC1zdWJzaXRlL3JlYWN0LXN1Yi1zaXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBjb3B5IGZyb20gJ3JvbGx1cC1wbHVnaW4tY29weSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHtcbiAgICAgIC4uLmNvcHkoe1xuICAgICAgICB0YXJnZXRzOiBbeyBzcmM6ICdyb3V0ZXMuanNvbicsIGRlc3Q6ICdkaXN0JyB9XSxcbiAgICAgICAgaG9vazogJ3dyaXRlQnVuZGxlJywgLy8gcnVuIHRoZSBwbHVnaW4gYWZ0ZXIgYWxsIHRoZSBmaWxlcyBhcmUgYnVuZGxlZCBhbmQgd3JpdHRlbiB0byBkaXNrXG4gICAgICB9KSxcbiAgICAgIGVuZm9yY2U6ICdwb3N0JywgLy8gcnVuIHRoZSBwbHVnaW4gYWZ0ZXIgYWxsIHRoZSBvdGhlciBwbHVnaW5zXG4gICAgfSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgfSxcbiAgYmFzZTogJy8nLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9jb21wb25lbnRzJykpIHtcbiAgICAgICAgICAvLyAgIHJldHVybiBpZC50b1N0cmluZygpLnNwbGl0KCdzcmMvY29tcG9uZW50cy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKClcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VCxTQUFTLG9CQUFvQjtBQUMzVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBR2pCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOO0FBQUEsTUFDRSxHQUFHLEtBQUs7QUFBQSxRQUNOLFNBQVMsQ0FBQyxFQUFFLEtBQUssZUFBZSxNQUFNLE9BQU8sQ0FBQztBQUFBLFFBQzlDLE1BQU07QUFBQTtBQUFBLE1BQ1IsQ0FBQztBQUFBLE1BQ0QsU0FBUztBQUFBO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsbUJBQU8sR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTO0FBQUEsVUFDeEU7QUFBQSxRQUlGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
