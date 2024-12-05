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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxSZWFjdEpTXFxcXGpsYWktcmVhY3Qtc3Vic2l0ZVxcXFxyZWFjdC1zdWItc2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUmVhY3RKU1xcXFxqbGFpLXJlYWN0LXN1YnNpdGVcXFxccmVhY3Qtc3ViLXNpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1JlYWN0SlMvamxhaS1yZWFjdC1zdWJzaXRlL3JlYWN0LXN1Yi1zaXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBjb3B5IGZyb20gJ3JvbGx1cC1wbHVnaW4tY29weSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHtcbiAgICAgIC4uLmNvcHkoe1xuICAgICAgICB0YXJnZXRzOiBbeyBzcmM6ICdyb3V0ZXMuanNvbicsIGRlc3Q6ICdkaXN0JyB9XSxcbiAgICAgICAgaG9vazogJ3dyaXRlQnVuZGxlJywgLy8gcnVuIHRoZSBwbHVnaW4gYWZ0ZXIgYWxsIHRoZSBmaWxlcyBhcmUgYnVuZGxlZCBhbmQgd3JpdHRlbiB0byBkaXNrXG4gICAgICB9KSxcbiAgICAgIGVuZm9yY2U6ICdwb3N0JywgLy8gcnVuIHRoZSBwbHVnaW4gYWZ0ZXIgYWxsIHRoZSBvdGhlciBwbHVnaW5zXG4gICAgfSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgfSxcbiAgYmFzZTogJy8nLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThULFNBQVMsb0JBQW9CO0FBQzNWLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFHakIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxNQUNFLEdBQUcsS0FBSztBQUFBLFFBQ04sU0FBUyxDQUFDLEVBQUUsS0FBSyxlQUFlLE1BQU0sT0FBTyxDQUFDO0FBQUEsUUFDOUMsTUFBTTtBQUFBO0FBQUEsTUFDUixDQUFDO0FBQUEsTUFDRCxTQUFTO0FBQUE7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUFHLFNBQVMsRUFBRSxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVM7QUFBQSxVQUN4RTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
