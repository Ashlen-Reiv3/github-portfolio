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

const tipStyle = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' };
const btnStyle = (active) => ({
  font: 'inherit', fontSize: 13, padding: '5px 12px', borderRadius: 999, cursor: 'pointer',
  border: '1px solid ' + (active ? 'var(--accent)' : 'var(--border)'),
  background: active ? 'var(--accent)' : 'transparent',
  color: active ? 'var(--accent-contrast)' : 'var(--muted)',
});

export default function XgChart() {
  const [season, setSeason] = useState(SEASONS[0]);
  return (
    <div>
      <div role="group" aria-label="Season" style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {SEASONS.map((s) => (
          <button key={s} type="button" onClick={() => setSeason(s)} aria-pressed={s === season} style={btnStyle(s === season)}>{s}</button>
        ))}
      </div>
      <div style={{ width: '100%', height: 300 }} role="img" aria-label={`Expected versus actual goals by team, ${season} (illustrative)`}>
        <ResponsiveContainer>
          <BarChart data={DATA[season]} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="team" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tipStyle} cursor={{ fill: 'rgba(127,127,127,.08)' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="xG" name="Expected goals" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="goals" name="Actual goals" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
