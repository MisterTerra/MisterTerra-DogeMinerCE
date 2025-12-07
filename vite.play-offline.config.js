import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: './',

  plugins: [viteSingleFile()],

  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,

    rollupOptions: {
      input: resolve(__dirname, 'play/index.html'),
    },

    outDir: 'dist-offline/dist',
    emptyOutDir: true,
  },
})