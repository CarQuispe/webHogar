// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // 🔥 CLAVE PARA EL ERROR DE TOP-LEVEL AWAIT
  build: {
    target: 'es2022', // o 'esnext'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@modules': path.resolve(__dirname, './src/modules'),
    }
  }
});
