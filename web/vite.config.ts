import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
    // Guarantee a single React instance even though `shared` lists react as a peer.
    dedupe: ['react', 'react-dom'],
  },
});
