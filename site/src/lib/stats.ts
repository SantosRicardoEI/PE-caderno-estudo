// Funções estatísticas partilhadas (calculadoras + visualizadores).
// Inversas de CDF via jstat (validadas contra as tabelas oficiais); densidades manuais.
import jstatPkg from 'jstat';
// jstat exporta { jStat } e/ou default consoante o bundler
const jStat: any = (jstatPkg as any).jStat ?? jstatPkg;

// --- Normal padrão ---
export const normalCdf = (z: number): number => jStat.normal.cdf(z, 0, 1);
export const normalInv = (p: number): number => jStat.normal.inv(p, 0, 1);
export const normalPdf = (x: number, mu = 0, s = 1): number =>
  Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

// --- t-Student ---
export const tInv = (p: number, df: number): number => jStat.studentt.inv(p, df);
export const tCdf = (x: number, df: number): number => jStat.studentt.cdf(x, df);

// --- Qui-quadrado ---
export const chiInv = (p: number, df: number): number => jStat.chisquare.inv(p, df);
export const chiCdf = (x: number, df: number): number => jStat.chisquare.cdf(x, df);

// --- Binomial ---
export const binomPmf = (k: number, n: number, p: number): number => jStat.binomial.pdf(k, n, p);
export const binomCdf = (k: number, n: number, p: number): number => jStat.binomial.cdf(k, n, p);

// --- Densidades/pmf para os visualizadores ---
export const expPdf = (x: number, lambda: number): number => (x < 0 ? 0 : lambda * Math.exp(-lambda * x));
export const expCdf = (x: number, lambda: number): number => (x < 0 ? 0 : 1 - Math.exp(-lambda * x));
export const uniformPdf = (x: number, a: number, b: number): number => (x >= a && x <= b ? 1 / (b - a) : 0);

function lnFact(n: number): number {
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
}
export const poissonPmf = (k: number, lambda: number): number =>
  k < 0 ? 0 : Math.exp(-lambda + k * Math.log(lambda) - lnFact(k));
export const geomPmf = (k: number, p: number): number => (k < 1 ? 0 : Math.pow(1 - p, k - 1) * p);
export const bernoulliPmf = (k: number, p: number): number => (k === 1 ? p : k === 0 ? 1 - p : 0);

// CDFs contínuas com parâmetros de localização/escala
export const normalCdfMS = (x: number, mu: number, s: number): number => jStat.normal.cdf(x, mu, s);
export const uniformCdf = (x: number, a: number, b: number): number =>
  x <= a ? 0 : x >= b ? 1 : (x - a) / (b - a);

// CDFs discretas por soma acumulada (k inteiro)
export const poissonCdf = (k: number, lambda: number): number => {
  let s = 0;
  for (let i = 0; i <= Math.floor(k); i++) s += poissonPmf(i, lambda);
  return s;
};
export const geomCdf = (k: number, p: number): number => (k < 1 ? 0 : 1 - Math.pow(1 - p, Math.floor(k)));

// --- Formatação (vírgula decimal PT, 4 casas por defeito) ---
export function fmt(x: number, d = 4): string {
  if (!Number.isFinite(x)) return '—';
  return x.toFixed(d).replace('.', ',');
}
