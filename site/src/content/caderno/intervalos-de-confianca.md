---
titulo: "Intervalos de confiança"
ordem: 7
prioridade: "alta"
tempo: "1h15"
icone: "📐"
resumo: "IC para média (Z/t), variância (χ²) e proporção."
---> **Pré-requisito:** [estimação pontual](/estimacao-pontual).
> **Sai quase de certeza** (foi a Pergunta 2 do teste). A chave é **escolher a situação certa** e seguir os 4 passos.

---

## 1. Explicação simples

Uma estimativa pontual (ex.: $\bar{x}=95$) é um único número — não diz nada sobre a **precisão**. Um **intervalo de confiança** dá uma **gama de valores plausíveis** para o parâmetro, com um certo **grau de confiança** $(1-\alpha)\times100\%$ (tipicamente 90%, 95%, 99%).

**Interpretação correta:** se repetíssemos a amostragem muitas vezes e construíssemos um IC de cada vez, cerca de $(1-\alpha)\times100\%$ desses intervalos conteriam o verdadeiro parâmetro. Para **um** intervalo concreto, o parâmetro ou está ou não está (probabilidade 0 ou 1) — a confiança refere-se ao **método**, não ao intervalo particular.

---

## 2. Como escolher a situação (o mais importante!)

Lê o enunciado e responde: **que parâmetro? a população é Normal? a variância é conhecida?**

| # | Quero estimar… | Condições | Variável fulcral | Distribuição |
|---|---|---|---|---|
| 1 | **média $\mu$** | Normal, **$\sigma^2$ conhecida** (ou $n$ grande, TLC) | $Z=\dfrac{\overline{X}-\mu}{\sigma/\sqrt n}$ | $N(0,1)$ |
| 2 | **média $\mu$** | Normal, **$\sigma^2$ desconhecida** | $T=\dfrac{\overline{X}-\mu}{S/\sqrt n}$ | $t_{(n-1)}$ |
| 3 | **variância $\sigma^2$** | Normal | $Q=\dfrac{(n-1)S^2}{\sigma^2}$ | $\chi^2_{n-1}$ |
| 4 | **proporção $p$** | Bernoulli, $n$ grande ($n>30$) | $Z=\dfrac{\overline{X}-p}{\sqrt{\overline{X}(1-\overline{X})/n}}$ | $N(0,1)$ aprox. |

> **Regra de decisão prática:**
> - Pergunta pela **média** e o enunciado **dá $\sigma$** → **Situação 1** (Normal $Z$).
> - Pergunta pela **média** e só tens os **dados / $s$** → **Situação 2** ($t$). ← a mais comum.
> - Pergunta pela **variância ou desvio padrão** → **Situação 3** ($\chi^2$).
> - Pergunta por uma **percentagem/proporção** → **Situação 4** (proporção).

---

## 3. Fórmulas dos intervalos (aleatório → concreto)

### Situação 1 — média, $\sigma$ conhecida ($z=\Phi^{-1}(1-\tfrac\alpha2)$)
$$IC_{(1-\alpha)}(\mu)=\left]\ \bar{x}-z\,\frac{\sigma}{\sqrt n}\ ,\ \bar{x}+z\,\frac{\sigma}{\sqrt n}\ \right[$$

### Situação 2 — média, $\sigma$ desconhecida ($t=F^{-1}_{t_{n-1}}(1-\tfrac\alpha2)$)
$$IC_{(1-\alpha)}(\mu)=\left]\ \bar{x}-t\,\frac{s}{\sqrt n}\ ,\ \bar{x}+t\,\frac{s}{\sqrt n}\ \right[$$

### Situação 3 — variância (quantis do $\chi^2_{n-1}$: $a=F^{-1}(\tfrac\alpha2)$, $b=F^{-1}(1-\tfrac\alpha2)$)
$$IC_{(1-\alpha)}(\sigma^2)=\left]\ \frac{(n-1)s^2}{b}\ ,\ \frac{(n-1)s^2}{a}\ \right[$$
> Para o IC do **desvio padrão** $\sigma$, tira a raiz quadrada aos dois extremos. Note-se que **$b$ (quantil maior) fica no denominador do extremo esquerdo** — a distribuição $\chi^2$ é assimétrica.

### Situação 4 — proporção ($z=\Phi^{-1}(1-\tfrac\alpha2)$)
$$IC_{(1-\alpha)}(p)=\left]\ \bar{x}-z\sqrt{\frac{\bar{x}(1-\bar{x})}{n}}\ ,\ \bar{x}+z\sqrt{\frac{\bar{x}(1-\bar{x})}{n}}\ \right[$$
> $\bar{x}=\hat p=$ (n.º de sucessos)/$n$. É um IC **aproximado** (via TLC), válido para $n$ grande.

**Amplitude do IC** = $2\times(\text{margem de erro})$. Fica **maior** se aumentares a confiança $(1-\alpha)$ e **menor** se aumentares $n$.

---

## 4. Receita passo a passo (4 passos — igual à teoria)

1. **Variável fulcral:** identifica a situação (1–4) e escreve a v.a. fulcral.
2. **Quantis:** de $1-\alpha$ obtém $\alpha$ e lê o quantil na tabela ($z$, $t$ ou $\chi^2$).
3. **Inversão da desigualdade:** resolve $P(a<\text{fulcral}<b)=1-\alpha$ em ordem ao parâmetro.
4. **Concretização:** substitui $\bar{x}$, $s$, $n$ pelos valores da amostra.

---

## 5. Exemplo resolvido passo a passo — **Pergunta 2 do teste de exemplo**

**Enunciado:** teor de lítio, Normal. $n=12$, $\sum x_i=1140$, $\sum x_i^2=108900$. IC a 95% para $\mu$.

**Passo 0 — que situação?** Pede a **média**, população Normal, **$\sigma$ desconhecida** (só temos os somatórios) → **Situação 2 ($t$)**.

**Passo 1 — variável fulcral:** $T=\dfrac{\overline{X}-\mu}{S/\sqrt{12}}\sim t_{(11)}$.

**Passo 2 — quantil:** $1-\alpha=0{,}95\Rightarrow\alpha=0{,}05$.
$$t=F^{-1}_{t_{11}}\!\left(1-\tfrac{0{,}05}{2}\right)=F^{-1}_{t_{11}}(0{,}975)=2{,}201\ (\text{tabela } t)$$

**Passo 3 — estatísticas da amostra:**
$$\bar{x}=\frac{1140}{12}=95 \qquad s^2=\frac{108900-12\cdot95^2}{11}=\frac{600}{11}=54{,}545\Rightarrow s=7{,}3855$$

**Passo 4 — concretização:**
$$IC_{95\%}(\mu)=\left]\ 95-2{,}201\cdot\frac{7{,}3855}{\sqrt{12}}\ ,\ 95+2{,}201\cdot\frac{7{,}3855}{\sqrt{12}}\ \right[=\boxed{]90{,}31\,,\,99{,}69[}\ ✓$$

> **Bónus (relação IC ↔ teste):** a alínea (b) pergunta se $\mu=90$ é plausível. Como $90\notin]90{,}31;99{,}69[$, **rejeita-se** $H_0:\mu=90$ a 5% (ver [testes de hipóteses](/testes-de-hipoteses)).

---

## 6. ⚠️ Erros comuns

- **Usar $Z$ quando devia ser $t$** (ou vice-versa). Sem $\sigma$ dado → **sempre $t$**.
- **Quantil errado:** usa-se $1-\tfrac\alpha2$ (bilateral), não $1-\alpha$. Para 95%: $z=1{,}96$, não $1{,}645$.
- **Situação 3 (variância):** trocar os quantis $a$ e $b$ — o **maior** ($b$) vai no denominador do extremo **esquerdo**.
- **Esquecer a raiz** para passar do IC de $\sigma^2$ para o IC de $\sigma$.
- **Interpretação:** dizer "há 95% de probabilidade de $\mu$ estar neste intervalo concreto" está **errado**; a confiança é do método.
- **Proporção:** usar $\bar{x}$ em vez de $\hat p=$ sucessos/$n$ (é o mesmo, mas confirma que calculaste bem).

---

## 7. Ligação aos exercícios das aulas

- **Ex. 68, 69** — Situação 1 (média, $\sigma$ conhecida).
- **Ex. 70, 71(a)** — Situação 2 (média, $\sigma$ desconhecida, $t$).
- **Ex. 70, 71(b)** — Situação 3 (variância / desvio padrão, $\chi^2$).
- **Ex. 73, 74, 75** — Situação 4 (proporção).
- **Ex. 67** — efeito de $n$, $\sigma$ e confiança na amplitude (simulação em R).
- **Ex. 72, 84** — em R, com `t.test` e função própria para a variância.

## 8. Ligação ao teste de exemplo

**Pergunta 2** é um IC para a média com $t$ (resolvido acima) + a ligação IC↔teste na alínea (b). É o modelo a treinar.

---

## 9. Resumo final

- Escolhe a **situação** (média σ conhecida/desconhecida, variância, proporção).
- 4 passos: fulcral → quantil ($z$, $t$, $\chi^2$) → inversão → concretização.
- Quantil bilateral $1-\tfrac\alpha2$.
- Relação IC↔teste bilateral: $\theta_0\notin IC \Leftrightarrow$ rejeita $H_0:\theta=\theta_0$.

## 10. ❓ Perguntas de autoavaliação

1. Como decido entre as 4 situações a partir do enunciado?
2. Quando uso $Z$ e quando uso $t$ para a média?
3. Escreve os 4 ICs de cor.
4. Qual o quantil para 95% de confiança bilateral? E para 99%?
5. Como passo do IC de $\sigma^2$ para o de $\sigma$?
6. Qual a interpretação correta de "IC a 95%"?
7. Como uso um IC a 95% para decidir sobre $H_0:\mu=\mu_0$?

