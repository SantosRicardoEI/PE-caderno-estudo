// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeConceitos from './src/plugins/rehype-conceitos.mjs';
import rehypeLimparHeadings from './src/plugins/rehype-limpar-headings.mjs';
import rehypeTabelas from './src/plugins/rehype-tabelas.mjs';
import rehypeSolucao from './src/plugins/rehype-solucao.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://pe-estudo.example',
  integrations: [preact()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false }], rehypeLimparHeadings, rehypeTabelas, rehypeConceitos, rehypeSolucao],
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
