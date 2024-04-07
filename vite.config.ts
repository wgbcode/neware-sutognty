import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
// import { visualizer } from 'rollup-plugin-visualizer'
// import { CodeInspectorPlugin } from 'code-inspector-plugin'

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
    // 代码体积分析
    // visualizer({ open: true }),
    // 文件压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: true
    })
    // 代码快速定位
    // CodeInspectorPlugin({bundler: 'vite'})
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
    open: false,
    hmr: true, // 热更新
    proxy: {
      '/api': {
        target: 'https://nsapgateway.neware.work/api',
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
        // drop_console: true,
        // drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件
        entryFileNames: 'js/[name]-[hash].js', // chunks 入口文件
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
