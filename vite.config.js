import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/endpoint": {
        target: "https://798ef4034ebe.ngrok-free.app",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/endpoint/, ""),
      },
    },
  },  
})
