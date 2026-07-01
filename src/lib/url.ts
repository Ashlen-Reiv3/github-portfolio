// Join the site base with a path, tolerating a base with or without a trailing
// slash (Astro's BASE_URL is '/' in dev but '/github-portfolio' in CI).
const BASE = import.meta.env.BASE_URL;

export function withBase(path = '/'): string {
  const b = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}` || '/';
}
