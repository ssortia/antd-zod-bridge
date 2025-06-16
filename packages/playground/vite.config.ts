import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@my/ui': path.resolve(__dirname, '../ui/src'),
    },
  },
});
