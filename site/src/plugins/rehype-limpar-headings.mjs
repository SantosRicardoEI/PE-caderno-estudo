// Remove o nó `.katex-mathml` (MathML + <annotation> com o LaTeX-fonte) de dentro
// dos títulos h1–h6. Assim o texto que o Astro extrai para a TOC fica limpo
// ("Bernoulli — X∼Ber(p)") em vez de triplicado com a anotação LaTeX. A parte
// visível (`.katex-html`) permanece, por isso o título na página não muda.
function temClasse(node, classe) {
  if (node.type !== 'element') return false;
  const c = node.properties?.className;
  return Array.isArray(c) ? c.includes(classe) : c === classe;
}

function limpar(node) {
  if (!node.children) return;
  node.children = node.children.filter((filho) => !temClasse(filho, 'katex-mathml'));
  node.children.forEach(limpar);
}

export default function rehypeLimparHeadings() {
  const ehTitulo = (n) => n.type === 'element' && /^h[1-6]$/.test(n.tagName);
  function walk(node) {
    if (!node.children) return;
    for (const filho of node.children) {
      if (ehTitulo(filho)) limpar(filho);
      else walk(filho);
    }
  }
  return (tree) => walk(tree);
}
