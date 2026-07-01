# Site de estudo — Probabilidade e Estatística (Teste 2)

Site interativo gerado a partir do caderno de estudo (`../caderno_estudo/`). Núcleo:
**tooltips de conceitos** (passar o rato/foco por cima de um termo mostra a definição, em
todas as ocorrências), ligações cruzadas entre temas, calculadoras de tabelas e
visualizadores de distribuições.

## Stack

- **Astro** (site estático) + **Preact** (ilhas interativas)
- **KaTeX** (`remark-math` + `rehype-katex`) para o LaTeX
- **jStat** para as funções estatísticas (validadas contra as tabelas oficiais)
- **@floating-ui/dom** para o posicionamento acessível dos tooltips
- Plugin `rehype-conceitos` que envolve automaticamente os termos do glossário

## Executar

```bash
npm install
npm run dev      # servidor local (http://localhost:4321)
npm run build    # gera o site estático em dist/
npm run preview  # pré-visualiza o build
```

## Estrutura

- `src/content/caderno/*.md` — os 13 temas (fonte canónica, com frontmatter). Editar aqui.
- `src/data/conceitos.mjs` — glossário (~90 conceitos) que alimenta tooltips + `/glossario`.
- `src/plugins/rehype-conceitos.mjs` — auto-tooltips (todas as ocorrências, ignora
  código/math/links/títulos).
- `src/components/CalculadoraTabelas.tsx` — Φ(z)/Φ⁻¹, quantis t e χ², Binomial.
- `src/components/VisualizadorDistribuicao.tsx` — PMF/PDF/CDF, área P(a≤X≤b), E(X)/V(X).
- `src/layouts/BaseLayout.astro`, `src/components/{Sidebar,TOC,Tooltips}.astro`.
- `public/content/` — materiais originais (PDFs), servidos em `/content/...`.

## Deploy (Vercel ou Netlify)

Site 100% estático. Ambas as plataformas detetam Astro automaticamente; a config já está incluída:

- **Netlify:** `netlify.toml` (`command = npm run build`, `publish = dist`).
- **Vercel:** `vercel.json` (framework `astro`, output `dist`).

Basta ligar o repositório e fazer deploy. Antes de publicar, atualiza `site:` em
`astro.config.mjs` para o URL final.
