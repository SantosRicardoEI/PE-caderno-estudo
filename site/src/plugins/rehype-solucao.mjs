// Torna a secção de solução recolhível: encontra o título cujo texto é exatamente
// "Solução" e envolve esse título + tudo o que vem a seguir num
// <details class="ex-sol"><summary>Ver solução</summary> … </details>.
// Assim o aluno pode tentar o exercício antes de ver a resolução.
// (Nenhuma página do caderno usa um título "Solução", por isso é seguro global.)
function texto(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(texto).join('');
  return '';
}

export default function rehypeSolucao() {
  const ehTitulo = (n) => n.type === 'element' && /^h[1-6]$/.test(n.tagName);
  return (tree) => {
    if (!tree.children) return;
    const idx = tree.children.findIndex(
      (n) => ehTitulo(n) && texto(n).trim().toLowerCase() === 'solução'
    );
    if (idx === -1) return;

    const seguintes = tree.children.slice(idx + 1);
    const details = {
      type: 'element',
      tagName: 'details',
      properties: { className: ['ex-sol'] },
      children: [
        {
          type: 'element',
          tagName: 'summary',
          properties: { className: ['ex-sol__resumo'] },
          children: [{ type: 'text', value: 'Ver solução' }],
        },
        {
          type: 'element',
          tagName: 'div',
          properties: { className: ['ex-sol__corpo'] },
          children: seguintes,
        },
      ],
    };
    tree.children = tree.children.slice(0, idx).concat([details]);
  };
}
