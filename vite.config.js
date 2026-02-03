import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use repository name for GitHub Pages, ./ for local development
  base: process.env.NODE_ENV === 'production' ? '/maison-elite/' : '/',
})
