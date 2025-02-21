import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr(), // 支持以svg构建react组件
    viteCompression({
      verbose:true, // 显示压缩详情
      disable: false, 
      threshold: 50 * 1024, // 大于50kb的文件会被压缩
      algorithm: 'gzip', // 使用gzip压缩
      ext: '.gz', 
    })
  ],
  base: '/', // 部署在根目录，如果'./'则部署在dist目录下，可能导致页面二次刷新mime类型错误
  define: { 
    __APP_ENV__: {
      BASE_URL: '',
      SECRET_KEY: 'my_secret_key_QAQ-wuwuwu'
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: ['.ts', '.tsx', '.json']
  },
  logLevel: 'info',
  clearScreen: false, // 终端禁止清屏
  // appType: 'spa',
  optimizeDeps: {
    force: true // 强制预构建，可能导致构建速度变慢
  },
  build: {
    minify: 'esbuild', // 压缩方式
    assetsInlineLimit: 4096, // 小于4kb的文件会被内联
    target: 'modules', // 支持原生浏览器模块
    cssCodeSplit: true, // css代码分割
    rollupOptions: {
      output: {
        manualChunks: { // 分割代码块
      
        }
      }
    }
  },
  esbuild: {
    // drop: ['console', 'debugger'], // 去除console和debugger
  },
  server: {
    port: 3001,
    host: '0.0.0.0', // 同一局域网内其他服务器也可以访问
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    }
  }
})
