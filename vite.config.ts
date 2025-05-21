import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // build完的index.html 會去哪裡找assets
  server: {
    port: 80,
  } 
})
