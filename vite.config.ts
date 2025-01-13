import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr(), // 支持以svg构建react组件
  ],
  base: './',
  define: { // 定义全局变量
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
  appType: 'spa',
  optimizeDeps: {
    force: true // 强制预构建，可能导致构建速度变慢
  },
  build: {
    assetsInlineLimit: 4096, // 小于4kb的文件会被内联
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: { // 分割代码块
      
        }
      }
    }
  },
  server: {
    port: 3001,
    host: '0.0.0.0', // 同一局域网内其他服务器也可以访问
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    }
  }
})
