---
title: "大模型注意力机制与上下文压缩的数学基础"
date: 2026-08-16
description: "从线性代数与信息论视角，严格推导 Scaled Dot-Product Attention 以及上下文窗口压缩的数学理论与算法实现。"
category: "Research"
tags: ["Mathematics", "Transformer", "Attention", "LaTeX", "USTC"]
author: "Joy (@le-temps)"
featured: true
---

在深度学习与大语言模型研究中，Transformer 的核心基石是自注意力机制（Self-Attention）。本文从数学形式化定义出发，探讨标准注意力以及长上下文压缩算法的理论边界。

---

## 一、 Scaled Dot-Product Attention 形式化推导

给定输入序列的嵌入矩阵 $X \in \mathbb{R}^{n \times d}$，通过三个可学习的线性投影矩阵 $W_Q, W_K, W_V \in \mathbb{R}^{d \times d_k}$ 映射得到查询矩阵 $Q$、键矩阵 $K$ 与值矩阵 $V$：

$$Q = X W_Q, \quad K = X W_K, \quad V = X W_V$$

标准缩放点积注意力公式定义如下：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V$$

### 为什么需要除以 $\sqrt{d_k}$？
假设 $q_i$ 与 $k_j$ 的各个分量是均值为 $0$、方差为 $1$ 的独立同分布随机变量：

$$\mathbb{E}[q_{ik}] = 0, \quad \text{Var}(q_{ik}) = 1$$

则两个向量的内积 $S = q_i \cdot k_j = \sum_{l=1}^{d_k} q_{il} k_{jl}$ 的方差为：

$$\text{Var}(S) = \sum_{l=1}^{d_k} \text{Var}(q_{il} k_{jl}) = \sum_{l=1}^{d_k} \mathbb{E}[q_{il}^2] \mathbb{E}[k_{jl}^2] = d_k$$

当维度 $d_k$ 很大时，内积数值的方差会达到 $d_k$。如果不进行缩放，点积结果会过大或过小，将进入 $\text{softmax}$ 函数梯度极小的饱和区，导致**梯度弥散**。因此，除以标准差 $\sqrt{d_k}$ 能保持方差稳定为 $1$：

$$\text{Var}\left(\frac{S}{\sqrt{d_k}}\right) = \frac{1}{d_k} \cdot d_k = 1$$

---

## 二、 上下文压缩与信息熵优化

当序列长度 $n \to \infty$ 时，自注意力计算的时空复杂度为 $\mathcal{O}(n^2)$。

为了降低长序列中的注意力退化（Lost in the Middle 现象），我们考虑基于信息熵的上下文压缩：

$$H(p) = -\sum_{i=1}^n p_i \log p_i$$

对于历史会话序列中的第 $t$ 轮工具输出 $O_t$，若其注意力分布呈现平坦分布（低信息增益）：

$$\Delta I(O_t) < \epsilon$$

我们便可以对该区间实施**头尾保留截断与语义摘要（Head-Tail Compaction）**，在保持全局语义损失 $\le \delta$ 的同时，将上下文长度从 $\mathcal{O}(n)$ 压缩至常数上界 $\mathcal{O}(K)$。

---

## 三、 Python 实现示例

```python
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
        
    attn_weights = F.softmax(scores, dim=-1)
    output = torch.matmul(attn_weights, V)
    return output, attn_weights
```

通过严格的数学建模，我们能够为 Agent 运行时的 Token 预算管理提供坚实的理论支撑。
