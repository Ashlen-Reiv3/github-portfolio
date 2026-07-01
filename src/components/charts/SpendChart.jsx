import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// On-brand: teal (series-1) + orange (series-2) only — no off-brand blue/magenta.
// Each category is separated by BOTH hue and a pattern (solid / hatch / dots) so the
// encoding never relies on colour alone (a11y + prints/greyscale still readable).
const CATS = [
  { key: 'groceries', label: 'Groceries', series: 'var(--series-1)', fill: 'var(--series-1)', pattern: 'solid' },
  { key: 'dining',    label: 'Dining',    series: 'var(--series-2)', fill: 'var(--series-2)', pattern: 'solid' },
  { key: 'transport', label: 'Transport', series: 'var(--series-1)', fill: 'url(#sp-hatch)', pattern: 'hatch' },
  { key: 'online',    label: 'Online',    series: 'var(--series-2)', fill: 'url(#sp-dots)',  pattern: 'dots'  },
];
const DATA = [
  { month: 'Jan', groceries: 420, dining: 180, transport: 90, online: 140 },
  { month: 'Feb', groceries: 460, dining: 150, transport: 110, online: 90 },
  { month: 'Mar', groceries: 390, dining: 220, transport: 100, online: 175 },
  { month: 'Apr', groceries: 510, dining: 160, transport: 95, online: 120 },
  { month: 'May', groceries: 440, dining: 240, transport: 130, online: 160 },
  { month: 'Jun', groceries: 480, dining: 200, transport: 105, online: 210 },
];

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const tipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12 };
const chip = (active) => ({
  display: 'inline-flex', alignItems: 'center', gap: 6,
  font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 12, padding: '5px 12px', borderRadius: 999, cursor: 'pointer',
  border: '1px solid ' + (active ? 'var(--accent)' : 'var(--border)'),
  background: active ? 'var(--accent)' : 'transparent',
  color: active ? 'var(--accent-contrast)' : 'var(--muted)',
});
// Legend swatch mirrors the bar's hue + pattern so the two match at a glance.
const swatchStyle = (cat) => {
  const c = cat.series;
  const base = { width: 10, height: 10, borderRadius: 2, outline: '1px solid rgba(127,127,127,.35)', flex: 'none' };
  if (cat.pattern === 'hatch')
    return { ...base, background: `repeating-linear-gradient(45deg, ${c} 0 2px, var(--surface) 2px 4px)` };
  if (cat.pattern === 'dots')
    return { ...base, background: `radial-gradient(${c} 42%, var(--surface) 44%)`, backgroundSize: '4px 4px' };
  return { ...base, background: c };
};

// Locale-independent thousands separator: identical output on Node (SSR) and browser,
// so the hydrated island matches the server HTML (no React text-content mismatch).
const groupThousands = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function SpendChart() {
  const [on, setOn] = useState(() => Object.fromEntries(CATS.map((c) => [c.key, true])));
  const total = DATA.reduce((sum, row) => sum + CATS.reduce((s, c) => s + (on[c.key] ? row[c.key] : 0), 0), 0);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        <div role="group" aria-label="Toggle spending categories" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATS.map((c) => (
            <button key={c.key} type="button" onClick={() => setOn((o) => ({ ...o, [c.key]: !o[c.key] }))} aria-pressed={on[c.key]} style={chip(on[c.key])}>
              <span aria-hidden="true" style={swatchStyle(c)} />
              {c.label}
            </button>
          ))}
        </div>
        <div className="tnum" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)' }}>Total spend <strong style={{ color: 'var(--text)' }}>R {groupThousands(total)}</strong></div>
      </div>
      <div style={{ width: '100%', height: 300 }} role="img" aria-label="Monthly spend by category, stacked (synthetic sample). Groceries are the largest category each month.">
        <ResponsiveContainer>
          <BarChart data={DATA} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <defs>
              <pattern id="sp-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <rect width="6" height="6" fill="var(--series-1)" fillOpacity="0.5" />
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--series-1)" strokeWidth="3" />
              </pattern>
              <pattern id="sp-dots" patternUnits="userSpaceOnUse" width="6" height="6">
                <rect width="6" height="6" fill="var(--series-2)" fillOpacity="0.42" />
                <circle cx="3" cy="3" r="1.7" fill="var(--series-2)" />
              </pattern>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tipStyle} cursor={{ fill: 'rgba(127,127,127,.08)' }} />
            {CATS.filter((c) => on[c.key]).map((c) => (
              <Bar key={c.key} dataKey={c.key} name={c.label} stackId="spend" fill={c.fill} isAnimationActive={!reduceMotion} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
