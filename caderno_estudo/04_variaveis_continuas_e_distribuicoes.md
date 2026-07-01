# 04 — Variáveis Aleatórias Contínuas e Distribuições 🔴 PRIORITÁRIO

> **Pré-requisito:** [conceitos base](01_variaveis_aleatorias_conceitos_base.md).
> A **Normal** é a distribuição mais importante de todo o teste. Domina a padronização e a leitura da tabela ([ver ficheiro 10](10_formulario_tabelas_como_usar.md)).

---

## 1. Explicação simples

Numa v.a. **contínua** os valores possíveis formam um intervalo (ex.: tempo, comprimento, peso). Aqui **não faz sentido** falar de $P(X=x)$ — essa probabilidade é sempre **0**. Em vez disso usamos a **função densidade de probabilidade (f.d.p.)** $f_X$, e as probabilidades são **áreas** (integrais) sob a densidade.

---

## 2. Definições e fórmulas essenciais

### Função densidade $f_X$
Função $f_X \ge 0$ tal que:
$$F_X(x)=\int_{-\infty}^{x} f_X(t)\,dt \qquad\Longleftrightarrow\qquad f_X(x)=\frac{d}{dx}F_X(x)$$
$$\int_{-\infty}^{+\infty} f_X(x)\,dx = 1 \quad(\text{área total} = 1)$$

### Probabilidades = áreas
$$P(X=x)=0 \qquad P(a\le X\le b)=\int_a^b f_X(x)\,dx = F_X(b)-F_X(a)$$

> **Consequência prática:** numa contínua, `<` e `≤` dão o **mesmo** resultado:
> $$P(a\le X\le b)=P(a<X<b)=F_X(b)-F_X(a)$$

### Medidas (versão contínua — troca-se soma por integral)
$$E(X)=\int_{-\infty}^{+\infty} x\,f_X(x)\,dx \qquad E[h(X)]=\int h(x)f_X(x)\,dx$$
$$V(X)=E(X^2)-[E(X)]^2 \qquad \text{Mediana: } F_X(\mu_e)=0{,}5 \qquad \text{Quantil: } F_X(q_p)=p$$

> As propriedades $E(aX+b)=aE(X)+b$ e $V(aX+b)=a^2V(X)$ mantêm-se iguais.

---

## 3. Distribuição Normal (Gaussiana) 🔴 — $X\sim N(\mu,\sigma^2)$

A "curva em sino". Parâmetros: $\mu$ (centro) e $\sigma^2$ (dispersão).
$$f_X(x)=\frac{1}{\sqrt{2\pi\sigma^2}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}} \qquad E(X)=\mu \qquad V(X)=\sigma^2$$

### Padronização (o truque central de todo o teste)
Não existe fórmula fechada para o integral da Normal → usamos a **tabela da Normal padrão** $N(0,1)$. Para qualquer Normal:
$$\boxed{Z=\frac{X-\mu}{\sigma}\sim N(0,1)}$$
$$F_X(x)=P(X\le x)=P\!\left(Z\le \frac{x-\mu}{\sigma}\right)=\Phi\!\left(\frac{x-\mu}{\sigma}\right)$$

onde $\Phi(z)=P(Z\le z)$ é a função de distribuição da Normal padrão (a que está tabelada).

### Propriedades que salvam tempo
| Propriedade | Uso |
|---|---|
| $\Phi(-z)=1-\Phi(z)$ | valores negativos não estão na tabela |
| $\Phi^{-1}(p)=-\Phi^{-1}(1-p)$ | quantis à esquerda a partir dos da direita |
| Se $Y=aX+b$, então $Y\sim N(a\mu+b,\ a^2\sigma^2)$ | transformações lineares continuam Normais |
| Soma de Normais independentes é Normal (ver [TLC](05_teorema_limite_central.md)) | somas/médias |

- **Quando se usa:** medições, alturas, pesos, tempos de vida, erros — quase tudo o que é "natural e simétrico".
- **Como se aplica (receita):** (1) escreve $X\sim N(\mu,\sigma^2)$; (2) padroniza; (3) lê $\Phi$ na tabela; (4) usa $\Phi(-z)=1-\Phi(z)$ se precisares.
- **Exercício típico:** ex. 52, 53, 54, 56; Perguntas 1 e 3 do teste (a P3 usa $Z$ com $\sigma$ conhecido).

---

## 4. Distribuição Exponencial — $X\sim\text{Exp}(\lambda)$

Modela **tempos de espera / vida** sem desgaste.
$$f_X(x)=\lambda e^{-\lambda x}\ (x>0) \qquad F_X(x)=1-e^{-\lambda x}\ (x>0)$$
$$E(X)=\frac1\lambda \qquad V(X)=\frac{1}{\lambda^2}$$

- **Falta de memória (única contínua com esta propriedade):** $P(X>s+t\mid X>s)=P(X>t)$.
- **Como se aplica:** o mais comum é usar $F_X$ diretamente: $P(X>a)=e^{-\lambda a}$.
- **Exercício típico:** ex. 51 (peças tipo A/B com $\lambda$ diferentes + probabilidade condicionada/Bayes).

---

## 5. Distribuição Uniforme contínua — $X\sim\text{Uniforme}(a,b)$

Todos os valores em $[a,b]$ são "igualmente prováveis" (densidade constante).
$$f_X(x)=\frac{1}{b-a}\ (a\le x\le b) \qquad F_X(x)=\frac{x-a}{b-a}$$
$$E(X)=\frac{a+b}{2} \qquad V(X)=\frac{(b-a)^2}{12}$$

> ⚠️ A folha de exercícios (ex. 55) escreve $E(X)=\frac{b-a}{2}$ — isso é um **lapso**; o correto é $\frac{a+b}{2}$ (para $[0,2]$ dá 1, que bate com a solução oficial 0,9997≈1).

- **Exercício típico:** ex. 55 (tempo de resposta de servidor em $[0,2]$).

---

## 6. Exemplos resolvidos passo a passo

### Exemplo 1 — Normal, "não defeituosa" (ex. 52)
$X\sim N(10,\,4)$ (logo $\mu=10$, $\sigma=2$). Barra não defeituosa se $8\le X\le 12$.
$$P(8\le X\le 12)=\Phi\!\left(\tfrac{12-10}{2}\right)-\Phi\!\left(\tfrac{8-10}{2}\right)=\Phi(1)-\Phi(-1)$$
$$=\Phi(1)-(1-\Phi(1))=2\Phi(1)-1=2(0{,}8413)-1=0{,}6826\ ✓$$

### Exemplo 2 — Normal, quantil "excede 90%" (ex. 53b)
$X\sim N(7000,\,600^2)$. Duração $t$ que 90% dos lasers **excede**: $P(X>t)=0{,}90$.
$$P(X>t)=0{,}90 \Rightarrow \Phi\!\left(\tfrac{t-7000}{600}\right)=0{,}10 \Rightarrow \tfrac{t-7000}{600}=\Phi^{-1}(0{,}10)=-\Phi^{-1}(0{,}90)=-1{,}2816$$
$$t=7000+600\cdot(-1{,}2816)\approx 6231\ ✓$$

### Exemplo 3 — Exponencial + Bayes (ex. 51, resumo)
Peça tipo A: $\lambda=1/2$; tipo B: $\lambda=1$; duração em centenas de horas. Lote: 100 A + 50 B. Sabe-se que durou <90h (=0,9 centenas). Pede-se $P(B\mid X<0{,}9)$.
- $P(X<0{,}9\mid A)=1-e^{-0{,}5\cdot0{,}9}$; $P(X<0{,}9\mid B)=1-e^{-1\cdot0{,}9}$; priores $P(A)=\tfrac{100}{150}$, $P(B)=\tfrac{50}{150}$.
- Bayes: $P(B\mid X<0{,}9)=\dfrac{P(X<0{,}9\mid B)P(B)}{P(X<0{,}9\mid A)P(A)+P(X<0{,}9\mid B)P(B)}\approx 0{,}4502$ ✓

---

## 7. ⚠️ Erros comuns

- **Calcular $P(X=x)$ numa contínua** — é sempre 0.
- **Esquecer de padronizar** ou dividir por $\sigma^2$ em vez de $\sigma$. **Divide sempre pelo desvio padrão $\sigma$**, não pela variância.
- **Confundir $\mu$/$\sigma^2$/$\sigma$**: se $N(10,4)$, a variância é 4 e o desvio padrão é 2.
- **$\Phi(-z)$**: a tabela só tem valores positivos → usa $\Phi(-z)=1-\Phi(z)$.
- **Quantis à esquerda:** $\Phi^{-1}(0{,}10)$ é negativo; usa $\Phi^{-1}(p)=-\Phi^{-1}(1-p)$.

---

## 8. Ligação aos exercícios das aulas

- **Ex. 51** — Exponencial + probabilidade condicionada/Bayes.
- **Ex. 52, 53, 54** — Normal (probabilidades, quantis, e "Binomial escondida" no ponto b).
- **Ex. 55** — Uniforme (densidade, $F_X$, $E$, $V$, simulação).
- **Ex. 56** — Normal (regra empírica $\mu\pm\sigma,\ \pm2\sigma,\ \pm3\sigma$; percentis).

## 9. Ligação ao teste de exemplo

- **Pergunta 3** — teste de hipóteses com $X\sim N(\mu,5^2)$ e $\sigma$ **conhecido** → estatística $Z$ com $\Phi$.
- **Pergunta 1** — a Normal surge como aproximação (TLC) e usa-se $\Phi$ para as caudas.

---

## 10. Resumo final

- Contínua: probabilidades são **áreas**; $P(X=x)=0$; `<`=`≤`.
- Normal: padroniza $Z=\frac{X-\mu}{\sigma}$, lê $\Phi$; usa $\Phi(-z)=1-\Phi(z)$ e $\Phi^{-1}(p)=-\Phi^{-1}(1-p)$.
- Exponencial: $F_X=1-e^{-\lambda x}$, $P(X>a)=e^{-\lambda a}$, falta de memória, $E=1/\lambda$.
- Uniforme: densidade constante, $E=\frac{a+b}{2}$, $V=\frac{(b-a)^2}{12}$.

## 11. ❓ Perguntas de autoavaliação

1. Porque é que $P(X=x)=0$ numa v.a. contínua? Que consequência tem em `<` vs `≤`?
2. Escreve a receita completa para calcular $P(X\le x)$ numa Normal.
3. Como calculo um **quantil** de uma Normal (ex.: valor que 90% excede)?
4. Divides por $\sigma$ ou por $\sigma^2$ ao padronizar?
5. Qual a f.d.p. e a $F_X$ da Exponencial? O que é a falta de memória?
6. $E(X)$ e $V(X)$ de uma Uniforme$(0,2)$?
