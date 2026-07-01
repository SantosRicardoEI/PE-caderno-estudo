import katex from 'katex';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inlineMd(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Renderiza uma definição (texto com $matemática$, **negrito**, `código`) em HTML.
export function renderDefinicao(def) {
  const partes = String(def).split(/(\$[^$]+\$)/g);
  return partes
    .map((p) => {
      if (p.length > 1 && p.startsWith('$') && p.endsWith('$')) {
        try {
          return katex.renderToString(p.slice(1, -1), { throwOnError: false, strict: false });
        } catch {
          return esc(p);
        }
      }
      return inlineMd(p);
    })
    .join('');
}

// Constrói o mapa { id -> { termoHtml, html, href } } para o cliente.
export function construirDados(conceitos) {
  const dados = {};
  for (const c of conceitos) {
    dados[c.id] = {
      termoHtml: renderDefinicao(c.termo),
      html: renderDefinicao(c.def),
      href: c.href || null,
    };
  }
  return dados;
}
