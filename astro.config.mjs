import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

export default defineConfig/** @type {import('astro').AstroUserConfig} */({
  site: 'https://thomashorn.info',
  integrations: [tailwind(),],
});
