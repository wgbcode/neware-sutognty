// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/25671/Desktop/neware-sutognty/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/25671/Desktop/neware-sutognty/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/25671/Desktop/neware-sutognty/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/25671/Desktop/neware-sutognty/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import { visualizer } from "file:///C:/Users/25671/Desktop/neware-sutognty/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///C:/Users/25671/Desktop/neware-sutognty/node_modules/vite-plugin-compression/dist/index.mjs";
import { CodeInspectorPlugin } from "file:///C:/Users/25671/Desktop/neware-sutognty/node_modules/code-inspector-plugin/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/25671/Desktop/neware-sutognty/vite.config.ts";
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
    visualizer({ open: true }),
    // 生成 start.html
    // 文件压缩。https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md
    // 服务器发现请求资源为gzip格式时，应设置响应头content-encoding:gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: true
    }),
    // 代码快速定位。https://inspector.fe-dev.cn/guide/start.html
    CodeInspectorPlugin({
      bundler: "vite"
    })
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
    host: "127.0.0.1",
    port: 3e3,
    open: true,
    hmr: true,
    // 热更新
    proxy: {
      "/api": {
        target: "https://nsapgateway.neware.work/api",
        // target: 'https://www.fastmock.site/mock/e68d869253f9e376375eb399ba932142/newarewms',
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
        // 资源文件，包括图片、字体、css等
        entryFileNames: "js/[name]-[hash].js",
        // chunks 入口文件，即 index.js
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyNTY3MVxcXFxEZXNrdG9wXFxcXG5ld2FyZS1zdXRvZ250eVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjU2NzFcXFxcRGVza3RvcFxcXFxuZXdhcmUtc3V0b2dudHlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzI1NjcxL0Rlc2t0b3AvbmV3YXJlLXN1dG9nbnR5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcbmltcG9ydCB7IENvZGVJbnNwZWN0b3JQbHVnaW4gfSBmcm9tICdjb2RlLWluc3BlY3Rvci1wbHVnaW4nXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcuLycsXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSwgLy8gdHN4IFx1OEJFRFx1NkNENVx1NjUyRlx1NjMwMVxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgICBzdmdvT3B0aW9uczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3JlbW92ZUF0dHJzJyxcbiAgICAgICAgICAgIHBhcmFtczogeyBhdHRyczogWydjbGFzcycsICdkYXRhLW5hbWUnLCAnZmlsbCcsICdzdHJva2UnXSB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSksXG4gICAgdmlzdWFsaXplcih7IG9wZW46IHRydWUgfSksIC8vIFx1NzUxRlx1NjIxMCBzdGFydC5odG1sXG4gICAgLy8gXHU2NTg3XHU0RUY2XHU1MzhCXHU3RjI5XHUzMDAyaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92aXRlLXBsdWdpbi1jb21wcmVzc2lvbi9ibG9iL21haW4vUkVBRE1FLnpoX0NOLm1kXG4gICAgLy8gXHU2NzBEXHU1MkExXHU1NjY4XHU1M0QxXHU3M0IwXHU4QkY3XHU2QzQyXHU4RDQ0XHU2RTkwXHU0RTNBZ3ppcFx1NjgzQ1x1NUYwRlx1NjVGNlx1RkYwQ1x1NUU5NFx1OEJCRVx1N0Y2RVx1NTRDRFx1NUU5NFx1NTkzNGNvbnRlbnQtZW5jb2Rpbmc6Z3ppcFxuICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgZGlzYWJsZTogZmFsc2UsXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQwLFxuICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXG4gICAgICBleHQ6ICcuZ3onLFxuICAgICAgZGVsZXRlT3JpZ2luRmlsZTogdHJ1ZVxuICAgIH0pLFxuICAgIC8vIFx1NEVFM1x1NzgwMVx1NUZFQlx1OTAxRlx1NUI5QVx1NEY0RFx1MzAwMmh0dHBzOi8vaW5zcGVjdG9yLmZlLWRldi5jbi9ndWlkZS9zdGFydC5odG1sXG4gICAgQ29kZUluc3BlY3RvclBsdWdpbih7XG4gICAgICBidW5kbGVyOiAndml0ZSdcbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0BpbWFnZXMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cy9pbWFnZXMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgZGV2U291cmNlbWFwOiB0cnVlLFxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAdXNlIFwiQC9zdHlsZXMvbWl4aW4uc2Nzc1wiIGFzICo7QHVzZSBcIkAvc3R5bGVzL2N1c3RvbS5zY3NzXCIgYXMgKjsnXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMTI3LjAuMC4xJyxcbiAgICBwb3J0OiAzMDAwLFxuICAgIG9wZW46IHRydWUsXG4gICAgaG1yOiB0cnVlLCAvLyBcdTcwRURcdTY2RjRcdTY1QjBcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vbnNhcGdhdGV3YXkubmV3YXJlLndvcmsvYXBpJyxcbiAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cHM6Ly93d3cuZmFzdG1vY2suc2l0ZS9tb2NrL2U2OGQ4NjkyNTNmOWUzNzYzNzVlYjM5OWJhOTMyMTQyL25ld2FyZXdtcycsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBzb3VyY2VtYXA6IHRydWUsXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICB9XG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJywgLy8gXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHVGRjBDXHU1MzA1XHU2MkVDXHU1NkZFXHU3MjQ3XHUzMDAxXHU1QjU3XHU0RjUzXHUzMDAxY3NzXHU3QjQ5XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsIC8vIGNodW5rcyBcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdUZGMENcdTUzNzMgaW5kZXguanNcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICBjb25zdCBmYWNhZGVNb2R1bGVJZCA9IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZCA/IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZC5zcGxpdCgnLycpIDogW11cbiAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZhY2FkZU1vZHVsZUlkW2ZhY2FkZU1vZHVsZUlkLmxlbmd0aCAtIDJdIHx8ICdbbmFtZV0nXG4gICAgICAgICAgcmV0dXJuIGBqcy8ke2ZpbGVOYW1lfS9bbmFtZV0tW2hhc2hdLmpzYFxuICAgICAgICB9LFxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAvLyBcdThCQTlcdTZCQ0ZcdTRFMkFcdTYzRDJcdTRFRjZcdTkwRkRcdTYyNTNcdTUzMDVcdTYyMTBcdTcyRUNcdTdBQ0JcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFMsU0FBUyxlQUFlLFdBQVc7QUFDalYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFDakIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxxQkFBcUI7QUFDNUIsU0FBUywyQkFBMkI7QUFSeUosSUFBTSwyQ0FBMkM7QUFVOU8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBO0FBQUEsSUFDUCxxQkFBcUI7QUFBQSxNQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsTUFDMUQsVUFBVTtBQUFBLE1BQ1YsYUFBYTtBQUFBLFFBQ1gsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxhQUFhLFFBQVEsUUFBUSxFQUFFO0FBQUEsVUFDNUQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFHekIsZ0JBQWdCO0FBQUEsTUFDZCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsTUFDTCxrQkFBa0I7QUFBQSxJQUNwQixDQUFDO0FBQUE7QUFBQSxJQUVELG9CQUFvQjtBQUFBLE1BQ2xCLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELFdBQVcsY0FBYyxJQUFJLElBQUksdUJBQXVCLHdDQUFlLENBQUM7QUFBQSxJQUMxRTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQSxJQUNkLHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQTtBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLHVCQUF1QjtBQUFBLElBQ3ZCLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxRQUNoQixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGdCQUFNLGlCQUFpQixVQUFVLGlCQUFpQixVQUFVLGVBQWUsTUFBTSxHQUFHLElBQUksQ0FBQztBQUN6RixnQkFBTSxXQUFXLGVBQWUsZUFBZSxTQUFTLENBQUMsS0FBSztBQUM5RCxpQkFBTyxNQUFNLFFBQVE7QUFBQSxRQUN2QjtBQUFBLFFBQ0EsYUFBYSxJQUFJO0FBRWYsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG1CQUFPLEdBQUcsU0FBUyxFQUFFLE1BQU0sZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFVBQ3hFO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
