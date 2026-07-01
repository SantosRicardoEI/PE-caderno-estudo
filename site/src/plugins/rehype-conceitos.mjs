// Plugin rehype: envolve TODAS as ocorrências dos termos do glossário em
// <span class="conceito" data-conceito="id">...</span>.
// Ignora o interior de: a, code, pre, títulos, script/style e subárvores KaTeX.
import { conceitos } from '../data/conceitos.mjs';

// superfície (minúsculas) -> id
const mapa = new Map();
const superficies = [];
for (const c of conceitos) {
  for (const s of [c.termo, ...(c.aliases || [])]) {
    if (!s) continue;
    if (s.includes('$') || s.includes('\\')) continue; // formas matemáticas: só no glossário
    const key = s.toLocaleLowerCase('pt');
    if (!mapa.has(key)) {
      mapa.set(key, c.id);
      superficies.push(s);
    }
  }
}
// Termos mais longos primeiro (evita que "média" apanhe "média amostral").
superficies.sort((a, b) => b.length - a.length);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const RE = new RegExp(
  `(?<![\\p{L}\\p{N}])(${superficies.map(escapeRe).join('|')})(?![\\p{L}\\p{N}])`,
  'giu'
);

const TAGS_IGNORAR = new Set(['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'style', 'template', 'button']);

function temClasseIgnorar(node) {
  const cn = node.properties && node.properties.className;
  if (!cn) return false;
  const arr = Array.isArray(cn) ? cn : [cn];
  return arr.some((c) => {
    const s = String(c);
    return s.includes('katex') || s === 'math' || s.includes('no-gloss');
  });
}

function dividirTexto(value) {
  RE.lastIndex = 0;
  const out = [];
  let last = 0;
  let m;
  while ((m = RE.exec(value)) !== null) {
    const surface = m[1];
    const start = m.index;
    if (start > last) out.push({ type: 'text', value: value.slice(last, start) });
    const id = mapa.get(surface.toLocaleLowerCase('pt'));
    out.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['conceito'], dataConceito: id },
      children: [{ type: 'text', value: surface }],
    });
    last = start + surface.length;
  }
  if (out.length === 0) return null;
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

export default function rehypeConceitos() {
  return (tree) => walk(tree, false);
}

function walk(node, ignorar) {
  if (!node.children || node.children.length === 0) return;
  const ignorarAqui =
    ignorar ||
    (node.type === 'element' && (TAGS_IGNORAR.has(node.tagName) || temClasseIgnorar(node)));

  const novos = [];
  for (const child of node.children) {
    if (child.type === 'text' && !ignorarAqui) {
      const partes = dividirTexto(child.value);
      if (partes) novos.push(...partes);
      else novos.push(child);
    } else {
      if (child.type === 'element') walk(child, ignorarAqui);
      novos.push(child);
    }
  }
  node.children = novos;
}
