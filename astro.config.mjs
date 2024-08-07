import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://kyleconrad.com',
  integrations: [
    sitemap(),
    (await import('@playform/compress')).default({
			SVG: false,
		}),
  ]
});