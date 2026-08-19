# Joy's Personal Blog & Essays (`le-temps.github.io`)

<div align="center">

[![Deploy to GitHub Pages](https://github.com/le-temps/le-temps.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/le-temps/le-temps.github.io/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live_Site-le--temps.github.io-3b82f6?style=flat-square&logo=google-chrome)](https://le-temps.github.io)
[![Astro](https://img.shields.io/badge/Built_with-Astro_4-ff5d01?style=flat-square&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

*A production-grade, minimal, high-signal personal blog & academic research essay platform built for GitHub Pages.*

</div>

---

## ✨ Features / 核心特性

- ⚡ **0kb 初始 JS 运行时**：基于 Astro 4 Islands 架构，极速秒开与全站纯静态生成（SSG）。
- 🎨 **Linear / Vercel / Apple 极简科技感设计**：支持平滑暗黑模式切换、精美字阶与微交互。
- 📝 **全功能 Markdown / MDX 知识库**：
  - 📐 **LaTeX 数学公式渲染 (KaTeX)**：完美支持行内与多行复杂矩阵/注意力公式推导。
  - 💻 **多语言代码高亮 (Shiki)**：支持 Python、C++、TypeScript、Rust、Shell，带一键复制代码按钮。
  - 📑 **智能右侧悬浮目录 (TOC)**：ScrollSpy 实时追踪阅读位置，平滑点击跳转。
  - ⏳ **阅读进度指示条** 与 **阅读时长预估**。
- 🔍 **Fuse.js 全站离线模糊搜索**：支持 `Cmd/Ctrl + K` 快捷键唤出弹窗与键盘快捷导航。
- 🏷️ **完整的分类 (Categories)、标签 (Tags) 与时间轴归档 (Archive)**。
- 💬 **Giscus 评论集成**：基于 GitHub Discussions 的无服务器极客评论。
- 📡 **自动化 SEO & 订阅**：自动生成 `sitemap.xml`、`robots.txt`、`rss.xml` 与 OpenGraph 卡片。
- 🚀 **GitHub Actions 持续部署**：Push 到 `main` 分支后全自动编译发布至 GitHub Pages。

---

## 📁 目录结构 (Project Architecture)

```text
src/
├── content/              # Markdown 内容管理核心
│   ├── config.ts         # Zod Schema 严格类型校验
│   └── posts/            # 文章源文件 (*.md)
├── components/           # Astro 与 React 交互组件 (Islands)
│   ├── Header.astro      # 顶部导航
│   ├── Footer.astro      # 底部信息
│   ├── Hero.astro        # 首页主视觉
│   ├── PostCard.astro    # 文章卡片
│   ├── ProjectCard.astro # 开源项目卡片
│   ├── SearchModal.tsx   # Fuse.js 搜索弹窗 (React)
│   ├── ThemeToggle.tsx   # 暗黑模式切换 (React)
│   ├── TOC.tsx           # 右侧目录高亮 (React)
│   └── ReadingProgress.tsx
├── layouts/              # 页面布局模板
│   ├── BaseLayout.astro  # 全局 SEO 基础布局
│   └── PostLayout.astro  # 文章阅读排版专用布局
├── pages/                # 路由系统
│   ├── index.astro       # 首页
│   ├── blog/             # 博客列表与动态文章页
│   ├── category/         # 分类页面
│   ├── tags/             # 标签页面
│   ├── archive.astro     # 时间线归档
│   ├── about.astro       # 关于我
│   └── rss.xml.ts        # RSS 订阅源
└── styles/
    └── global.css        # 全局样式与 KaTeX 引入
```

---

## ✍️ 如何发布一篇新文章？

只需在 `src/content/posts/` 目录下新建一个 `.md` 文件：

```markdown
---
title: "你的文章大标题"
date: 2026-08-20
description: "文章的简要概述，将用于 SEO 与列表展示卡片。"
category: "AI" # 可选: AI / Programming / Research / Notes / Life
tags: ["DeepSeek", "LLM", "开源"]
author: "Joy (@le-temps)"
featured: false # 设置为 true 会在首页置顶推荐
---

# 一、 引言

支持 LaTeX 公式：$E = mc^2$ 以及代码高亮！
```

---

## 🛠️ 本地开发与调试

```bash
# 1. 安装依赖
pnpm install

# 2. 启动本地热重载开发服务器
pnpm dev

# 3. 编译生成静态站点
pnpm build
```

---

## 📄 License

MIT License © 2026 Joy (@le-temps).