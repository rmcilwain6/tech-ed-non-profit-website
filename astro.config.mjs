// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Static output only. Server-rendered routes need a decision record (SPEC T2).
  output: 'static',
  // Only English ships, but routing stays ready for more languages (SPEC T8).
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
