// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: '/mindtools/',
  outDir: 'dist',
  site: 'https://edfii.github.io/mindTools',
  vite: {
    plugins: [tailwindcss(), react()],
  },
  integrations: [react({
      include: ['**/react/*'],
    })],
});