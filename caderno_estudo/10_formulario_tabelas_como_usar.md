# 10 — Formulário e Tabelas: para que serve cada coisa

> Este ficheiro **decifra o formulário oficial** ([content/consulta/formulario_teste.pdf](../consulta/formulario_teste.pdf)) e ensina a **ler as tabelas** ([content/consulta/tabelas_estatisticas.pdf](../consulta/tabelas_estatisticas.pdf)). No teste tens estas folhas — o que conta é saber **quando** usar cada fórmula.

---

## 1. Fórmulas de estatística descritiva / regressão

| Fórmula | Para que serve |
|---|---|
| $s^2=\dfrac{1}{n-1}\sum(x_i-\bar{x})^2=\dfrac{\sum x_i^2-n\bar{x}^2}{n-1}$ | **Variância amostral corrigida.** Usa a 2.ª forma quando o enunciado dá $\sum x_i$ e $\sum x_i^2$. Base dos ICs/testes com $t$ e $\chi^2$. |
| $r=\dfrac{1}{n-1}\sum\dfrac{x_i-\bar{x}}{s_x}\dfrac{y_i-\bar{y}}{s_y}$ | **Correlação de Pearson** (quantitativa, relação linear). |
| $r_1=1-\dfrac{6\sum d_i^2}{n(n^2-1)}$ | **Correlação de Spearman** (dados ordinais/rankings). |
| $\hat b=\dfrac{\sum x_iy_i-n\bar{x}\bar{y}}{\sum x_i^2-n\bar{x}^2}$, $\hat a=\bar{y}-\hat b\bar{x}$ | **Reta de regressão** $\hat y=\hat a+\hat b x$. |
| $r^2=\dfrac{(\sum x_iy_i-n\bar{x}\bar{y})^2}{(\sum x_i^2-n\bar{x}^2)(\sum y_i^2-n\bar{y}^2)}$ | **Coeficiente de determinação** (qualidade do ajuste, 0 a 1). |

---

## 2. Fórmulas de probabilidade (revisão de base, do formulário)

| Fórmula | Para que serve |
|---|---|
| $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$ | **Probabilidade condicionada.** |
| $P(\overline A)=1-P(A)$ | Complementar. |
| $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ | União (2 acontec.). |
| $P(B)=\sum_i P(B\mid A_i)P(A_i)$ | **Probabilidade total.** |
| $P(A_i\mid B)=\dfrac{P(B\mid A_i)P(A_i)}{\sum_j P(B\mid A_j)P(A_j)}$ | **Teorema de Bayes** (ex. 51). |

> Estas são de capítulos anteriores, mas aparecem no formulário e podem ser precisas (ex.: Bayes no exercício 51 da Exponencial).

---

## 3. Fórmulas de v.a. e distribuições

| Fórmula | Para que serve |
|---|---|
| $E(X)=\sum_x x f_X(x)$; $E(aX+b)=aE(X)+b$ | Valor esperado e sua linearidade. |
| $V(X)=E(X^2)-E^2(X)$; $V(aX+b)=a^2V(X)$ | Variância (fórmula prática + transformação). |
| $P(x_0<X\le x_1)=F_X(x_1)-F_X(x_0)$ | Probabilidade de intervalo via $F_X$. |
| Bernoulli/Binomial: $E,V$ e $P(X=x)$ | [Ficheiro 03](03_distribuicoes_discretas.md). |
| $Z=\dfrac{X-\mu}{\sigma}\sim N(0,1)$ | **Padronização** da Normal. |
| $\dfrac{S_n-E(S_n)}{\sqrt{V(S_n)}}\overset{a}{\sim}N(0,1)$ | **TLC** ([ficheiro 05](05_teorema_limite_central.md)). |

---

## 4. Fórmulas de inferência (fulcrais / estatísticas de teste)

| Situação | Variável fulcral / estatística | Distribuição | Função R |
|---|---|---|---|
| Média, σ conhecida | $Z=\dfrac{\overline{X}-\mu}{\sigma/\sqrt n}$ | $N(0,1)$ | `z.test` |
| Média, σ desconhecida | $T=\dfrac{\overline{X}-\mu}{S/\sqrt n}$ | $t_{n-1}$ | `t.test` |
| Variância | $Q=\dfrac{(n-1)S^2}{\sigma^2}$ | $\chi^2_{n-1}$ | `variance.test` |
| Proporção | $\dfrac{\overline{X}-p}{\sqrt{\overline{X}(1-\overline{X})/n}}$ (IC) ou $\dfrac{\overline{X}-p}{\sqrt{p(1-p)/n}}$ (teste) | $N(0,1)$ aprox. | `prop.test`/`binom.test` |

**Regras da Normal padrão (no formulário):**
$$P(a<Z<b)=\Phi(b)-\Phi(a) \qquad \Phi(-x)=1-\Phi(x) \qquad \Phi^{-1}(p)=-\Phi^{-1}(1-p)$$

**Regiões críticas e valor-p (conforme $H_1$):** ver tabela no [ficheiro 08](08_testes_de_hipoteses.md) (está também no formulário).

---

## 5. Como ler as TABELAS estatísticas 🔑

### Tabela da Normal padrão $\Phi(z)=P(Z\le z)$
- **Entrada:** um valor $z\ge0$ (ex.: 1,16). **Saída:** $\Phi(z)$ (ex.: 0,8770).
- Linha = parte inteira + 1.ª decimal (1,1); coluna = 2.ª decimal (0,06).
- **Valores negativos:** a tabela só tem positivos → $\Phi(-z)=1-\Phi(z)$.
  - Ex.: $\Phi(-1{,}16)=1-0{,}8770=0{,}1230$.
- **Sentido inverso (quantil $z$ tal que $\Phi(z)=p$):** procura $p$ **dentro** da tabela e lê o $z$.
  - Para IC/teste a 95% (bilateral): $z=\Phi^{-1}(0{,}975)=1{,}96$.
  - Para $p<0{,}5$: $\Phi^{-1}(0{,}10)=-\Phi^{-1}(0{,}90)=-1{,}2816$.

### Tabela da $t$-Student ($t_{\nu}$, $\nu=n-1$ graus de liberdade)
- **Entrada:** graus de liberdade $\nu$ (linha) e a probabilidade acumulada (coluna, ex.: 0,975). **Saída:** o quantil $t$.
  - Ex.: IC 95% com $n=12$ → $\nu=11$, $F^{-1}_{t_{11}}(0{,}975)=2{,}201$.
- Simétrica em torno de 0: $F^{-1}(\alpha/2)=-F^{-1}(1-\alpha/2)$.

### Tabela do qui-quadrado ($\chi^2_{\nu}$)
- **Entrada:** graus de liberdade $\nu$ e a probabilidade acumulada. **Saída:** o quantil.
- **Assimétrica** (só valores positivos): precisas de **dois** quantis diferentes no IC da variância:
  - $a=F^{-1}_{\chi^2_{n-1}}(\alpha/2)$ e $b=F^{-1}_{\chi^2_{n-1}}(1-\alpha/2)$.
  - Ex. ($n=10$, 99%): $a=F^{-1}_{\chi^2_9}(0{,}005)=1{,}735$; $b=F^{-1}_{\chi^2_9}(0{,}995)=23{,}59$.

---

## 6. ⚠️ Erros comuns com tabelas

- **Usar $1-\alpha$ em vez de $1-\tfrac\alpha2$** nos ICs/testes bilaterais.
- **Esquecer $\Phi(-z)=1-\Phi(z)$** para argumentos negativos.
- **Confundir "dado $z$ → $\Phi$" com "dado $p$ → $z$"** (leitura direta vs inversa).
- **Qui-quadrado:** usar o mesmo quantil dos dois lados (é assimétrica; precisas de $a$ e $b$).
- **Graus de liberdade errados:** $t$ e IC/teste da variância usam $n-1$; regressão usa $n-2$; ajustamento usa $k-\beta-1$.
- **Arredondamentos:** o enunciado do teste pede **4 casas decimais** (respeita).

---

## 7. Resumo final

- O formulário dá as **fórmulas**; a tua tarefa é **escolher** a certa e ler o **quantil** na tabela.
- Normal: $\Phi(-z)=1-\Phi(z)$, $\Phi^{-1}(p)=-\Phi^{-1}(1-p)$; 95%→1,96; 99%→2,576.
- $t$: quantil com $\nu=n-1$; qui-quadrado: **dois** quantis (assimétrica).
- Graus de liberdade: $t$/IC-var → $n-1$; regressão → $n-2$; ajustamento → $k-\beta-1$.

## 8. ❓ Perguntas de autoavaliação

1. Como obtenho $\Phi(-0{,}85)$ a partir da tabela?
2. Que quantil $z$ uso num IC/teste bilateral a 95%? E a 99%?
3. Como leio o quantil $t$ para $n=12$ e confiança 95%?
4. Porque preciso de dois quantis diferentes na tabela do qui-quadrado?
5. Quais os graus de liberdade em: IC-$t$, IC-variância, regressão, ajustamento?
6. Qual a diferença entre leitura direta ($z\to\Phi$) e inversa ($p\to z$)?
