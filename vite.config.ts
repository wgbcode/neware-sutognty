import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { CodeInspectorPlugin } from 'code-inspector-plugin'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(), // tsx 语法支持
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: { attrs: ['class', 'data-name', 'fill', 'stroke'] }
          }
        ]
      }
    }),
    visualizer({ open: true }), // 生成 start.html
    // 文件压缩。https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md
    // 服务器发现请求资源为gzip格式时，应设置响应头content-encoding:gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: true
    }),
    // 代码快速定位。https://inspector.fe-dev.cn/guide/start.html
    CodeInspectorPlugin({
      bundler: 'vite'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url))
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
    host: 'localhost',
    port: 3000,
    open: true,
    hmr: true, // 热更新
    proxy: {
      '/api': {
        target: 'https://nsapgateway.neware.work/api',
        // target: 'https://www.fastmock.site/mock/e68d869253f9e376375eb399ba932142/newarewms',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    // sourcemap: true,
    chunkSizeWarningLimit: 1500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件，包括图片、字体、css等
        entryFileNames: 'js/[name]-[hash].js', // chunks 入口文件，即 index.js
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
          return `js/${fileName}/[name]-[hash].js`
        },
        manualChunks(id) {
          // 让每个插件都打包成独立的文件
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
