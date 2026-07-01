import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const prerender = true;

const PAGES: Record<string, { kicker: string; title: string; subtitle: string; stat: string }> = {
  home: {
    kicker: 'PORTFOLIO',
    title: 'I turn raw data into decisions.',
    subtitle: 'Data analyst · BI · data engineering — from source to SQL to the chart that makes the call.',
    stat: '92.4% xG model accuracy',
  },
  'football-analytica': {
    kicker: 'CASE STUDY',
    title: 'Football Analytica',
    subtitle: 'Open Premier League data → a SQL star-schema → an xG model, end to end.',
    stat: '+7 goals over xG',
  },
  'credit-card-tracker': {
    kicker: 'CASE STUDY',
    title: 'Credit-card spend tracker',
    subtitle: 'Emailed bank statements → SQLite → an interactive spending dashboard.',
    stat: 'R 895 / mo average',
  },
};

const fontPath = (weight: number) =>
  join(process.cwd(), 'node_modules/@fontsource/ibm-plex-sans/files', `ibm-plex-sans-latin-${weight}-normal.woff`);
const fonts = [
  { name: 'IBM Plex Sans', data: readFileSync(fontPath(400)), weight: 400 as const, style: 'normal' as const },
  { name: 'IBM Plex Sans', data: readFileSync(fontPath(600)), weight: 600 as const, style: 'normal' as const },
  { name: 'IBM Plex Sans', data: readFileSync(fontPath(700)), weight: 700 as const, style: 'normal' as const },
];

// minimal hyperscript for satori (no JSX needed in a .ts file)
const h = (type: string, style: Record<string, unknown>, children?: unknown): any => ({
  type,
  props: { style, ...(children !== undefined ? { children } : {}) },
});

export function getStaticPaths() {
  return Object.keys(PAGES).map((route) => ({ params: { route } }));
}

export const GET: APIRoute = async ({ params }) => {
  const page = PAGES[params.route ?? 'home'] ?? PAGES.home;

  const tree = h(
    'div',
    {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '70px',
      backgroundColor: '#FAF9F6',
      fontFamily: 'IBM Plex Sans',
      color: '#1A1C20',
    },
    [
      h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
        h('div', { display: 'flex', alignItems: 'center' }, [
          h(
            'div',
            { width: '46px', height: '46px', borderRadius: '11px', backgroundColor: '#0A6B5E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, marginRight: '18px' },
            'A',
          ),
          h('div', { fontSize: '26px', fontWeight: 600 }, 'Ashlen Mammen'),
        ]),
        h('div', { fontSize: '18px', fontWeight: 600, letterSpacing: '0.14em', color: '#0A6B5E' }, page.kicker),
      ]),
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h('div', { fontSize: '70px', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', maxWidth: '960px' }, page.title),
        h('div', { width: '96px', height: '8px', backgroundColor: '#E4572E', borderRadius: '4px', marginTop: '26px' }, ''),
        h('div', { fontSize: '28px', color: '#595D67', marginTop: '24px', maxWidth: '880px', lineHeight: 1.4 }, page.subtitle),
      ]),
      h('div', { display: 'flex', alignItems: 'center' }, [
        h('div', { display: 'flex', alignItems: 'center', backgroundColor: '#0A6B5E', color: '#FFFFFF', fontSize: '25px', fontWeight: 600, padding: '12px 24px', borderRadius: '999px' }, page.stat),
        h('div', { display: 'flex', alignItems: 'center', marginLeft: '26px', fontSize: '21px', color: '#0A6B5E' }, 'source › SQL › analysis › viz'),
      ]),
    ],
  );

  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 }, font: { loadSystemFonts: false } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
