---
titulo: "Formulário e tabelas: como usar"
ordem: 10
prioridade: "alta"
tempo: "45 min"
icone: "📖"
resumo: "Cada fórmula explicada e como ler as tabelas."
---> Este ficheiro **decifra o formulário oficial** ([content/consulta/formulario_teste.pdf](/content/consulta/formulario_teste.pdf)) e ensina a **ler as tabelas** ([content/consulta/tabelas_estatisticas.pdf](/content/consulta/tabelas_estatisticas.pdf)). No teste tens estas folhas — o que conta é saber **quando** usar cada fórmula.

---

## 0. Glossário de símbolos (para não te perderes)

| Símbolo | Lê-se / significa |
|---|---|
| $X\sim\ldots$ | "$X$ tem distribuição…" |
| $E(X),\ \mu$ | valor esperado (média teórica) |
| $V(X),\ \sigma^2$ | variância; $\sigma$ = desvio padrão |
| $F_X(x)=P(X\le x)$ | função de distribuição (probabilidade acumulada) |
| $f_X(x)$ | função de probabilidade (discreta) ou densidade (contínua) |
| $\overline{X},\ \bar{x}$ | média amostral (estimador / valor) |
| $S^2,\ s^2$ | variância amostral corrigida |
| $\hat{\theta}$ | estimador/estimativa de um parâmetro $\theta$ |
| $\Phi(z)=P(Z\le z)$ | função de distribuição da Normal padrão $N(0,1)$ |
| $\Phi^{-1}(p)$ | quantil da Normal padrão (dá o $z$ tal que $\Phi(z)=p$) |
| $F^{-1}_{t_{\nu}}(p),\ F^{-1}_{\chi^2_{\nu}}(p)$ | quantis das distribuições $t$ e $\chi^2$ com $\nu$ graus de liberdade |
| $\overset{a}{\sim}$ | "distribui-se **aproximadamente** como" (ex.: TLC) |
| $1-\alpha$ | grau de confiança; $\alpha$ = nível de significância |
| $H_0,\ H_1$ | hipótese nula / alternativa |
| $RC$ | região crítica (de rejeição de $H_0$) |
| $q_p,\ z_p$ | quantil de ordem $p$ |

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
| Bernoulli/Binomial: $E,V$ e $P(X=x)$ | [Ficheiro 03](/distribuicoes-discretas). |
| $Z=\dfrac{X-\mu}{\sigma}\sim N(0,1)$ | **Padronização** da Normal. |
| $\dfrac{S_n-E(S_n)}{\sqrt{V(S_n)}}\overset{a}{\sim}N(0,1)$ | **TLC** ([ficheiro 05](/teorema-limite-central)). |

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

**Regiões críticas e valor-p (conforme $H_1$):** ver tabela no [ficheiro 08](/testes-de-hipoteses) (está também no formulário).

---

## 5. Como ler as TABELAS estatísticas 🔑

O teu conjunto de tabelas tem **5 tabelas** (por esta ordem no PDF):
1. **Função de distribuição Binomial** $F_X(x)=P(X\le x)$, para $n=1$ a $20$;
2. **Função de distribuição da Normal padrão** $\Phi(z)$;
3. **Quantis da Normal padrão** (tabela inversa, dá o $z$);
4. **Quantis da $t$-Student**;
5. **Quantis do qui-quadrado**.

### 5.1 Tabela Binomial $F_X(x)=P(X\le x)$ — ⚠️ muitas vezes esquecida!
Para $X\sim\text{Bin}(n,p)$ com $n\le20$, lês $P(X\le x)$ **diretamente** — não precisas de calcular à mão.
- **Entrada:** linha $(n,x)$ e coluna $p$. **Saída:** $P(X\le x)$.
- **Exemplo (ex. 45):** $X\sim\text{Bin}(15;\,0{,}05)$, rejeita-se se $X>2$.
  - Linha $n=15,\ x=2$, coluna $p=0{,}05$ → $F_X(2)=0{,}9638$.
  - $P(\text{rejeição})=P(X>2)=1-0{,}9638=\boxed{0{,}0362}$ ✓ (bate com a solução oficial).
- Truques: $P(X=x)=F_X(x)-F_X(x-1)$; $P(X\ge k)=1-F_X(k-1)$.
- Se $p>0{,}5$ (não está nas colunas), trabalha com o número de **insucessos** $Y=n-X\sim\text{Bin}(n,1-p)$.

### 5.2 Tabela da Normal padrão $\Phi(z)=P(Z\le z)$
- **Entrada:** $z\ge0$. **Saída:** $\Phi(z)$. Linha = unidades + 1.ª decimal; coluna = 2.ª decimal.
- **Leitura concreta de $\Phi(1{,}16)$:** procura a **linha `1,1`** e a **coluna `0,06`** → **0,8770**.
- **Valores negativos** (não estão na tabela): $\Phi(-z)=1-\Phi(z)$.
  - Ex.: $\Phi(-1{,}16)=1-0{,}8770=0{,}1230$.

### 5.3 Tabela de quantis da Normal (inversa) — dá o $z$ a partir da probabilidade
Esta tabela poupa-te procurar "às cegas" dentro da tabela $\Phi$. Entra com a **probabilidade da cauda** e lê o quantil $z$ diretamente.
- Para IC/teste **bilateral** a 95%: cauda $=\tfrac{\alpha}{2}=0{,}025$ → $z=\Phi^{-1}(0{,}975)=\boxed{1{,}96}$.
- Para 99% bilateral: cauda $0{,}005$ → $z=2{,}5758\approx2{,}576$.
- Para 90% bilateral: cauda $0{,}05$ → $z=1{,}6449$.
- Para um quantil à esquerda: $\Phi^{-1}(0{,}10)=-\Phi^{-1}(0{,}90)=-1{,}2816$.

> Guarda de cor os 3 valores mais usados: **90% → 1,645 · 95% → 1,96 · 99% → 2,576**.

### 5.4 Tabela da $t$-Student ($t_{\nu}$, $\nu=n-1$ graus de liberdade)
- **Entrada:** graus de liberdade $\nu$ (linha) e a probabilidade acumulada (coluna, ex.: 0,975). **Saída:** o quantil $t$.
  - **Leitura concreta (IC 95%, $n=12$):** $\nu=11$, coluna $0{,}975$ → $F^{-1}_{t_{11}}(0{,}975)=\boxed{2{,}201}$.
- Simétrica em torno de 0: $F^{-1}(\alpha/2)=-F^{-1}(1-\alpha/2)$.
- Repara: com $\nu$ grande (≥ 100) os valores aproximam-se dos da Normal (ex.: $t_{150}(0{,}975)=1{,}976\approx1{,}96$).

### 5.5 Tabela do qui-quadrado ($\chi^2_{\nu}$)
- **Entrada:** graus de liberdade $\nu$ (linha) e a probabilidade acumulada (coluna). **Saída:** o quantil.
- **Assimétrica** (só valores positivos): no IC da variância precisas de **dois** quantis diferentes:
  - $a=F^{-1}_{\chi^2_{n-1}}(\alpha/2)$ e $b=F^{-1}_{\chi^2_{n-1}}(1-\alpha/2)$.
  - **Leitura concreta ($n=10$, 99%):** $\nu=9$; coluna $0{,}005$ → $a=1{,}735$; coluna $0{,}995$ → $b=23{,}589$.
- No teste de ajustamento usa-se **um só** quantil à direita: $c=F^{-1}_{\chi^2_{k-\beta-1}}(1-\alpha)$.

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

