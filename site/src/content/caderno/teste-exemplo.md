---
titulo: "Teste de exemplo — resolução completa"
ordem: 13
prioridade: "alta"
tempo: "1h"
icone: "📝"
resumo: "As 4 perguntas do teste de exemplo, resolvidas ao pormenor e explicadas passo a passo."
---
> **O teste de exemplo, do início ao fim.** Aqui tens o enunciado completo das **4 perguntas** e a **resolução detalhada** de cada uma — com a identificação da ferramenta, todos os cálculos à mão, a leitura das tabelas e a decisão final. Os valores finais estão **verificados** contra as soluções oficiais.
>
> Fontes: [enunciado](/content/teste_exemplo/enunciado/6_teste_exemplo.pdf) · [soluções oficiais](/content/teste_exemplo/solucoes/6_teste_exemplo_solucoes.pdf).

**Condições do teste:** 90 minutos, escrito, com acesso ao **formulário** e às **tabelas** (Normal, $t$-Student, qui-quadrado). Justifica sempre. Resultados com **4 casas decimais** (exceto arredondamentos para consulta das tabelas).

> 💡 **Como estudar isto:** tapa a resolução, resolve cada pergunta sozinho e só depois compara. O que interessa não é decorar os números — é **reconhecer qual a ferramenta** a partir do enunciado. Cada pergunta abaixo começa por essa pista.

---

## Pergunta 1 — Aproximação Normal (Teorema do Limite Central)

> Um jogador de basquetebol tem probabilidade $p = 0{,}8$ de converter um lance livre. Se fizer **36 lances livres**, de forma independente, indica um valor **aproximado** para a probabilidade de encestar **pelo menos 27** mas **não mais de 31**.

**Como reconhecer:** soma de muitas provas independentes iguais + a palavra **"aproximado"** → [Teorema do Limite Central](/teorema-limite-central). Cada lance é uma [Bernoulli](/distribuicoes-discretas); a soma de 36 aproxima-se de uma [Normal](/variaveis-continuas).

### Passo 1 — Modelar cada lance

Seja $X_i$ = "o jogador encesta no $i$-ésimo lance", $i = 1, \dots, 36$. São variáveis **i.i.d.** (independentes e identicamente distribuídas):

$$X_i \sim \text{Bernoulli}(p = 0{,}8), \qquad E(X_i) = p = 0{,}8, \qquad \text{Var}(X_i) = p(1-p) = 0{,}8 \times 0{,}2 = 0{,}16.$$

### Passo 2 — A variável de interesse é a soma

O que interessa é o **total** de lances encestados:

$$S_{36} = \sum_{i=1}^{36} X_i = \text{"número total de lances encestados em 36".}$$

Repara que, sendo a soma de $36$ Bernoulli(0,8) independentes, $S_{36}$ é **exatamente** uma $\text{Binomial}(36;\,0{,}8)$. Só que com $n=36$ calcular a Binomial à mão é impraticável — por isso o enunciado pede um valor **aproximado**, que obtemos pela Normal (TLC).

Precisamos da média e do desvio padrão de $S_{36}$. Pela **linearidade** do valor esperado (vale sempre) e pela **independência** das parcelas (que é o que permite somar as variâncias):

$$E(S_{36}) = \sum_{i=1}^{36} E(X_i) = 36 \times 0{,}8 = 28{,}8,$$

$$\text{Var}(S_{36}) = \sum_{i=1}^{36} \text{Var}(X_i) = 36 \times 0{,}16 = 5{,}76, \qquad \sqrt{\text{Var}(S_{36})} = \sqrt{5{,}76} = 2{,}4.$$

Pelo **TLC**, a soma padronizada é aproximadamente Normal padrão:

$$\frac{S_{36} - E(S_{36})}{\sqrt{\text{Var}(S_{36})}} = \frac{S_{36} - np}{\sqrt{np(1-p)}} \;\overset{a}{\sim}\; N(0,1).$$

### Passo 3 — Escrever a probabilidade pedida

"Pelo menos 27 mas não mais de 31" significa $27 \le S_{36} \le 31$. Como $S_{36}$ é **discreta**, "menos de 27" é o mesmo que "$\le 26$":

$$P(27 \le S_{36} \le 31) = P(S_{36} \le 31) - P(S_{36} \le 26).$$

### Passo 4 — Padronizar e consultar a tabela

Em cada parcela **subtraímos a média e dividimos pelo desvio padrão** ($2{,}4$) — a mesma operação nos dois lados de "$\le$" não altera a probabilidade — e aproximamos por $\Phi$ (o TLC):

$$P(S_{36} \le 31) = P\!\left(\frac{S_{36} - 28{,}8}{2{,}4} \le \frac{31 - 28{,}8}{2{,}4}\right) \simeq \Phi(0{,}92),$$

$$P(S_{36} \le 26) = P\!\left(\frac{S_{36} - 28{,}8}{2{,}4} \le \frac{26 - 28{,}8}{2{,}4}\right) \simeq \Phi(-1{,}16).$$

Subtraindo, e usando $\Phi(-z) = 1 - \Phi(z)$ com a [tabela da Normal](/ferramentas/tabelas) ($\Phi(0{,}92) = 0{,}8212$, $\Phi(1{,}16) = 0{,}8770$):

$$P(27 \le S_{36} \le 31) \simeq \Phi(0{,}92) - \Phi(-1{,}16) = 0{,}8212 - \big(1 - 0{,}8770\big) = 0{,}8212 - 1 + 0{,}8770 = \boxed{0{,}6982}.$$

> ✅ **Resposta:** $P(27 \le S_{36} \le 31) \approx 0{,}6982$.

> ⚠️ **Cuidados típicos aqui:**
> - **Correção de discretude:** $P(S_{36} < 27) = P(S_{36} \le 26)$, não $\le 27$. Trocar isto muda o resultado.
> - $\frac{2{,}2}{2{,}4} = 0{,}9167 \approx 0{,}92$ e $\frac{-2{,}8}{2{,}4} = -1{,}1667$; a solução oficial consulta a tabela em $1{,}16$ (arredondamento para a precisão da tabela).
> - Não confundir $E(S_{36}) = np$ com $p$: é a **soma**, não a média.

---

## Pergunta 2 — Intervalo de confiança para a média ($\sigma$ desconhecida)

> Analisa-se o teor de lítio (em %) num minério refinado. Numa amostra observou-se $\sum_{i=1}^{12} x_i = 1140$ e $\sum_{i=1}^{12} x_i^2 = 108900$. Admite-se que o teor de lítio tem distribuição **normal**.

**Como reconhecer:** pedem um **intervalo de confiança para a média** e **não** dão o desvio padrão da população $\sigma$ — só dão dados da amostra. Variância desconhecida → variável fulcral com **$t$-Student**. Ver [Intervalos de confiança](/intervalos-de-confianca).

### 2(a) — IC a 95% para o teor esperado

**Variável fulcral.** Como $X \sim \text{Normal}(\mu, \sigma^2)$ com **$\sigma$ desconhecido**:

$$Z = \frac{\bar{X} - \mu}{S/\sqrt{n}} \sim t_{(n-1)} = t_{(11)}.$$

**Quantil.** Para $1 - \alpha = 0{,}95$ (logo $\alpha/2 = 0{,}025$), da [tabela $t$](/ferramentas/tabelas):

$$b = F^{-1}_{t_{(11)}}(0{,}975) = 2{,}201, \qquad a = -b = -2{,}201.$$

**Estatísticas da amostra.** Com $n = 12$:

$$\bar{x} = \frac{1140}{12} = 95,$$

$$s^2 = \frac{\sum x_i^2 - n\bar{x}^2}{n-1} = \frac{108900 - 12 \times 95^2}{11} = \frac{108900 - 108300}{11} = \frac{600}{11} = 54{,}545, \qquad s = \sqrt{54{,}545} = 7{,}3855.$$

Aqui $\bar{x}$ e $s^2$ (variância corrigida, com divisor $n-1$) saem diretamente dos dois somatórios do enunciado — não é preciso a lista dos 12 valores.

**Fórmula do intervalo.** Parte-se de $P\!\left(-2{,}201 \le \frac{\bar{X}-\mu}{S/\sqrt{n}} \le 2{,}201\right) = 0{,}95$ e isola-se $\mu$: multiplica-se por $\frac{S}{\sqrt n}$, subtrai-se $\bar X$ e troca-se o sinal (o que **inverte** as desigualdades). Fica:

$$IC_{95\%}(\mu) = \left[\, \bar{x} - 2{,}201 \cdot \frac{s}{\sqrt{n}} \; , \; \bar{x} + 2{,}201 \cdot \frac{s}{\sqrt{n}} \,\right].$$

Com $\frac{s}{\sqrt{12}} = \frac{7{,}3855}{3{,}4641} = 2{,}1320$ e $2{,}201 \times 2{,}1320 = 4{,}6926$:

$$IC_{95\%}(\mu) = [\,95 - 4{,}6926 \; , \; 95 + 4{,}6926\,] = \boxed{[\,90{,}3074 \; , \; 99{,}6926\,]}.$$

> ✅ **Resposta (a):** $IC_{95\%}(\mu) = [90{,}3074,\ 99{,}6926]$ (em %).

### 2(b) — Testar $\mu = 90$ **sem** fazer o teste

**Como reconhecer:** "sem efetuar o teste... o que concluis?" → usa a **dualidade IC ↔ teste bilateral**: um valor está no IC a $95\%$ ⟺ **não** é rejeitado por um teste bilateral ao nível $\alpha = 5\%$.

Testar "o teor médio é 90%" é $H_0: \mu = 90$ vs $H_1: \mu \ne 90$ (bilateral). Basta então ver se $90$ cai dentro do $IC_{95\%}$. Como

$$90 \notin [90{,}3074,\ 99{,}6926] \quad (90 \text{ fica mesmo à esquerda do limite inferior } 90{,}3074),$$

o valor 90 **está fora** do intervalo.

> ✅ **Resposta (b):** há **evidência para rejeitar** a hipótese de que o teor médio de lítio é igual a 90% (a um nível de significância de 5%), porque $90 \notin IC_{95\%}(\mu)$.

> ⚠️ **Cuidados:** usa $s^2 = \frac{\sum x_i^2 - n\bar{x}^2}{n-1}$ (divisor $n-1$). Como $\sigma$ é desconhecido, é **$t$** e não $z$ — com $n=12$ pequeno, a diferença conta.

---

## Pergunta 3 — Teste de hipóteses ($\sigma$ conhecida, decisão pelo valor-p)

> Uma concentração de paracetamol **superior a 150 mg/kg** é perigosa. Em 4 amostras de um paciente obteve-se média $\bar{x} = 155$ mg e desvio padrão amostral $6$ mg. Admite-se distribuição **normal** com **desvio padrão populacional $\sigma = 5$ mg** e independência. Testa, **decidindo pelo valor-p**, se a concentração pode ser 150 mg ou se o paciente está em risco.

**Como reconhecer:** teste sobre a **média** e **dão $\sigma$ da população** ($5$ mg) → estatística **$z$** (Normal), não $t$. Ver [Testes de hipóteses](/testes-de-hipoteses). O desvio padrão amostral de 6 mg é um **distrator** — não se usa, porque $\sigma$ é conhecido.

### Passo 1 — Hipóteses

O perigo é a concentração ser **alta** ($> 150$) → teste **unilateral à direita**:

$$H_0: \mu = 150 \quad \text{vs} \quad H_1: \mu > 150.$$

### Passo 2 — Estatística de teste

Com $X \sim \text{Normal}(\mu, \sigma^2 = 5^2)$ e $\sigma$ **conhecido**:

$$T = \frac{\bar{X} - 150}{\sigma/\sqrt{n}} = \frac{\bar{X} - 150}{5/\sqrt{n}} \;\overset{H_0}{\sim}\; N(0,1).$$

### Passo 3 — Valor observado

Substituindo $\bar{x} = 155$, $n = 4$ (logo $\sqrt{n} = 2$) e $\sigma = 5$:

$$t = \frac{155 - 150}{5/\sqrt{4}} = \frac{5}{5/2} = \frac{5}{2{,}5} = 2.$$

### Passo 4 — Valor-p (unilateral à direita)

O **valor-p** é a probabilidade de, **se $H_0$ fosse verdadeira**, obter uma estatística tão ou mais extrema do que a observada, **na direção de $H_1$**. Como $H_1: \mu > 150$ é à direita, "mais extremo" quer dizer valores **maiores** do que $t = 2$:

$$\text{valor-p} = P(T > 2) = 1 - \Phi(2) = 1 - 0{,}9772 = 0{,}0228.$$

### Passo 5 — Decisão

Rejeita-se $H_0$ quando $\alpha \ge \text{valor-p}$:

- **Rejeitar $H_0$** para $\alpha \ge 2{,}28\%$ (inclui os usuais **5%** e **10%**);
- **Não rejeitar $H_0$** para $\alpha < 2{,}28\%$ (por exemplo, 1%).

> ✅ **Resposta:** valor-p $= 0{,}0228$. Aos níveis usuais (5%, 10%) **rejeita-se $H_0$**. Dado o contexto e o risco para o paciente, há evidência de que a concentração é **perigosa** ($\mu > 150$).

> ⚠️ **Cuidados:** o desvio padrão amostral (6 mg) **não entra** — como $\sigma$ é dado, usa-se $z$. Um valor-p pequeno ($0{,}0228$) = evidência **contra** $H_0$.

---

## Pergunta 4 — Normalidade e `t.test` em R

> Temperatura de deflexão (°F) para dois tipos de tubo de plástico ($n = 15$ cada):

<div class="table-scroll">

| | | | | | | | | | | | | | | | |
|------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **tipo1** | 206 | 188 | 205 | 187 | 194 | 193 | 207 | 185 | 189 | 213 | 192 | 210 | 194 | 178 | 215 |
| **tipo2** | 177 | 197 | 206 | 201 | 180 | 176 | 185 | 200 | 197 | 192 | 198 | 188 | 189 | 203 | 192 |

</div>

Resultados obtidos em R:

| | Shapiro-Wilk $W$ | Shapiro-Wilk valor-p | Pearson $\chi^2$ | Pearson valor-p |
|--------|--------|--------|--------|--------|
| Tipo 1 | 0,93731 | 0,3498 | 3,8 | 0,2839 |
| Tipo 2 | 0,94774 | 0,4895 | 5,4 | 0,1447 |

```text
One Sample t-test

data:  tipo1 - tipo2
t = 1.1258, df = 14, p-value = 0.8604
alternative hypothesis: true mean is less than 0
95 percent confidence interval:
    -Inf 12.82224
sample estimates:
mean of x
        5
```

### 4(a) — O que se conclui sobre a normalidade?

**Como reconhecer:** normalidade → **QQ-plots** (visual) + testes de **Shapiro-Wilk** e **Pearson** ($\chi^2$ de ajustamento). Ver [Ajustamento e normalidade](/ajustamento-e-regressao).

**Gráficos (QQ-plots).** Os pontos devem estar próximos da reta. Em ambos os tipos há alguns pontos afastados (possíveis *outliers*) e algum desvio no centro, sobretudo no Tipo 1 → sozinhos, os gráficos deixam **dúvidas**.

**Testes.** Nestes testes a normalidade está na **hipótese nula** ($H_0$: os dados são normais). Como $n = 15$ é pequeno, o **Shapiro-Wilk** é o mais adequado. Todos os valores-p são **$> 0{,}1$** (0,3498; 0,4895; 0,2839; 0,1447), logo **não se rejeita $H_0$** aos níveis usuais.

> ✅ **Resposta (a):** há evidência de que os dados do **Tipo 1** e do **Tipo 2** seguem ambos uma **distribuição normal** (valores-p altos em todos os testes; Shapiro-Wilk preferível por $n$ ser pequeno).

### 4(b) — Objetivo, validade e resultado do `t.test`

**Ler o output linha a linha** (é isto que a pergunta pede):

- `data: tipo1 - tipo2` → o teste corre sobre as **15 diferenças** $d_i = \text{tipo1}_i - \text{tipo2}_i$; é um **teste $t$ a uma amostra** aplicado a essas diferenças.
- `t = 1.1258` → valor observado da estatística de teste.
- `df = 14` → graus de liberdade $= n - 1 = 15 - 1 = 14$ (confirma que são 15 diferenças).
- `p-value = 0.8604` → o valor-p.
- `alternative hypothesis: true mean is less than 0` → a hipótese alternativa é $H_1: \mu_1 - \mu_2 < 0$.
- `mean of x = 5` → a **diferença média** observada foi $5$ (o Tipo 1 esteve, em média, $5$ °F acima do Tipo 2).
- `95 percent confidence interval: -Inf 12.82224` → IC **unilateral** (coerente com um teste "menor que"); como contém o $0$, é mais uma leitura de que não se rejeita $H_0$.

**Objetivo.** Sendo $\mu_1, \mu_2$ as médias das temperaturas dos tipos 1 e 2, a alternativa "mean less than 0" traduz-se em:

$$H_0: \mu_1 - \mu_2 \ge 0 \quad \text{vs} \quad H_1: \mu_1 - \mu_2 < 0, \qquad \text{isto é} \qquad H_0: \mu_1 \ge \mu_2 \;\; \text{vs} \;\; H_1: \mu_1 < \mu_2.$$

Ou seja: verificar se a temperatura do Tipo 1 **iguala ou excede** a do Tipo 2.

**Validade.** O `t.test` (média de população normal, variância desconhecida) é válido porque:

- na alínea (a) concluiu-se que $X_1$ e $X_2$ são **normais**;
- sendo tipos de plástico diferentes, são **independentes**, logo a diferença $X_1 - X_2$ também é **normal**;
- a variância de $X_1 - X_2$ é **desconhecida** → o teste $t$ (e não $z$) é o adequado. ✔️ **Válido.**

**Resultado.** valor-p $= 0{,}8604$ é muito maior do que qualquer $\alpha$ usual (1%, 5%, 10%) → **não se rejeita $H_0$**.

> ✅ **Resposta (b):** não há evidência para rejeitar $H_0$; conclui-se que a temperatura do **Tipo 1 é maior ou igual** à do Tipo 2 (a diferença média observada foi $\bar{x} = 5$, mas não é estatisticamente significativa).

> ⚠️ **Cuidado:** um valor-p **alto** ($0{,}8604$) **não** "prova" $H_0$ — apenas indica que **não há evidência suficiente** para a rejeitar.

---

## Resumo dos resultados

| Pergunta | Ferramenta | Resultado final |
|------|------|------|
| **1** | Aproximação Normal (TLC) | $P(27 \le S_{36} \le 31) \approx 0{,}6982$ |
| **2(a)** | IC para a média, $\sigma$ desconhecida ($t$) | $IC_{95\%}(\mu) = [90{,}3074,\ 99{,}6926]$ |
| **2(b)** | Dualidade IC ↔ teste | Rejeita-se $\mu = 90$ (fora do IC) |
| **3** | Teste à média, $\sigma$ conhecida ($z$), valor-p | valor-p $= 0{,}0228$ → rejeita-se $H_0$ (paciente em risco) |
| **4(a)** | Normalidade (QQ + Shapiro-Wilk + Pearson) | Ambos os tipos são normais (valores-p $> 0{,}1$) |
| **4(b)** | `t.test` a uma amostra sobre a diferença | valor-p $= 0{,}8604$ → não se rejeita $H_0$ ($\mu_1 \ge \mu_2$) |

> 🎯 **Mapa mental do teste:** as 4 perguntas cobrem exatamente os temas prioritários — **TLC** (P1), **Intervalos de confiança** (P2), **Testes de hipóteses** (P3) e **Ajustamento/normalidade + interpretar R** (P4). Se dominares estes quatro, dominas o teste.

**Continua a treinar:** [exercícios tipo-teste resolvidos](/exercicios-resolvidos) · [calculadoras de tabelas](/ferramentas/tabelas) · [visualizadores de distribuições](/ferramentas/distribuicoes).
