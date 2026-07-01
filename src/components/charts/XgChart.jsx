import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const DATA = {
  '2024/25': [
    { team: 'Arsenal', xG: 71, goals: 78 },
    { team: 'Man City', xG: 80, goals: 76 },
    { team: 'Liverpool', xG: 74, goals: 77 },
    { team: 'Spurs', xG: 66, goals: 63 },
    { team: 'Newcastle', xG: 61, goals: 68 },
    { team: 'Brighton', xG: 58, goals: 55 },
  ],
  '2023/24': [
    { team: 'Arsenal', xG: 73, goals: 91 },
    { team: 'Man City', xG: 82, goals: 96 },
    { team: 'Liverpool', xG: 79, goals: 86 },
    { team: 'Spurs', xG: 64, goals: 74 },
    { team: 'Newcastle', xG: 70, goals: 85 },
    { team: 'Brighton', xG: 60, goals: 57 },
  ],
};
const SEASONS = Object.keys(DATA);

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const tipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12 };
const btnStyle = (active) => ({
  font: 'inherit', fontFamily: 'var(--font-mono)', fontSize: 12, padding: '5px 12px', borderRadius: 999, cursor: 'pointer',
  border: '1px solid ' + (active ? 'var(--accent)' : 'var(--border)'),
  background: active ? 'var(--accent)' : 'transparent',
  color: active ? 'var(--accent-contrast)' : 'var(--muted)',
});

export default function XgChart() {
  const [season, setSeason] = useState(SEASONS[0]);
  return (
    <div>
      {/* Expected (hatched) vs actual (solid) can wash together in dark mode — boost the
          hatch fill + line weight there so the two series stay distinct. */}
      <style>{`
        .xg-hatch-bg { fill: var(--series-3); fill-opacity: 0.16; }
        .xg-hatch-line { stroke: var(--series-3); stroke-width: 3; }
        [data-theme="dark"] .xg-hatch-bg { fill-opacity: 0.36; }
        [data-theme="dark"] .xg-hatch-line { stroke-width: 3.6; }
      `}</style>
      <div role="group" aria-label="Season" style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {SEASONS.map((s) => (
          <button key={s} type="button" onClick={() => setSeason(s)} aria-pressed={s === season} style={btnStyle(s === season)}>{s}</button>
        ))}
      </div>
      <div style={{ width: '100%', height: 300 }} role="img" aria-label={`Expected versus actual goals by team, ${season}. Bars above their expected-goals value over-performed (illustrative sample).`}>
        <ResponsiveContainer>
          <BarChart data={DATA[season]} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <defs>
              <pattern id="xg-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <rect className="xg-hatch-bg" width="6" height="6" />
                <line className="xg-hatch-line" x1="0" y1="0" x2="0" y2="6" />
              </pattern>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="team" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tipStyle} cursor={{ fill: 'rgba(127,127,127,.08)' }} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
            <Bar dataKey="xG" name="Expected goals (hatched)" fill="url(#xg-hatch)" stroke="var(--series-3)" strokeWidth={1} radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
            <Bar dataKey="goals" name="Actual goals (solid)" fill="var(--series-1)" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
