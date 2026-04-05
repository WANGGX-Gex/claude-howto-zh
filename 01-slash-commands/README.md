<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

# 斜杠命令（Slash Command）

## 概述

斜杠命令是在交互式会话中控制 Claude 行为的快捷方式。它们分为以下几种类型：

- **内置命令**：由 Claude Code 提供（`/help`、`/clear`、`/model`）
- **技能**：用户定义的命令，以 `SKILL.md` 文件形式创建（`/optimize`、`/pr`）
- **插件命令**：来自已安装插件的命令（`/frontend-design:frontend-design`）
- **MCP 提示词**：来自模型上下文协议（MCP）服务器的命令（`/mcp__github__list_prs`）

> **注意**：自定义斜杠命令已合并到技能（Skill）中。`.claude/commands/` 中的文件仍然有效，但技能（`.claude/skills/`）现在是推荐的方式。两者都可以创建 `/command-name` 快捷方式。详见[技能指南](../03-skills/)。

## 内置命令参考

内置命令是常见操作的快捷方式。共有 **55+ 个内置命令**和 **5 个捆绑技能**可用。在 Claude Code 中输入 `/` 查看完整列表，或输入 `/` 后跟任意字母进行筛选。

| 命令 | 用途 |
|---------|---------|
| `/add-dir <path>` | 添加工作目录 |
| `/agents` | 管理代理（Agent）配置 |
| `/branch [name]` | 将对话分支到新会话（别名：`/fork`）。注意：`/fork` 在 v2.1.77 中重命名为 `/branch` |
| `/btw <question>` | 不加入历史记录的旁问 |
| `/chrome` | 配置 Chrome 浏览器集成 |
| `/clear` | 清除对话（别名：`/reset`、`/new`） |
| `/color [color\|default]` | 设置提示栏颜色 |
| `/compact [instructions]` | 压缩对话，可选聚焦指令 |
| `/config` | 打开设置（别名：`/settings`） |
| `/context` | 以彩色网格可视化上下文使用情况 |
| `/copy [N]` | 复制助手回复到剪贴板；`w` 写入文件 |
| `/cost` | 显示令牌（Token）使用统计 |
| `/desktop` | 在桌面应用中继续（别名：`/app`） |
| `/diff` | 未提交变更的交互式差异查看器 |
| `/doctor` | 诊断安装健康状况 |
| `/effort [low\|medium\|high\|max\|auto]` | 设置努力级别。`max` 需要 Opus 4.6 |
| `/exit` | 退出 REPL（别名：`/quit`） |
| `/export [filename]` | 将当前对话导出到文件或剪贴板 |
| `/extra-usage` | 配置速率限制的额外用量 |
| `/fast [on\|off]` | 切换快速模式 |
| `/feedback` | 提交反馈（别名：`/bug`） |
| `/help` | 显示帮助 |
| `/hooks` | 查看钩子（Hook）配置 |
| `/ide` | 管理 IDE 集成 |
| `/init` | 初始化 `CLAUDE.md`。设置 `CLAUDE_CODE_NEW_INIT=true` 启用交互式流程 |
| `/insights` | 生成会话分析报告 |
| `/install-github-app` | 设置 GitHub Actions 应用 |
| `/install-slack-app` | 安装 Slack 应用 |
| `/keybindings` | 打开快捷键配置 |
| `/login` | 切换 Anthropic 账户 |
| `/logout` | 退出 Anthropic 账户 |
| `/mcp` | 管理 MCP 服务器和 OAuth |
| `/memory` | 编辑 `CLAUDE.md`，切换自动记忆（Memory） |
| `/mobile` | 移动应用二维码（别名：`/ios`、`/android`） |
| `/model [model]` | 选择模型，使用左/右箭头调整努力级别 |
| `/passes` | 分享 Claude Code 免费周 |
| `/permissions` | 查看/更新权限（别名：`/allowed-tools`） |
| `/plan [description]` | 进入计划模式 |
| `/plugin` | 管理插件（Plugin） |
| `/pr-comments [PR]` | 获取 GitHub PR 评论 |
| `/privacy-settings` | 隐私设置（仅 Pro/Max） |
| `/release-notes` | 查看更新日志 |
| `/reload-plugins` | 重新加载活动插件 |
| `/remote-control` | 从 claude.ai 远程控制（别名：`/rc`） |
| `/remote-env` | 配置默认远程环境 |
| `/rename [name]` | 重命名会话 |
| `/resume [session]` | 恢复对话（别名：`/continue`） |
| `/review` | **已弃用** — 请安装 `code-review` 插件 |
| `/rewind` | 回退对话和/或代码（别名：`/checkpoint`） |
| `/sandbox` | 切换沙盒（Sandbox）模式 |
| `/schedule [description]` | 创建/管理定时任务 |
| `/security-review` | 分析分支的安全漏洞 |
| `/skills` | 列出可用技能 |
| `/stats` | 可视化每日使用情况、会话、连续使用天数 |
| `/status` | 显示版本、模型、账户 |
| `/statusline` | 配置状态栏 |
| `/tasks` | 列出/管理后台任务 |
| `/terminal-setup` | 配置终端快捷键 |
| `/theme` | 更改颜色主题 |
| `/vim` | 切换 Vim/普通模式 |
| `/voice` | 切换按键说话语音输入 |

### 捆绑技能

这些技能随 Claude Code 一起提供，像斜杠命令一样调用：

| 技能 | 用途 |
|-------|---------|
| `/batch <instruction>` | 使用工作树（Worktree）编排大规模并行变更 |
| `/claude-api` | 加载项目语言的 Claude API 参考 |
| `/debug [description]` | 启用调试日志 |
| `/loop [interval] <prompt>` | 按间隔重复运行提示词 |
| `/simplify [focus]` | 审查已变更文件的代码质量 |

### 已弃用命令

| 命令 | 状态 |
|---------|--------|
| `/review` | 已弃用 — 由 `code-review` 插件替代 |
| `/output-style` | 自 v2.1.73 起弃用 |
| `/fork` | 重命名为 `/branch`（别名仍有效，v2.1.77） |

### 最近变更

- `/fork` 重命名为 `/branch`，`/fork` 保留为别名（v2.1.77）
- `/output-style` 已弃用（v2.1.73）
- `/review` 已弃用，推荐使用 `code-review` 插件
- 添加 `/effort` 命令，`max` 级别需要 Opus 4.6
- 添加 `/voice` 命令用于按键说话语音输入
- 添加 `/schedule` 命令用于创建/管理定时任务
- 添加 `/color` 命令用于自定义提示栏
- `/model` 选择器现在显示可读标签（如 "Sonnet 4.6"）而非原始模型 ID
- `/resume` 支持 `/continue` 别名
- MCP 提示词可作为 `/mcp__<server>__<prompt>` 命令使用（参见 [MCP 提示词作为命令](#mcp-提示词作为命令)）

## 自定义命令（现为技能）

自定义斜杠命令已**合并到技能中**。两种方式都可以创建通过 `/command-name` 调用的命令：

| 方式 | 位置 | 状态 |
|----------|----------|--------|
| **技能（推荐）** | `.claude/skills/<name>/SKILL.md` | 当前标准 |
| **旧版命令** | `.claude/commands/<name>.md` | 仍然有效 |

如果技能和命令同名，**技能优先**。例如，当 `.claude/commands/review.md` 和 `.claude/skills/review/SKILL.md` 同时存在时，将使用技能版本。

### 迁移路径

现有的 `.claude/commands/` 文件无需更改即可继续使用。要迁移到技能：

**迁移前（命令）：**
```
.claude/commands/optimize.md
```

**迁移后（技能）：**
```
.claude/skills/optimize/SKILL.md
```

### 为什么选择技能？

技能相比旧版命令提供了额外功能：

- **目录结构**：捆绑脚本、模板和参考文件
- **自动调用**：Claude 可以在相关时自动触发技能
- **调用控制**：选择由用户、Claude 或两者都可以调用
- **子代理执行**：通过 `context: fork` 在隔离上下文中运行技能
- **渐进式展示**：仅在需要时加载额外文件

### 将自定义命令创建为技能

创建一个包含 `SKILL.md` 文件的目录：

```bash
mkdir -p .claude/skills/my-command
```

**文件：** `.claude/skills/my-command/SKILL.md`

```yaml
---
name: my-command
description: What this command does and when to use it
---

# My Command

Instructions for Claude to follow when this command is invoked.

1. First step
2. Second step
3. Third step
```

### 前置元数据（Frontmatter）参考

| 字段 | 用途 | 默认值 |
|-------|---------|---------|
| `name` | 命令名称（变为 `/name`） | 目录名 |
| `description` | 简要描述（帮助 Claude 知道何时使用） | 第一段 |
| `argument-hint` | 自动补全的预期参数 | 无 |
| `allowed-tools` | 命令可以无需权限使用的工具 | 继承 |
| `model` | 使用的特定模型 | 继承 |
| `disable-model-invocation` | 如果为 `true`，仅用户可以调用（Claude 不会自动调用） | `false` |
| `user-invocable` | 如果为 `false`，从 `/` 菜单隐藏 | `true` |
| `context` | 设为 `fork` 以在隔离的子代理（Subagent）中运行 | 无 |
| `agent` | 使用 `context: fork` 时的代理类型 | `general-purpose` |
| `hooks` | 技能范围的钩子（PreToolUse、PostToolUse、Stop） | 无 |

### 参数

命令可以接收参数：

**使用 `$ARGUMENTS` 获取所有参数：**

```yaml
---
name: fix-issue
description: Fix a GitHub issue by number
---

Fix issue #$ARGUMENTS following our coding standards
```

用法：`/fix-issue 123` → `$ARGUMENTS` 变为 "123"

**使用 `$0`、`$1` 等获取单个参数：**

```yaml
---
name: review-pr
description: Review a PR with priority
---

Review PR #$0 with priority $1
```

用法：`/review-pr 456 high` → `$0`="456"，`$1`="high"

### 使用 Shell 命令注入动态上下文

使用 `!`command`` 在提示词之前执行 bash 命令：

```yaml
---
name: commit
description: Create a git commit with context
allowed-tools: Bash(git *)
---

## Context

- Current git status: !`git status`
- Current git diff: !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`

## Your task

Based on the above changes, create a single git commit.
```

### 文件引用

使用 `@` 引入文件内容：

```markdown
Review the implementation in @src/utils/helpers.js
Compare @src/old-version.js with @src/new-version.js
```

## 插件命令

插件可以提供自定义命令：

```
/plugin-name:command-name
```

或在没有命名冲突时直接使用 `/command-name`。

**示例：**
```bash
/frontend-design:frontend-design
/commit-commands:commit
```

## MCP 提示词作为命令

MCP 服务器可以将提示词暴露为斜杠命令：

```
/mcp__<server-name>__<prompt-name> [arguments]
```

**示例：**
```bash
/mcp__github__list_prs
/mcp__github__pr_review 456
/mcp__jira__create_issue "Bug title" high
```

### MCP 权限语法

在权限中控制 MCP 服务器访问：

- `mcp__github` - 访问整个 GitHub MCP 服务器
- `mcp__github__*` - 通配符访问所有工具
- `mcp__github__get_issue` - 特定工具访问

## 命令架构

```mermaid
graph TD
    A["用户输入：/command-name"] --> B{"命令类型？"}
    B -->|内置| C["执行内置命令"]
    B -->|技能| D["加载 SKILL.md"]
    B -->|插件| E["加载插件命令"]
    B -->|MCP| F["执行 MCP 提示词"]

    D --> G["解析前置元数据"]
    G --> H["替换变量"]
    H --> I["执行 Shell 命令"]
    I --> J["发送给 Claude"]
    J --> K["返回结果"]
```

## 命令生命周期

```mermaid
sequenceDiagram
    participant User as 用户
    participant Claude as Claude Code
    participant FS as 文件系统
    participant CLI as Shell/Bash

    User->>Claude: 输入 /optimize
    Claude->>FS: 搜索 .claude/skills/ 和 .claude/commands/
    FS-->>Claude: 返回 optimize/SKILL.md
    Claude->>Claude: 解析前置元数据
    Claude->>CLI: 执行 !`command` 替换
    CLI-->>Claude: 命令输出
    Claude->>Claude: 替换 $ARGUMENTS
    Claude->>User: 处理提示词
    Claude->>User: 返回结果
```

## 本文件夹中可用的命令

这些示例命令可以作为技能或旧版命令安装。

### 1. `/optimize` - 代码优化

分析代码的性能问题、内存泄漏和优化机会。

**用法：**
```
/optimize
[粘贴你的代码]
```

### 2. `/pr` - Pull Request 准备

引导完成 PR 准备清单，包括代码检查、测试和提交格式化。

**用法：**
```
/pr
```

**截图：**
![/pr](pr-slash-command.png)

### 3. `/generate-api-docs` - API 文档生成器

从源代码生成全面的 API 文档。

**用法：**
```
/generate-api-docs
```

### 4. `/commit` - 带上下文的 Git 提交

使用仓库的动态上下文创建 git 提交。

**用法：**
```
/commit [可选信息]
```

### 5. `/push-all` - 暂存、提交并推送

暂存所有变更、创建提交并推送到远程仓库，包含安全检查。

**用法：**
```
/push-all
```

**安全检查：**
- 敏感文件：`.env*`、`*.key`、`*.pem`、`credentials.json`
- API 密钥：检测真实密钥与占位符
- 大文件：未使用 Git LFS 的 `>10MB` 文件
- 构建产物：`node_modules/`、`dist/`、`__pycache__/`

### 6. `/doc-refactor` - 文档重构

重新组织项目文档以提高清晰度和可访问性。

**用法：**
```
/doc-refactor
```

### 7. `/setup-ci-cd` - CI/CD 流水线配置

实施 pre-commit 钩子和 GitHub Actions 以保证质量。

**用法：**
```
/setup-ci-cd
```

### 8. `/unit-test-expand` - 测试覆盖率扩展

通过针对未测试的分支和边界情况增加测试覆盖率。

**用法：**
```
/unit-test-expand
```

## 安装

### 作为技能安装（推荐）

复制到你的技能目录：

```bash
# 创建技能目录
mkdir -p .claude/skills

# 为每个命令文件创建技能目录
for cmd in optimize pr commit; do
  mkdir -p .claude/skills/$cmd
  cp 01-slash-commands/$cmd.md .claude/skills/$cmd/SKILL.md
done
```

### 作为旧版命令安装

复制到你的命令目录：

```bash
# 项目范围（团队）
mkdir -p .claude/commands
cp 01-slash-commands/*.md .claude/commands/

# 个人使用
mkdir -p ~/.claude/commands
cp 01-slash-commands/*.md ~/.claude/commands/
```

## 创建你自己的命令

### 技能模板（推荐）

创建 `.claude/skills/my-command/SKILL.md`：

```yaml
---
name: my-command
description: What this command does. Use when [trigger conditions].
argument-hint: [optional-args]
allowed-tools: Bash(npm *), Read, Grep
---

# Command Title

## Context

- Current branch: !`git branch --show-current`
- Related files: @package.json

## Instructions

1. First step
2. Second step with argument: $ARGUMENTS
3. Third step

## Output Format

- How to format the response
- What to include
```

### 仅用户调用的命令（禁止自动调用）

对于具有副作用且 Claude 不应自动触发的命令：

```yaml
---
name: deploy
description: Deploy to production
disable-model-invocation: true
allowed-tools: Bash(npm *), Bash(git *)
---

Deploy the application to production:

1. Run tests
2. Build application
3. Push to deployment target
4. Verify deployment
```

## 最佳实践

| 推荐 | 避免 |
|------|---------|
| 使用清晰的、面向操作的名称 | 为一次性任务创建命令 |
| 在 `description` 中包含触发条件 | 在命令中构建复杂逻辑 |
| 保持命令聚焦于单一任务 | 硬编码敏感信息 |
| 对有副作用的命令使用 `disable-model-invocation` | 跳过 description 字段 |
| 使用 `!` 前缀获取动态上下文 | 假设 Claude 知道当前状态 |
| 在技能目录中组织相关文件 | 将所有内容放在一个文件中 |

## 故障排查

### 找不到命令

**解决方案：**
- 检查文件是否在 `.claude/skills/<name>/SKILL.md` 或 `.claude/commands/<name>.md`
- 验证前置元数据中的 `name` 字段是否与预期的命令名匹配
- 重启 Claude Code 会话
- 运行 `/help` 查看可用命令

### 命令未按预期执行

**解决方案：**
- 添加更具体的指令
- 在技能文件中包含示例
- 如果使用 bash 命令，检查 `allowed-tools`
- 先用简单输入测试

### 技能与命令冲突

如果两者同名，**技能优先**。删除其中一个或重命名。

## 相关指南

- **[技能](../03-skills/)** - 技能的完整参考（自动调用的能力）
- **[记忆](../02-memory/)** - 使用 CLAUDE.md 的持久化上下文
- **[子代理](../04-subagents/)** - 委托 AI 代理
- **[插件](../07-plugins/)** - 捆绑的命令集合
- **[钩子](../06-hooks/)** - 事件驱动的自动化

## 其他资源

- [官方交互模式文档](https://code.claude.com/docs/en/interactive-mode) - 内置命令参考
- [官方技能文档](https://code.claude.com/docs/en/skills) - 完整技能参考
- [命令行界面参考](https://code.claude.com/docs/en/cli-reference) - 命令行选项

---

*[Claude How To](../) 指南系列的一部分*
