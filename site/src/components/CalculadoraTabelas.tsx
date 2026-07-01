import { useState } from 'preact/hooks';
import { normalCdf, normalInv, tInv, chiInv, binomCdf, binomPmf, fmt } from '../lib/stats';

type Tab = 'normal' | 't' | 'chi' | 'binom';

function num(v: string): number {
  return parseFloat(String(v).replace(',', '.'));
}

function Campo(props: { label: any; value: string; onInput: (v: string) => void; step?: string; min?: string; max?: string; hint?: string }) {
  return (
    <label class="calc-campo">
      <span class="calc-campo__lbl">{props.label}</span>
      <input
        type="number"
        value={props.value}
        step={props.step ?? 'any'}
        min={props.min}
        max={props.max}
        onInput={(e) => props.onInput((e.target as HTMLInputElement).value)}
      />
      {props.hint && <span class="calc-campo__hint">{props.hint}</span>}
    </label>
  );
}

function Resultado({ children }: { children: any }) {
  return <div class="calc-res">{children}</div>;
}

function TabNormal() {
  const [z, setZ] = useState('1.16');
  const [p, setP] = useState('0.975');
  const zv = num(z);
  const pv = num(p);
  const phi = Number.isFinite(zv) ? normalCdf(zv) : NaN;
  const quant = pv > 0 && pv < 1 ? normalInv(pv) : NaN;
  return (
    <div class="calc-cols">
      <div class="calc-tool">
        <h4>Φ(z) — probabilidade acumulada</h4>
        <Campo label="z" value={z} onInput={setZ} />
        <Resultado>
          <div><b>Φ({fmt(zv, 2)}) = {fmt(phi)}</b></div>
          <div class="calc-sub">1 − Φ(z) = P(Z &gt; z) = {fmt(1 - phi)}</div>
          <div class="calc-sub">Φ(−z) = {fmt(Number.isFinite(zv) ? 1 - phi : NaN)}</div>
        </Resultado>
        <p class="calc-nota">Na tabela: linha = unidades + 1.ª decimal; coluna = 2.ª decimal. Para z negativo usa Φ(−z)=1−Φ(z).</p>
      </div>
      <div class="calc-tool">
        <h4>Φ⁻¹(p) — quantil</h4>
        <Campo label="p" value={p} onInput={setP} step="0.001" min="0" max="1" hint="0 &lt; p &lt; 1" />
        <div class="calc-chips">
          {['0.9', '0.95', '0.975', '0.99', '0.995'].map((q) => (
            <button type="button" class="calc-chip" onClick={() => setP(q)}>{q}</button>
          ))}
        </div>
        <Resultado>
          <div><b>Φ⁻¹({fmt(pv, 3)}) = {fmt(quant)}</b></div>
          <div class="calc-sub">IC/teste bilateral a {fmt((2 * pv - 1) * 100, 1)}% ⟶ z = {fmt(quant)}</div>
        </Resultado>
        <p class="calc-nota">Para um IC/teste bilateral a (1−α), usa p = 1 − α/2. Ex.: 95% → p = 0,975 → z = 1,96.</p>
      </div>
    </div>
  );
}

function TabT() {
  const [df, setDf] = useState('11');
  const [p, setP] = useState('0.975');
  const dfv = Math.round(num(df));
  const pv = num(p);
  const q = dfv >= 1 && pv > 0 && pv < 1 ? tInv(pv, dfv) : NaN;
  return (
    <div class="calc-tool">
      <h4>Quantil da t-Student · t<sub>ν</sub></h4>
      <div class="calc-row">
        <Campo label="ν (graus de liberdade = n−1)" value={df} onInput={setDf} step="1" min="1" />
        <Campo label="p (acumulada)" value={p} onInput={setP} step="0.001" min="0" max="1" />
      </div>
      <div class="calc-chips">
        {['0.9', '0.95', '0.975', '0.99', '0.995'].map((v) => (
          <button type="button" class="calc-chip" onClick={() => setP(v)}>{v}</button>
        ))}
      </div>
      <Resultado>
        <div><b>F⁻¹<sub>t({dfv})</sub>({fmt(pv, 3)}) = {fmt(q)}</b></div>
        <div class="calc-sub">IC/teste da média (σ desconhecido), bilateral a {fmt((2 * pv - 1) * 100, 1)}%.</div>
      </Resultado>
      <p class="calc-nota">Usa-se para a média com variância desconhecida. Simétrica: F⁻¹(α/2) = −F⁻¹(1−α/2).</p>
    </div>
  );
}

function TabChi() {
  const [df, setDf] = useState('9');
  const [alpha, setAlpha] = useState('0.01');
  const dfv = Math.round(num(df));
  const a = num(alpha);
  const ok = dfv >= 1 && a > 0 && a < 1;
  const qa = ok ? chiInv(a / 2, dfv) : NaN;
  const qb = ok ? chiInv(1 - a / 2, dfv) : NaN;
  const qAjust = ok ? chiInv(1 - a, dfv) : NaN;
  return (
    <div class="calc-tool">
      <h4>Quantis do qui-quadrado · χ²<sub>ν</sub></h4>
      <div class="calc-row">
        <Campo label="ν (graus de liberdade)" value={df} onInput={setDf} step="1" min="1" />
        <Campo label="α (nível de significância)" value={alpha} onInput={setAlpha} step="0.005" min="0" max="1" />
      </div>
      <Resultado>
        <div class="calc-blk">
          <b>IC da variância</b> (dois quantis):
          <div class="calc-sub">a = F⁻¹(α/2) = <b>{fmt(qa)}</b></div>
          <div class="calc-sub">b = F⁻¹(1−α/2) = <b>{fmt(qb)}</b></div>
          <div class="calc-sub">IC: ] (n−1)s²/b , (n−1)s²/a [</div>
        </div>
        <div class="calc-blk">
          <b>Teste de ajustamento</b> (um quantil à direita):
          <div class="calc-sub">c = F⁻¹(1−α) = <b>{fmt(qAjust)}</b></div>
        </div>
      </Resultado>
      <p class="calc-nota">Assimétrica e só positiva: no IC da variância precisas de dois quantis diferentes.</p>
    </div>
  );
}

function TabBinom() {
  const [n, setN] = useState('15');
  const [p, setP] = useState('0.05');
  const [x, setX] = useState('2');
  const nv = Math.round(num(n));
  const pv = num(p);
  const xv = Math.round(num(x));
  const ok = nv >= 1 && pv >= 0 && pv <= 1 && xv >= 0 && xv <= nv;
  const eq = ok ? binomPmf(xv, nv, pv) : NaN;
  const le = ok ? binomCdf(xv, nv, pv) : NaN;
  const lt = ok && xv >= 1 ? binomCdf(xv - 1, nv, pv) : xv === 0 ? 0 : NaN;
  const ge = ok ? 1 - lt : NaN;
  const gt = ok ? 1 - le : NaN;
  return (
    <div class="calc-tool">
      <h4>Binomial · X ~ Bin(n, p)</h4>
      <div class="calc-row calc-row--3">
        <Campo label="n" value={n} onInput={setN} step="1" min="1" />
        <Campo label="p" value={p} onInput={setP} step="0.01" min="0" max="1" />
        <Campo label="x" value={x} onInput={setX} step="1" min="0" />
      </div>
      <Resultado>
        <div><b>P(X = {xv}) = {fmt(eq)}</b></div>
        <div class="calc-sub">P(X ≤ {xv}) = {fmt(le)} &nbsp;·&nbsp; P(X &lt; {xv}) = {fmt(lt)}</div>
        <div class="calc-sub">P(X ≥ {xv}) = {fmt(ge)} &nbsp;·&nbsp; P(X &gt; {xv}) = {fmt(gt)}</div>
        <div class="calc-sub">E(X) = np = {fmt(nv * pv, 3)} &nbsp;·&nbsp; V(X) = np(1−p) = {fmt(nv * pv * (1 - pv), 3)}</div>
      </Resultado>
      <p class="calc-nota">A tabela dá P(X ≤ x) direto (n ≤ 20). Para "pelo menos k": P(X ≥ k) = 1 − F(k−1). Se p &gt; 0,5, usa os insucessos.</p>
    </div>
  );
}

const TABS: { id: Tab; rot: string }[] = [
  { id: 'normal', rot: 'Normal (Φ)' },
  { id: 't', rot: 't-Student' },
  { id: 'chi', rot: 'Qui-quadrado' },
  { id: 'binom', rot: 'Binomial' },
];

export default function CalculadoraTabelas() {
  const [tab, setTab] = useState<Tab>('normal');
  return (
    <div class="calc">
      <div class="calc__tabs" role="tablist" aria-label="Escolher tabela">
        {TABS.map((t) => (
          <button
            role="tab"
            aria-selected={tab === t.id}
            class={`calc__tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.rot}
          </button>
        ))}
      </div>
      <div class="calc__body">
        {tab === 'normal' && <TabNormal />}
        {tab === 't' && <TabT />}
        {tab === 'chi' && <TabChi />}
        {tab === 'binom' && <TabBinom />}
      </div>
    </div>
  );
}
