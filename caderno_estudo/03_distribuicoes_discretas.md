# 03 — Distribuições Discretas 🔴 PRIORITÁRIO

> **Pré-requisito:** [medidas de v.a. discretas](02_variaveis_discretas_medidas.md).
> A **Binomial** e a **Poisson** saem muito. Este é um ficheiro de treino intenso.

---

## 1. Explicação simples — qual distribuição usar?

A maior parte dos exercícios discretos resume-se a **reconhecer o modelo** a partir do enunciado. Guia rápido:

| Situação no enunciado | Distribuição |
|---|---|
| 1 única prova com 2 resultados (sucesso/insucesso) | **Bernoulli** |
| n.º de sucessos em **n provas independentes** (com reposição / população grande) | **Binomial** |
| n.º de provas **até ao 1.º sucesso** | **Geométrica** |
| n.º de ocorrências raras num intervalo de tempo/espaço (n grande, p pequeno) | **Poisson** |

---

## 2. As distribuições, uma a uma

### Bernoulli — $X \sim \text{Ber}(p)$
Uma só prova; $X=1$ (sucesso, prob. $p$) ou $X=0$ (insucesso, prob. $1-p$).
$$P(X=x)=p^x(1-p)^{1-x},\ x\in\{0,1\} \qquad E(X)=p \qquad V(X)=p(1-p)$$

---

### Binomial — $X \sim \text{Bin}(n,p)$ 🔴
$X$ = n.º de sucessos em $n$ provas de Bernoulli **independentes**, cada uma com prob. de sucesso $p$.
$$\boxed{P(X=x)=\binom{n}{x}p^x(1-p)^{n-x},\quad x=0,1,\dots,n}$$
$$E(X)=np \qquad V(X)=np(1-p) \qquad \binom{n}{x}=\frac{n!}{(n-x)!\,x!}$$

- **Quando se usa:** amostragem **com reposição** ou população **muito grande** (extrações praticamente independentes); "em $n$ tentativas, quantos sucessos?".
- **Como se aplica:** identifica $n$ e $p$; para "pelo menos"/"no máximo" usa a $F_X$ ou o complementar.
- **Exercício típico:** ex. 43, 44, 45, 49, 50, 52(b), 54(b); Pergunta 1 do teste (via TLC).

**Truques essenciais:**
$$P(X\ge k)=1-P(X\le k-1)=1-F_X(k-1) \qquad P(X> k)=1-F_X(k)$$
Em R: `dbinom(x,n,p)` = $P(X=x)$; `pbinom(x,n,p)` = $P(X\le x)$; `pbinom(x,n,p,lower.tail=FALSE)` = $P(X>x)$.

---

### Geométrica — $X \sim \text{Geom}(p)$
$X$ = n.º de provas de Bernoulli **até (e incluindo) o 1.º sucesso**.
$$P(X=x)=(1-p)^{x-1}p,\quad x=1,2,3,\dots \qquad E(X)=\frac1p \qquad V(X)=\frac{1-p}{p^2}$$

- **Propriedade da falta de memória (amnésia):** $P(X>i+j\mid X>j)=P(X>i)$.
- **Cuidado com a convenção do R:** `pgeom`, `dgeom` usam $Y=X-1$ (n.º de **insucessos** antes do 1.º sucesso). Logo $P(X\ge 3)=P(Y\ge 2)=$ `1-pgeom(1,p)`.

---

### Poisson — $X \sim \text{Poisson}(\lambda)$ 🔴
$X$ = n.º de ocorrências (raras) num intervalo fixo; $\lambda$ = n.º médio de ocorrências.
$$\boxed{P(X=x)=\frac{e^{-\lambda}\lambda^{x}}{x!},\quad x\in\mathbb{N}_0} \qquad E(X)=\lambda \qquad V(X)=\lambda$$

- **Na Poisson, média = variância = $\lambda$.** É uma pista para reconhecê-la.
- **Aproximação Binomial → Poisson:** quando $n$ é grande e $p$ pequeno (regra prática: $n\ge 100$ e $np\le 10$), aproxima-se $\text{Bin}(n,p)\approx\text{Poisson}(\lambda=np)$. Simplifica muito os cálculos (ex. 44).
- Em R: `dpois(x,lambda)`, `ppois(x,lambda)`.

---

## 3. Tabela-resumo (para o formulário mental)

| Distribuição | $P(X=x)$ | Suporte | $E(X)$ | $V(X)$ |
|---|---|---|---|---|
| Bernoulli$(p)$ | $p^x(1-p)^{1-x}$ | $\{0,1\}$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $\binom{n}{x}p^x(1-p)^{n-x}$ | $0..n$ | $np$ | $np(1-p)$ |
| Geométrica$(p)$ | $(1-p)^{x-1}p$ | $1,2,\dots$ | $1/p$ | $(1-p)/p^2$ |
| Poisson$(\lambda)$ | $e^{-\lambda}\lambda^x/x!$ | $\mathbb{N}_0$ | $\lambda$ | $\lambda$ |

---

## 4. Exemplos resolvidos passo a passo

### Exemplo 1 — Binomial "pelo menos" (estilo ex. 43/52b)
$X\sim\text{Bin}(3,\,0{,}9)$ (3 máquinas, cada trabalha com prob. 0,9). Calcular $E(X)$ e $V(X)$.
$$E(X)=np=3\cdot0{,}9=2{,}7 \qquad V(X)=np(1-p)=3\cdot0{,}9\cdot0{,}1=0{,}27$$
(A solução oficial escreve $E(X)=27$ com desalinhamento decimal; o valor correto é $2{,}7$.)

### Exemplo 2 — Aproximação por Poisson (estilo ex. 44)
Tiragem de $n=1000$ manuais, prob. de defeito $p=10^{-2}$. Como $n\ge 100$ e $np=10\le 10$, usa-se $X\approx\text{Poisson}(\lambda=np=10)$.
- $P(\text{pelo menos 3}) = 1-P(X\le 2) = 1-\big[P(0)+P(1)+P(2)\big]$
- $P(0)=e^{-10}$, $P(1)=e^{-10}\cdot 10$, $P(2)=e^{-10}\cdot\tfrac{10^2}{2}$ → resultado $\approx 0{,}9973$ ✓ (oficial).

### Exemplo 3 — Poisson direta (ex. 46)
Avarias/mês $X\sim\text{Poisson}(3)$.
- (a) $P(X=0)=e^{-3}\approx 0{,}0498$ ✓
- (b) $P(X\ge 2)=1-P(0)-P(1)=1-e^{-3}-3e^{-3}=1-4e^{-3}\approx 0{,}801$ ✓

---

## 5. ⚠️ Erros comuns

- **Usar Binomial quando não há independência.** Amostragem **sem reposição** em população pequena → não é Binomial (seria hipergeométrica; fora do âmbito, mas o enunciado costuma garantir reposição/população grande).
- **Esquecer o complementar** em "pelo menos $k$": $P(X\ge k)=1-F_X(k-1)$, **não** $1-F_X(k)$.
- **Convenção do R na Geométrica/Poisson** (o R conta insucessos na geométrica; cuidado com o índice).
- **Poisson:** trocar $\lambda$; lembra que média = variância = $\lambda$.
- **Aproximar por Poisson sem verificar** $n\ge100$ e $np\le10$.

---

## 6. Ligação aos exercícios das aulas

- **Ex. 43** — Binomial: função de probabilidade, $F_X$, $E$, moda, mediana, $V$.
- **Ex. 44** — Binomial com aproximação Poisson ($n$ grande, $p$ pequeno).
- **Ex. 45** — Binomial(15; 0,05): rejeição de lote ("mais do que 2").
- **Ex. 46** — Poisson(3).
- **Ex. 48, 49, 50** — simulação em R e comparação com valores teóricos (Bernoulli, Binomial, Binomial vs Poisson).
- **Ex. 52(b), 54(b), 60(c)** — Binomial "escondida": conta quantos, em $n$ objetos, verificam uma condição cuja probabilidade se obtém de uma Normal.

## 7. Ligação ao teste de exemplo

**Pergunta 1:** cada lance livre é Bernoulli(0,8); o total $S_{36}$ é a soma (Binomial), mas resolve-se por **[TLC](05_teorema_limite_central.md)**. Sabe reconhecer $E(X_i)=p$ e $V(X_i)=p(1-p)$.

---

## 8. Resumo final

- **Reconhecer o modelo** é metade do exercício.
- Binomial: $\binom{n}{x}p^x(1-p)^{n-x}$, $E=np$, $V=np(1-p)$.
- Poisson: $e^{-\lambda}\lambda^x/x!$, $E=V=\lambda$; aproxima a Binomial quando $n$ grande e $p$ pequeno.
- "Pelo menos $k$" → complementar com $F_X(k-1)$.

## 9. ❓ Perguntas de autoavaliação

1. Que pistas do enunciado indicam Binomial? E Poisson? E Geométrica?
2. Escreve de cor $P(X=x)$, $E(X)$ e $V(X)$ das quatro distribuições.
3. Como calculo $P(X\ge 3)$ numa Binomial usando a tabela/$F_X$?
4. Quando (e como) aproximo uma Binomial por uma Poisson?
5. Numa Poisson, quanto vale a variância se a média é 5?
6. O que diz a propriedade de falta de memória da Geométrica?
