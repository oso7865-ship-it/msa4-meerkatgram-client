import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 개발 서버 Proxy 정의
  server: {
    proxy: {
      // '/api'로 시작하는 요청은, target 서버로 프록시하도록 설정
      '/api': {
        target: 'http://localhost:8080', // Request를 보낼 대상 서버 URL
        changeOrigin: true, // Request 헤더 호스트 필드 값을 대상으로 서버 호스트 URL로 변경
        secure: false // SSL 인증서 검증
      }
    }
  }

})
