# 09 — Testes de Ajustamento, Normalidade e Regressão

> **Pré-requisito:** [testes de hipóteses](08_testes_de_hipoteses.md).
> Cobre: teste qui-quadrado de ajustamento, testes de normalidade (para saber se podes usar $t$/$\chi^2$) e regressão/correlação. A **interpretação de output do R** aqui é diretamente cobrada (Pergunta 4 do teste).

---

## 1. Explicação simples

Até aqui testámos **parâmetros** (μ, σ², p). Agora testamos a **própria forma da distribuição**: "estes dados vêm de um dado equilibrado?", "vêm de uma Normal?". Chamam-se **testes de ajustamento**. E no fim, a **regressão** estuda a relação linear entre duas variáveis.

---

## 2. Teste qui-quadrado de ajustamento (de Pearson) 🔴

Compara **frequências observadas** $O_i$ com **frequências esperadas** $E_i$ sob $H_0$.

- **Hipóteses:**
  - $H_0$: a amostra vem da distribuição especificada.
  - $H_1$: não vem dessa distribuição.
- **Frequências esperadas:** $E_i=n\,p_i^0$, onde $p_i^0=P(\text{classe }i\mid H_0)$ e $n$ = dimensão total.
- **Estatística de teste:**
$$Q_0=\sum_{i=1}^{k}\frac{(O_i-E_i)^2}{E_i}\ \overset{a}{\sim}\ \chi^2_{k-\beta-1}$$
onde $k$ = n.º de classes e $\beta$ = n.º de parâmetros **estimados** a partir dos dados.
- **Região crítica** (sempre unilateral direita — só rejeitamos se o afastamento for grande):
$$RC=\{t:t>c\},\quad c=F^{-1}_{\chi^2_{k-\beta-1}}(1-\alpha)$$
- **Graus de liberdade:** $k-\beta-1$. Se a distribuição de $H_0$ **não tem parâmetros a estimar**, $\beta=0$ → g.l. $=k-1$.

**Regra de validade:** todos os $E_i\ge1$ e pelo menos 80% dos $E_i\ge5$. Se não, **agrupam-se classes**.

**Em R:** `chisq.test(x = frequencias, p = probabilidades)`.

### Exemplo resolvido (dado equilibrado, estilo teoria/ex. 89)
1000 lançamentos, $O_i$ observados. $H_0:P(X=i)=\tfrac16$ (sem parâmetros → $\beta=0$, g.l. $=6-1=5$).
- $E_i=1000\cdot\tfrac16=166{,}67$ para cada face.
- $Q_0=\sum\frac{(O_i-E_i)^2}{E_i}=3{,}499$.
- $c=F^{-1}_{\chi^2_5}(0{,}95)=11{,}07$. Como $3{,}499<11{,}07$ → **não se rejeita** $H_0$ (dado parece equilibrado). Valor-p $=P(Q_0>3{,}499)=0{,}6235$.

---

## 3. Testes de normalidade (essenciais para escolher o teste!)

Antes de usar um $t$-test ou o teste à variância, é preciso que a população seja **Normal**. Como verificar?

| Método | Quando usar | Ideia |
|---|---|---|
| **QQ-plot** (gráfico) | sempre, como apoio visual | pontos próximos da reta ⇒ Normal; método subjetivo |
| **Shapiro-Wilk** (`shapiro.test`) | **amostras pequenas** ($n<30$) | mais potente para a Normal; não precisa estimar $\mu,\sigma$ |
| **Qui-quadrado / Pearson** (`chisq.test`/`pearson.test`) | **amostras grandes** ($n\ge30$) | agrupa em classes e compara |

**Hipóteses (em qualquer teste de normalidade):**
- $H_0$: os dados **são** Normais.
- $H_1$: os dados **não** são Normais.

**Decisão:** valor-p **grande** (> α) ⇒ **não se rejeita** a normalidade ⇒ podes assumir Normal. Valor-p **pequeno** (< α) ⇒ rejeita-se a normalidade.

> ⚠️ Contraintuitivo: aqui **queremos** normalmente **não rejeitar** $H_0$ (para poder usar os testes paramétricos). Valor-p alto é "bom" para a hipótese de normalidade.

---

## 4. Regressão linear simples e correlação

Estuda a relação **linear** entre uma variável explicativa $x$ e uma resposta $y$: modelo $Y_i=a+bx_i+\varepsilon_i$, com $\varepsilon_i\sim N(0,\sigma^2)$ i.i.d.

### Estimativas (do formulário)
$$\hat b=\frac{\sum x_iy_i-n\bar{x}\bar{y}}{\sum x_i^2-n\bar{x}^2} \qquad \hat a=\bar{y}-\hat b\,\bar{x} \qquad \hat y_i=\hat a+\hat b x_i$$

### Coeficiente de determinação $r^2$
$$r^2=\frac{\left(\sum x_iy_i-n\bar{x}\bar{y}\right)^2}{\left(\sum x_i^2-n\bar{x}^2\right)\left(\sum y_i^2-n\bar{y}^2\right)}$$
Proporção da variabilidade de $y$ explicada pelo modelo (entre 0 e 1; perto de 1 = bom ajuste).

### Correlação
- **Pearson** $r$ (variáveis quantitativas, relação linear):
$$r=\frac{1}{n-1}\sum\frac{x_i-\bar{x}}{s_x}\cdot\frac{y_i-\bar{y}}{s_y}$$
- **Spearman** $r_1$ (dados **ordinais**/ordenações, ex.: rankings de juízes):
$$r_1=1-\frac{6\sum d_i^2}{n(n^2-1)}, \quad d_i=\text{diferença de ordens}$$

### Testes de hipóteses na regressão
- **Teste $b=0$** (significância da regressão): estatística $T_b\sim t_{n-2}$.
  - $H_0:b=0$ (não há relação linear) vs $H_1:b\neq0$.
  - **Rejeitar $H_0$** ⇒ **há** relação linear significativa entre $x$ e $y$.
- **Teste $a=0$**: relevância do termo independente.
- **`cor.test`**: testa se a correlação é nula ($H_0:\rho=0$).

---

## 5. Interpretar output do R (Pergunta 4 do teste!)

### `t.test` (uma amostra ou diferença de duas)
```
One Sample t-test
data:  tipo1 - tipo2
t = 1.1258, df = 14, p-value = 0.8604
alternative hypothesis: true mean is less than 0
```
**Como ler:** aplicado à diferença Tipo1−Tipo2, com $H_1:$ média $<0$, ou seja
$$H_0:\mu_1\ge\mu_2 \quad\text{vs}\quad H_1:\mu_1<\mu_2$$
Valor-p $=0{,}8604$ (alto) ⇒ **não se rejeita** $H_0$: não há evidência de que a temperatura do tipo 1 seja menor que a do tipo 2. **Validade:** só é válido se ambas as populações forem Normais (confirmado pelos testes de normalidade) e independentes.

### Tabela Shapiro-Wilk / Pearson (normalidade)
```
        Shapiro-Wilk        Pearson chi-square
        W       p-value      P      p-value
Tipo 1  0.93731 0.3498       3.8    0.2839
Tipo 2  0.94774 0.4895       5.4    0.1447
```
**Como ler:** todos os valores-p > 0,1 ⇒ **não se rejeita** a normalidade. Como $n=15$ (pequeno), o **Shapiro-Wilk é o mais adequado**. Conclusão: os dados dos dois tipos podem considerar-se Normais → o `t.test` é válido.

### `summary(lm(y ~ x))`
```
Coefficients:
            Estimate  Std.Error  t value  Pr(>|t|)
(Intercept) 33.4744   1.1549     28.98    <2e-16 ***
eruptions   10.7296    0.3148     34.09   <2e-16 ***
Multiple R-squared: 0.8115
```
**Como ler:** $\hat a=33{,}47$, $\hat b=10{,}73$; a coluna `Pr(>|t|)` é o valor-p dos testes $a=0$ e $b=0$. Valor-p $<2\text{e-}16$ para `eruptions` ⇒ **rejeita-se** $b=0$ ⇒ há relação linear significativa. $r^2=0{,}81$ ⇒ o modelo explica 81% da variabilidade.

---

## 6. ⚠️ Erros comuns

- **Normalidade ao contrário:** valor-p **alto** ⇒ **não** rejeitar normalidade (é o que costumamos querer). Não confundir com os testes a parâmetros.
- **Graus de liberdade do qui-quadrado:** $k-\beta-1$ (subtrai os parâmetros **estimados**). Esquecer o $\beta$ é erro clássico.
- **Não agrupar classes** quando $E_i<5$.
- **RC do qui-quadrado de ajustamento** é sempre unilateral direita.
- **Pearson vs Spearman:** com **ordenações/rankings** usa-se **Spearman** (ex.: juízes).
- **Interpretar $b=0$:** rejeitar $H_0:b=0$ significa que **há** relação linear.

---

## 7. Ligação aos exercícios das aulas

- **Ex. 87, 88, 89** — ajustamento qui-quadrado (Binomial, dado equilibrado).
- **Ex. 90** — ajustamento a uma distribuição dada por intervalos.
- **Ex. 91, 92, 93** — testes de normalidade (qui-quadrado, Shapiro, `pearson.test`).
- **Ex. 86** — comparação de proporções (`prop.test`).
- **Ex. 94, 95, 96, 97** — regressão linear e teste $b=0$ (`summary(lm)`).
- **Ex. 98, 99, 100** — correlação (`cor.test`, Pearson e Spearman).

## 8. Ligação ao teste de exemplo

**Pergunta 4** é toda de **interpretação de output**: (a) normalidade via QQ-plot + Shapiro-Wilk + Pearson; (b) objetivo, validade e resultado de um `t.test` sobre a diferença Tipo1−Tipo2. As resoluções acima seguem a solução oficial.

---

## 9. Resumo final

- Qui-quadrado de ajustamento: $Q_0=\sum\frac{(O_i-E_i)^2}{E_i}\sim\chi^2_{k-\beta-1}$, RC à direita, agrupar se $E_i<5$.
- Normalidade: Shapiro (n pequeno) / Pearson (n grande); valor-p alto ⇒ Normal.
- Regressão: $\hat a$, $\hat b$, $r^2$; teste $b=0$ ($t_{n-2}$) → rejeitar = há relação linear.
- Pearson (quantitativo) vs Spearman (ordinal).

## 10. ❓ Perguntas de autoavaliação

1. Escreve a estatística do qui-quadrado de ajustamento e os seus graus de liberdade.
2. Quando agrupo classes? Porquê?
3. Num teste de normalidade, o que significa valor-p = 0,49?
4. Que teste de normalidade uso com $n=15$? E com $n=100$?
5. O que significa rejeitar $H_0:b=0$ numa regressão? E o que mede $r^2$?
6. Quando uso Spearman em vez de Pearson?
7. Interpreta a linha `p-value = 0.8604, alternative: true mean is less than 0` de um `t.test`.
