import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const title = process.argv[2] || 'my-new-post';
const now = new Date();
const dateStr = now.toISOString().split('T')[0];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '')
    .replace(/--+/g, '-');
}

const slug = `${dateStr}-${slugify(title)}`;
const fileName = `${slug}.md`;
const targetDir = path.resolve(__dirname, '../src/content/posts');
const targetFile = path.join(targetDir, fileName);

const template = `---
title: "${title}"
date: ${dateStr}
description: "在此处简要输入文章的概述与核心观点..."
category: "AI" # 可选: AI / Programming / Research / Notes / Life
tags: ["AI-Agent", "DeepSeek", "开源"]
author: "Joy (@le-temps)"
featured: false
---

# 一、 引言

欢迎在 AstroPaper 中开始你的写作！

支持 LaTeX 数学公式：$E = mc^2$，以及高质量代码高亮。

\`\`\`python
def hello_world():
    print("Hello from Joy's AstroPaper Blog!")
\`\`\`
`;

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(targetFile)) {
  console.log(`[WARN] 文件已存在: ${targetFile}`);
} else {
  fs.writeFileSync(targetFile, template, 'utf-8');
  console.log(`[SUCCESS] 新文章创建成功！`);
  console.log(`文件路径: ${targetFile}`);
}
