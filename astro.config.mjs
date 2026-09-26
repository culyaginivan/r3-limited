// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://r3lmtd.com',
  output: 'static',


  server: {
    host: true,
  },

  integrations: [icon({ iconDir: 'src/assets/icons' }), react()],
  
  vite: {
    build: {
      cssCodeSplit: true,
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
      weights: [400, 500, 600, 700],
      subsets: ['cyrillic', 'latin'],
    },
  ],
});


