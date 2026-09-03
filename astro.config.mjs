import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [tailwind(), sitemap({ filter: (page) => !page.includes('/admin/') }), svelte()],
  site: 'https://cocina-lola.netlify.app',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});