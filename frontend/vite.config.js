import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['frontend', 'localhost'],
    hmr: {
      clientPort: 80, // browser connects HMR WebSocket through nginx on port 80
    },
  },
})
