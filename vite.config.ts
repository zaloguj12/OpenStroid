import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'https://cloud.boosteroid.com',
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: {
          '.cloud.boosteroid.com': 'localhost',
          'cloud.boosteroid.com': 'localhost',
        },
      },
    },
  },
});
