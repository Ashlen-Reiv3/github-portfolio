import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CATS = [
  { key: 'groceries', label: 'Groceries', color: '#6366f1' },
  { key: 'dining', label: 'Dining', color: '#14b8a6' },
  { key: 'transport', label: 'Transport', color: '#f59e0b' },
  { key: 'online', label: 'Online', color: '#ec4899' },
];
const DATA = [
  { month: 'Jan', groceries: 420, dining: 180, transport: 90, online: 140 },
  { month: 'Feb', groceries: 460, dining: 150, transport: 110, online: 90 },
  { month: 'Mar', groceries: 390, dining: 220, transport: 100, online: 175 },
  { month: 'Apr', groceries: 510, dining: 160, transport: 95, online: 120 },
  { month: 'May', groceries: 440, dining: 240, transport: 130, online: 160 },
  { month: 'Jun', groceries: 480, dining: 200, transport: 105, online: 210 },
];

const tipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' };
const chip = (active, color) => ({
  font: 'inherit', fontSize: 13, padding: '5px 12px', borderRadius: 999, cursor: 'pointer',
  border: '1px solid ' + (active ? color : 'var(--border)'),
  background: active ? color : 'transparent',
  color: active ? '#ffffff' : 'var(--muted)',
});

export default function SpendChart() {
  const [on, setOn] = useState(() => Object.fromEntries(CATS.map((c) => [c.key, true])));
  const total = DATA.reduce((sum, row) => sum + CATS.reduce((s, c) => s + (on[c.key] ? row[c.key] : 0), 0), 0);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        <div role="group" aria-label="Toggle spending categories" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATS.map((c) => (
            <button key={c.key} type="button" onClick={() => setOn((o) => ({ ...o, [c.key]: !o[c.key] }))} aria-pressed={on[c.key]} style={chip(on[c.key], c.color)}>{c.label}</button>
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>Total spend <strong style={{ color: 'var(--text)' }}>R {total.toLocaleString()}</strong></div>
      </div>
      <div style={{ width: '100%', height: 300 }} role="img" aria-label="Monthly spend by category (synthetic sample)">
        <ResponsiveContainer>
          <BarChart data={DATA} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tipStyle} cursor={{ fill: 'rgba(127,127,127,.08)' }} />
            {CATS.filter((c) => on[c.key]).map((c) => (
              <Bar key={c.key} dataKey={c.key} name={c.label} stackId="spend" fill={c.color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
