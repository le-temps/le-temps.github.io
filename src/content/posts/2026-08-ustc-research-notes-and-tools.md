---
title: "科大（USTC）实验室手记：科研学者的生产力工具箱与工作流"
date: 2026-08-14
description: "记录在实验室进行大模型与自主智能体研究时沉淀下的高效工具链：文献追踪、实验版本控制、GPU 集群调试与排版技巧。"
category: "Notes"
tags: ["USTC", "科研随笔", "Productivity", "工具箱"]
author: "Joy (@le-temps)"
featured: false
---

工欲善其事，必先利其器。在科大实验室攻读大模型与 AI Agent 方向的过程中，建立一套**自动化、高可复现、低心智负担的科研工具流**，能将研究效率提升数倍。

在此分享我日常工作中最核心的 4 个工具模块：

---

## 一、 文献阅读与灵感捕捉 (Literature & Zettelkasten)

1. **Zotero + Better BibTeX**：
   - 自动抓取 arXiv 论文元数据并生成标准 citation key（如 `Vaswani2017Attention`）。
   - 配合 Obsidian 实现文献笔记的双向链接与知识图谱沉淀。
2. **arXiv Daily Digest 自动化机器人**：
   - 编写轻量 Python 脚本抓取 `cs.CL`、`cs.AI` 最新论文，调用大模型提取核心 Innovation & Limitations，每天早晨推送至飞书/邮件。

---

## 二、 实验管理与指标追踪 (Experiment Tracking)

在跑 LLM 微调与 Agent 评测任务时，切忌“终端跑完看 log”的散乱模式：

* **WandB (Weights & Biases)**：实时监控 GPU 显存、Loss 曲线、Learning Rate 调度与评测 Benchmark 分数。
* **Hydra**：管理多级复杂的 YAML 实验配置，支持通过命令行直接覆盖超参数：
  ```bash
  python train.py model=deepseek_7b optimizer.lr=1e-4 dataset.batch_size=32
  ```

---

## 三、 GPU 集群与远程开发流

在实验室多卡计算集群中：
- **Tmux + Tmux-Resurrect**：保护长时间运行的训练任务，防止 SSH 断连导致进程挂起。
- **VS Code Remote - SSH** + **PyCharm Remote Interpreter**：无缝连接远程算力节点，享受本地般的代码补全与断点调试体验。

---

## 四、 论文排版与 LaTeX 最佳实践

* **Overleaf + Git 同步**：多人协同写作。
* **TikZ / Matplotlib 风格统一**：所有实验图表统一导出为矢量图（`.pdf` / `.svg`），配色遵循 `Science` / `Nature` 标准配色板。

科研不仅是智力的博弈，更是工程习惯的修行。保持专注，持续沉淀！
