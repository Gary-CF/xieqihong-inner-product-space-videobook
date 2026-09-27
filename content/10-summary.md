# 第9章总结与核心 Cheatsheet {#summary}

> **编者整理。** 本附录从前面十节正文提炼，供学过本章后集中复习。定理沿用正文条件；原课省略而由编者补足的步骤可在回链中辨认。以下内积空间若未另行说明，均为有限维。

## A. 章节总结：从度量到分解，再到最佳逼近 {#chapter-summary}

线性空间原本只描述加法、数乘和线性关系。**9.1** 加入内积后，我们能谈长度、角度与正交。Cauchy–Schwarz 不等式保证这些几何概念协调一致：它来自“减去一个方向上的投影后，余量的范数平方非负”。这也是后续许多证明反复使用的模式。[回到内积与不等式](#cauchy-schwarz)

**9.2** 把内积写成 Gram 矩阵，也把几何转化为可计算的坐标。标准正交基让 Gram 矩阵变成单位阵；施密特过程每次减去已有方向的分量，同时保持前若干向量的张成空间。正交补使任意向量唯一分解为“子空间里的部分＋垂直部分”，正交投影由此成为全章的核心工具。[回到正交化](#schmidt) · [正交投影](#projection)

**9.3** 用伴随把算子从内积的一边移到另一边：\(\langle\varphi x,y\rangle=\langle x,\varphi^*y\rangle\)。标准正交基下的矩阵共轭转置给出存在性，内积非退化性给出唯一性；不变子空间与伴随的不变正交补相联系，为后面的归纳证明铺路。[回到伴随](#adjoint)

**9.4** 研究保持内积的映射。保范数经极化恒等式恢复保内积；把一组标准正交基映成另一组，是判断保积同构的直接办法。同一空间中的保积同构就是正交或酉算子，满足 \(\varphi^*=\varphi^{-1}\)。课堂再用允许零余量的施密特过程构造 QR 分解。[回到保积同构](#isometry) · [QR 分解](#qr)

**9.5** 研究自伴随算子。特征值为实数，不同特征值的特征向量正交；找到一个特征方向后，其正交补仍不变且限制仍自伴随，在低一维空间归纳，最终得到标准正交特征基。二次型沿这些主轴独立变化，正定性化成特征值符号的判断。[回到自伴随谱定理](#self-adjoint-spectral) · [原课三个例子](#symmetric-example)

**9.6** 把“实对角表示”放宽成“复对角表示”，得到正规条件 \(\varphi\varphi^*=\varphi^*\varphi\)。课堂先证明正规算子与伴随等范数、共享共轭特征值对应的特征向量，再证明任意复算子可酉三角化。正规性迫使三角矩阵的非对角元逐行消失，得到酉对角化。课末利用实对称谱定理得到 Rayleigh 商、极小极大原理及谱估计；关键是两个维数和超过 \(n\) 的子空间必有非零交。[回到复正规谱定理](#complex-spectral) · [变分刻画](#minimax)

**9.7** 说明实数域不能照搬复对角形。最小多项式的实不可约因式只有一次和二次；正规性使不同因式对应的核相互正交。二次因式在实空间中给出二维不变平面，逐次取正交补后得到旋转伸缩块。正交矩阵只含平面旋转与直线正反向，实反对称矩阵的非零块都是二维，因而秩为偶数。[回到实正规标准形](#real-normal-form)

**9.8** 把正交特征基提升为不依赖某组基的谱投影：先投到各个特征子空间，再乘相应特征值。谱多项式演算导出唯一的半正定自伴随平方根。对任意算子，取 \(\psi=(\varphi^*\varphi)^{1/2}\) 后，\(\psi\) 与 \(\varphi\) 等范数、核相同，因此能在像空间上连接它们，并延拓成保积映射，得到极分解。正因子唯一，奇异时保积因子一般不唯一。[回到谱分解](#spectral-resolution) · [极分解](#polar)

**9.9** 允许输入与输出空间不同，分别选标准正交基。先对角化 \(\varphi^*\varphi\)，其正特征值开方得到奇异值；对应像向量除以奇异值后自动正交归一，再补全输出基，便得 SVD。它揭示不同输入方向的伸缩，适用于一般长方阵。课堂据此连接极分解，介绍低秩存储、去噪与 LSI 的直觉，并证明相同 Gram 算子的两映射只差输出侧的正交变换。[回到 SVD 证明](#svd-proof) · [应用及其边界](#svd-applications)

**9.10** 先把映射限制到核的正交补，在可逆部分逆回去，再把像的正交补送到零，得到广义逆。它同时完成两件事：在输出空间中选离目标最近的像，在输入空间中选长度最小的原像。于是方程有解、无解或秩亏都能由 \(A^\dagger\beta\) 统一处理；只有列满秩时，所有最小二乘解才缩成唯一一个。[回到广义逆](#pseudoinverse) · [最小二乘](#least-squares)

## B. 核心 Cheatsheet：约定与基础公式 {#cheatsheet}

**符号先行。** \(\mathbb F=\mathbb R\) 或 \(\mathbb C\)；内积**第一变量线性、第二变量共轭线性**。坐标均为列向量。\(A^*=\overline A^T\)，实情形为 \(A^T\)；\(\varphi^*\) 表示抽象伴随，\(A^\dagger\) 表示广义逆，两者不同。以下矩阵与算子直接对应的公式默认使用标准正交基。

| 工具与条件 | 公式或结论 | 直觉与使用入口 |
|---|---|---|
| 内积、任意 \(x,y\) | \(\lvert\langle x,y\rangle\rvert\le\|x\|\|y\|\)；等号当且仅当线性相关 | 投影分量不超过自身长度；[不等式与等号](#cauchy-schwarz) |
| 任意基 \(E\) | \(G_{ij}=\langle e_i,e_j\rangle\)，\(\langle x,y\rangle=x_E^TG\overline{y_E}\)；\(G_F=C^TG_E\overline C\)，其中 \(F=EC\) | 内积随坐标表示，Gram 矩阵按合同规律变换；[Gram](#gram) |
| 子空间 \(W\) 的标准正交基 \(e_1,\ldots,e_r\) | \(P_Wx=\sum_i\langle x,e_i\rangle e_i\)，\(x-P_Wx\in W^\perp\) | 提取能沿 \(W\) 表示的部分；[投影](#projection) |
| 有限维伴随 | \(\langle\varphi x,y\rangle=\langle x,\varphi^*y\rangle\)，\((ST)^*=T^*S^*\) | 交换内积两侧时同时反转乘积次序；[伴随](#adjoint-rules) |
| 同维保积同构 | 标准正交基映成标准正交基；算子满足 \(\varphi^*\varphi=I\) | 保持长度和角度；[正交与酉](#unitary-operator) |
| 自伴随算子 | 标准正交特征基，特征值全实 | 将二次型沿主轴分离；[自伴随谱定理](#self-adjoint-spectral) |

**任意基下求伴随要谨慎。** 若同一基的 Gram 矩阵为 \(G\)，\(\varphi\) 的矩阵为 \(A\)，则伴随矩阵为
\[
[\varphi^*]_E=\overline G^{-1}A^*\overline G.
\]
只有 \(G=I\) 时直接等于 \(A^*\)。这是本书第一变量线性约定下的公式。[推导及约定](#adjoint-existence)

## 分解比较：各自解决什么问题 {#cheatsheet-comparison}

下表覆盖后半章每一正式小节，使用前先看“对象与条件”。

| 对象与条件 | 表示或结论 | 几何与用途 | 易错点／正文 |
|---|---|---|---|
| **9.6** 有限维复正规 \(AA^*=A^*A\) | \(A=UDU^*\)，\(U\) 酉，\(D\) 复对角 | 正交特征方向互不混合；计算谱与算子多项式 | 一般可对角化不保证酉对角化；[证明](#complex-spectral) |
| **9.7** 实正规 \(AA^T=A^TA\) | 实正交相似于 \(C(a,b)=\begin{pmatrix}a&b\\-b&a\end{pmatrix}\) 与实标量块的直和 | 非实共轭谱成对对应实平面，作旋转伸缩 | 不能都化成实对角阵；当前基约定旋转角为 \(-\theta\)；[标准形](#real-normal-form) |
| **9.8 谱分解** 复正规或实自伴随 | \(\varphi=\sum_i\lambda_iE_i\)，按互异特征值分组；\(E_iE_j=\delta_{ij}E_i,\ \sum_iE_i=I\) | 正交拆开谱分量；\(f(\varphi)=\sum_i f(\lambda_i)E_i\) | 一个重特征值对应整个子空间投影；[谱投影](#spectral-resolution) |
| **9.8 极分解** 任意实／复方阵 | \(A=UH\)，\(H=(A^*A)^{1/2}\) 半正定自伴随，\(U\) 正交／酉 | 先非负伸缩，再保积；推广复数极形式 | \(H\) 总唯一；\(A\) 可逆才保证 \(U\) 唯一；[构造](#polar) |
| **9.9 SVD** 任意实 \(m\times n\) 矩阵，秩 \(r\) | \(A=P\Sigma Q^T\)；\(P:m\times m,\ Q:n\times n,\ \Sigma:m\times n\) | 两端分别选正交基，保留 \(r\) 个正伸缩量 | 两端基不同；只对正奇异值作除法；[计算](#svd-algorithm) |
| **9.10 广义逆／最小二乘** 任意实 \(m\times n\) 矩阵 | \(A^\dagger=Q\Sigma^\dagger P^T\)；全部最小二乘解为 \(A^\dagger\beta+\ker A\) | 先选最近的像，再选最短的原像 | \(A^\dagger\beta\) 总是唯一最小范数者；全部解唯一须列满秩；[区别](#normal-equations) |

**谱的符号判据。** 在已经正规的复算子中：全实谱等价于自伴随，全非负实谱等价于半正定自伴随，全正实谱等价于正定自伴随，单位模谱等价于酉。去掉正规前提不能照用这些逆向判断。[条件与证明](#positive-operator)

**平方根与谱投影。** 半正定自伴随 \(\varphi=\sum_i\lambda_iE_i\) 的唯一同类平方根为
\[
\varphi^{1/2}=\sum_i\sqrt{\lambda_i}E_i.
\]
互异谱下
\[
E_j=\prod_{i\ne j}\frac{\varphi-\lambda_iI}{\lambda_j-\lambda_i}.
\]
后一个公式用于直接构造投影；前一个公式用于极分解。一般平方根不唯一，唯一性限定在半正定自伴随类别。[平方根](#positive-square-root) · [投影公式](#spectral-polynomial)

**课堂的谱估计。** 实对称 \(A\) 的特征值按升序 \(\lambda_1\le\cdots\le\lambda_n\) 排列，Rayleigh 商 \(\rho_A(x)=x^TAx/(x^Tx)\) 满足
\[
\lambda_i=\min_{\dim S=i}\max_{0\ne x\in S}\rho_A(x)
=\max_{\dim T=n-i+1}\min_{0\ne x\in T}\rho_A(x).
\]
用来控制主子矩阵或扰动后的谱：\(m\) 阶主子矩阵的升序谱 \(\mu_i\) 满足
\(\lambda_i\le\mu_i\le\lambda_{n-m+i}\)；若 \(B\) 的升序谱为 \(\mu_i\)，\(A+B\) 的谱为 \(\nu_i\)，则
\(\lambda_i+\mu_1\le\nu_i\le\lambda_i+\mu_n\)。后两式是课堂陈述、正文中由编者补明验证思路的结论。[极小极大](#minimax) · [谱估计](#eigenvalue-bounds)

## 计算与构造：先看入口条件，再按步骤做 {#cheatsheet-methods}

**正交化——给定线性无关的 \(u_1,\ldots,u_k\)。** 依次计算
\[
v_j=u_j-\sum_{i<j}
\frac{\langle u_j,v_i\rangle}{\langle v_i,v_i\rangle}v_i,
\qquad w_j=\frac{v_j}{\|v_j\|}.
\]
减去的是已有正交方向的分量；线性无关保证每个余量非零。先正交化、后单位化；若输入相关，零余量不能单位化，需采用正文 QR 中的处理。[完整推导与原课例](#schmidt-proof)

**伴随——先确认内积与基。** 标准正交基下取共轭转置；若不是，先求 Gram 矩阵，再用上面的相应公式。复合映射取伴随时反转顺序。不同空间之间伴随的定义域、值域互换。[存在性](#adjoint-existence) · [长方阵情形](#singular-vectors)

**谱分解——先确认复正规或实自伴随。** 求互异特征值；分别在各特征子空间中正交归一；合成到整个子空间的投影 \(E_i\)；写成 \(\sum_i\lambda_iE_i\)。重特征值只列一次，其投影包含全部重数方向。[谱分解](#spectral-resolution)

**实正规标准形——保留实坐标时使用。** 分解最小多项式；一次因式对应实特征方向；二次因式 \((x-a)^2+b^2\) 内取单位 \(v\)，令 \(u=(\varphi-aI)v/b\)，形成正交对 \((u,v)\)；在共同不变的正交补中继续。所得块为 \(C(a,b)\)。[二维构造](#real-two-block)

**极分解——实／复方阵。** 先求 \(H=(A^*A)^{1/2}\)；可逆时取 \(U=AH^{-1}\)。奇异时，在 \(\operatorname{Im}H\) 上定义 \(Hv\mapsto Av\)，核相同保证代表元无关，再在同维正交补上补成保积映射。实方阵也可由 SVD 直接取 \(U=PQ^T,\ H=Q\Sigma Q^T\)。[奇异情形](#polar-singular) · [SVD 转换](#svd-polar)

**SVD——实长方阵。** 对角化 \(A^TA\)，先排正特征值；取 \(\sigma_i=\sqrt{\lambda_i}\)、\(\beta_i=A\alpha_i/\sigma_i\)；将非零像单位向量补成 \(\mathbb R^m\) 的标准正交基；排成 \(P,Q\)，检查 \(AQ=P\Sigma\)。紧致形式只留 \(P,Q\) 的前 \(r\) 列，中间为 \(r\times r\) 的正对角阵。[算法](#svd-algorithm) · [紧致形式](#svd-applications)

**最小二乘——任意 \(A,\beta\)。** 用 SVD 对正奇异值取倒数、零保持零，得到 \(A^\dagger\)；算 \(z=A^\dagger\beta\)。检查残差
\[
\beta-Az\perp\operatorname{Im}A,
\qquad A^TAz=A^T\beta.
\]
如需全部解，加上 \(\ker A\)。若已知列满秩，可以使用
\(z=(A^TA)^{-1}A^T\beta\)；秩亏时不可强行求逆。[全部解与条件](#normal-equations)

## 用三幅原图把几何记住 {#cheatsheet-geometry}

<figure>
<a href="assets/figures/p100-000136-full.jpg" data-lightbox><img src="assets/figures/p100-000136.jpg" alt="复习图：施密特过程中减去前两个正交方向的分量，保留垂直余量v3" loading="lazy"></a>
<figcaption>复习图 A · 原图9.2-1，P100，F000136，666 秒。\(u_3\) 是待处理向量，\(v_1,v_2\) 给出已有平面，粉色 \(v_3\) 是垂直于它的余量。减去两个投影后才得到新的正交方向，再单位化。<a href="#schmidt">回到推导</a>。</figcaption>
</figure>

<figure>
<a href="assets/figures/p112-000506-full.jpg" data-lightbox><img src="assets/figures/p112-000506.jpg" alt="复习图：共同的核使从psi的像到phi的像的保积映射定义良好" loading="lazy"></a>
<figcaption>复习图 B · 原图9.8-1，P112，F000506，2447 秒。上方同一向量分别经 \(\psi=(\varphi^*\varphi)^{1/2}\) 和 \(\varphi\) 进入两个像空间；黄色共同核使代表元选择无关。下方先定义 \(\eta(\psi v)=\varphi v\)，再扩充为全空间保积映射，得到 \(\varphi=\omega\psi\)。<a href="#polar-singular">回到证明</a>。</figcaption>
</figure>

<figure>
<a href="assets/figures/p114-000685-full.jpg" data-lightbox><img src="assets/figures/p114-000685.jpg" alt="复习图：beta向像空间的投影AA dagger beta，余下残差与像空间正交" loading="lazy"></a>
<figcaption>复习图 C · 原图9.10-3，P114，F000685，3337 秒。右侧蓝色平面是 \(\operatorname{Im}A\)，目标 \(\beta\) 在平面外，平面内投影是 \(AA^\dagger\beta\)，残差沿黄色正交补。左侧取核的正交补中的原像 \(A^\dagger\beta\)，又使解的范数最小。<a href="#least-squares">回到勾股证明</a>。</figcaption>
</figure>

## 容易混淆的六件事 {#cheatsheet-pitfalls}

1. **实与复的标准形不同。** 复正规可酉对角化；实正规要允许二维块，实自伴随才可实正交对角化。
2. **可对角化与酉对角化不同。** 前者只要求特征基，后者要求标准正交特征基；在复空间，后者恰好刻画正规性。
3. **特征值与奇异值不同。** 特征值用于同一空间中的特征方向，可为负或非实；奇异值来自 \(A^TA\) 的非负谱开方，是两端方向之间的伸缩量。零方向不能按正值公式相除。
4. **存在与唯一不同。** SVD 总存在，基通常不唯一；极分解的半正定因子唯一，奇异时保积因子一般不唯一；半正定平方根唯一的前提不能删。
5. **最近的像与最短的解不同。** \(AA^\dagger\beta\) 在输出空间中，是最近的像；\(A^\dagger\beta\) 在输入空间中，是全部最小二乘解里最短的一个。
6. **应用直觉不是无条件定理。** 截断小奇异值可作低秩近似，但“小”不必然表示噪声；压缩有利须保留秩足够小。本文没有把原课未证的最优低秩逼近定理塞进速查表。

## 术语、符号与重要结论索引 {#index}

| 术语／符号 | 正文入口 | 关键条件或关联 |
|---|---|---|
| 内积 \(\langle x,y\rangle\)、范数 \(\|x\|\) | [9.1](#inner-product) | 第一变量线性，正定 |
| Gram 矩阵 \(G\) | [表示与换基](#gram-change) | 一般基与标准正交基要分清 |
| 正交补 \(W^\perp\)、投影 \(P_W\) | [正交补](#orthogonal-complement) · [投影](#projection) | 有限维正交直和；[Bessel](#bessel) |
| 伴随 \(\varphi^*\)、共轭转置 \(A^*\) | [9.3](#adjoint) | [不变子空间](#adjoint-invariant) |
| 正交／酉、QR | [9.4](#unitary-matrix) · [QR](#qr) | 保积与标准正交基 |
| 自伴随谱定理 | [9.5](#self-adjoint-spectral) | 实谱，正交特征基 |
| Schur、复正规谱定理 | [Schur](#schur) · [9.6](#complex-spectral) | 三角化不需正规；对角化需要 |
| Rayleigh 商、极小极大、交错 | [变分原理](#minimax) · [谱界](#eigenvalue-bounds) | 实对称，特征值升序 |
| 实正规、实反对称 | [9.7 标准形](#real-normal-form) · [特殊形式](#real-special-forms) | 二维旋转伸缩块，反对称偶数秩 |
| 谱投影 \(E_i\)、正平方根 | [9.8](#spectral-polynomial) · [平方根](#positive-square-root) | 互异谱分组，半正定自伴随 |
| 极分解 \(\varphi=\omega\psi\) | [定理](#polar) · [延拓](#polar-singular) | 任意有限维算子 |
| 奇异值 \(\sigma_i\)、SVD | [9.9](#svd-proof) · [同 Gram 证明题](#same-gram) | 左右空间分别选基 |
| 广义逆 \(A^\dagger\)、最小二乘 | [9.10](#pseudoinverse) · [正规方程](#normal-equations) | 任意秩；唯一参数解需列满秩 |
