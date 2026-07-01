// Embrulha cada <table> num <div class="table-scroll"> para permitir scroll
// horizontal em ecrãs estreitos (tabelas largas) e dar-lhe moldura/cantos.
export default function rehypeTabelas() {
  function walk(node) {
    if (!node.children) return;
    for (let i = 0; i < node.children.length; i++) {
      const filho = node.children[i];
      if (filho.type === 'element' && filho.tagName === 'table') {
        node.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-scroll'] },
          children: [filho],
        };
      } else {
        walk(filho);
      }
    }
  }
  return (tree) => walk(tree);
}
