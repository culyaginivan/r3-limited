// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import react from '@astrojs/react';

export default defineConfig({
  base: '/r3-limited/',
  output: 'static',

  integrations: [icon({ iconDir: 'src/assets/icons' }), react()],
  
  vite: {
    build: {
      cssCodeSplit: true, // Изолированный CSS для ускорения первой загрузки
    },
    plugins: [tailwindcss()],
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: [],
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Onest',
      cssVariable: '--font-onest',
    },
  ],
});


