// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  base: isProd ? '/mindTools/' : '/',
  outDir: 'dist',
  site: 'https://edfii.github.io/mindTools',
  vite: {
    plugins: [react()],
  },
  integrations: [react({
      include: ['**/react/*'],
    })],
});