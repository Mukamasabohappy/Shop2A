import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor'; // Separate React-related dependencies
            }
            return 'vendor'; // Other third-party dependencies
          }
        },
      },
    },
    chunkSizeWarningLimit: 600, // Adjust if needed (not recommended long-term)
  },
});
