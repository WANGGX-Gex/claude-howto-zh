---
name: claude-md
description: Create or update CLAUDE.md files following best practices for optimal AI agent onboarding
---

## 用户输入

```text
$ARGUMENTS
```

在继续之前，你**必须**考虑用户输入（如果非空）。用户可以指定：
- `create` - 从头创建新的 CLAUDE.md
- `update` - 改进现有的 CLAUDE.md
- `audit` - 分析并报告当前 CLAUDE.md 的质量
- 指定路径来创建/更新（如 `src/api/CLAUDE.md` 用于目录特定指令）

## 核心原则

**LLM 是无状态的**：CLAUDE.md 是唯一自动包含在每次对话中的文件。它是 AI 代理接入你代码库的首要入门文档。

### 黄金法则

1. **少即是多**：前沿 LLM 可以遵循约 150-200 条指令。Claude Code 的系统提示词已经使用了约 50 条。保持你的 CLAUDE.md 聚焦且简洁。

2. **普遍适用性**：仅包含与每次会话都相关的信息。特定任务的指令应放在单独的文件中。

3. **不要把 Claude 当代码检查工具**：风格指南会膨胀上下文并降低指令遵循度。改用确定性工具（prettier、eslint 等）。

4. **绝不自动生成**：CLAUDE.md 是 AI 工具链中杠杆率最高的点。手动精心编写。

## 执行流程

### 1. 项目分析

首先，分析当前项目状态：

1. 检查现有 CLAUDE.md 文件：
   - 根级别：`./CLAUDE.md` 或 `.claude/CLAUDE.md`
   - 目录特定：`**/CLAUDE.md`
   - 全局用户配置：`~/.claude/CLAUDE.md`

2. 识别项目结构：
   - 技术栈（语言、框架）
   - 项目类型（单体仓库、单应用、库）
   - 开发工具（包管理器、构建系统、测试运行器）

3. 审查现有文档：
   - README.md
   - CONTRIBUTING.md
   - package.json、pyproject.toml、Cargo.toml 等

### 2. 内容策略（什么、为什么、怎么做）

围绕三个维度构建 CLAUDE.md：

#### 什么 - 技术与结构
- 技术栈概览
- 项目组织（对单体仓库尤为重要）
- 关键目录及其用途

#### 为什么 - 目的与上下文
- 项目做什么
- 为什么做出某些架构决策
- 每个主要组件负责什么

#### 怎么做 - 工作流与约定
- 开发工作流（bun vs node、pip vs uv 等）
- 测试流程和命令
- 验证和构建方法
- 关键的"陷阱"或不明显的要求

### 3. 渐进式展示策略

对于较大的项目，建议创建 `agent_docs/` 文件夹：

```
agent_docs/
  |- building_the_project.md
  |- running_tests.md
  |- code_conventions.md
  |- architecture_decisions.md
```

在 CLAUDE.md 中，用指令引用这些文件：
```markdown
For detailed build instructions, refer to `agent_docs/building_the_project.md`
```

**重要**：使用 `file:line` 引用而非代码片段，以避免过时的上下文。

### 4. 质量约束

创建或更新 CLAUDE.md 时：

1. **目标长度**：不超过 300 行（理想情况下不超过 100 行）
2. **无风格规则**：移除任何代码检查/格式化指令
3. **无任务特定指令**：移至单独文件
4. **无代码片段**：使用文件引用代替
5. **无冗余信息**：不要重复 package.json 或 README 中的内容

### 5. 必要章节

结构良好的 CLAUDE.md 应包含：

```markdown
# Project Name

Brief one-line description.

## Tech Stack
- Primary language and version
- Key frameworks/libraries
- Database/storage (if any)

## Project Structure
[Only for monorepos or complex structures]
- `apps/` - Application entry points
- `packages/` - Shared libraries

## Development Commands
- Install: `command`
- Test: `command`
- Build: `command`

## Critical Conventions
[Only non-obvious, high-impact conventions]
- Convention 1 with brief explanation
- Convention 2 with brief explanation

## Known Issues / Gotchas
[Things that consistently trip up developers]
- Issue 1
- Issue 2
```

### 6. 应避免的反模式

**不要包含：**
- 代码风格准则（使用代码检查工具）
- 关于如何使用 Claude 的文档
- 对显而易见模式的长篇解释
- 复制粘贴的代码示例
- 泛泛的最佳实践（"写干净的代码"）
- 特定任务的指令
- 自动生成的内容
- 大量待办事项列表

### 7. 验证清单

定稿前验证：

- [ ] 不超过 300 行（最好不超过 100 行）
- [ ] 每一行都适用于所有会话
- [ ] 无风格/格式规则
- [ ] 无代码片段（使用文件引用）
- [ ] 命令已验证可用
- [ ] 复杂项目使用了渐进式展示
- [ ] 记录了关键的陷阱
- [ ] 与 README.md 无冗余

## 输出格式

### 对于 `create` 或默认模式：

1. 分析项目
2. 按上述结构起草 CLAUDE.md
3. 展示草稿供审查
4. 批准后写入相应位置

### 对于 `update`：

1. 读取现有 CLAUDE.md
2. 对照最佳实践审计
3. 识别：
   - 需要移除的内容（风格规则、代码片段、任务特定内容）
   - 需要精简的内容
   - 缺失的必要信息
4. 展示变更供审查
5. 批准后应用变更

### 对于 `audit`：

1. 读取现有 CLAUDE.md
2. 生成报告包含：
   - 当前行数与目标比较
   - 普遍适用内容的百分比
   - 发现的反模式列表
   - 改进建议
3. 不要修改文件，仅报告

## AGENTS.md 处理

如果用户请求创建/更新 AGENTS.md：

AGENTS.md 用于定义专门的代理行为。与 CLAUDE.md（用于项目上下文）不同，AGENTS.md 定义：
- 自定义代理角色和能力
- 代理特定的指令和约束
- 多代理场景的工作流定义

应用类似原则：
- 保持聚焦和简洁
- 使用渐进式展示
- 引用外部文档而非嵌入内容

## 注意事项

- 在包含命令之前始终验证其可用性
- 如有疑问，宁可省略——少即是多
- 系统提示告诉 Claude CLAUDE.md "可能相关也可能不相关"——噪音越多，越容易被忽略
- 单体仓库最能从清晰的"什么/为什么/怎么做"结构中受益
- 目录特定的 CLAUDE.md 文件应更加聚焦
