# 01 — Variáveis Aleatórias Reais: Conceitos Base

> **Onde encaixa:** é a "porta de entrada" do Capítulo 4. Tudo o resto (distribuições, TLC, inferência) assenta nestas ideias. Estuda isto **primeiro**.
> **Ligação:** [medidas de v.a. discretas](02_variaveis_discretas_medidas.md) · [v.a. contínuas](04_variaveis_continuas_e_distribuicoes.md)

---

## 1. Explicação simples

Muitas vezes, ao fazer uma experiência aleatória, não nos interessa o resultado "cru" mas sim **um número associado** a esse resultado.

Exemplo: lançamos um dado duas vezes. O resultado "cru" é um par como `(2,5)`. Mas o que nos interessa pode ser: *a soma*, *o número de faces pares*, *o máximo*, etc. Cada uma dessas "características numéricas" é uma **variável aleatória**.

Formalmente, uma **variável aleatória real (v.a.r.)** é uma função que a cada resultado da experiência atribui um número real:

$$X : \Omega \to \mathbb{R}, \qquad \omega \mapsto X(\omega)$$

onde $\Omega$ é o espaço de resultados. Escrevemos as v.a. com **maiúsculas** ($X, Y, Z$) e os valores concretos com **minúsculas** ($x, y$).

**Ideia-chave:** um acontecimento como "sair no máximo 1 face par" traduz-se num acontecimento sobre $X$: $\{X \le 1\}$, e podemos calcular a sua probabilidade $P(X \le 1)$.

---

## 2. Definições importantes

- **Variável aleatória real (v.a.r.):** função de $\Omega$ em $\mathbb{R}$.
- **Notação de probabilidade:** $P(X = x) = P(\{\omega \in \Omega : X(\omega) = x\})$.
- **Função de distribuição (cumulativa)** de $X$:
$$F_X(x) = P(X \le x), \qquad x \in \mathbb{R}$$
Dá a probabilidade **acumulada** até ao ponto $x$. É a ferramenta universal: existe para qualquer v.a. (discreta, contínua ou mista).
- **Classificação:**
  - **Discreta:** os valores possíveis formam um conjunto finito ou numerável (ex.: 0,1,2,...). A $F_X$ é uma **função em escada**.
  - **Contínua:** os valores possíveis formam um intervalo (ou união de intervalos). A $F_X$ é **contínua**.
  - **Mista:** mistura das duas (há massa de probabilidade concentrada num ponto E probabilidade espalhada num intervalo). Ex.: tempo de espera num semáforo (probabilidade $p$ de esperar 0, e o resto contínuo).
- **Vetor aleatório:** quando estudamos várias características em simultâneo, $\mathbf{X}:\Omega \to \mathbb{R}^k$.

---

## 3. Fórmulas essenciais

### Propriedades da função de distribuição $F_X$

| Fórmula | O que significa |
|---|---|
| $0 \le F_X(x) \le 1$ | É uma probabilidade acumulada. |
| $F_X$ é **não decrescente** | À medida que $x$ cresce, acumula-se mais probabilidade. |
| $\displaystyle\lim_{x\to-\infty}F_X(x)=0,\quad \lim_{x\to+\infty}F_X(x)=1$ | Começa em 0 e termina em 1. |
| $P(x_0 < X \le x_1) = F_X(x_1) - F_X(x_0)$ | Probabilidade num intervalo à custa de $F_X$. |

**O que significa · quando se usa · como se aplica · que exercício pede isto:**
- **Significa:** $F_X(x)$ é "quanta probabilidade já acumulei até $x$".
- **Quando se usa:** sempre que o enunciado der (ou pedir) a função de distribuição, ou pedir probabilidades de intervalos.
- **Como se aplica:** para $P(a < X \le b)$ faz-se **diferença** $F_X(b)-F_X(a)$.
- **Exercício típico:** "obtenha $F_X$ e calcule $P(2 \le X < 5)$" (ex. 40, 41, 42).

---

## 4. Independência de variáveis aleatórias

Duas v.a. $X$ e $Y$ são **independentes** se, para quaisquer conjuntos $A, B \subseteq \mathbb{R}$:

$$P(X \in A,\; Y \in B) = P(X \in A)\,P(Y \in B)$$

- **Amostra aleatória:** $X_1, X_2, \dots, X_n$ **independentes e identicamente distribuídas (i.i.d.)** — todas com a mesma distribuição de $X$. É o modelo de "recolher $n$ observações da mesma população, com reposição". Base de toda a inferência (ficheiros 06–09).

### Tipos de amostragem (importante distinguir!)

- **Amostras independentes:** duas populações distintas, amostras recolhidas separadamente (ex.: peso de homens vs peso de mulheres).
- **Amostras emparelhadas:** os dados vêm **aos pares ligados** (ex.: peso *antes* e *depois* do tratamento no mesmo indivíduo; palmo da mão que escreve vs a outra). Aqui trabalha-se com a **diferença** dos pares.

> Esta distinção decide o procedimento estatístico. No teste de exemplo (P4) e em exercícios como o 85 (peso antes/depois) e 98–100 (correlação em pares), o tipo de amostragem é decisivo.

---

## 5. Exemplo resolvido passo a passo

**Enunciado (baseado no exemplo da teoria):** $X$ = número de faces pares em 2 lançamentos de um dado. Sabe-se que $P(X=0)=\tfrac{9}{36}$, $P(X=1)=\tfrac{18}{36}$, $P(X=2)=\tfrac{9}{36}$. Calcular $P(X<2)$ e $P(0<X\le 2)$.

**Passo 1 — Traduzir para $F_X$.** Como $X$ é discreta e só toma 0,1,2:
$$P(X<2)=P(X\le 1)=F_X(1)=P(X=0)+P(X=1)=\tfrac{9}{36}+\tfrac{18}{36}=\tfrac{27}{36}=0{,}75$$

**Passo 2 — Intervalo por diferença de $F_X$.**
$$P(0<X\le 2)=F_X(2)-F_X(0)=1-\tfrac{9}{36}=\tfrac{27}{36}=0{,}75$$

**Chave do raciocínio:** `<` vs `≤` importa numa v.a. discreta! $P(X<2)=P(X\le 1)$ porque $X$ só toma valores inteiros.

---

## 6. ⚠️ Erros comuns a evitar

- **Confundir `<` com `≤` em v.a. discretas.** Numa discreta, $P(X<a) = P(X \le a) - P(X=a)$. Numa **contínua**, `<` e `≤` dão o mesmo resultado (ver [ficheiro 04](04_variaveis_continuas_e_distribuicoes.md)).
- **Esquecer que $F_X$ é acumulada** — não é $P(X=x)$, é $P(X \le x)$.
- **Trocar amostras independentes com emparelhadas** — muda completamente o teste a aplicar.
- **Pensar que $F_X$ decresce nalgum ponto** — nunca; é sempre não decrescente.

---

## 7. Ligação aos exercícios das aulas

- **Ex. 40, 41, 42** — dão/pedem $F_X$ de v.a. discretas e cálculo de probabilidades de intervalos. Treina aqui a diferença `<`/`≤`.
- **Ex. 51** — v.a. contínua definida pela $F_X$; usa a mesma lógica de acumulação.

## 8. Ligação ao teste de exemplo

Não há pergunta isolada sobre estes conceitos, mas **todas as 4 perguntas** os usam implicitamente: identificar a v.a. de interesse, saber se é discreta ou contínua, reconhecer amostras (P4 usa a diferença Tipo1−Tipo2 → amostras que geram $X_1-X_2$).

---

## 9. Resumo final

- Uma v.a. transforma resultados em números; escreve-se com maiúscula.
- $F_X(x)=P(X\le x)$ é a ferramenta universal: não decrescente, de 0 a 1.
- $P(a<X\le b)=F_X(b)-F_X(a)$.
- Discreta (escada) vs contínua (curva) vs mista.
- Amostra = $n$ v.a. i.i.d.; distinguir independentes vs emparelhadas.

## 10. ❓ Perguntas de autoavaliação

1. O que é, em palavras, uma variável aleatória? E $F_X(x)$?
2. Quais são as 3 propriedades de qualquer função de distribuição?
3. Como calculo $P(a<X\le b)$ a partir de $F_X$?
4. Numa v.a. **discreta**, $P(X<3)$ é igual a $P(X\le 3)$? Porquê?
5. Qual a diferença entre v.a. discreta, contínua e mista?
6. O que significam duas v.a. serem independentes? O que é uma amostra i.i.d.?
7. Qual a diferença entre amostras independentes e emparelhadas? Dá um exemplo de cada.
