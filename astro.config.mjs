// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: '',
  outDir: 'dist',
  site: 'https://edfii.github.io/mindTools',
  vite: {
    plugins: [react()],
  },
  integrations: [react({
      include: ['**/react/*'],
    })],
});