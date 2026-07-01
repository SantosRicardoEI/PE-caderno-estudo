# 12 — Plano de Estudo + Estratégia para os 90 Minutos

> Como estudar de forma eficiente e como gerir o tempo no dia do teste (90 min, escrito, com formulário e tabelas).

---

## 1. Plano de estudo faseado

### Fase 1 — Fundações (essencial, ~2h)
1. [01 — Conceitos base](01_variaveis_aleatorias_conceitos_base.md) — `F_X`, discreta vs contínua, `<`/`≤`.
2. [02 — Medidas discretas](02_variaveis_discretas_medidas.md) — $E$, $V$, quantis.
3. [10 — Formulário e tabelas](10_formulario_tabelas_como_usar.md) — **aprende a ler as tabelas cedo**; usa-las em tudo.

### Fase 2 — Distribuições e TLC 🔴 (~3h)
4. [03 — Distribuições discretas](03_distribuicoes_discretas.md) — Binomial, Poisson.
5. [04 — Contínuas e Normal](04_variaveis_continuas_e_distribuicoes.md) — padronização (crítico!).
6. [05 — TLC](05_teorema_limite_central.md) — resolve a Pergunta 1 sozinho.

### Fase 3 — Inferência 🔴 (~4h, o coração do teste)
7. [06 — Estimação pontual](06_estimacao_pontual.md) — MV, $s^2$ prática.
8. [07 — Intervalos de confiança](07_intervalos_de_confianca.md) — as 4 situações.
9. [08 — Testes de hipóteses](08_testes_de_hipoteses.md) — 5 passos, valor-p.
10. [09 — Ajustamento e regressão](09_testes_ajustamento_e_regressao.md) — normalidade, interpretar R.

### Fase 4 — Treino final (~2h)
11. [11 — Exercícios tipo-teste](11_exercicios_tipo_teste_resolvidos.md) — resolve tudo tapando as soluções.
12. Faz o teste de exemplo **cronometrado** e confere com as soluções oficiais.

---

## 2. Se tiveres POUCO tempo — revê primeiro (por ordem)

1. 🔴 **[07 — Intervalos de confiança](07_intervalos_de_confianca.md)** (as 4 situações + escolha).
2. 🔴 **[08 — Testes de hipóteses](08_testes_de_hipoteses.md)** (5 passos + valor-p).
3. 🔴 **[05 — TLC](05_teorema_limite_central.md)** (receita da Pergunta 1).
4. 🔴 **[04 — Normal](04_variaveis_continuas_e_distribuicoes.md)** (padronização).
5. **[10 — Tabelas](10_formulario_tabelas_como_usar.md)** (ler $\Phi$, $t$, $\chi^2$).
6. **[09 — Normalidade + interpretar R](09_testes_ajustamento_e_regressao.md)** (Pergunta 4).

> Estes 6 cobrem, com base no teste de exemplo, a esmagadora maioria da cotação.

---

## 3. Tempos estimados por tema (estudo)

| Ficheiro | Prioridade | Tempo estudo |
|---|---|---|
| 01 Conceitos base | média | 30 min |
| 02 Medidas discretas | média | 45 min |
| 03 Distribuições discretas | 🔴 alta | 1h |
| 04 Contínuas e Normal | 🔴 alta | 1h15 |
| 05 TLC | 🔴 alta | 1h |
| 06 Estimação pontual | média | 45 min |
| 07 Intervalos de confiança | 🔴 alta | 1h15 |
| 08 Testes de hipóteses | 🔴 alta | 1h15 |
| 09 Ajustamento/regressão | média-alta | 1h |
| 10 Formulário/tabelas | alta | 45 min |
| 11 Exercícios resolvidos | 🔴 alta | 1h30 |

---

## 4. Estratégia no dia do teste (90 min)

### Antes de começar (2 min)
- Lê **todas** as perguntas rapidamente. Marca as que dominas.
- Confirma que tens o formulário e as **3 tabelas** (Normal, $t$, $\chi^2$).

### Gestão do tempo (90 min ≈ 4 perguntas → ~20 min/pergunta + 10 min de folga)
- Ataca **primeiro** as que dominas (ganhas cotação e confiança).
- Não fiques preso: se uma emperra, passa à frente e volta.
- Guarda ~10 min finais para **rever contas e arredondamentos**.

### Checklist por pergunta (método que dá cotação mesmo com erro de conta)
1. **Define a v.a.** e escreve a distribuição ($X\sim\ldots$).
2. **Identifica o tipo:** probabilidade? IC? teste? ajustamento?
3. **Escreve a fórmula/estatística** ANTES de meter números (isto conta).
4. **Substitui e calcula**; usa a tabela.
5. **Conclui em português** ("logo, rejeita-se $H_0$ porque…").

---

## 5. ⚠️ Checklist de erros a NÃO cometer

- [ ] `<` vs `≤` em v.a. **discretas** (ex.: TLC com soma discreta).
- [ ] Padronizar dividindo por **σ** (não por σ²).
- [ ] $\Phi(-z)=1-\Phi(z)$; quantil bilateral usa $1-\tfrac\alpha2$ (95% → 1,96).
- [ ] $Z$ vs $t$: sem σ dado → **$t$**.
- [ ] Qui-quadrado (variância): **dois** quantis; o maior no denominador esquerdo.
- [ ] Graus de liberdade: IC-$t$/var → $n-1$; regressão → $n-2$; ajustamento → $k-\beta-1$.
- [ ] Valor-p: rejeita-se se valor-p **<** α.
- [ ] Nunca "aceita-se $H_0$" → "não há evidência para rejeitar".
- [ ] Normalidade: valor-p **alto** ⇒ **não** rejeitar Normal.
- [ ] Apresentar resultados com **4 casas decimais** (pedido no enunciado).
- [ ] **Justificar sempre** (o enunciado exige justificação).

---

## 6. Mapa mental de decisão (que ferramenta usar?)

```
Pergunta pede...
├─ probabilidade de uma v.a. → distribuição (fich. 03/04) ou F_X (fich. 01/02)
├─ probabilidade de SOMA/MÉDIA de muitas v.a. → TLC (fich. 05)
├─ "estime o parâmetro" (1 número) → estimação pontual/MV (fich. 06)
├─ "intervalo de confiança para..." → IC (fich. 07)
│     ├─ média + σ dado → Z ;  média sem σ → t
│     ├─ variância/desvio → qui-quadrado
│     └─ proporção/percentagem → Z proporção
├─ "teste se... / há evidência de..." → teste de hipóteses (fich. 08)
│     └─ mesma escolha Z/t/qui²/proporção, com θ₀
├─ "os dados ajustam-se a... / são Normais?" → ajustamento/normalidade (fich. 09)
└─ "relação entre x e y / correlação" → regressão/correlação (fich. 09)
```

## 7. ❓ Autoavaliação final (checklist de prontidão)

1. Resolvo as 4 perguntas do teste de exemplo em <70 min?
2. Escolho a situação de IC/teste certa em segundos a partir do enunciado?
3. Leio $\Phi$, $t$ e $\chi^2$ sem hesitar?
4. Sei justificar cada decisão em português correto de Estatística?
5. Conheço os erros comuns e verifico-os antes de entregar?
