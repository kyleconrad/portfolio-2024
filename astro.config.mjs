import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import compressor from "astro-compressor";



// https://astro.build/config
export default defineConfig({
  site: 'https://kyleconrad.com',
  integrations: [
    sitemap(),
    playformCompress({
      SVG: false
    }),
    compressor()
  ]
});