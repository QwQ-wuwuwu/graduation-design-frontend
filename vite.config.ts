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
      MODEL_URL: '',
      COMMON_URL: ''
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: ['.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    force: true // 强制预构建，可能导致构建速度变慢
  },
  build: {
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
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
