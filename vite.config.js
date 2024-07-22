import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
  /* server: {
    host: '0.0.0.0',  // Allows access from network devices
    port: 3000,       // Specifies the port for the dev server
    strictPort: true, // Ensures the specified port is used
    cors: true,       // Enables CORS (optional, if needed)
  }, */
});