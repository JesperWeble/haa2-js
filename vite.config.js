import { defineConfig } from "vite"

export default defineConfig({
  base: 'https://cdn.jsdelivr.net/gh/JesperWeble/haa2-js/dist/',
  build: {
    minify: 'terser',
    rollupOptions: {
      input: {
        app: './src/index.js',
      },
    },
  },
});
