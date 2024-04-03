// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/neware-wms-sutongy/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/neware-wms-sutongy/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/neware-wms-sutongy/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/neware-wms-sutongy/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import viteCompression from "file:///D:/neware-wms-sutongy/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/neware-wms-sutongy/vite.config.ts";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueJsx(),
    // tsx 语法支持
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
      svgoOptions: {
        plugins: [
          {
            name: "removeAttrs",
            params: { attrs: ["class", "data-name", "fill", "stroke"] }
          }
        ]
      }
    }),
    // 代码体积分析
    // visualizer({ open: true }),
    // 文件压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: true
    })
    // 代码快速定位
    // CodeInspectorPlugin({bundler: 'vite'})
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@images": fileURLToPath(new URL("./src/assets/images", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/mixin.scss" as *;@use "@/styles/custom.scss" as *;'
      }
    }
  },
  server: {
    host: "localhost",
    port: 3e3,
    open: true,
    hmr: true,
    // 热更新
    proxy: {
      "/api": {
        target: "https://nsapgateway.neware.work/api",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  build: {
    // sourcemap: true,
    chunkSizeWarningLimit: 1500,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: "[ext]/[name]-[hash].[ext]",
        // 资源文件
        entryFileNames: "js/[name]-[hash].js",
        // chunks 入口文件
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/") : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || "[name]";
          return `js/${fileName}/[name]-[hash].js`;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxuZXdhcmUtd21zLXN1dG9uZ3lcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG5ld2FyZS13bXMtc3V0b25neVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbmV3YXJlLXdtcy1zdXRvbmd5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG4vLyBpbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xyXG4vLyBpbXBvcnQgeyBDb2RlSW5zcGVjdG9yUGx1Z2luIH0gZnJvbSAnY29kZS1pbnNwZWN0b3ItcGx1Z2luJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiAnLi8nLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlSnN4KCksIC8vIHRzeCBcdThCRURcdTZDRDVcdTY1MkZcdTYzMDFcclxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgICBzdmdvT3B0aW9uczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3JlbW92ZUF0dHJzJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7IGF0dHJzOiBbJ2NsYXNzJywgJ2RhdGEtbmFtZScsICdmaWxsJywgJ3N0cm9rZSddIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgLy8gXHU0RUUzXHU3ODAxXHU0RjUzXHU3OUVGXHU1MjA2XHU2NzkwXHJcbiAgICAvLyB2aXN1YWxpemVyKHsgb3BlbjogdHJ1ZSB9KSxcclxuICAgIC8vIFx1NjU4N1x1NEVGNlx1NTM4Qlx1N0YyOVxyXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcclxuICAgICAgdmVyYm9zZTogdHJ1ZSxcclxuICAgICAgZGlzYWJsZTogZmFsc2UsXHJcbiAgICAgIHRocmVzaG9sZDogMTAyNDAsXHJcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxyXG4gICAgICBleHQ6ICcuZ3onLFxyXG4gICAgICBkZWxldGVPcmlnaW5GaWxlOiB0cnVlXHJcbiAgICB9KVxyXG4gICAgLy8gXHU0RUUzXHU3ODAxXHU1RkVCXHU5MDFGXHU1QjlBXHU0RjREXHJcbiAgICAvLyBDb2RlSW5zcGVjdG9yUGx1Z2luKHtidW5kbGVyOiAndml0ZSd9KVxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICdAaW1hZ2VzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMvaW1hZ2VzJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH1cclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgZGV2U291cmNlbWFwOiB0cnVlLFxyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAdXNlIFwiQC9zdHlsZXMvbWl4aW4uc2Nzc1wiIGFzICo7QHVzZSBcIkAvc3R5bGVzL2N1c3RvbS5zY3NzXCIgYXMgKjsnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIGhtcjogdHJ1ZSwgLy8gXHU3MEVEXHU2NkY0XHU2NUIwXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL25zYXBnYXRld2F5Lm5ld2FyZS53b3JrL2FwaScsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIC8vIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTUwMCxcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJywgLy8gXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJywgLy8gY2h1bmtzIFx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlxyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAoY2h1bmtJbmZvKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmYWNhZGVNb2R1bGVJZCA9IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZCA/IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZC5zcGxpdCgnLycpIDogW11cclxuICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmFjYWRlTW9kdWxlSWRbZmFjYWRlTW9kdWxlSWQubGVuZ3RoIC0gMl0gfHwgJ1tuYW1lXSdcclxuICAgICAgICAgIHJldHVybiBganMvJHtmaWxlTmFtZX0vW25hbWVdLVtoYXNoXS5qc2BcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgLy8gXHU4QkE5XHU2QkNGXHU0RTJBXHU2M0QyXHU0RUY2XHU5MEZEXHU2MjUzXHU1MzA1XHU2MjEwXHU3MkVDXHU3QUNCXHU3Njg0XHU2NTg3XHU0RUY2XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZC50b1N0cmluZygpLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFQLFNBQVMsZUFBZSxXQUFXO0FBQ3hSLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBQ2pCLE9BQU8scUJBQXFCO0FBTnlILElBQU0sMkNBQTJDO0FBVXRNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQTtBQUFBLElBQ1AscUJBQXFCO0FBQUEsTUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLE1BQzFELFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxRQUNYLFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsYUFBYSxRQUFRLFFBQVEsRUFBRTtBQUFBLFVBQzVEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlELGdCQUFnQjtBQUFBLE1BQ2QsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLE1BQ0wsa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBO0FBQUE7QUFBQSxFQUdIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELFdBQVcsY0FBYyxJQUFJLElBQUksdUJBQXVCLHdDQUFlLENBQUM7QUFBQSxJQUMxRTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQSxJQUNkLHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQTtBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFTCx1QkFBdUI7QUFBQSxJQUN2QixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQTtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsUUFDaEIsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixnQkFBTSxpQkFBaUIsVUFBVSxpQkFBaUIsVUFBVSxlQUFlLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDekYsZ0JBQU0sV0FBVyxlQUFlLGVBQWUsU0FBUyxDQUFDLEtBQUs7QUFDOUQsaUJBQU8sTUFBTSxRQUFRO0FBQUEsUUFDdkI7QUFBQSxRQUNBLGFBQWEsSUFBSTtBQUVmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUFHLFNBQVMsRUFBRSxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVM7QUFBQSxVQUN4RTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
