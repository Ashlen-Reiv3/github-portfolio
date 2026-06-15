import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// `base` is applied only in CI (GitHub Actions) so local dev/preview stays at root.
// BEFORE going live under the /github-portfolio subpath: make internal links and
// asset src values base-aware (prefix with import.meta.env.BASE_URL), or deploy to
// a user/custom-domain site where no base is needed.
const onCI = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: 'https://ashlen-reiv3.github.io',
  base: onCI ? '/github-portfolio' : undefined,
  integrations: [react()],
});
