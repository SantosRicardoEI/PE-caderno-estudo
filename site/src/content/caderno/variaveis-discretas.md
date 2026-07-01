---
titulo: "Variáveis discretas e medidas"
ordem: 2
prioridade: "media"
tempo: "45 min"
icone: "📊"
resumo: "Função de probabilidade, valor esperado, variância, moda, mediana e quantis."
---> **Pré-requisito:** [conceitos base](/conceitos-base).
> **A seguir:** [distribuições discretas](/distribuicoes-discretas).
> Aqui aprendes a **descrever** uma v.a. discreta (função de probabilidade + $F_X$) e a **resumi-la** em números (média, moda, mediana, quantis, variância).

---

## 1. Explicação simples

Uma v.a. discreta fica completamente descrita se soubermos **que valores toma** e **com que probabilidade**. Isso é a **função de probabilidade**. A partir dela obtém-se tudo:
- a **função de distribuição** $F_X$ (acumulando probabilidades);
- **medidas de localização**: onde está o "centro" (valor esperado, moda, mediana, quantis);
- **medidas de dispersão**: quão espalhados estão os valores (variância, desvio padrão).

---

## 2. Definições e fórmulas essenciais

### Função (massa) de probabilidade

$$f_X(x) = P(X = x), \qquad \text{com } \sum_{x} P(X=x) = 1 \ \text{ e } \ P(X=x)\ge 0$$

- **Quando se usa:** para descrever a v.a. e calcular qualquer probabilidade.
- **Como se aplica:** a soma de **todas** as probabilidades tem de dar **1** — é isto que permite descobrir constantes desconhecidas (ex. 40, 41).

### Função de distribuição de uma discreta (função em "escada")

$$F_X(x) = P(X\le x) = \sum_{x_i \le x} P(X=x_i)$$

Cálculo de probabilidades à custa de $F_X$:

| Fórmula | Uso |
|---|---|
| $P(X=a) = F_X(a) - F_X(a^-)$ | tamanho do "salto" em $a$ |
| $P(X>a) = 1 - F_X(a)$ | cauda direita |
| $P(a < X \le b) = F_X(b) - F_X(a)$ | intervalo (aberto-fechado) |
| $P(a \le X < b) = F_X(b^-) - F_X(a^-)$ | intervalo (fechado-aberto) |

> $F_X(a^-)$ = valor **imediatamente antes** de $a$ (antes do salto).

---

## 3. Medidas de localização

### Valor esperado (média teórica) $E(X)$, $\mu_X$

$$E(X) = \sum_x x\,f_X(x)$$

- **Significa:** o "valor médio a longo prazo" de $X$.
- **Quando se usa:** número esperado de sucessos, valor justo de um jogo, etc.
- **Propriedades (decorar!):**
$$E(aX+b) = aE(X)+b \qquad E[h(X)] = \sum_x h(x)\,f_X(x)$$
> Atenção: em geral $E[h(X)] \neq h(E[X])$. Por exemplo $E(X^2) \neq [E(X)]^2$.

### Moda $\mu_o = \mathrm{mo}(X)$
Valor(es) onde $f_X$ é **máxima**: $f_X(\mu_o) = \max_x f_X(x)$. Pode não ser única.

### Mediana $\mu_e = \mathrm{med}(X)$
Ponto central: menor valor tal que $F_X(\mu_e) \ge 0{,}5$. Formalmente:
$$0{,}5 \le F_X(\mu_e) \le 0{,}5 + P(X=\mu_e)$$

### Quantil de ordem $p$ ($q_p$)
Generaliza a mediana. $q_p$ é o valor tal que:
$$p \le F_X(q_p) \le p + P(X=q_p)$$
- **Quartis:** $q_{1/4}$ (1.º quartil), $q_{1/2}$ = mediana, $q_{3/4}$ (3.º quartil).
- **Como se aplica numa discreta:** percorre-se a $F_X$ e escolhe-se o **primeiro valor** cuja acumulada atinge/ultrapassa $p$.

---

## 4. Medidas de dispersão

### Variância $V(X)$, $\sigma_X^2$
$$V(X) = E\big[(X-\mu_X)^2\big] = \sum_x (x-\mu_X)^2 f_X(x)$$

**Fórmula prática (usar quase sempre):**
$$\boxed{V(X) = E(X^2) - [E(X)]^2}$$

**Propriedades:**
$$V(X)\ge 0 \qquad V(aX+b) = a^2\,V(X)$$
> A variância **não é linear**: o `+b` desaparece e o `a` sai ao **quadrado**.

### Desvio padrão
$$\sigma_X = +\sqrt{V(X)}$$
Está nas **mesmas unidades** de $X$ (a variância está nas unidades ao quadrado).

---

## 5. Exemplos resolvidos passo a passo

### Exemplo A — Descobrir constante, $E(X^2)$ e variância
$Y$ = n.º de coroas no lançamento de 2 moedas: $P(Y=0)=\tfrac14,\ P(Y=1)=\tfrac12,\ P(Y=2)=\tfrac14$.

**Valor esperado:** $E(Y)=0\cdot\tfrac14+1\cdot\tfrac12+2\cdot\tfrac14 = 1$.

**$E(Y^2)$** (usar a propriedade $E[h(Y)]$ com $h(y)=y^2$):
$$E(Y^2)=0^2\cdot\tfrac14+1^2\cdot\tfrac12+2^2\cdot\tfrac14 = \tfrac12+1 = 1{,}5$$

**Variância:** $V(Y)=E(Y^2)-[E(Y)]^2 = 1{,}5 - 1^2 = 0{,}5$.

> Repara: $E(Y^2)=1{,}5 \neq [E(Y)]^2 = 1$. Nunca confundas.

### Exemplo B — Constante desconhecida e quartis (estilo ex. 40)
$X$ = carros vendidos/dia, com $f(0)=\tfrac16$, $f(x)=\tfrac{a}{x}$ para $x\in\{1,2,3\}$.

**Passo 1 — Achar $a$ (soma = 1):**
$$\tfrac16 + a\left(\tfrac11+\tfrac12+\tfrac13\right)=1 \ \Rightarrow\ \tfrac16 + a\cdot\tfrac{11}{6}=1 \ \Rightarrow\ a=\tfrac{5}{11}$$
(resultado oficial: $a=5/11$ ✓)

**Passo 2 — Probabilidades e $F_X$:** $f(1)=\tfrac{5}{11},\ f(2)=\tfrac{5}{22},\ f(3)=\tfrac{5}{33}$; acumula-se para obter $F_X$.

**Passo 3 — Quartis:** percorrendo $F_X$ obtém-se (solução oficial) $q_{1/4}=q_{1/2}=1$ e $q_{3/4}=2$.

---

## 6. ⚠️ Erros comuns

- **$E(X^2) = [E(X)]^2$** — ERRADO. Calcula $E(X^2)$ à parte, com $h(x)=x^2$.
- **$V(aX+b)=aV(X)+b$** — ERRADO. É $a^2 V(X)$ (o `+b` some).
- **Somar mal as probabilidades** ao procurar a constante: verifica sempre que a soma total dá 1.
- **Quantil numa discreta:** não interpoles; escolhe o primeiro valor cuja $F_X$ atinge $p$.
- **Confundir variância (unidades²) com desvio padrão (unidades).**

---

## 7. Ligação aos exercícios das aulas

- **Ex. 40** — constante $a$, $F_X$, quartis, probabilidade condicionada.
- **Ex. 41, 42** — reconstruir função de probabilidade a partir de $F_X$; probabilidades de intervalos.
- **Ex. 43** — $E(X)$, moda, mediana e variância de uma Binomial (usa também [ficheiro 03](/distribuicoes-discretas)).
- **Ex. 47** — estimar $E(X)$, $V(X)$, moda e mediana por simulação e comparar com os valores teóricos.

## 8. Ligação ao teste de exemplo

Estas medidas aparecem como **ferramenta** na Pergunta 1 (calcular $E(S_{36})$ e $V(S_{36})$ antes de aplicar o TLC — usa $E(aX+b)$ e a soma de variâncias).

---

## 9. Resumo final

- $f_X(x)=P(X=x)$, soma = 1 → descobre constantes.
- $F_X$ em escada; probabilidades por diferença de $F_X$ (cuidado com `<`/`≤`).
- $E(X)=\sum x f_X(x)$; $E(aX+b)=aE(X)+b$; $E[h(X)]=\sum h(x)f_X(x)$.
- Moda = máximo de $f_X$; mediana/quantis via $F_X$.
- $V(X)=E(X^2)-[E(X)]^2$; $V(aX+b)=a^2V(X)$; $\sigma=\sqrt{V(X)}$.

## 10. ❓ Perguntas de autoavaliação

1. Como descubro uma constante desconhecida numa função de probabilidade?
2. Escreve $E(X)$ e $V(X)$ pela definição e a fórmula prática da variância.
3. Porque é que $E(X^2)\neq[E(X)]^2$ em geral?
4. Como se comporta a variância sob $aX+b$? E o valor esperado?
5. Como encontro a moda, a mediana e o 3.º quartil de uma v.a. discreta a partir de $F_X$?
6. Se $V(X)=4$, quanto vale $\sigma_X$? E $V(3X+5)$?

