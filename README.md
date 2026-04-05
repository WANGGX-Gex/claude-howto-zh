> ## 项目来源与致谢
>
> 本项目是 [claude-howto](https://github.com/luongnv89/claude-howto) 的中文翻译版本。
> 感谢原作者 [luongnv89](https://github.com/luongnv89) 的出色工作和开源精神！
>
> 原项目采用 MIT 许可证开源，本翻译版本同样遵循 MIT 许可证。
> 如果你觉得本项目有帮助，也请给原项目一个 Star！

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="resources/logos/claude-howto-logo.svg">
</picture>

<p align="center">
  <a href="https://github.com/trending">
    <img src="https://img.shields.io/badge/GitHub-🔥%20%231%20Trending-purple?style=for-the-badge&logo=github"/>
  </a>
</p>

[![GitHub Stars](https://img.shields.io/github/stars/WANGGX-Gex/claude-howto-zh?style=flat&color=gold)](https://github.com/WANGGX-Gex/claude-howto-zh/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/WANGGX-Gex/claude-howto-zh?style=flat)](https://github.com/WANGGX-Gex/claude-howto-zh/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.2.0-brightgreen)](CHANGELOG.md)
[![Claude Code](https://img.shields.io/badge/Claude_Code-2.1+-purple)](https://code.claude.com)

# 一个周末掌握 Claude Code

从输入 `claude` 起步，进阶到编排代理（Agent）、钩子（Hook）、技能（Skill）和模型上下文协议（MCP）服务器——配有可视化教程、可复制粘贴的模板和引导式学习路径。

**[15 分钟快速上手](#15-分钟快速上手)** | **[找到你的水平](#不确定从哪里开始)** | **[浏览功能目录](CATALOG.md)**

---

## 目录

- [问题所在](#问题所在)
- [本指南如何解决这些问题](#本指南如何解决这些问题)
- [工作原理](#工作原理)
- [不确定从哪里开始？](#不确定从哪里开始)
- [15 分钟快速上手](#15-分钟快速上手)
- [你能用它构建什么？](#你能用它构建什么)
- [常见问题](#常见问题)
- [贡献](#贡献)
- [许可证](#许可证)

---

## 问题所在

你安装了 Claude Code，运行了几个提示词（Prompt）。然后呢？

- **官方文档描述了功能——但没有展示如何组合使用。** 你知道斜杠命令（Slash Command）的存在，但不知道如何将它们与钩子、记忆（Memory）和子代理（Subagent）串联成真正能节省数小时的工作流。
- **没有清晰的学习路径。** 应该先学 MCP 还是钩子？先学技能还是子代理？你最终浮光掠影，什么都没真正掌握。
- **示例太基础。** 一个 "hello world" 斜杠命令并不能帮你构建一个使用记忆、委派给专业代理、并自动运行安全扫描的生产级代码审查流水线。

你正在浪费 Claude Code 90% 的能力——而且你不知道自己不知道什么。

---

## 本指南如何解决这些问题

这不是又一份功能参考。它是一份**结构化、可视化、示例驱动的指南**，通过可以直接复制到你项目中的真实模板，教你使用 Claude Code 的每一个功能。

| | 官方文档 | 本指南 |
|--|---------|-------|
| **格式** | 参考文档 | 带有 Mermaid 图表的可视化教程 |
| **深度** | 功能描述 | 深入底层工作原理 |
| **示例** | 基础代码片段 | 可立即使用的生产级模板 |
| **结构** | 按功能组织 | 渐进式展示（Progressive Disclosure）学习路径（从初级到高级） |
| **入门** | 自行探索 | 带时间估算的引导式路线图 |
| **自测** | 无 | 互动测验，帮你找到薄弱环节并构建个性化路径 |

### 你将获得：

- **10 个教程模块**，覆盖 Claude Code 的每个功能——从斜杠命令到自定义代理团队
- **可复制粘贴的配置**——斜杠命令、CLAUDE.md 模板、钩子脚本、MCP 配置、子代理定义和完整的插件（Plugin）包
- **Mermaid 图表**展示每个功能的内部工作原理，让你理解*为什么*，而不仅仅是*怎么做*
- **引导式学习路径**，带你在 11-13 小时内从入门者成长为高级用户
- **内置自测**——在 Claude Code 中直接运行 `/self-assessment` 或 `/lesson-quiz hooks` 来发现知识盲区

**[开始学习路径 ->](LEARNING-ROADMAP.md)**

---

## 工作原理

### 1. 找到你的水平

参加[自我评估测验](LEARNING-ROADMAP.md#-find-your-level)或在 Claude Code 中运行 `/self-assessment`。根据你已掌握的知识获取个性化路线图。

### 2. 跟随引导路径

按顺序学习 10 个模块——每个模块都建立在前一个的基础上。学习过程中直接将模板复制到你的项目中。

### 3. 组合功能构建工作流

真正的力量在于功能的组合使用。学习如何将斜杠命令 + 记忆 + 子代理 + 钩子串联成自动化流水线，处理代码审查、部署和文档生成。

### 4. 测试你的理解

每个模块学完后运行 `/lesson-quiz [主题]`。测验会精确定位你遗漏的内容，让你快速填补空白。

**[15 分钟快速上手](#15-分钟快速上手)**

---

## 受到 5,900+ 开发者的信赖

- **5,900+ GitHub Stars**，来自每天使用 Claude Code 的开发者
- **690+ Forks**——团队正在将本指南适配到自己的工作流中
- **持续维护**——与每个 Claude Code 版本同步更新（最新：v2.2.0，2026 年 3 月）
- **社区驱动**——来自分享真实配置的开发者的贡献

[![Star History Chart](https://api.star-history.com/svg?repos=luongnv89/claude-howto&type=Date)](https://star-history.com/#luongnv89/claude-howto&Date)

---

## 不确定从哪里开始？

参加自我评估或选择你的水平：

| 水平 | 你能做到... | 从这里开始 | 时间 |
|------|-----------|-----------|------|
| **入门** | 启动 Claude Code 并对话 | [斜杠命令](01-slash-commands/) | ~2.5 小时 |
| **中级** | 使用 CLAUDE.md 和自定义命令 | [技能](03-skills/) | ~3.5 小时 |
| **高级** | 配置 MCP 服务器和钩子 | [高级功能](09-advanced-features/) | ~5 小时 |

**包含全部 10 个模块的完整学习路径：**

| 顺序 | 模块 | 水平 | 时间 |
|------|------|------|------|
| 1 | [斜杠命令](01-slash-commands/) | 入门 | 30 分钟 |
| 2 | [记忆](02-memory/) | 入门+ | 45 分钟 |
| 3 | [检查点（Checkpoint）](08-checkpoints/) | 中级 | 45 分钟 |
| 4 | [命令行界面（CLI）基础](10-cli/) | 入门+ | 30 分钟 |
| 5 | [技能](03-skills/) | 中级 | 1 小时 |
| 6 | [钩子](06-hooks/) | 中级 | 1 小时 |
| 7 | [MCP](05-mcp/) | 中级+ | 1 小时 |
| 8 | [子代理](04-subagents/) | 中级+ | 1.5 小时 |
| 9 | [高级功能](09-advanced-features/) | 高级 | 2-3 小时 |
| 10 | [插件](07-plugins/) | 高级 | 2 小时 |

**[完整学习路线图 ->](LEARNING-ROADMAP.md)**

---

## 15 分钟快速上手

```bash
# 1. 克隆指南
git clone https://github.com/luongnv89/claude-howto.git
cd claude-howto

# 2. 复制你的第一个斜杠命令
mkdir -p /path/to/your-project/.claude/commands
cp 01-slash-commands/optimize.md /path/to/your-project/.claude/commands/

# 3. 试试看——在 Claude Code 中输入：
# /optimize

# 4. 准备好了解更多？设置项目记忆：
cp 02-memory/project-CLAUDE.md /path/to/your-project/CLAUDE.md

# 5. 安装一个技能：
cp -r 03-skills/code-review ~/.claude/skills/
```

想要完整配置？这是 **1 小时基础配置**：

```bash
# 斜杠命令（15 分钟）
cp 01-slash-commands/*.md .claude/commands/

# 项目记忆（15 分钟）
cp 02-memory/project-CLAUDE.md ./CLAUDE.md

# 安装一个技能（15 分钟）
cp -r 03-skills/code-review ~/.claude/skills/

# 周末目标：添加钩子、子代理、MCP 和插件
# 跟随学习路径进行引导式配置
```

**[查看完整安装参考](#15-分钟快速上手)**

---

## 你能用它构建什么？

| 用例 | 你将组合的功能 |
|------|--------------|
| **自动化代码审查** | 斜杠命令 + 子代理 + 记忆 + MCP |
| **团队入职培训** | 记忆 + 斜杠命令 + 插件 |
| **CI/CD 自动化** | CLI 参考 + 钩子 + 后台任务 |
| **文档生成** | 技能 + 子代理 + 插件 |
| **安全审计** | 子代理 + 技能 + 钩子（只读模式） |
| **DevOps 流水线** | 插件 + MCP + 钩子 + 后台任务 |
| **复杂重构** | 检查点 + 规划模式 + 钩子 |

---

## 常见问题

**这是免费的吗？**
是的。MIT 许可证，永久免费。可以在个人项目、工作中、团队里使用——除了保留许可证声明外没有任何限制。

**这个项目还在维护吗？**
持续维护中。本指南与每个 Claude Code 版本同步更新。当前版本：v2.2.0（2026 年 3 月），兼容 Claude Code 2.1+。

**这和官方文档有什么不同？**
官方文档是功能参考。本指南是包含图表、生产级模板和渐进式学习路径的教程。两者互补——先从这里学习，需要具体细节时查阅官方文档。

**学完所有内容需要多长时间？**
完整路径需要 11-13 小时。但你可以在 15 分钟内获得即时价值——只需复制一个斜杠命令模板并试用。

**可以与 Claude Sonnet / Haiku / Opus 一起使用吗？**
可以。所有模板均适用于 Claude Sonnet 4.6、Claude Opus 4.6 和 Claude Haiku 4.5。

**可以贡献吗？**
当然可以。请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解指南。我们欢迎新示例、Bug 修复、文档改进和社区模板。

**可以离线阅读吗？**
可以。运行 `uv run scripts/build_epub.py` 生成包含所有内容和渲染图表的 EPUB 电子书。

---

## 今天就开始掌握 Claude Code

你已经安装了 Claude Code。在你和 10 倍效率之间唯一的障碍就是知道如何使用它。本指南为你提供了结构化的路径、可视化的解释和可复制粘贴的模板来达到目标。

MIT 许可证。永久免费。克隆它，fork 它，让它成为你自己的。

**[开始学习路径 ->](LEARNING-ROADMAP.md)** | **[浏览功能目录](CATALOG.md)** | **[15 分钟快速上手](#15-分钟快速上手)**

---

<details>
<summary>快速导航 — 所有功能</summary>

| 功能 | 描述 | 文件夹 |
|------|------|--------|
| **功能目录** | 包含安装命令的完整参考 | [CATALOG.md](CATALOG.md) |
| **斜杠命令** | 用户调用的快捷方式 | [01-slash-commands/](01-slash-commands/) |
| **记忆** | 持久化上下文 | [02-memory/](02-memory/) |
| **技能** | 可复用的能力 | [03-skills/](03-skills/) |
| **子代理** | 专业化的 AI 助手 | [04-subagents/](04-subagents/) |
| **MCP 协议** | 外部工具访问 | [05-mcp/](05-mcp/) |
| **钩子** | 事件驱动的自动化 | [06-hooks/](06-hooks/) |
| **插件** | 功能集合包 | [07-plugins/](07-plugins/) |
| **检查点** | 会话快照和回退 | [08-checkpoints/](08-checkpoints/) |
| **高级功能** | 规划、思考、后台任务 | [09-advanced-features/](09-advanced-features/) |
| **CLI 参考** | 命令、标志和选项 | [10-cli/](10-cli/) |
| **博客文章** | 真实使用案例 | [博客文章](https://medium.com/@luongnv89) |

</details>

<details>
<summary>功能对比</summary>

| 功能 | 调用方式 | 持久性 | 最适用于 |
|------|---------|--------|---------|
| **斜杠命令** | 手动 (`/cmd`) | 仅当前会话 | 快速快捷方式 |
| **记忆** | 自动加载 | 跨会话 | 长期学习 |
| **技能** | 自动调用 | 文件系统 | 自动化工作流 |
| **子代理** | 自动委派 | 隔离上下文 | 任务分发 |
| **MCP 协议** | 自动查询 | 实时 | 实时数据访问 |
| **钩子** | 事件触发 | 已配置 | 自动化和验证 |
| **插件** | 一条命令 | 所有功能 | 完整解决方案 |
| **检查点** | 手动/自动 | 基于会话 | 安全实验 |
| **规划模式** | 手动/自动 | 规划阶段 | 复杂实现 |
| **后台任务** | 手动 | 任务持续期间 | 长时间运行的操作 |
| **CLI 参考** | 终端命令 | 会话/脚本 | 自动化和脚本编写 |

</details>

<details>
<summary>安装快速参考</summary>

```bash
# 斜杠命令
cp 01-slash-commands/*.md .claude/commands/

# 记忆
cp 02-memory/project-CLAUDE.md ./CLAUDE.md

# 技能
cp -r 03-skills/code-review ~/.claude/skills/

# 子代理
cp 04-subagents/*.md .claude/agents/

# MCP
export GITHUB_TOKEN="token"
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# 钩子
mkdir -p ~/.claude/hooks
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh

# 插件
/plugin install pr-review

# 检查点（自动启用，在设置中配置）
# 参见 08-checkpoints/README.md

# 高级功能（在设置中配置）
# 参见 09-advanced-features/config-examples.json

# CLI 参考（无需安装）
# 参见 10-cli/README.md 了解使用示例
```

</details>

<details>
<summary>01. 斜杠命令</summary>

**位置**: [01-slash-commands/](01-slash-commands/)

**功能**: 以 Markdown 文件形式存储的用户调用快捷方式

**示例**:
- `optimize.md` - 代码优化分析
- `pr.md` - Pull Request 准备
- `generate-api-docs.md` - API 文档生成器

**安装**:
```bash
cp 01-slash-commands/*.md /path/to/project/.claude/commands/
```

**使用**:
```
/optimize
/pr
/generate-api-docs
```

**了解更多**: [Discovering Claude Code Slash Commands](https://medium.com/@luongnv89/discovering-claude-code-slash-commands-cdc17f0dfb29)

</details>

<details>
<summary>02. 记忆</summary>

**位置**: [02-memory/](02-memory/)

**功能**: 跨会话的持久化上下文

**示例**:
- `project-CLAUDE.md` - 团队级项目标准
- `directory-api-CLAUDE.md` - 目录级规则
- `personal-CLAUDE.md` - 个人偏好

**安装**:
```bash
# 项目记忆
cp 02-memory/project-CLAUDE.md /path/to/project/CLAUDE.md

# 目录记忆
cp 02-memory/directory-api-CLAUDE.md /path/to/project/src/api/CLAUDE.md

# 个人记忆
cp 02-memory/personal-CLAUDE.md ~/.claude/CLAUDE.md
```

**使用**: 由 Claude 自动加载

</details>

<details>
<summary>03. 技能</summary>

**位置**: [03-skills/](03-skills/)

**功能**: 可复用的、自动调用的能力，包含指令和脚本

**示例**:
- `code-review/` - 包含脚本的综合代码审查
- `brand-voice/` - 品牌语音一致性检查器
- `doc-generator/` - API 文档生成器

**安装**:
```bash
# 个人技能
cp -r 03-skills/code-review ~/.claude/skills/

# 项目技能
cp -r 03-skills/code-review /path/to/project/.claude/skills/
```

**使用**: 在相关场景下自动调用

</details>

<details>
<summary>04. 子代理</summary>

**位置**: [04-subagents/](04-subagents/)

**功能**: 拥有隔离上下文和自定义提示词的专业化 AI 助手

**示例**:
- `code-reviewer.md` - 综合代码质量分析
- `test-engineer.md` - 测试策略和覆盖率
- `documentation-writer.md` - 技术文档
- `secure-reviewer.md` - 安全审查（只读）
- `implementation-agent.md` - 完整功能实现

**安装**:
```bash
cp 04-subagents/*.md /path/to/project/.claude/agents/
```

**使用**: 由主代理自动委派

</details>

<details>
<summary>05. MCP 协议</summary>

**位置**: [05-mcp/](05-mcp/)

**功能**: 用于访问外部工具和 API 的模型上下文协议

**示例**:
- `github-mcp.json` - GitHub 集成
- `database-mcp.json` - 数据库查询
- `filesystem-mcp.json` - 文件操作
- `multi-mcp.json` - 多 MCP 服务器

**安装**:
```bash
# 设置环境变量
export GITHUB_TOKEN="your_token"
export DATABASE_URL="postgresql://..."

# 通过 CLI 添加 MCP 服务器
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# 或手动添加到项目 .mcp.json（示例参见 05-mcp/）
```

**使用**: MCP 工具在配置后自动对 Claude 可用

</details>

<details>
<summary>06. 钩子</summary>

**位置**: [06-hooks/](06-hooks/)

**功能**: 响应 Claude Code 事件自动执行的事件驱动 Shell 命令

**示例**:
- `format-code.sh` - 写入前自动格式化代码
- `pre-commit.sh` - 提交前运行测试
- `security-scan.sh` - 扫描安全问题
- `log-bash.sh` - 记录所有 bash 命令
- `validate-prompt.sh` - 验证用户提示词
- `notify-team.sh` - 发送事件通知

**安装**:
```bash
mkdir -p ~/.claude/hooks
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
```

在 `~/.claude/settings.json` 中配置钩子:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Write",
      "hooks": ["~/.claude/hooks/format-code.sh"]
    }],
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": ["~/.claude/hooks/security-scan.sh"]
    }]
  }
}
```

**使用**: 钩子在事件发生时自动执行

**钩子类型**（4 种类型，25 个事件）:
- **工具钩子**: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`
- **会话钩子**: `SessionStart`, `SessionEnd`, `Stop`, `StopFailure`, `SubagentStart`, `SubagentStop`
- **任务钩子**: `UserPromptSubmit`, `TaskCompleted`, `TaskCreated`, `TeammateIdle`
- **生命周期钩子**: `ConfigChange`, `CwdChanged`, `FileChanged`, `PreCompact`, `PostCompact`, `WorktreeCreate`, `WorktreeRemove`, `Notification`, `InstructionsLoaded`, `Elicitation`, `ElicitationResult`

</details>

<details>
<summary>07. 插件</summary>

**位置**: [07-plugins/](07-plugins/)

**功能**: 命令、代理、MCP 和钩子的集合包

**示例**:
- `pr-review/` - 完整的 PR 审查工作流
- `devops-automation/` - 部署和监控
- `documentation/` - 文档生成

**安装**:
```bash
/plugin install pr-review
/plugin install devops-automation
/plugin install documentation
```

**使用**: 使用捆绑的斜杠命令和功能

</details>

<details>
<summary>08. 检查点和回退</summary>

**位置**: [08-checkpoints/](08-checkpoints/)

**功能**: 保存对话状态并回退到之前的时间点，探索不同方案

**核心概念**:
- **检查点**: 对话状态的快照
- **回退**: 返回到之前的检查点
- **分支点**: 从同一检查点探索多种方案

**使用**:
```
# 检查点在每次用户提示时自动创建
# 要回退，按两次 Esc 或使用：
/rewind

# 然后从五个选项中选择：
# 1. 恢复代码和对话
# 2. 恢复对话
# 3. 恢复代码
# 4. 从此处总结
# 5. 取消
```

**用例**:
- 尝试不同的实现方案
- 从错误中恢复
- 安全实验
- 比较替代方案
- A/B 测试不同设计

</details>

<details>
<summary>09. 高级功能</summary>

**位置**: [09-advanced-features/](09-advanced-features/)

**功能**: 用于复杂工作流和自动化的高级能力

**包含**:
- **规划模式** — 在编码前创建详细的实施计划
- **深度思考** — 用于复杂问题的深度推理（通过 `Alt+T` / `Option+T` 切换）
- **后台任务** — 运行长时间操作而不阻塞
- **权限模式（Permission Mode）** — `default`, `acceptEdits`, `plan`, `dontAsk`, `bypassPermissions`
- **无头模式** — 在 CI/CD 中运行 Claude Code: `claude -p "Run tests and generate report"`
- **会话管理** — `/resume`, `/rename`, `/fork`, `claude -c`, `claude -r`
- **配置** — 在 `~/.claude/settings.json` 中自定义行为

详见 [config-examples.json](09-advanced-features/config-examples.json) 获取完整配置。

</details>

<details>
<summary>10. CLI 参考</summary>

**位置**: [10-cli/](10-cli/)

**功能**: Claude Code 的完整命令行界面参考

**快速示例**:
```bash
# 交互模式
claude "explain this project"

# 打印模式（非交互）
claude -p "review this code"

# 处理文件内容
cat error.log | claude -p "explain this error"

# 用于脚本的 JSON 输出
claude -p --output-format json "list functions"

# 恢复会话
claude -r "feature-auth" "continue implementation"
```

**用例**: CI/CD 流水线集成、脚本自动化、批量处理、多会话工作流、自定义代理配置

</details>

<details>
<summary>示例工作流</summary>

### 完整的代码审查工作流

```markdown
# 使用: 斜杠命令 + 子代理 + 记忆 + MCP

User: /review-pr

Claude:
1. 加载项目记忆（编码标准）
2. 通过 GitHub MCP 获取 PR
3. 委派给 code-reviewer 子代理
4. 委派给 test-engineer 子代理
5. 综合整理发现
6. 提供全面审查
```

### 自动化文档

```markdown
# 使用: 技能 + 子代理 + 记忆

User: "Generate API documentation for the auth module"

Claude:
1. 加载项目记忆（文档标准）
2. 检测到文档生成请求
3. 自动调用 doc-generator 技能
4. 委派给 api-documenter 子代理
5. 创建包含示例的全面文档
```

### DevOps 部署

```markdown
# 使用: 插件 + MCP + 钩子

User: /deploy production

Claude:
1. 运行部署前钩子（验证环境）
2. 委派给 deployment-specialist 子代理
3. 通过 Kubernetes MCP 执行部署
4. 监控进度
5. 运行部署后钩子（健康检查）
6. 报告状态
```

</details>

<details>
<summary>目录结构</summary>

```
├── 01-slash-commands/
│   ├── optimize.md
│   ├── pr.md
│   ├── generate-api-docs.md
│   └── README.md
├── 02-memory/
│   ├── project-CLAUDE.md
│   ├── directory-api-CLAUDE.md
│   ├── personal-CLAUDE.md
│   └── README.md
├── 03-skills/
│   ├── code-review/
│   │   ├── SKILL.md
│   │   ├── scripts/
│   │   └── templates/
│   ├── brand-voice/
│   │   ├── SKILL.md
│   │   └── templates/
│   ├── doc-generator/
│   │   ├── SKILL.md
│   │   └── generate-docs.py
│   └── README.md
├── 04-subagents/
│   ├── code-reviewer.md
│   ├── test-engineer.md
│   ├── documentation-writer.md
│   ├── secure-reviewer.md
│   ├── implementation-agent.md
│   └── README.md
├── 05-mcp/
│   ├── github-mcp.json
│   ├── database-mcp.json
│   ├── filesystem-mcp.json
│   ├── multi-mcp.json
│   └── README.md
├── 06-hooks/
│   ├── format-code.sh
│   ├── pre-commit.sh
│   ├── security-scan.sh
│   ├── log-bash.sh
│   ├── validate-prompt.sh
│   ├── notify-team.sh
│   └── README.md
├── 07-plugins/
│   ├── pr-review/
│   ├── devops-automation/
│   ├── documentation/
│   └── README.md
├── 08-checkpoints/
│   ├── checkpoint-examples.md
│   └── README.md
├── 09-advanced-features/
│   ├── config-examples.json
│   ├── planning-mode-examples.md
│   └── README.md
├── 10-cli/
│   └── README.md
└── README.md（本文件）
```

</details>

<details>
<summary>最佳实践</summary>

### 推荐做法
- 从斜杠命令开始，循序渐进
- 逐步添加功能
- 使用记忆存储团队标准
- 先在本地测试配置
- 为自定义实现编写文档
- 对项目配置进行版本控制
- 与团队共享插件

### 避免做法
- 不要创建冗余功能
- 不要硬编码凭据
- 不要跳过文档编写
- 不要将简单任务过度复杂化
- 不要忽视安全最佳实践
- 不要提交敏感数据

</details>

<details>
<summary>故障排除</summary>

### 功能未加载
1. 检查文件位置和命名
2. 验证 YAML 前置元数据（Frontmatter）语法
3. 检查文件权限
4. 确认 Claude Code 版本兼容性

### MCP 连接失败
1. 验证环境变量
2. 检查 MCP 服务器安装
3. 测试凭据
4. 检查网络连接

### 子代理未委派
1. 检查工具权限
2. 确认代理描述清晰度
3. 审查任务复杂度
4. 独立测试代理

</details>

<details>
<summary>测试</summary>

本项目包含全面的自动化测试：

- **单元测试**: 使用 pytest 的 Python 测试（Python 3.10, 3.11, 3.12）
- **代码质量**: 使用 Ruff 进行代码检查和格式化
- **安全**: 使用 Bandit 进行漏洞扫描
- **类型检查**: 使用 mypy 进行静态类型分析
- **构建验证**: EPUB 生成测试
- **覆盖率跟踪**: Codecov 集成

```bash
# 安装开发依赖
uv pip install -r requirements-dev.txt

# 运行所有单元测试
pytest scripts/tests/ -v

# 运行测试并生成覆盖率报告
pytest scripts/tests/ -v --cov=scripts --cov-report=html

# 运行代码质量检查
ruff check scripts/
ruff format --check scripts/

# 运行安全扫描
bandit -c pyproject.toml -r scripts/ --exclude scripts/tests/

# 运行类型检查
mypy scripts/ --ignore-missing-imports
```

测试在每次推送到 `main`/`develop` 分支和每个 PR 到 `main` 时自动运行。详见 [TESTING.md](.github/TESTING.md)。

</details>

<details>
<summary>EPUB 生成</summary>

想要离线阅读本指南？生成 EPUB 电子书：

```bash
uv run scripts/build_epub.py
```

这将创建包含所有内容（包括渲染的 Mermaid 图表）的 `claude-howto-guide.epub`。

详见 [scripts/README.md](scripts/README.md) 了解更多选项。

</details>

<details>
<summary>贡献</summary>

发现问题或想要贡献示例？我们欢迎你的帮助！

**请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解以下详细指南：**
- 贡献类型（示例、文档、功能、Bug、反馈）
- 如何设置开发环境
- 目录结构和如何添加内容
- 编写指南和最佳实践
- 提交和 PR 流程

**我们的社区标准：**
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - 社区行为准则
- [SECURITY.md](SECURITY.md) - 安全政策和漏洞报告

### 报告安全问题

如果你发现安全漏洞，请负责任地报告：

1. **使用 GitHub 私密漏洞报告**: https://github.com/luongnv89/claude-howto/security/advisories
2. **或阅读** [.github/SECURITY_REPORTING.md](.github/SECURITY_REPORTING.md) 获取详细说明
3. **不要**为安全漏洞创建公开 Issue

快速开始：
1. Fork 并克隆仓库
2. 创建描述性分支 (`add/feature-name`, `fix/bug`, `docs/improvement`)
3. 按照指南进行修改
4. 提交包含清晰描述的 Pull Request

**需要帮助？** 创建 Issue 或讨论，我们会引导你完成整个过程。

</details>

<details>
<summary>其他资源</summary>

- [Claude Code 文档](https://code.claude.com/docs/en/overview)
- [MCP 协议规范](https://modelcontextprotocol.io)
- [技能仓库](https://github.com/luongnv89/skills) - 可直接使用的技能合集
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook)
- [Boris Cherny 的 Claude Code 工作流](https://x.com/bcherny/status/2007179832300581177) - Claude Code 创始人分享了他的系统化工作流：并行代理、共享 CLAUDE.md、规划模式、斜杠命令、子代理和验证钩子，用于自主长时间运行的会话。

</details>

---

## 贡献

我们欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解如何开始。

## 贡献者

感谢所有为本项目做出贡献的人！

| 贡献者 | PR |
|--------|-----|
| [wjhrdy](https://github.com/wjhrdy) | [#1 - add a tool to create an epub](https://github.com/luongnv89/claude-howto/pull/1) |
| [VikalpP](https://github.com/VikalpP) | [#7 - fix(docs): Use tilde fences for nested code blocks in concepts guide](https://github.com/luongnv89/claude-howto/pull/7) |

---

## 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE)。可自由使用、修改和分发。唯一要求是保留许可证声明。

---

**最后更新**: 2026 年 3 月
**Claude Code 版本**: 2.1+
**兼容模型**: Claude Sonnet 4.6, Claude Opus 4.6, Claude Haiku 4.5
