import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Ensures JSX runtime compatibility
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // Ensures CommonJS and ESM compatibility
    },
  },
});
