import { defineConfig } from 'astro/config';

// A plain static site. No sitemap on purpose: nothing should help anyone find it.
export default defineConfig({
  output: 'static',
  // Where it's published. GitHub Pages serves it in a folder (/stride-andreayjeff/): the publish workflow in
  // .github/workflows/ sets these two. Locally they're unset and the site sits at the root, as before.
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH ?? '/',
  server: { port: 4440 },
  devToolbar: { enabled: false },
});
