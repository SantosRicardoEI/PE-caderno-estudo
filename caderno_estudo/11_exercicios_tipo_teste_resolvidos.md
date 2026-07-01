# 11 — Exercícios Tipo-Teste Resolvidos Passo a Passo

> Reúne as **4 perguntas do teste de exemplo** totalmente resolvidas + **exercícios representativos** de cada tipo prioritário, resolvidos à mão. Os valores finais estão **verificados** contra as soluções oficiais.
> Fontes: [teste_exemplo](../content/teste_exemplo/enunciado/6_teste_exemplo.pdf) · [soluções](../content/teste_exemplo/solucoes/6_teste_exemplo_solucoes.pdf).

---

# PARTE A — Teste de exemplo (as 4 perguntas)

## A1. TLC com parcelas Bernoulli → [ficheiro 05](05_teorema_limite_central.md)

**Enunciado:** $p=0{,}8$, 36 lances independentes. Aproxima $P(27\le S_{36}\le31)$.

1. $X_i\sim\text{Ber}(0{,}8)$: $E(X_i)=0{,}8$, $V(X_i)=0{,}16$.
2. $S_{36}=\sum X_i$: $E(S_{36})=28{,}8$, $V(S_{36})=5{,}76$.
3. $S$ é discreta ⇒ $P(27\le S\le31)=P(S\le31)-P(S\le26)$.
4. Padroniza (TLC):
$$\Phi\!\left(\tfrac{31-28{,}8}{\sqrt{5{,}76}}\right)-\Phi\!\left(\tfrac{26-28{,}8}{\sqrt{5{,}76}}\right)=\Phi(0{,}92)-\Phi(-1{,}16)$$
5. $=0{,}8212-(1-0{,}8770)=\boxed{0{,}6982}$ ✓

---

## A2. IC para a média com $t$ + relação IC/teste → [ficheiro 07](07_intervalos_de_confianca.md)

**Enunciado:** Normal, $n=12$, $\sum x_i=1140$, $\sum x_i^2=108900$. IC 95% para $\mu$; e $\mu=90$ é plausível?

**(a)** σ desconhecida → **Situação 2 ($t$)**.
- $\bar{x}=95$; $s^2=\frac{108900-12\cdot95^2}{11}=54{,}545$; $s=7{,}3855$.
- $t=F^{-1}_{t_{11}}(0{,}975)=2{,}201$.
- $IC_{95\%}(\mu)=95\pm2{,}201\cdot\frac{7{,}3855}{\sqrt{12}}=\boxed{]90{,}31\,;\,99{,}69[}$ ✓

**(b)** Como $90\notin]90{,}31;99{,}69[$ ⇒ **há evidência para rejeitar** $H_0:\mu=90$ (a 5%), **sem** fazer o teste.

---

## A3. Teste à média, σ conhecida, valor-p → [ficheiro 08](08_testes_de_hipoteses.md)

**Enunciado:** perigoso se $\mu>150$. $n=4$, $\bar{x}=155$, $\sigma=5$, Normal. Decidir pelo valor-p.

1. $H_0:\mu=150$ vs $H_1:\mu>150$ (unilateral direita).
2. σ conhecida ⇒ $Z_0=\frac{\overline{X}-150}{5/\sqrt4}\overset{H_0}{\sim}N(0,1)$.
3. $t_0=\frac{155-150}{5/2}=2$.
4. valor-p $=P(Z_0>2)=1-\Phi(2)=1-0{,}9772=\boxed{0{,}0228}$ ✓
5. **Decisão:** rejeita-se para $\alpha\ge2{,}28\%$ (5% e 10%). Dado o risco → **concentração perigosa**.

---

## A4. Interpretação de output R (normalidade + `t.test`) → [ficheiro 09](09_testes_ajustamento_e_regressao.md)

**(a) Normalidade** (Shapiro-Wilk e Pearson, $n=15$): todos os valores-p > 0,1 ⇒ **não se rejeita** a normalidade. Como $n=15$ é pequeno, o **Shapiro-Wilk é o mais adequado**. Conclusão: Tipo 1 e Tipo 2 podem considerar-se Normais. (QQ-plots com alguns desvios/outliers, mas os testes confirmam normalidade.)

**(b) `t.test`** sobre a diferença Tipo1−Tipo2, `alternative: less than 0`:
$$H_0:\mu_1\ge\mu_2 \quad\text{vs}\quad H_1:\mu_1<\mu_2$$
Válido porque ambas são Normais (alínea a) e independentes ⇒ $X_1-X_2$ é Normal, com variância desconhecida. valor-p $=0{,}8604$ (alto) ⇒ **não se rejeita** $H_0$: a temperatura do tipo 1 é maior ou igual à do tipo 2.

---

# PARTE B — Exercícios representativos por tipo (das listas 40–100)

## B1. V.a. discreta: constante, quartis, condicionada (ex. 40)
$f(0)=\tfrac16$, $f(x)=\tfrac{a}{x}$, $x\in\{1,2,3\}$.
- **(a)** Soma =1: $\tfrac16+a(\tfrac11+\tfrac12+\tfrac13)=1\Rightarrow a=\tfrac{5}{11}$. ✓
- **(b)** Quartis (percorrendo $F_X$): $q_{1/4}=q_{1/2}=1$, $q_{3/4}=2$. ✓
- **(d)** Condicionada: $P(X=3\mid X\ge1)=\frac{P(X=3)}{1-P(X=0)}=\frac{5/33}{5/6}=\frac{6}{33}$. ✓
> **Método:** soma=1 → constante; acumular → quartis; condicionada = $\frac{P(A\cap B)}{P(B)}$.

## B2. Binomial (ex. 43)
3 máquinas, cada trabalha com $p=0{,}9$ ⇒ $X\sim\text{Bin}(3,\,0{,}9)$.
- $E(X)=np=2{,}7$; $V(X)=np(1-p)=0{,}27$ ✓; moda = mediana = 3.

## B3. Binomial ≈ Poisson (ex. 44)
$n=1000$, $p=0{,}01$ ⇒ $\lambda=np=10$.
- Pelo menos 3: $1-[P(0)+P(1)+P(2)]$ com Poisson(10) $\approx0{,}9973$ ✓.

## B4. Normal: probabilidade + "Binomial escondida" (ex. 52)
$X\sim N(10,4)$, $\sigma=2$.
- **(a)** $P(8\le X\le12)=2\Phi(1)-1=0{,}6826$ ✓.
- **(b)** Defeituosa com $p=1-0{,}6826=0{,}3174$; em 10 barras $Y\sim\text{Bin}(10;0{,}3174)$; $P(Y\ge2)=1-P(0)-P(1)=0{,}8759$ ✓.

## B5. Normal: quantil (ex. 53b)
$X\sim N(7000,600^2)$. Duração que 90% excede: $P(X>t)=0{,}9$.
$\frac{t-7000}{600}=\Phi^{-1}(0{,}10)=-1{,}2816\Rightarrow t\approx6231$ ✓.

## B6. TLC / soma de Normais (ex. 57)
Caixa (μ=150, σ=8) + 12 produtos (μ=10, σ=0,5). Peso total $S=C+\sum_{i=1}^{12}P_i$, Normal exata:
- $E(S)=150+12\cdot10=270$; $V(S)=8^2+12\cdot0{,}5^2=64+3=67$.
- $P(S>285)=1-\Phi\!\left(\frac{285-270}{\sqrt{67}}\right)=1-\Phi(1{,}83)\approx0{,}0336$ ✓.

## B7. IC para a média, σ conhecida (ex. 68)
$n=25$, $\bar{x}=140$, $\sigma=10$ (conhecido), Normal → **Situação 1 ($Z$)**.
- $z=\Phi^{-1}(0{,}975)=1{,}96$.
- $IC_{95\%}=140\pm1{,}96\cdot\frac{10}{\sqrt{25}}=140\pm3{,}92=]136{,}08;143{,}92[$ ✓.

## B8. IC para a proporção (ex. 74)
$n=100$, 17 defeituosas ⇒ $\hat p=0{,}17$ → **Situação 4**.
- $z=1{,}96$; margem $=1{,}96\sqrt{\frac{0{,}17\cdot0{,}83}{100}}=0{,}0736$.
- $IC_{95\%}(p)=0{,}17\pm0{,}0736=]0{,}0964;0{,}2436[$ ✓.

## B9. Teste à proporção (ex. 80)
Moeda equilibrada? 43 caras em 100. $H_0:p=0{,}5$ vs $H_1:p\neq0{,}5$.
- $z_0=\frac{0{,}43-0{,}5}{\sqrt{0{,}5\cdot0{,}5/100}}=\frac{-0{,}07}{0{,}05}=-1{,}4$.
- RC bilateral 5%: $|z_0|>1{,}96$. Como $1{,}4<1{,}96$ ⇒ **não se rejeita** (moeda pode ser equilibrada) ✓.

## B10. Ajustamento qui-quadrado (ex. 89)
Dado equilibrado? 300 lançamentos. $H_0:p_i=\tfrac16$, $\beta=0$, g.l. $=5$.
- $E_i=300/6=50$; $Q_0=\sum\frac{(O_i-50)^2}{50}$; compara com $F^{-1}_{\chi^2_5}(0{,}90)=9{,}236$.
- $Q_0<9{,}236$ ⇒ **não se rejeita** (compatível com dado equilibrado) ✓.

---

## Como treinar com estes exemplos

1. **Tapa a resolução** e tenta sozinho; só depois confere.
2. Para cada exercício das listas, primeiro identifica o **tipo** (que ficheiro/situação).
3. Confirma o resultado final com as soluções oficiais (só dão o número — o método está aqui e nos ficheiros temáticos).
4. Repete os tipos prioritários: **TLC, Normal, IC-$t$, IC-proporção, teste-$Z$/valor-p, ajustamento**.

## ❓ Perguntas de autoavaliação

1. Consegues resolver A1–A4 de memória, só com o formulário e as tabelas?
2. Dado um enunciado novo, em quanto tempo identificas o tipo e a fórmula?
3. Sabes justificar cada decisão ("rejeita-se porque…")?
