import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // This allows other devices on the network to connect
  },
  plugins: [react()],
})
