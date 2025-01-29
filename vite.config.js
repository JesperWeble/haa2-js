import { defineConfig } from "vite"

export default defineConfig({
  base: 'https://cdn.jsdelivr.net/gh/sergey-tomashevsky/haa-js/dist/',
  build: {
    minify: 'terser',
    rollupOptions: {
      input: {
        app: './src/index.js',
      },
    },
  },
});
