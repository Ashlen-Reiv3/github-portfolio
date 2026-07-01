import { useState } from 'react';
import { Group } from '@visx/group';
import { scaleLinear, scaleSqrt } from '@visx/scale';

// Half-pitch in metres (goal at top), drawn into a fixed viewBox so the SVG
// scales responsively with no JS measuring — which also means it renders at
// SSR (visible without JS); hydration only adds the hover/focus detail line.
const PITCH = { W: 68, L: 52.5 };
const VB_W = 680;
const VB_H = Math.round((VB_W * PITCH.L) / PITCH.W); // 525
const M = 12;

const xS = scaleLinear({ domain: [0, PITCH.W], range: [M, VB_W - M] });
const yS = scaleLinear({ domain: [0, PITCH.L], range: [M, VB_H - M] });
const rS = scaleSqrt({ domain: [0, 0.8], range: [6, 30] });
const X = (v) => xS(v);
const Y = (v) => yS(v);
const RX = X(9.15) - X(0);
const RY = Y(9.15) - Y(0);
const LINE = 'var(--border-strong)';

const SHOTS = [
  { x: 34, y: 6, xg: 0.71, outcome: 'goal', minute: 78, player: 'Jesus' },
  { x: 34, y: 8, xg: 0.62, outcome: 'goal', minute: 23, player: 'Saka' },
  { x: 40, y: 10, xg: 0.41, outcome: 'saved', minute: 62, player: 'Saka' },
  { x: 33, y: 12, xg: 0.36, outcome: 'goal', minute: 84, player: 'Jesus' },
  { x: 30, y: 11, xg: 0.34, outcome: 'goal', minute: 67, player: 'Ødegaard' },
  { x: 29, y: 9, xg: 0.28, outcome: 'saved', minute: 49, player: 'Martinelli' },
  { x: 31, y: 14, xg: 0.22, outcome: 'saved', minute: 8, player: 'Havertz' },
  { x: 38, y: 13, xg: 0.18, outcome: 'saved', minute: 12, player: 'Martinelli' },
  { x: 45, y: 14, xg: 0.13, outcome: 'missed', minute: 5, player: 'White' },
  { x: 36, y: 19, xg: 0.11, outcome: 'saved', minute: 90, player: 'Trossard' },
  { x: 39, y: 17, xg: 0.1, outcome: 'saved', minute: 58, player: 'Ødegaard' },
  { x: 44, y: 16, xg: 0.09, outcome: 'missed', minute: 31, player: 'Saka' },
  { x: 27, y: 18, xg: 0.07, outcome: 'missed', minute: 40, player: 'Rice' },
  { x: 23, y: 22, xg: 0.05, outcome: 'missed', minute: 71, player: 'Trossard' },
  { x: 50, y: 20, xg: 0.04, outcome: 'missed', minute: 55, player: 'White' },
  { x: 34, y: 25, xg: 0.03, outcome: 'missed', minute: 35, player: 'Rice' },
];

const fillFor = (o) => (o === 'goal' ? 'var(--accent)' : o === 'saved' ? 'var(--muted)' : 'none');

export default function ShotMap() {
  const [sel, setSel] = useState(null);

  return (
    <div style={{ width: '100%' }}>
      <style>{`@keyframes smPop{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:scale(1)}}.sm-shot{transform-box:fill-box;transform-origin:center;animation:smPop .45s ease both;cursor:pointer}.sm-shot:focus-visible{outline:2px solid var(--accent);outline-offset:2px}`}</style>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: '100%', height: 'auto', maxWidth: 520, display: 'block', margin: '0 auto' }}
        role="img"
        aria-label="Shot map on a half-pitch: 16 shots, marker size by expected goals (xG); 4 converted near the penalty spot (illustrative sample)."
      >
        <rect x={X(0)} y={Y(0)} width={X(PITCH.W) - X(0)} height={Y(PITCH.L) - Y(0)} fill="none" stroke={LINE} strokeWidth="2" vectorEffect="non-scaling-stroke" rx="3" />
        <rect x={X(13.84)} y={Y(0)} width={X(54.16) - X(13.84)} height={Y(16.5) - Y(0)} fill="none" stroke={LINE} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <rect x={X(24.84)} y={Y(0)} width={X(43.16) - X(24.84)} height={Y(5.5) - Y(0)} fill="none" stroke={LINE} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <line x1={X(30.34)} y1={Y(0)} x2={X(37.66)} y2={Y(0)} stroke="var(--accent)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        <circle cx={X(34)} cy={Y(11)} r="2.5" fill={LINE} />
        <path d={`M ${X(26.69)} ${Y(16.5)} A ${RX} ${RY} 0 0 0 ${X(41.31)} ${Y(16.5)}`} fill="none" stroke={LINE} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d={`M ${X(24.85)} ${Y(52.5)} A ${RX} ${RY} 0 0 1 ${X(43.15)} ${Y(52.5)}`} fill="none" stroke={LINE} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

        <Group>
          {SHOTS.map((s, i) => (
            <circle
              key={i}
              className="sm-shot"
              cx={X(s.x)}
              cy={Y(s.y)}
              r={rS(s.xg)}
              fill={fillFor(s.outcome)}
              stroke={s.outcome === 'missed' ? 'var(--muted)' : 'none'}
              strokeWidth={s.outcome === 'missed' ? 2 : 0}
              fillOpacity={s.outcome === 'goal' ? 0.85 : 0.6}
              style={{ animationDelay: `${i * 28}ms` }}
              tabIndex={0}
              role="img"
              aria-label={`${s.player}, minute ${s.minute}: xG ${s.xg.toFixed(2)}, ${s.outcome}`}
              onMouseEnter={() => setSel(s)}
              onMouseLeave={() => setSel(null)}
              onFocus={() => setSel(s)}
              onBlur={() => setSel(null)}
            />
          ))}
        </Group>
      </svg>

      <p aria-live="polite" style={{ minHeight: '1.4em', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
        {sel ? (
          <span><strong style={{ color: 'var(--text)' }}>{sel.player}</strong> · {sel.minute}' · xG {sel.xg.toFixed(2)} · {sel.outcome}</span>
        ) : (
          'Hover or focus a shot for detail'
        )}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--accent)' }} /> Goal</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--muted)', opacity: 0.6 }} /> Saved</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: '50%', border: '2px solid var(--muted)' }} /> Missed</span>
        <span style={{ color: 'var(--faint)' }}>marker size = xG</span>
      </div>
    </div>
  );
}
