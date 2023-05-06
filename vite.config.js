import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (!mode || mode == 'development' || mode == 'production') {
    mode = 'web'
  }

  let baseConfig = {
    plugins: [vue(), svgLoader({
      // defaultImport: 'url'
    })],
    publicDir: 'src/public'
  }

  let modes = {
    extension: {
      ...baseConfig,
      base: '/',
      build: {
        outDir: 'dist/extension'
      }
    },
    web: {
      ...baseConfig,
      base: '/Passbirb/',
      build: {
        outDir: 'dist/web'
      }
    },
    bookmarklet: {
      ...baseConfig,
      publicDir: "public",
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib/bookmarklet/main.js'),
          name: 'bookmarklet',
          fileName: 'bookmarklet',
        },
        outDir: 'dist/bookmarklet'
      }
    }
  }
  if (Object.keys(modes).includes(mode)) {
    return modes[mode]
  } else {
    throw new Error(`Unknown mode: ${mode}`)
  }
})
