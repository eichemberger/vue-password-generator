import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
const buildOptions = {
  plugins: [vue()],
}

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'build') {
    return {
      ...buildOptions,
      base: '/password-generator/'
    }
  } else {
    return {
      ...buildOptions
    }
  }
})