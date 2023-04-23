import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

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
    }
  }
  if (Object.keys(modes).includes(mode)) {
    return modes[mode]
  } else {
    throw new Error(`Unknown mode: ${mode}`)
  }
})
