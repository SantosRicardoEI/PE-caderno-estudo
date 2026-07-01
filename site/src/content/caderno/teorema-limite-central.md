---
titulo: "Teorema do Limite Central"
ordem: 5
prioridade: "alta"
tempo: "1h"
icone: "🎯"
resumo: "Somas e médias de v.a. i.i.d. aproximam-se da Normal."
---> **Pré-requisitos:** [distribuições discretas](/distribuicoes-discretas) e [Normal](/variaveis-continuas).
> É um dos temas que **sai quase de certeza** (foi a Pergunta 1 do teste de exemplo). Domina a receita.

---

## 1. Explicação simples

Muitas vezes queremos a probabilidade de uma **soma** ou **média** de muitas v.a. (ex.: peso total de 20 pessoas num elevador, total de pintas em 100 lançamentos). Saber a distribuição exata da soma costuma ser difícil.

**O TLC resolve isto:** se somarmos muitas v.a. i.i.d., a soma (e a média) **aproxima-se de uma Normal**, seja qual for a distribuição original. Quanto mais parcelas, melhor a aproximação.

---

## 2. Enunciado e fórmulas essenciais

Seja $X_1,\dots,X_n$ uma sequência de v.a. **i.i.d.** com $E(X_i)=\mu$ e $V(X_i)=\sigma^2$ (finitos). Define-se a soma $S_n=\sum_{i=1}^n X_i$ e a média $\overline{X}_n=\frac{S_n}{n}$. Então, para $n$ grande:

$$\boxed{\frac{S_n-E(S_n)}{\sqrt{V(S_n)}}=\frac{S_n-n\mu}{\sqrt{n\sigma^2}}\ \overset{a}{\sim}\ N(0,1)}$$

$$\frac{\overline{X}_n-\mu}{\sqrt{\sigma^2/n}}\ \overset{a}{\sim}\ N(0,1)$$

O símbolo $\overset{a}{\sim}$ lê-se "distribui-se **aproximadamente** como".

**Momentos da soma (usar sempre antes de padronizar):**
$$E(S_n)=n\mu \qquad V(S_n)=n\sigma^2 \quad(\text{se as } X_i \text{ forem independentes})$$

- **Quando se usa:** enunciado pede probabilidade de uma **soma/média** e ($n\ge 30$) **ou** a distribuição da soma é desconhecida/discreta com muitas parcelas.
- **Como se aplica:** calcula $E(S_n)$ e $V(S_n)$; padroniza; usa $\Phi$.
- **Regra prática:** considera-se $n$ grande se $n\ge 30$.

### Caso exato: soma de Normais independentes
Se as $X_i$ já forem **Normais** e independentes, a soma é **exatamente** Normal (não é aproximação):
$$\sum_{i=1}^n a_i X_i \sim N\!\left(\sum a_i\mu_i,\ \sum a_i^2\sigma_i^2\right)$$
Isto usa-se quando o $n$ é pequeno **mas** os dados são Normais (ex. 57, 58a, 60, 61).

---

## 3. Receita passo a passo (decorar!)

1. **Identificar** a v.a. de cada parcela $X_i$: qual é $E(X_i)=\mu$ e $V(X_i)=\sigma^2$?
2. **Definir** a v.a. de interesse: soma $S_n$ ou média $\overline{X}$.
3. **Calcular** $E(S_n)=n\mu$ e $V(S_n)=n\sigma^2$.
4. **Escrever** a probabilidade pedida em termos de $F$ (cuidado com `<`/`≤` se a soma for discreta).
5. **Padronizar** e substituir por $\Phi$.
6. **Ler** a tabela e aplicar $\Phi(-z)=1-\Phi(z)$ se necessário.

---

## 4. Exemplo resolvido passo a passo — **Pergunta 1 do teste de exemplo**

**Enunciado:** jogador acerta cada lance livre com $p=0{,}8$. Em 36 lances independentes, aproxima $P(27\le S_{36}\le 31)$.

**Passo 1 — parcelas.** $X_i\sim\text{Bernoulli}(0{,}8)$, i.i.d.:
$$E(X_i)=p=0{,}8 \qquad V(X_i)=p(1-p)=0{,}8\cdot0{,}2=0{,}16$$

**Passo 2 — v.a. de interesse.** $S_{36}=\sum_{i=1}^{36}X_i$ = n.º total de lances encestados.

**Passo 3 — momentos da soma.**
$$E(S_{36})=36\cdot0{,}8=28{,}8 \qquad V(S_{36})=36\cdot0{,}16=5{,}76$$

**Passo 4 — escrever a probabilidade** (S é **discreta** → cuidado com os limites):
$$P(27\le S_{36}\le 31)=P(S_{36}\le 31)-P(S_{36}\le 26)$$
(usa-se $P(S_{36}<27)=P(S_{36}\le 26)$ porque só toma inteiros).

**Passo 5 — padronizar (TLC):**
$$\overset{TLC}{\simeq}\ \Phi\!\left(\frac{31-28{,}8}{\sqrt{5{,}76}}\right)-\Phi\!\left(\frac{26-28{,}8}{\sqrt{5{,}76}}\right)=\Phi(0{,}92)-\Phi(-1{,}16)$$

**Passo 6 — tabela + propriedade:**
$$=\Phi(0{,}92)-\big(1-\Phi(1{,}16)\big)=0{,}8212-1+0{,}8770=\boxed{0{,}6982}\ ✓$$

---

## 5. ⚠️ Erros comuns

- **Esquecer que a soma pode ser discreta.** $P(27\le S\le 31)=P(S\le 31)-P(S\le 26)$ (o limite inferior "salta" para 26). Não subtraias $P(S\le 27)$.
- **Dividir pela variância em vez do desvio padrão.** Padroniza-se com $\sqrt{V(S_n)}$.
- **Confundir soma com média:** $V(S_n)=n\sigma^2$, mas $V(\overline{X})=\sigma^2/n$.
- **Aplicar TLC quando o enunciado quer valor exato** e os dados são Normais com $n$ pequeno → aí usa a soma de Normais (exata).
- **$\Phi(-1{,}16)$** — não existe na tabela; usa $1-\Phi(1{,}16)$.

---

## 6. Ligação aos exercícios das aulas

- **Ex. 57** — soma de Normais independentes (caixa + 12 produtos), caso exato.
- **Ex. 58** — média amostral afastar-se de $\mu$: (a) Normal com $n=10$; (b) desconhecida com $n=100$ (TLC).
- **Ex. 59** — n.º de vezes que sai o "2" em 10 000 algarismos (Binomial → Normal).
- **Ex. 60, 61** — peso total no elevador / carga do transformador (somas de Normais).
- **Ex. 62** — poupança anual (soma de 365 v.a. i.i.d.).
- **Ex. 63** — total de pintas e n.º de "6" em 100 lançamentos (aproximação TLC vs valor exato).

## 7. Ligação ao teste de exemplo

**Pergunta 1** é exatamente um exercício-TLC com parcelas Bernoulli. A resolução acima segue a solução oficial (resultado $0{,}6982$). Espera algo do género no teste real.

---

## 8. Resumo final

- TLC: soma/média de muitas v.a. i.i.d. → aproximadamente Normal.
- $E(S_n)=n\mu$, $V(S_n)=n\sigma^2$; padroniza e usa $\Phi$.
- Soma de Normais independentes é **exatamente** Normal.
- Cuidado com `<`/`≤` quando a soma é discreta.

## 9. ❓ Perguntas de autoavaliação

1. Enuncia o TLC. O que aproxima e sob que condições?
2. Quanto valem $E(S_n)$ e $V(S_n)$? E $V(\overline{X})$?
3. Quando é que a soma é **exatamente** Normal (sem aproximação)?
4. Ao aproximar $P(27\le S\le 31)$ com $S$ discreta, que limites uso em $F$?
5. Qual a regra prática para "$n$ grande"?
6. Resolve de memória a estrutura da Pergunta 1 (parcelas → momentos → padronização).

