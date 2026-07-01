import { useMemo, useState } from 'preact/hooks';
import {
  binomPmf, binomCdf, poissonPmf, poissonCdf, geomPmf, geomCdf, bernoulliPmf,
  normalPdf, normalCdfMS, expPdf, expCdf, uniformPdf, uniformCdf, fmt,
} from '../lib/stats';

// ---------------------------------------------------------------------------
// Registo de distribuições. Cada uma sabe: densidade/prob, CDF, E, V, domínio.
// ---------------------------------------------------------------------------
type Par = { key: string; label: string; min: number; max: number; step: number; def: number };
type Vals = Record<string, number>;
interface Dist {
  id: string;
  nome: string;
  tipo: 'discreta' | 'continua';
  pars: Par[];
  f: (x: number, v: Vals) => number;      // pmf ou pdf
  cdf: (x: number, v: Vals) => number;    // P(X ≤ x)
  E: (v: Vals) => number;
  V: (v: Vals) => number;
  dominio: (v: Vals) => { lo: number; hi: number }; // eixo x
  formula: string;                         // texto curto do modelo
}

const DISTS: Dist[] = [
  {
    id: 'bernoulli', nome: 'Bernoulli', tipo: 'discreta',
    pars: [{ key: 'p', label: 'p', min: 0, max: 1, step: 0.01, def: 0.3 }],
    f: (x, v) => bernoulliPmf(x, v.p),
    cdf: (x, v) => (x < 0 ? 0 : x < 1 ? 1 - v.p : 1),
    E: (v) => v.p, V: (v) => v.p * (1 - v.p),
    dominio: () => ({ lo: 0, hi: 1 }),
    formula: 'X ∈ {0,1}, P(X=1)=p',
  },
  {
    id: 'binomial', nome: 'Binomial', tipo: 'discreta',
    pars: [
      { key: 'n', label: 'n', min: 1, max: 40, step: 1, def: 15 },
      { key: 'p', label: 'p', min: 0, max: 1, step: 0.01, def: 0.3 },
    ],
    f: (x, v) => binomPmf(x, v.n, v.p),
    cdf: (x, v) => binomCdf(Math.floor(x), v.n, v.p),
    E: (v) => v.n * v.p, V: (v) => v.n * v.p * (1 - v.p),
    dominio: (v) => ({ lo: 0, hi: v.n }),
    formula: 'nº de sucessos em n provas independentes',
  },
  {
    id: 'poisson', nome: 'Poisson', tipo: 'discreta',
    pars: [{ key: 'lambda', label: 'λ', min: 0.1, max: 20, step: 0.1, def: 3 }],
    f: (x, v) => poissonPmf(x, v.lambda),
    cdf: (x, v) => poissonCdf(Math.floor(x), v.lambda),
    E: (v) => v.lambda, V: (v) => v.lambda,
    dominio: (v) => ({ lo: 0, hi: Math.ceil(v.lambda + 4 * Math.sqrt(v.lambda) + 2) }),
    formula: 'nº de ocorrências num intervalo, taxa λ',
  },
  {
    id: 'geometrica', nome: 'Geométrica', tipo: 'discreta',
    pars: [{ key: 'p', label: 'p', min: 0.02, max: 1, step: 0.01, def: 0.3 }],
    f: (x, v) => geomPmf(x, v.p),
    cdf: (x, v) => geomCdf(Math.floor(x), v.p),
    E: (v) => 1 / v.p, V: (v) => (1 - v.p) / (v.p * v.p),
    dominio: (v) => ({ lo: 1, hi: Math.max(6, Math.ceil((Math.log(0.01) / Math.log(1 - v.p)))) }),
    formula: 'nº de provas até ao 1.º sucesso (X ≥ 1)',
  },
  {
    id: 'normal', nome: 'Normal', tipo: 'continua',
    pars: [
      { key: 'mu', label: 'μ', min: -10, max: 10, step: 0.5, def: 0 },
      { key: 'sigma', label: 'σ', min: 0.3, max: 6, step: 0.1, def: 1 },
    ],
    f: (x, v) => normalPdf(x, v.mu, v.sigma),
    cdf: (x, v) => normalCdfMS(x, v.mu, v.sigma),
    E: (v) => v.mu, V: (v) => v.sigma * v.sigma,
    dominio: (v) => ({ lo: v.mu - 4 * v.sigma, hi: v.mu + 4 * v.sigma }),
    formula: 'X ~ N(μ, σ²) — simétrica em torno de μ',
  },
  {
    id: 'exponencial', nome: 'Exponencial', tipo: 'continua',
    pars: [{ key: 'lambda', label: 'λ', min: 0.1, max: 5, step: 0.1, def: 1 }],
    f: (x, v) => expPdf(x, v.lambda),
    cdf: (x, v) => expCdf(x, v.lambda),
    E: (v) => 1 / v.lambda, V: (v) => 1 / (v.lambda * v.lambda),
    dominio: (v) => ({ lo: 0, hi: 5 / v.lambda }),
    formula: 'tempo até ocorrência, taxa λ (sem memória)',
  },
  {
    id: 'uniforme', nome: 'Uniforme', tipo: 'continua',
    pars: [
      { key: 'a', label: 'a', min: -10, max: 10, step: 0.5, def: 0 },
      { key: 'b', label: 'b', min: -10, max: 12, step: 0.5, def: 4 },
    ],
    f: (x, v) => uniformPdf(x, v.a, v.b),
    cdf: (x, v) => uniformCdf(x, v.a, v.b),
    E: (v) => (v.a + v.b) / 2, V: (v) => ((v.b - v.a) ** 2) / 12,
    dominio: (v) => ({ lo: v.a - (v.b - v.a) * 0.15, hi: v.b + (v.b - v.a) * 0.15 }),
    formula: 'X ~ U(a, b) — densidade constante em [a, b]',
  },
];

// ---------------------------------------------------------------------------
// Geometria do gráfico SVG
// ---------------------------------------------------------------------------
const W = 560, H = 320, M = { t: 16, r: 16, b: 40, l: 48 };
const PW = W - M.l - M.r, PH = H - M.t - M.b;

function fmtEixo(x: number): string {
  const r = Math.abs(x) >= 100 ? Math.round(x) : Math.round(x * 100) / 100;
  return String(r).replace('.', ',');
}

interface Ponto { x: number; y: number; dentro: boolean }

function Grafico(props: {
  tipo: 'discreta' | 'continua';
  modo: 'f' | 'cdf';
  pts: Ponto[];        // discreta: 1 por inteiro; continua: amostragem fina
  lo: number; hi: number; ymax: number;
  labelY: string;
}) {
  const { tipo, modo, pts, lo, hi, ymax } = props;
  const sx = (x: number) => M.l + ((x - lo) / (hi - lo)) * PW;
  const sy = (y: number) => M.t + PH - (y / ymax) * PH;

  // ticks x (≈6) e y (5)
  const nx = 6;
  const xticks = Array.from({ length: nx + 1 }, (_, i) => lo + ((hi - lo) * i) / nx);
  const yticks = Array.from({ length: 5 }, (_, i) => (ymax * i) / 4);

  let corpo: any = null;
  if (tipo === 'discreta' && modo === 'f') {
    const bw = Math.min(28, (PW / pts.length) * 0.7);
    corpo = pts.map((p) => (
      <g>
        <rect
          class={p.dentro ? 'vd-bar vd-bar--on' : 'vd-bar'}
          x={sx(p.x) - bw / 2} y={sy(p.y)} width={bw} height={M.t + PH - sy(p.y)}
        />
      </g>
    ));
  } else {
    // linha (contínua pdf/cdf, ou cdf discreta em degraus)
    let d = '';
    if (tipo === 'discreta' && modo === 'cdf') {
      pts.forEach((p, i) => {
        const x0 = i === 0 ? lo : pts[i - 1].x;
        d += `${i === 0 ? 'M' : 'L'} ${sx(x0)} ${sy(p.y)} L ${sx(p.x)} ${sy(p.y)} `;
      });
    } else {
      d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)} ${sy(p.y)}`).join(' ');
    }
    // área sombreada (só na pdf/pmf contínua dentro do intervalo)
    let area: any = null;
    if (modo === 'f' && tipo === 'continua') {
      const seg = pts.filter((p) => p.dentro);
      if (seg.length > 1) {
        const ad = `M ${sx(seg[0].x)} ${sy(0)} ` +
          seg.map((p) => `L ${sx(p.x)} ${sy(p.y)}`).join(' ') +
          ` L ${sx(seg[seg.length - 1].x)} ${sy(0)} Z`;
        area = <path class="vd-area" d={ad} />;
      }
    }
    corpo = <g>{area}<path class="vd-linha" d={d} fill="none" /></g>;
  }

  return (
    <svg class="vd-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Gráfico da distribuição">
      {/* grelha + ticks y */}
      {yticks.map((t) => (
        <g>
          <line class="vd-grid" x1={M.l} y1={sy(t)} x2={M.l + PW} y2={sy(t)} />
          <text class="vd-tick" x={M.l - 8} y={sy(t) + 4} text-anchor="end">{fmtEixo(t)}</text>
        </g>
      ))}
      {/* ticks x */}
      {xticks.map((t) => (
        <text class="vd-tick" x={sx(t)} y={M.t + PH + 22} text-anchor="middle">{fmtEixo(t)}</text>
      ))}
      {/* eixos */}
      <line class="vd-eixo" x1={M.l} y1={M.t} x2={M.l} y2={M.t + PH} />
      <line class="vd-eixo" x1={M.l} y1={M.t + PH} x2={M.l + PW} y2={M.t + PH} />
      {corpo}
      <text class="vd-axlbl" x={M.l + PW / 2} y={H - 4} text-anchor="middle">x</text>
      <text class="vd-axlbl" x={14} y={M.t + PH / 2} text-anchor="middle"
        transform={`rotate(-90 14 ${M.t + PH / 2})`}>{props.labelY}</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
function num(v: string): number { return parseFloat(String(v).replace(',', '.')); }

export default function VisualizadorDistribuicao(props: { inicial?: string }) {
  const [distId, setDistId] = useState(props.inicial ?? 'binomial');
  const dist = DISTS.find((d) => d.id === distId)!;

  const [vals, setVals] = useState<Vals>(() =>
    Object.fromEntries(dist.pars.map((p) => [p.key, p.def])));
  const [modo, setModo] = useState<'f' | 'cdf'>('f');
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  // ao trocar de distribuição, repõe parâmetros por defeito
  function trocar(id: string) {
    const d = DISTS.find((x) => x.id === id)!;
    setDistId(id);
    setVals(Object.fromEntries(d.pars.map((p) => [p.key, p.def])));
    setA(''); setB('');
  }
  function setPar(k: string, x: number) { setVals((s) => ({ ...s, [k]: x })); }

  const { lo, hi } = dist.dominio(vals);
  const av = a.trim() === '' ? -Infinity : num(a);
  const bv = b.trim() === '' ? Infinity : num(b);

  const { pts, ymax } = useMemo(() => {
    let p: Ponto[] = [];
    let ym = 0;
    if (dist.tipo === 'discreta') {
      for (let k = Math.round(lo); k <= Math.round(hi); k++) {
        const y = modo === 'f' ? dist.f(k, vals) : dist.cdf(k, vals);
        p.push({ x: k, y, dentro: k >= av && k <= bv });
        ym = Math.max(ym, y);
      }
    } else {
      const N = 240;
      for (let i = 0; i <= N; i++) {
        const x = lo + ((hi - lo) * i) / N;
        const y = modo === 'f' ? dist.f(x, vals) : dist.cdf(x, vals);
        p.push({ x, y, dentro: x >= av && x <= bv });
        ym = Math.max(ym, y);
      }
    }
    return { pts: p, ymax: modo === 'cdf' ? 1 : ym * 1.12 || 1 };
  }, [distId, JSON.stringify(vals), modo, a, b]);

  // Probabilidade do intervalo selecionado
  const temInt = a.trim() !== '' || b.trim() !== '';
  const prob = useMemo(() => {
    if (!temInt) return null;
    if (dist.tipo === 'discreta') {
      const hiK = bv === Infinity ? Math.round(hi) : Math.floor(bv);
      const loK = av === -Infinity ? Math.round(lo) : Math.ceil(av);
      let s = 0;
      for (let k = loK; k <= hiK; k++) s += dist.f(k, vals);
      return s;
    }
    const Fb = bv === Infinity ? 1 : dist.cdf(bv, vals);
    const Fa = av === -Infinity ? 0 : dist.cdf(av, vals);
    return Fb - Fa;
  }, [distId, JSON.stringify(vals), a, b]);

  const rotIntervalo = (() => {
    const la = av === -Infinity ? null : fmt(av, 2);
    const lb = bv === Infinity ? null : fmt(bv, 2);
    const sym = dist.tipo === 'discreta' ? '≤ X ≤' : '≤ X ≤';
    if (la && lb) return `P(${la} ${sym} ${lb})`;
    if (lb) return dist.tipo === 'discreta' ? `P(X ≤ ${lb})` : `P(X ≤ ${lb})`;
    if (la) return `P(X ≥ ${la})`;
    return '';
  })();

  return (
    <div class="vd">
      <div class="vd__tabs" role="tablist" aria-label="Escolher distribuição">
        {DISTS.map((d) => (
          <button role="tab" aria-selected={d.id === distId}
            class={`vd__tab ${d.id === distId ? 'active' : ''}`} onClick={() => trocar(d.id)}>
            {d.nome}
          </button>
        ))}
      </div>

      <p class="vd__desc">{dist.formula}</p>

      <div class="vd__grid">
        <div class="vd__painel">
          {dist.pars.map((p) => (
            <label class="vd-slider">
              <span class="vd-slider__lbl">{p.label} = <b>{fmt(vals[p.key], p.step < 1 ? 2 : 0)}</b></span>
              <input type="range" min={p.min} max={p.max} step={p.step}
                value={vals[p.key]} onInput={(e) => setPar(p.key, num((e.target as HTMLInputElement).value))} />
            </label>
          ))}

          <div class="vd-toggle" role="tablist" aria-label="Função">
            <button class={modo === 'f' ? 'active' : ''} onClick={() => setModo('f')}>
              {dist.tipo === 'discreta' ? 'Massa (PMF)' : 'Densidade (PDF)'}
            </button>
            <button class={modo === 'cdf' ? 'active' : ''} onClick={() => setModo('cdf')}>Acumulada (CDF)</button>
          </div>

          <div class="vd-int">
            <span class="vd-int__t">Probabilidade de um intervalo</span>
            <div class="vd-int__row">
              <label>a <input type="number" value={a} placeholder="−∞"
                onInput={(e) => setA((e.target as HTMLInputElement).value)} /></label>
              <label>b <input type="number" value={b} placeholder="+∞"
                onInput={(e) => setB((e.target as HTMLInputElement).value)} /></label>
            </div>
            {temInt && prob != null && (
              <div class="vd-int__res">{rotIntervalo} = <b>{fmt(prob)}</b></div>
            )}
          </div>

          <div class="vd-ev">
            <div><span>E(X)</span><b>{fmt(dist.E(vals), 3)}</b></div>
            <div><span>V(X)</span><b>{fmt(dist.V(vals), 3)}</b></div>
            <div><span>σ</span><b>{fmt(Math.sqrt(dist.V(vals)), 3)}</b></div>
          </div>
        </div>

        <div class="vd__chart">
          <Grafico tipo={dist.tipo} modo={modo} pts={pts} lo={lo} hi={hi} ymax={ymax}
            labelY={modo === 'cdf' ? 'F(x)' : dist.tipo === 'discreta' ? 'P(X=x)' : 'f(x)'} />
        </div>
      </div>
    </div>
  );
}
