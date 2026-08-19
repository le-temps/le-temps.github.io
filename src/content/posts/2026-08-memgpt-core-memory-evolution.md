---
title: "从 MemGPT 到自主进化：LLM Agent 长期核心记忆工程实践"
date: 2026-08-18
description: "解析大模型智能体跨会话记忆的实现原理：如何让 Agent 主动拥有自己的知识库，并在交互中自主反思、修正与持久化演进。"
category: "Programming"
tags: ["MemGPT", "Agent-Memory", "TypeScript", "LLM"]
author: "Joy (@le-temps)"
featured: true
---

人类之所以能够进行长期复杂的合作，关键在于**记忆的持久化与持续反思**。而当前的绝大多数 LLM Agent 都是“无状态”的——每次会话重启，它就会彻底遗忘用户的偏好、项目的特殊架构规则以及过去踩过的坑。

受 MemGPT 启发，我们在 `@le-temps/dsh-agent-memory` 中实现了一套**自主进化的长期核心记忆机制（Self-Evolving Core Memory）**。

---

## 一、 核心记忆的三层架构

我们将 Agent 的记忆划分为三个维度，存储在工作区 `.agents/memory.json` 中：

```json
{
  "project_context": [
    "本项目采用 TypeScript ESM 规范，使用 pnpm workspace 进行 Monorepo 管理",
    "核心包依赖 @deepseek-ai/cordis 服务总线"
  ],
  "user_preferences": [
    "用户偏好极致简洁、模块化的代码风格，注释要求清晰",
    "不要破坏已有公共 API 的向后兼容性"
  ],
  "lessons_learned": [
    "修改正则规则时需注意非单词字符边界 \\b 对符号匹配的影响",
    "Windows PowerShell 与 Linux Bash 在多命令执行时分隔符差异"
  ]
}
```

---

## 二、 赋予 Agent 自主操纵记忆的工具

我们不要让外部脚本去猜测 Agent 该记什么，而是**通过 Tool Calling 赋予 Agent 主动管理记忆的能力**：

```typescript
// 核心工具定义：追加新知识
ctx.tools.register(defineTool({
  name: 'core_memory_append',
  description: 'Append a new fact or lesson learned to your persistent core memory.',
  parameters: {
    section: { type: 'string', enum: ['project_context', 'user_preferences', 'lessons_learned'] },
    content: { type: 'string', description: 'The concise fact or rule to persist' }
  },
  execute: async ({ section, content }) => {
    await store.append(section, content);
    return { success: true, message: `Persisted to ${section}.` };
  }
}));
```

---

## 三、 系统提示词注入与生命周期挂载

在每一次会话组装（System Prompt Assembly）时，我们将持久化记忆无缝挂载到 Prompt 头部：

```markdown
<long_term_memory>
## Project Context
0. 本项目采用 TypeScript ESM 规范...

## User Preferences
0. 用户偏好极致简洁、模块化代码风格...

## Lessons Learned (Self-Evolution)
0. 修改正则规则时需注意非单词字符边界...
</long_term_memory>
```

---

## 四、 自主反思与修剪机制 (Reflection & Pruning)

随着交互轮次增多，记忆条目可能会出现**过时、矛盾或冗余**。
为此，我们设计了 `core_memory_reflect` 工具：
- Agent 可以合并相似事实；
- 用新的架构决策替代旧的废弃方案；
- 保持总记忆条数在合理的 Token 预算（如 $< 1500$ tokens）内。

这就是让 AI Agent 真正具备“越用越聪明、越用越懂你”的关键所在。
