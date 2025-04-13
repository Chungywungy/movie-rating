import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/movie-rating/", // must match repo name
  plugins: [react()],
});

