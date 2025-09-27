import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // leave build as default - NOT library mode
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
