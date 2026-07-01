# 08 — Testes de Hipóteses 🔴 PRIORITÁRIO

> **Pré-requisitos:** [IC](07_intervalos_de_confianca.md), [Normal](04_variaveis_continuas_e_distribuicoes.md).
> **Sai quase de certeza** (Perguntas 3 e 4 do teste). A lógica é a mesma dos ICs, mas agora **decidimos** sobre uma afirmação.

---

## 1. Explicação simples

Um **teste de hipóteses** é um procedimento para decidir, com base numa amostra, se os dados **sustentam ou não** uma afirmação sobre a população (ex.: "a máquina enche sacos de 16 kg", "a eficácia é 90%").

Testam-se sempre **duas** hipóteses:
- **$H_0$ (hipótese nula):** a afirmação "por defeito" / que se quer pôr à prova (ex.: $\mu=6$).
- **$H_1$ (hipótese alternativa):** a negação/complementar (ex.: $\mu\neq6$, ou $\mu>6$, ou $\mu<6$).

**Regra de ouro da linguagem:** nunca se "aceita $H_0$". Diz-se **"rejeita-se $H_0$"** ou **"não há evidência para rejeitar $H_0$"**.

---

## 2. Tipos de erro

|  | $H_0$ verdadeira | $H_0$ falsa |
|---|---|---|
| **Não rejeitar $H_0$** | Decisão correta | **Erro tipo II** ($\beta$) |
| **Rejeitar $H_0$** | **Erro tipo I** ($\alpha$) | Decisão correta |

- $\alpha=P(\text{rejeitar }H_0\mid H_0\text{ verdadeira})$ = **nível de significância** (fixamo-lo: 0,01; 0,05; 0,10).
- O **erro tipo I** é considerado o **mais grave**; por isso controla-se $\alpha$.

---

## 3. Procedimento (5 passos)

1. **Hipóteses:** definir $H_0$ e $H_1$ (bilateral $\neq$, ou unilateral $>$ / $<$).
2. **Estatística de teste:** identificar $T$ e a sua distribuição **sob $H_0$** (substitui-se o parâmetro pelo valor de $H_0$).
3. **Região crítica (RC):** conjunto de valores de $T$ que levam a rejeitar $H_0$, ao nível $\alpha$.
4. **Valor observado** $t_0$ da estatística, com os dados.
5. **Decisão:** se $t_0\in RC$ → **rejeita-se** $H_0$; caso contrário, não se rejeita.

### Região crítica conforme $H_1$
(quantis da distribuição de $T$ sob $H_0$)

| $H_1$ | Região crítica | 
|---|---|
| $\theta\neq\theta_0$ (bilateral) | $RC=\{t:t<a \ \vee\ t>b\}$, com $a=F^{-1}(\tfrac\alpha2)$, $b=F^{-1}(1-\tfrac\alpha2)$ |
| $\theta>\theta_0$ (unilateral dir.) | $RC=\{t:t>b\}$, com $b=F^{-1}(1-\alpha)$ |
| $\theta<\theta_0$ (unilateral esq.) | $RC=\{t:t<a\}$, com $a=F^{-1}(\alpha)$ |

---

## 4. O valor-p (alternativa à região crítica)

O **valor-p** é a probabilidade de observar um valor **tão ou mais extremo** que $t_0$, **assumindo $H_0$ verdadeira**.

$$\text{valor-p}=\begin{cases} 2\times\min\{P(T_0<t_0),P(T_0>t_0)\} & H_1:\theta\neq\theta_0 \\ P(T_0>t_0) & H_1:\theta>\theta_0 \\ P(T_0<t_0) & H_1:\theta<\theta_0 \end{cases}$$

**Regra de decisão:** rejeita-se $H_0$ se **valor-p $<\alpha$**.
> Interpretação útil: o valor-p é o **maior nível de significância ao qual NÃO se rejeita** $H_0$. Ex.: valor-p = 0,0228 → rejeita-se a 5% e 10%, não se rejeita a 1%.

---

## 5. Os testes paramétricos (estatística de teste sob $H_0$)

A estatística de teste é a **variável fulcral do IC** com o parâmetro substituído pelo valor de $H_0$ ($\theta_0$).

| Teste sobre… | Condições | Estatística sob $H_0$ | Distribuição | R |
|---|---|---|---|---|
| **média** | Normal, $\sigma$ **conhecida** | $Z_0=\dfrac{\overline{X}-\mu_0}{\sigma/\sqrt n}$ | $N(0,1)$ | `z.test` (BSDA) |
| **média** | Normal, $\sigma$ **desconhecida** | $T_0=\dfrac{\overline{X}-\mu_0}{S/\sqrt n}$ | $t_{n-1}$ | `t.test` |
| **variância** | Normal | $Q_0=\dfrac{(n-1)S^2}{\sigma_0^2}$ | $\chi^2_{n-1}$ | `variance.test` |
| **proporção** | $n$ grande | $Z_0=\dfrac{\overline{X}-p_0}{\sqrt{p_0(1-p_0)/n}}$ | $N(0,1)$ aprox. | `prop.test`/`binom.test` |

> Na proporção, a estatística de teste usa $p_0$ (valor de $H_0$) **no denominador**, ao contrário do IC que usa $\bar{x}$.

---

## 6. Exemplos resolvidos passo a passo

### Exemplo A — **Pergunta 3 do teste** (média, $\sigma$ conhecida, valor-p, unilateral)
Paracetamol perigoso se $\mu>150$. $n=4$, $\bar{x}=155$, $\sigma=5$ (conhecido), Normal.

**1. Hipóteses** (o "risco" é $\mu>150$ → unilateral direita):
$$H_0:\mu=150 \quad\text{vs}\quad H_1:\mu>150$$

**2. Estatística** (σ conhecida → $Z$):
$$Z_0=\frac{\overline{X}-150}{5/\sqrt n}\ \overset{H_0}{\sim}\ N(0,1)$$

**3/4. Valor observado:**
$$t_0=\frac{155-150}{5/\sqrt4}=\frac{5}{2{,}5}=2$$

**5. Valor-p** (unilateral direita):
$$\text{valor-p}=P(Z_0>2)=1-\Phi(2)=1-0{,}9772=0{,}0228$$

**Decisão:** rejeita-se $H_0$ para $\alpha\ge2{,}28\%$ (inclui 5% e 10%). Dado o risco para o paciente, **há evidência de concentração perigosa**. ✓

### Exemplo B — média, $\sigma$ desconhecida, bilateral ($t$) (estilo teoria/ex. 78)
Volta à fábrica em ~30 min? $n=32$, $\bar{x}=30{,}8$, $s=1{,}5$, $\alpha=1\%$.
- $H_0:\mu=30$ vs $H_1:\mu\neq30$; $T_0=\frac{\overline{X}-30}{S/\sqrt{32}}\sim t_{31}$.
- $t_0=\frac{30{,}8-30}{1{,}5/\sqrt{32}}=\frac{0{,}8}{0{,}2652}\approx3{,}017$.
- RC bilateral a 1%: $|t_0|>F^{-1}_{t_{31}}(0{,}995)\approx2{,}744$. Como $3{,}017>2{,}744$ → **rejeita-se** $H_0$. ✓ (solução oficial: há evidência para rejeitar.)

### Exemplo C — proporção, unilateral (estilo teoria)
Sondagem: 683 em 1200 votam ABC. Testar $H_0:p=0{,}5$ vs $H_1:p>0{,}5$, $\alpha=1\%$.
- $z_0=\frac{683/1200-0{,}5}{\sqrt{0{,}5\cdot0{,}5/1200}}=\frac{0{,}069}{0{,}01443}\approx4{,}79$.
- RC: $z_0>\Phi^{-1}(0{,}99)=2{,}326$. Como $4{,}79>2{,}326$ → **rejeita-se** $H_0$ (valor-p$\approx0$). ✓

---

## 7. Relação entre IC e teste bilateral

Para $H_0:\theta=\theta_0$ vs $H_1:\theta\neq\theta_0$ (bilateral), com a mesma amostra e nível $\alpha$:
$$\theta_0\notin IC_{(1-\alpha)}\ \Longleftrightarrow\ \text{rejeita-se }H_0 \qquad\qquad \theta_0\in IC_{(1-\alpha)}\ \Longleftrightarrow\ \text{não se rejeita }H_0$$
> Usado na **Pergunta 2(b)** do teste: como $90\notin]90{,}31;99{,}69[$, rejeita-se $H_0:\mu=90$ **sem fazer o teste**.

---

## 8. ⚠️ Erros comuns

- **Dizer "aceita-se $H_0$".** Diz "não há evidência para rejeitar $H_0$".
- **Escolher mal $H_1$** (uni vs bilateral). Palavras como "superior a", "aumentou", "pelo menos" → unilateral. "É igual/diferente de" → bilateral.
- **Trocar a regra do valor-p:** rejeita-se quando valor-p **<** $\alpha$ (não o contrário).
- **Na proporção**, usar $\bar{x}$ (e não $p_0$) no denominador da estatística de teste.
- **Usar $Z$ sem $\sigma$ conhecido** → deve ser $t$.
- **Esquecer que erro tipo I = $\alpha$** e é o que se controla.

---

## 9. Ligação aos exercícios das aulas

- **Ex. 76** — média, $\sigma$ conhecida ($Z$), com valor-p.
- **Ex. 77** — média ($t$) + variância ($\chi^2$) na mesma amostra.
- **Ex. 78** — média, $\sigma$ desconhecida ($t$), unilateral.
- **Ex. 80, 81, 82, 83** — proporção (moeda, medicamento, lâmpadas, roupa).
- **Ex. 79, 84, 85** — em R (`t.test`, `var.test`), interpretação de output.

## 10. Ligação ao teste de exemplo

- **Pergunta 3** — teste à média com $\sigma$ conhecido, decisão pelo **valor-p** (resolvido acima).
- **Pergunta 4** — interpretação de um `t.test` (amostras) e de testes de normalidade → ver [ficheiro 09](09_testes_ajustamento_e_regressao.md).

---

## 11. Resumo final

- 5 passos: $H_0/H_1$ → estatística sob $H_0$ → RC (ou valor-p) → $t_0$ → decisão.
- Estatísticas iguais às fulcrais do IC, com $\theta_0$.
- Rejeita-se se $t_0\in RC$ **ou** valor-p $<\alpha$.
- Nunca "aceitar $H_0$". Erro tipo I = $\alpha$ (o mais grave).
- IC↔teste bilateral: $\theta_0\notin IC \Leftrightarrow$ rejeitar.

## 12. ❓ Perguntas de autoavaliação

1. O que são $H_0$, $H_1$, erro tipo I e tipo II? Qual é o mais grave?
2. Escreve as estatísticas de teste dos 4 testes paramétricos.
3. Como defino a RC para $H_1$ com $\neq$, $>$ e $<$?
4. O que é o valor-p e qual a regra de decisão?
5. Como escolho entre teste uni e bilateral a partir do enunciado?
6. Como relaciono um IC a 95% com um teste bilateral a 5%?
7. Porque não se diz "aceita-se $H_0$"?
