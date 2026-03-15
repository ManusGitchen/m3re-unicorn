import tsdownConfig from './tsdown.config.js';
import vue from '@vitejs/plugin-vue';

import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [vue()],
  pack: tsdownConfig,
  lint: { "options": { "typeAware": true, "typeCheck": true } },
});
