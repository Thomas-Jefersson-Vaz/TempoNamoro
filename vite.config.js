import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import moment from 'moment'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    moment(),
  ],
  server: {
    port: 3434,
    host: true,
    allowedHosts: ["fernanda.thomasjeferssonvaz.dev.br"],
  },
})
