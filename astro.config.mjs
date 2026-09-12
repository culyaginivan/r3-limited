// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://yurka1605.github.io',
  base: '/r3-limited/',
  output: 'static',

  integrations: [icon({ iconDir: 'src/assets/icons' }), react()],

  vite: {
    build: {
      cssCodeSplit: true, // Изолированный CSS для ускорения первой загрузки
    },
    plugins: [tailwindcss()],
  },

  // Настройки обработки и оптимизации изображений
  image: {
    // Включаем встроенный сервис оптимизации на базе Sharp
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Разрешенные внешние домены (если картинки подтягиваются по URL из внешних CDN)
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
