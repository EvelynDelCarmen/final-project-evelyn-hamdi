import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cloudinary/url-gen': '@cloudinary/url-gen/dist/index.cjs.js',
    },
  },
});

