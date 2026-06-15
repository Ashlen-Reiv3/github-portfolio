import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// NOTE: for GitHub Pages project deploy, set `base: '/github-portfolio'`.
// Left off during dev so local URLs stay at root.
export default defineConfig({
  site: 'https://ashlen-reiv3.github.io',
  integrations: [react()],
});
