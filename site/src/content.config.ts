import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caderno = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/caderno' }),
  schema: z.object({
    titulo: z.string(),
    ordem: z.number(),
    prioridade: z.enum(['alta', 'media-alta', 'media', 'baixa', 'none']).default('media'),
    tempo: z.string().optional(),
    resumo: z.string().optional(),
    icone: z.string().optional(),
  }),
});

const exercicios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/exercicios' }),
  schema: z.object({
    num: z.number(),                          // 40–100
    ficha: z.enum(['cap4', 'cap5']),          // Variáveis aleatórias reais | Inferência
    contexto: z.string(),                     // rótulo curto do exercício
    temas: z.array(z.string()).default([]),   // slugs de tema (filtrar + linkar)
    tipos: z.array(z.string()).default([]),   // 'Binomial','Normal','TLC','IC','Teste','Regressão','R', ...
    temSolucao: z.boolean().default(true),
  }),
});

export const collections = { caderno, exercicios };
