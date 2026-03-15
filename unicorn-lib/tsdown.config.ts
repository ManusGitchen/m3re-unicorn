import { defineConfig } from 'vite-plus/pack'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  rollupOptions: {
    external: ['vue'],
  },
  esbuild: {
    loader: 'tsx',
  },
  vueOptions: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.includes('-'),
      },
    },
  },
  dts: {
    // Disable tsgo for Vue support
    rollupTypes: true,
  },
  exports: true,
  vite: {
    plugins: [vue()],
  },
})
