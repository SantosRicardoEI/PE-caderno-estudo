// Migra os .md do caderno para a Content Collection do Astro:
//  - adiciona frontmatter (titulo, ordem, prioridade, tempo, resumo, icone)
//  - remove o H1 inicial (o título passa a vir do frontmatter/layout)
//  - reescreve links internos NN_ficheiro.md(#anc) -> /slug(#anc)
//  - reescreve links de PDFs ../content|content -> /content
// Fonte: ../caderno_estudo/*.md e ../README.md
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raizProjeto = resolve(__dirname, '..', '..');
const dirCaderno = join(raizProjeto, 'caderno_estudo');
const destino = resolve(__dirname, '..', 'src', 'content', 'caderno');
mkdirSync(destino, { recursive: true });

// filename (sem extensão) -> { slug, meta }
const mapa = {
  '01_variaveis_aleatorias_conceitos_base': { slug: 'conceitos-base', titulo: 'Conceitos base de variáveis aleatórias', ordem: 1, prioridade: 'media', tempo: '30 min', icone: '🎲', resumo: 'Variável aleatória, função de distribuição, discreta/contínua e amostragem.' },
  '02_variaveis_discretas_medidas': { slug: 'variaveis-discretas', titulo: 'Variáveis discretas e medidas', ordem: 2, prioridade: 'media', tempo: '45 min', icone: '📊', resumo: 'Função de probabilidade, valor esperado, variância, moda, mediana e quantis.' },
  '03_distribuicoes_discretas': { slug: 'distribuicoes-discretas', titulo: 'Distribuições discretas', ordem: 3, prioridade: 'alta', tempo: '1h', icone: '🔢', resumo: 'Bernoulli, Binomial, Geométrica e Poisson.' },
  '04_variaveis_continuas_e_distribuicoes': { slug: 'variaveis-continuas', titulo: 'Variáveis contínuas e distribuições', ordem: 4, prioridade: 'alta', tempo: '1h15', icone: '📈', resumo: 'Densidade, Normal (padronização), Exponencial e Uniforme.' },
  '05_teorema_limite_central': { slug: 'teorema-limite-central', titulo: 'Teorema do Limite Central', ordem: 5, prioridade: 'alta', tempo: '1h', icone: '🎯', resumo: 'Somas e médias de v.a. i.i.d. aproximam-se da Normal.' },
  '06_estimacao_pontual': { slug: 'estimacao-pontual', titulo: 'Estimação pontual', ordem: 6, prioridade: 'media', tempo: '45 min', icone: '📍', resumo: 'Estimadores, método dos momentos e máxima verosimilhança.' },
  '07_intervalos_de_confianca': { slug: 'intervalos-de-confianca', titulo: 'Intervalos de confiança', ordem: 7, prioridade: 'alta', tempo: '1h15', icone: '📐', resumo: 'IC para média (Z/t), variância (χ²) e proporção.' },
  '08_testes_de_hipoteses': { slug: 'testes-de-hipoteses', titulo: 'Testes de hipóteses', ordem: 8, prioridade: 'alta', tempo: '1h15', icone: '⚖️', resumo: 'H0/H1, região crítica, valor-p e testes paramétricos.' },
  '09_testes_ajustamento_e_regressao': { slug: 'ajustamento-e-regressao', titulo: 'Ajustamento, normalidade e regressão', ordem: 9, prioridade: 'media-alta', tempo: '1h', icone: '🧪', resumo: 'Qui-quadrado, normalidade, regressão e correlação.' },
  '10_formulario_tabelas_como_usar': { slug: 'formulario-e-tabelas', titulo: 'Formulário e tabelas: como usar', ordem: 10, prioridade: 'alta', tempo: '45 min', icone: '📖', resumo: 'Cada fórmula explicada e como ler as tabelas.' },
  '11_exercicios_tipo_teste_resolvidos': { slug: 'exercicios-resolvidos', titulo: 'Exercícios tipo-teste resolvidos', ordem: 11, prioridade: 'alta', tempo: '1h30', icone: '✍️', resumo: 'Teste de exemplo e tipos-chave resolvidos passo a passo.' },
  '12_plano_estudo_90min': { slug: 'plano-de-estudo', titulo: 'Plano de estudo + estratégia de 90 min', ordem: 12, prioridade: 'none', tempo: '20 min', icone: '🗺️', resumo: 'Ordem de estudo e gestão do tempo no teste.' },
};

// filename base -> slug (para reescrever links)
const fileToSlug = Object.fromEntries(Object.entries(mapa).map(([f, m]) => [f, m.slug]));

function reescreveLinks(texto) {
  // links internos: ](caderno_estudo/NN_x.md#anc) ou ](NN_x.md#anc)
  texto = texto.replace(/\]\((?:caderno_estudo\/)?(\d\d_[a-z0-9_]+)\.md(#[^)]*)?\)/g, (m, base, anc = '') => {
    const slug = fileToSlug[base];
    if (!slug) return m;
    return `](/${slug}${anc || ''})`;
  });
  // links de PDFs: ](../content/...) ou ](content/...) -> ](/content/...)
  texto = texto.replace(/\]\((?:\.\.\/)?content\//g, '](/content/');
  return texto;
}

function escapaYaml(s) {
  return String(s).replace(/"/g, '\\"');
}

function processa(base, corpoOriginal, meta) {
  let corpo = corpoOriginal;
  // remove o primeiro H1
  corpo = corpo.replace(/^﻿?#\s+.*(\r?\n)+/, '');
  corpo = reescreveLinks(corpo).trimStart();
  const fm = [
    '---',
    `titulo: "${escapaYaml(meta.titulo)}"`,
    `ordem: ${meta.ordem}`,
    `prioridade: "${meta.prioridade}"`,
    meta.tempo ? `tempo: "${meta.tempo}"` : null,
    meta.icone ? `icone: "${meta.icone}"` : null,
    meta.resumo ? `resumo: "${escapaYaml(meta.resumo)}"` : null,
    '---',
    '',
  ].filter(Boolean).join('\n');
  writeFileSync(join(destino, `${meta.slug}.md`), fm + corpo + '\n');
}

// 1) Temas
let n = 0;
for (const f of readdirSync(dirCaderno)) {
  if (!f.endsWith('.md')) continue;
  const base = f.replace(/\.md$/, '');
  const meta = mapa[base];
  if (!meta) { console.warn('sem meta:', f); continue; }
  processa(base, readFileSync(join(dirCaderno, f), 'utf8'), meta);
  n++;
}

// 2) Início (a partir do README.md)
const readme = readFileSync(join(raizProjeto, 'README.md'), 'utf8');
processa('inicio', readme, {
  slug: 'inicio', titulo: 'Início — Caderno de Estudo', ordem: 0, prioridade: 'none',
  icone: '📚', resumo: 'Ordem recomendada de estudo, prioridades e como usar o caderno.',
});

console.log(`Migrados ${n} temas + início ->`, destino);
