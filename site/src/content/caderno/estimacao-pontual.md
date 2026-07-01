---
titulo: "Estimação pontual"
ordem: 6
prioridade: "media"
tempo: "45 min"
icone: "📍"
resumo: "Estimadores, método dos momentos e máxima verosimilhança."
---> **Início do Capítulo 5 (Inferência).** A partir daqui, o objetivo muda: já **não** conhecemos a população — temos só uma **amostra** e queremos **estimar** parâmetros desconhecidos.
> **A seguir:** [intervalos de confiança](/intervalos-de-confianca).

---

## 1. Explicação simples

**Inferência estatística** = usar os dados de uma **amostra** para tirar conclusões sobre a **população** inteira (que não conseguimos observar toda).

- **População:** todas as observações possíveis de $X$.
- **Amostra:** subconjunto recolhido **ao acaso**, $(X_1,\dots,X_n)$ i.i.d. com $X$.

Muitas vezes conhecemos a **forma** da distribuição (ex.: "é Normal") mas **não os parâmetros** ($\mu$, $\sigma^2$, $\lambda$, $p$…). A **estimação pontual** dá um **único número** (a melhor "aposta") para cada parâmetro.

---

## 2. Definições importantes

- **Estatística:** função da amostra que **não depende** de parâmetros desconhecidos (é uma v.a.).
- **Estimador:** uma estatística usada para estimar um parâmetro $\theta$. É uma v.a. (varia de amostra para amostra).
- **Estimativa:** o **valor concreto** do estimador para uma amostra específica (um número).

### Estatísticas mais usadas

| Estatística | Estimador (v.a.) | Estimativa (valor) |
|---|---|---|
| Média amostral | $\overline{X}_n=\frac1n\sum X_i$ | $\bar{x}=\frac1n\sum x_i$ |
| Variância amostral (corrigida) | $S_n^2=\frac{1}{n-1}\sum (X_i-\overline{X})^2$ | $s^2=\frac{1}{n-1}\sum(x_i-\bar{x})^2$ |
| 2.º momento central (não corrigida) | $M_2=\frac1n\sum(X_i-\overline{X})^2$ | $m_2=\hat\sigma^2$ |

**Fórmula prática da variância amostral (a que usas no teste):**
$$\boxed{s^2=\frac{\sum_{i=1}^n x_i^2 - n\bar{x}^2}{n-1}}$$
> Muito usada quando o enunciado dá $\sum x_i$ e $\sum x_i^2$ (ex. 66, 69; Pergunta 2 do teste).

---

## 3. Como encontrar estimadores

### Método dos momentos
Iguala os momentos **teóricos** aos **empíricos** e resolve:
$$E(X^k)=\frac1n\sum_{i=1}^n X_i^k$$

### Método da máxima verosimilhança (MV)
Escolhe o valor do parâmetro que **torna a amostra observada mais provável**. Maximiza-se a função de verosimilhança:
$$L(\theta;x_1,\dots,x_n)=\prod_{i=1}^n f_X(x_i;\theta)$$
(na prática maximiza-se $\ln L$, que dá o mesmo máximo e é mais fácil).

**Estimadores de MV mais comuns (decorar):**

| População | Parâmetro | Estimador MV |
|---|---|---|
| $\text{Bernoulli}(p)$ | $p$ | $\hat p=\overline{X}$ |
| $N(\mu,\sigma^2)$ | $\mu$ | $\hat\mu=\overline{X}$ |
| $N(\mu,\sigma^2)$ | $\sigma^2$ | $\hat\sigma^2=\frac1n\sum(X_i-\overline{X})^2$ (**não corrigida**) |
| $\text{Exp}(\lambda)$ | $\lambda$ | $\hat\lambda=\dfrac{1}{\overline{X}}$ |

> ⚠️ Pela MV (e pelos momentos), a variância estima-se pelo **2.º momento central amostral** $\frac1n\sum(\cdot)$ — **não** pela variância corrigida $\frac{1}{n-1}$.

### Propriedade da invariância (MV)
Se $\hat\theta$ é o estimador MV de $\theta$, então $g(\hat\theta)$ é o estimador MV de $g(\theta)$.
> Uso típico: estimar $P(X>a)$ substituindo o parâmetro pelo seu estimador MV (ex. 64, 66).

---

## 4. Propriedades de um "bom" estimador (conceitos, não cálculos)

- **Centrado (não enviesado):** $E(T)=\theta$ (em média acerta). O viés é $|E(T)-\theta|$.
- **Assintoticamente centrado:** $E(T)\to\theta$ quando $n\to\infty$.
- **Eficiente:** entre os centrados, tem **menor variância**.
- **Consistente:** converge em probabilidade para $\theta$ quando $n\to\infty$ (basta ser (assint.) centrado e $V(T)\to 0$).
- **Erro quadrático médio:** $E[(T-\theta)^2]=V(T)+(E(T)-\theta)^2$ = variância + viés².

> Ex.: no modelo Normal, $\overline{X}$ é o melhor estimador (centrado, mínima variância) de $\mu$; $S^2$ (corrigida) é centrado e consistente para $\sigma^2$, por isso prefere-se $S^2$ à versão da MV para estimar a variância.

---

## 5. Exemplos resolvidos passo a passo

### Exemplo 1 — MV numa Normal + invariância (estilo ex. 64/66)
Dados: $n=10$, $\sum x_i=846$, $\sum x_i^2=71607$. Estimar $\mu$, $\sigma^2$ e $P(X<83)$.

**Passo 1 — média:** $\hat\mu=\bar{x}=\frac{846}{10}=84{,}6$.

**Passo 2 — variância MV (não corrigida):**
$$\hat\sigma^2=\frac{\sum x_i^2-n\bar{x}^2}{n}=\frac{71607-10\cdot84{,}6^2}{10}=\frac{71607-71571{,}6}{10}=3{,}54 \Rightarrow \hat\sigma\approx1{,}881$$

**Passo 3 — invariância** para $P(X<83)$: substituir $\mu,\sigma$ pelos estimadores:
$$\widehat{P(X<83)}=\Phi\!\left(\frac{83-84{,}6}{1{,}881}\right)=\Phi(-0{,}85)=1-\Phi(0{,}85)\approx 0{,}1977\ ✓$$

### Exemplo 2 — MV numa Exponencial (estilo teoria)
Amostra de tempos com $\bar{x}=1{,}74$. Estimar $P(X>2)$ com $X\sim\text{Exp}(\lambda)$.
- $\hat\lambda=1/\bar{x}=1/1{,}74$.
- Invariância: $\widehat{P(X>2)}=e^{-2\hat\lambda}=e^{-2/1{,}74}\approx 0{,}3168$.

---

## 6. ⚠️ Erros comuns

- **Estimar $\sigma^2$ pela variância corrigida quando se pede a MV** (ou vice-versa). MV/momentos → $\frac1n$; inferência sobre variância (IC/teste) → $S^2$ com $\frac{1}{n-1}$.
- **Esquecer a invariância** ao estimar uma probabilidade/função do parâmetro.
- **Confundir estimador (v.a.) com estimativa (número).**
- **Trocar $\lambda$ e $1/\lambda$** na Exponencial ($\hat\lambda=1/\overline{X}$).

---

## 7. Ligação aos exercícios das aulas

- **Ex. 64** — MV numa Normal: $\hat\mu,\hat\sigma^2,\hat\sigma$ e $P(X>\max)$ (invariância).
- **Ex. 65** — MV do parâmetro de uma Rayleigh e estimativas de $E(X)$, $V(X)$.
- **Ex. 66** — MV numa Normal a partir de $\sum x_i$ e $\sum x_i^2$; estimar $P(X<83)$.

## 8. Ligação ao teste de exemplo

**Pergunta 2** usa a **fórmula prática de $s^2$** a partir de $\sum x_i=1140$ e $\sum x_i^2=108900$ ($\bar{x}=95$, $s^2=54{,}545$, $s=7{,}3855$) — exatamente a estatística deste ficheiro, depois aplicada num IC.

---

## 9. Resumo final

- Estatística → estimador (v.a.) → estimativa (número).
- Média amostral $\overline{X}$; variância corrigida $S^2=\frac{\sum x_i^2-n\bar x^2}{n-1}$.
- MV/momentos: $\hat p=\overline{X}$, $\hat\mu=\overline{X}$, $\hat\sigma^2=\frac1n\sum(\cdot)$, $\hat\lambda=1/\overline{X}$.
- Invariância: $g(\hat\theta)$ estima $g(\theta)$.
- Bom estimador: centrado, eficiente, consistente.

## 10. ❓ Perguntas de autoavaliação

1. Distingue população, amostra, estatística, estimador e estimativa.
2. Escreve a fórmula prática de $s^2$ a partir de $\sum x_i$ e $\sum x_i^2$.
3. Qual o estimador MV de $p$, $\mu$, $\sigma^2$ e $\lambda$?
4. Pela MV, a variância estima-se com $\frac1n$ ou $\frac{1}{n-1}$?
5. O que diz a propriedade da invariância? Dá um exemplo.
6. O que significa um estimador ser centrado, eficiente e consistente?

