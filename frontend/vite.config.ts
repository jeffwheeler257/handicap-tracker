import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // Listen on all addresses, not just localhost
    port: 5173,      // Ensure this matches the port in docker-compose
    strictPort: true // Fail if port is taken (easier to debug)
  }
})
