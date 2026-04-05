<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

# 高级功能

Claude Code 高级能力的全面指南，涵盖规划模式、扩展思考、自动模式、后台任务、权限模式（Permission Mode）、打印模式（非交互式）、会话管理、交互功能、频道、语音输入、远程控制、Web 会话、桌面应用、任务列表、提示词（Prompt）建议、Git 工作树（Worktree）、沙盒、托管设置和配置。

## 目录

1. [概述](#概述)
2. [规划模式](#规划模式)
3. [扩展思考](#扩展思考)
4. [自动模式](#自动模式)
5. [后台任务](#后台任务)
6. [定时任务](#定时任务)
7. [权限模式](#权限模式)
8. [无头模式](#无头模式)
9. [会话管理](#会话管理)
10. [交互功能](#交互功能)
11. [语音输入](#语音输入)
12. [频道](#频道)
13. [Chrome 集成](#chrome-集成)
14. [远程控制](#远程控制)
15. [Web 会话](#web-会话)
16. [桌面应用](#桌面应用)
17. [任务列表](#任务列表)
18. [提示词建议](#提示词建议)
19. [Git 工作树](#git-工作树)
20. [沙盒](#沙盒)
21. [托管设置（企业版）](#托管设置企业版)
22. [配置与设置](#配置与设置)
23. [最佳实践](#最佳实践)
24. [其他资源](#其他资源)

---

## 概述

Claude Code 的高级功能通过规划、推理、自动化和控制机制扩展了核心能力。这些功能为复杂的开发任务、代码审查、自动化和多会话管理提供了精细的工作流支持。

**关键高级功能包括：**
- **规划模式**：在编码前创建详细的实现计划
- **扩展思考**：针对复杂问题的深度推理
- **自动模式**：后台安全分类器在执行前审查每个操作（研究预览）
- **后台任务**：在不阻塞对话的情况下运行长时间操作
- **权限模式**：控制 Claude 可以做什么（`default`、`acceptEdits`、`plan`、`auto`、`dontAsk`、`bypassPermissions`）
- **打印模式**：以非交互方式运行 Claude Code，用于自动化和 CI/CD（`claude -p`）
- **会话管理**：管理多个工作会话
- **交互功能**：键盘快捷键、多行输入和命令历史
- **语音输入**：支持 20 种语言的按住说话语音输入和语音转文字
- **频道**：模型上下文协议（MCP）服务器将消息推送到运行中的会话（研究预览）
- **远程控制**：从 Claude.ai 或 Claude 应用控制 Claude Code
- **Web 会话**：在 claude.ai/code 的浏览器中运行 Claude Code
- **桌面应用**：提供可视化差异审查和多会话的独立应用
- **任务列表**：跨上下文压缩的持久化任务跟踪
- **提示词建议**：基于上下文的智能命令建议
- **Git 工作树**：用于并行工作的隔离工作树分支
- **沙盒**：操作系统级别的文件系统和网络隔离
- **托管设置**：通过 plist、注册表或托管文件进行企业部署
- **配置**：通过 JSON 配置文件自定义行为

---

## 规划模式

规划模式允许 Claude 在实现复杂任务前先进行思考，创建详细的计划供你审查和批准。

### 什么是规划模式？

规划模式是两阶段方法：
1. **规划阶段**：Claude 分析任务并创建详细的实现计划
2. **实现阶段**：批准后，Claude 执行计划

### 何时使用规划模式

✅ 适用场景：
- 复杂的多文件重构
- 新功能实现
- 架构变更
- 数据库迁移
- 重大 API 重新设计

❌ 不适用场景：
- 简单的 Bug 修复
- 格式化变更
- 单文件编辑
- 快速查询

### 激活规划模式

**斜杠命令**：
```bash
/plan 实现用户认证系统
```

**命令行界面标志**：
```bash
claude --permission-mode plan
```

**设为默认**：
```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

**键盘快捷键**：
- `Shift + Tab` - 切换权限模式（包括 plan）
- `Alt + M` - 切换权限模式（Windows/Linux）

### 规划模式的优势

- **结构化实现方法**：详细的实现步骤分解
- **审查和批准**：在执行前审查或调整计划
- **风险识别**：在实现前识别潜在问题
- **清晰的阶段**：有组织的实现阶段和里程碑

### 示例：功能实现

```
用户：/plan 添加实时通知系统

Claude：我将为实现实时通知创建一个计划。

## 实现计划

### 阶段 1：基础设施设置
1. 安装 WebSocket 库（socket.io）
2. 设置 WebSocket 服务器
3. 配置连接管理

### 阶段 2：后端实现
4. 创建通知服务
5. 实现通知队列
6. 添加通知数据库模式
7. 创建 API 端点

### 阶段 3：前端集成
8. 设置 WebSocket 客户端
9. 创建通知 UI 组件
10. 实现通知状态管理
11. 添加通知权限

### 阶段 4：测试与部署
12. 编写单元测试
13. 编写集成测试
14. 更新文档
15. 部署到预发布环境

预计时间：3-4 小时
需修改的文件：12 个
需创建的文件：8 个

准备开始？（是/否/修改计划）

用户：是

Claude：[开始按计划实现]
```

### 计划修改

```
用户：修改计划 - 暂时跳过队列，以后再添加

Claude：更新的计划：
[显示已移除队列的修改后计划]

用户：看起来不错，继续

Claude：[实现修改后的计划]
```

### 规划模式配置

规划模式通过 CLI 标志或斜杠命令激活：

```bash
# 通过 CLI 激活规划模式
claude --permission-mode plan

# 或在 REPL 内部使用 /plan 斜杠命令
/plan 实现用户认证系统
```

**规划的模型别名**：使用 `opusplan` 作为模型别名，让 Opus 负责规划、Sonnet 负责执行：

```bash
claude --model opusplan "design and implement the new API"
```

**外部编辑计划**：按 `Ctrl+G` 在外部编辑器中打开当前计划进行详细修改。

---

## 扩展思考

扩展思考允许 Claude 在提供解决方案之前花更多时间推理复杂问题。

### 什么是扩展思考？

扩展思考是一个深思熟虑的、逐步推理的过程，Claude 会：
- 分解复杂问题
- 考虑多种方案
- 评估权衡取舍
- 推理边界条件

### 激活扩展思考

**键盘快捷键**：
- `Option + T`（macOS）/ `Alt + T`（Windows/Linux）- 切换扩展思考

**自动激活**：
- 所有模型默认启用（Opus 4.6、Sonnet 4.6、Haiku 4.5）
- Opus 4.6：自适应推理，支持思考力度等级：`low`（○）、`medium`（◐）、`high`（●）、`max`（仅 Opus 4.6）
- 其他模型：固定预算，最多 31,999 个令牌（Token）

**配置方式**：
- 切换：`Alt+T` / `Option+T`，或通过 `/config`
- 查看推理：`Ctrl+O`（详细模式）
- 设置思考力度：`/effort` 命令或 `--effort` 标志

**自定义预算**：
```bash
export MAX_THINKING_TOKENS=1024
```

**思考力度等级**（仅 Opus 4.6）：
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○)、medium (◐)、high (●) 或 max（仅 Opus 4.6）
```

**CLI 标志**：
```bash
claude --effort high "complex architectural review"
```

**斜杠命令**：
```
/effort high
```

> **注意：** 提示词中的关键词 "ultrathink" 可激活深度推理模式。思考力度等级 `low`、`medium`、`high` 和 `max`（仅 Opus 4.6）控制 Claude 执行多少推理。

### 扩展思考的优势

- **深度推理**：花更多时间思考复杂问题
- **更好的架构决策**：通过全面评估做出明智的选择
- **考虑边界条件**：思考潜在的问题和场景
- **全面分析**：结构化的复杂问题解决方法

### 示例：架构决策

```
用户：/think 我们的电商平台应该用微服务还是单体架构？

Claude：让我仔细思考这个架构决策...

<extended_thinking>
## 上下文分析
- 团队规模：5 名开发者
- 预期流量：初期每日 1 万用户
- 需要扩展到 10 万+ 用户
- DevOps 资源有限
- 距 MVP 6 个月

## 方案 1：微服务
优点：
+ 独立扩展
+ 技术灵活性
+ 团队独立性
+ 故障隔离

缺点：
- 运维复杂度
- 网络开销
- 需要分布式追踪
- 需要 DevOps 专业知识
- 初始开发较慢

## 方案 2：单体架构
优点：
+ 部署更简单
+ 初始开发更快
+ 调试更容易
+ 运维开销更低
+ 单一代码库

缺点：
- 后期扩展挑战
- 全有或全无的部署
- 技术锁定
- 可能出现紧耦合

## 决策因素
1. 团队规模（5 人）→ 倾向单体
2. DevOps 资源（有限）→ 倾向单体
3. 时间线（6 个月）→ 倾向单体
4. 未来规模（10 万用户）→ 单体 + 缓存可以实现
5. 复杂度预算 → 有限

## 建议
从**模块化单体**开始：
- 单一部署单元
- 清晰的模块边界
- 模块间的简洁接口
- 为未来提取为微服务做准备

这给你带来：
✓ 快速初始开发
✓ 低运维复杂度
✓ 后续可按需提取服务
✓ 清晰的架构

迁移路径：当达到 5 万+ 用户或特定模块需要独立扩展时，将这些模块提取为微服务。
</extended_thinking>

**建议**：实现模块化单体，保持清晰的模块边界。

这种方案平衡了你当前的约束（团队规模、时间线、DevOps 资源）和未来的可扩展性需求。当有明确的业务需求时，你可以将特定模块迁移为微服务。
```

### 扩展思考配置

扩展思考通过环境变量、键盘快捷键和 CLI 标志控制：

```bash
# 设置思考令牌预算
export MAX_THINKING_TOKENS=16000

# 设置思考力度等级（仅 Opus 4.6）：low (○)、medium (◐)、high (●) 或 max（仅 Opus 4.6）
export CLAUDE_CODE_EFFORT_LEVEL=high
```

在会话中使用 `Alt+T` / `Option+T` 切换，使用 `/effort` 设置力度，或通过 `/config` 配置。

---

## 自动模式

自动模式是一个研究预览权限模式（2026 年 3 月），使用后台安全分类器在执行前审查每个操作。它允许 Claude 自主工作，同时阻止危险操作。

### 前置要求

- **套餐**：Team 套餐（Enterprise 和 API 正在推出）
- **模型**：Claude Sonnet 4.6 或 Opus 4.6
- **分类器**：运行于 Claude Sonnet 4.6（产生额外的令牌成本）

### 启用自动模式

```bash
# 通过 CLI 标志解锁自动模式
claude --enable-auto-mode

# 然后在 REPL 中通过 Shift+Tab 切换
```

或设为默认权限模式：

```bash
claude --permission-mode auto
```

通过配置设置：
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### 分类器工作原理

后台分类器按以下决策顺序评估每个操作：

1. **允许/拒绝规则** -- 首先检查显式权限规则
2. **只读/编辑自动批准** -- 文件读取和编辑自动通过
3. **分类器** -- 后台分类器审查操作
4. **回退** -- 在连续 3 次或累计 20 次阻止后回退为提示用户

### 默认阻止的操作

自动模式默认阻止以下操作：

| 阻止的操作 | 示例 |
|------------|------|
| 管道安装脚本 | `curl \| bash` |
| 外发敏感数据 | 通过网络发送 API 密钥、凭据 |
| 生产部署 | 针对生产环境的部署命令 |
| 批量删除 | 对大型目录执行 `rm -rf` |
| IAM 变更 | 权限和角色修改 |
| 强制推送到 main | `git push --force origin main` |

### 默认允许的操作

| 允许的操作 | 示例 |
|------------|------|
| 本地文件操作 | 读取、写入、编辑项目文件 |
| 声明的依赖安装 | 从清单执行 `npm install`、`pip install` |
| 只读 HTTP | 用 `curl` 获取文档 |
| 推送到当前分支 | `git push origin feature-branch` |

### 配置自动模式

**将默认规则打印为 JSON**：
```bash
claude auto-mode defaults
```

**配置可信基础设施**：通过 `autoMode.environment` 托管设置用于企业部署。这允许管理员定义可信的 CI/CD 环境、部署目标和基础设施模式。

### 回退行为

当分类器不确定时，自动模式回退为提示用户：
- **连续 3 次**分类器阻止后
- 会话中**累计 20 次**分类器阻止后

这确保当分类器无法自信地批准操作时，用户始终保有控制权。

### 模拟自动模式权限（无需 Team 套餐）

如果你没有 Team 套餐或想要一种不使用后台分类器的更简单方案，你可以在 `~/.claude/settings.json` 中预设一组保守的安全权限规则。该脚本从只读和本地检查规则开始，然后让你按需选择启用编辑、测试、本地 git 写入、包安装和 GitHub 写操作。

**文件：** `09-advanced-features/setup-auto-mode-permissions.py`

```bash
# 预览将添加的内容（不写入任何更改）
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

# 应用保守基准
python3 09-advanced-features/setup-auto-mode-permissions.py

# 仅在需要时添加更多能力
python3 09-advanced-features/setup-auto-mode-permissions.py --include-edits --include-tests
python3 09-advanced-features/setup-auto-mode-permissions.py --include-git-write --include-packages
```

该脚本在以下类别中添加规则：

| 类别 | 示例 |
|------|------|
| 核心只读工具 | `Read(*)`、`Glob(*)`、`Grep(*)`、`Agent(*)`、`WebSearch(*)`、`WebFetch(*)` |
| 本地检查 | `Bash(git status:*)`、`Bash(git log:*)`、`Bash(git diff:*)`、`Bash(cat:*)` |
| 可选编辑 | `Edit(*)`、`Write(*)`、`NotebookEdit(*)` |
| 可选测试/构建 | `Bash(pytest:*)`、`Bash(python3 -m pytest:*)`、`Bash(cargo test:*)` |
| 可选 git 写入 | `Bash(git add:*)`、`Bash(git commit:*)`、`Bash(git stash:*)` |
| Git（本地写入） | `Bash(git add:*)`、`Bash(git commit:*)`、`Bash(git checkout:*)` |
| 包管理器 | `Bash(npm install:*)`、`Bash(pip install:*)`、`Bash(cargo build:*)` |
| 构建与测试 | `Bash(make:*)`、`Bash(pytest:*)`、`Bash(go test:*)` |
| 常用 Shell | `Bash(ls:*)`、`Bash(cat:*)`、`Bash(find:*)`、`Bash(cp:*)`、`Bash(mv:*)` |
| GitHub CLI | `Bash(gh pr view:*)`、`Bash(gh pr create:*)`、`Bash(gh issue list:*)` |

危险操作（`rm -rf`、`sudo`、强制推送、`DROP TABLE`、`terraform destroy` 等）被有意排除。该脚本是幂等的 — 运行两次不会重复规则。

---

## 后台任务

后台任务允许长时间运行的操作在不阻塞对话的情况下执行。

### 什么是后台任务？

后台任务在你继续工作时异步运行：
- 长时间的测试套件
- 构建过程
- 数据库迁移
- 部署脚本
- 分析工具

**基本用法：**
```bash
用户：在后台运行测试

Claude：已启动任务 bg-1234

/task list           # 显示所有任务
/task status bg-1234 # 检查进度
/task show bg-1234   # 查看输出
/task cancel bg-1234 # 取消任务
```

### 启动后台任务

```
用户：在后台运行完整的测试套件

Claude：在后台启动测试（task-id: bg-1234）
你可以在测试运行时继续工作。

[你可以继续对话]

用户：同时，让我们重构认证模块

Claude：[在测试在后台运行时处理认证模块]

[稍后，当测试完成时]

Claude：📢 后台任务 bg-1234 已完成：
✅ 245 个测试通过
❌ 3 个测试失败
查看结果：/task show bg-1234
```

### 管理后台任务

**列出活动任务**：
```
用户：/task list

活动的后台任务：
1. [bg-1234] 正在运行测试（50% 完成，剩余 2 分钟）
2. [bg-1235] 正在构建 Docker 镜像（25% 完成，剩余 8 分钟）
3. [bg-1236] 正在部署到预发布环境（90% 完成，剩余 30 秒）
```

**检查任务状态**：
```
用户：/task status bg-1234

任务 bg-1234：正在运行测试
状态：进行中
进度：120/245 个测试（49%）
开始时间：2025-11-08 10:30:15
预计完成：2025-11-08 10:34:22
```

**查看任务输出**：
```
用户：/task show bg-1234

[显示测试运行的实时输出]
```

**取消任务**：
```
用户：/task cancel bg-1234

已取消后台任务 bg-1234
```

### 示例：并行开发

```
用户：在后台运行构建

Claude：正在启动构建...（task-id: bg-5001）

用户：同时在后台运行代码检查

Claude：正在启动代码检查...（task-id: bg-5002）

用户：在它们运行时，让我们实现新的 API 端点

Claude：[在构建和代码检查运行时实现 API 端点]

[10 分钟后]

Claude：📢 构建成功完成（bg-5001）
📢 代码检查发现 12 个问题（bg-5002）

用户：让我看看代码检查的问题

Claude：[显示 bg-5002 的代码检查输出]
```

### 配置

```json
{
  "backgroundTasks": {
    "enabled": true,
    "maxConcurrentTasks": 5,
    "notifyOnCompletion": true,
    "autoCleanup": true,
    "logOutput": true
  }
}
```

---

## 定时任务

定时任务允许你按循环计划自动运行提示词或设置一次性提醒。任务是会话范围的 — 在 Claude Code 活跃时运行，会话结束时清除。自 v2.1.72+ 可用。

### `/loop` 命令

```bash
# 显式指定间隔
/loop 5m 检查部署是否完成

# 自然语言
/loop 每 30 分钟检查一次构建状态
```

标准的 5 字段 cron 表达式也受支持，用于精确调度。

### 一次性提醒

设置只触发一次的提醒：

```
下午 3 点提醒我推送发布分支
45 分钟后，运行集成测试
```

### 管理定时任务

| 工具 | 描述 |
|------|------|
| `CronCreate` | 创建新的定时任务 |
| `CronList` | 列出所有活动的定时任务 |
| `CronDelete` | 移除定时任务 |

**限制和行为**：
- 每个会话最多 **50 个定时任务**
- 会话范围 — 会话结束时清除
- 循环任务在 **3 天**后自动过期
- 任务仅在 Claude Code 运行时触发 — 错过的触发不会补执行

### 行为细节

| 方面 | 详情 |
|------|------|
| **循环抖动** | 最多为间隔的 10%（最大 15 分钟） |
| **一次性抖动** | 在 :00/:30 边界最多 90 秒 |
| **错过的触发** | 不补执行 — 如果 Claude Code 未运行则跳过 |
| **持久化** | 不跨重启持久化 |

### 云端定时任务

使用 `/schedule` 创建在 Anthropic 基础设施上运行的云端定时任务：

```
/schedule 每天上午 9 点运行测试套件并报告失败
```

云端定时任务跨重启持久化，不需要 Claude Code 在本地运行。

### 禁用定时任务

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

### 示例：监控部署

```
/loop 5m 检查预发布环境的部署状态。
        如果部署成功，通知我并停止循环。
        如果失败，显示错误日志。
```

> **提示**：定时任务是会话范围的。对于需要在重启后持续的自动化，请改用 CI/CD 流水线、GitHub Actions 或桌面应用定时任务。

---

## 权限模式

权限模式控制 Claude 可以在无需显式批准的情况下执行哪些操作。

### 可用的权限模式

| 模式 | 行为 |
|------|------|
| `default` | 仅读取文件；所有其他操作需要提示 |
| `acceptEdits` | 读取和编辑文件；命令需要提示 |
| `plan` | 仅读取文件（研究模式，不编辑） |
| `auto` | 所有操作经后台安全分类器检查（研究预览） |
| `bypassPermissions` | 所有操作，不检查权限（危险） |
| `dontAsk` | 仅预批准的工具执行；其他全部拒绝 |

在 CLI 中用 `Shift+Tab` 循环切换模式。通过 `--permission-mode` 标志或 `permissions.defaultMode` 设置默认值。

### 激活方式

**键盘快捷键**：
```bash
Shift + Tab  # 循环切换所有 6 种模式
```

**斜杠命令**：
```bash
/plan                  # 进入规划模式
```

**CLI 标志**：
```bash
claude --permission-mode plan
claude --permission-mode auto
```

**设置**：
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### 权限模式示例

#### 默认模式
Claude 在执行重要操作前请求确认：

```
用户：修复 auth.ts 中的 bug

Claude：我需要修改 src/auth.ts 来修复 bug。
更改将更新密码验证逻辑。

批准此更改？（是/否/显示）
```

#### 规划模式
在执行前审查实现计划：

```
用户：/plan 实现用户认证系统

Claude：我将为实现认证创建一个计划。

## 实现计划
[带阶段和步骤的详细计划]

准备开始？（是/否/修改）
```

#### 接受编辑模式
自动接受文件修改：

```
用户：acceptEdits
用户：修复 auth.ts 中的 bug

Claude：[直接进行更改，无需询问]
```

### 使用场景

**代码审查**：
```
用户：claude --permission-mode plan
用户：审查这个 PR 并提出改进建议

Claude：[读取代码，提供反馈，但无法修改]
```

**结对编程**：
```
用户：claude --permission-mode default
用户：让我们一起实现这个功能

Claude：[每次更改前请求批准]
```

**自动化任务**：
```
用户：claude --permission-mode acceptEdits
用户：修复代码库中所有的代码检查问题

Claude：[自动接受文件编辑，无需询问]
```

---

## 无头模式

打印模式（`claude -p`）允许 Claude Code 无需交互式输入即可运行，非常适合自动化和 CI/CD。这是非交互式模式，替代了旧的 `--headless` 标志。

### 什么是打印模式？

打印模式实现：
- 自动化脚本执行
- CI/CD 集成
- 批量处理
- 定时任务

### 在打印模式下运行（非交互式）

```bash
# 运行特定任务
claude -p "Run all tests"

# 处理管道内容
cat error.log | claude -p "Analyze these errors"

# CI/CD 集成（GitHub Actions）
- name: AI Code Review
  run: claude -p "Review PR"
```

### 更多打印模式使用示例

```bash
# 运行特定任务并捕获输出
claude -p "Run all tests and generate coverage report"

# 使用结构化输出
claude -p --output-format json "Analyze code quality"

# 从标准输入获取输入
echo "Analyze code quality" | claude -p "explain this"
```

### 示例：CI/CD 集成

**GitHub Actions**：
```yaml
# .github/workflows/code-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p --output-format json \
            --max-turns 3 \
            "Review this PR for:
            - Code quality issues
            - Security vulnerabilities
            - Performance concerns
            - Test coverage
            Output results as JSON" > review.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = JSON.parse(fs.readFileSync('review.json', 'utf8'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: JSON.stringify(review, null, 2)
            });
```

### 打印模式配置

打印模式（`claude -p`）支持多个自动化标志：

```bash
# 限制自主轮次
claude -p --max-turns 5 "refactor this module"

# 结构化 JSON 输出
claude -p --output-format json "analyze this codebase"

# 带模式验证
claude -p --json-schema '{"type":"object","properties":{"issues":{"type":"array"}}}' \
  "find bugs in this code"

# 禁用会话持久化
claude -p --no-session-persistence "one-off analysis"
```

---

## 会话管理

高效管理多个 Claude Code 会话。

### 会话管理命令

| 命令 | 描述 |
|------|------|
| `/resume` | 通过 ID 或名称恢复对话 |
| `/rename` | 为当前会话命名 |
| `/fork` | 将当前会话分叉为新分支 |
| `claude -c` | 继续最近的对话 |
| `claude -r "session"` | 通过名称或 ID 恢复会话 |

### 恢复会话

**继续上次对话**：
```bash
claude -c
```

**恢复已命名的会话**：
```bash
claude -r "auth-refactor" "finish this PR"
```

**重命名当前会话**（在 REPL 内部）：
```
/rename auth-refactor
```

### 分叉会话

分叉会话以尝试替代方案而不丢失原始内容：

```
/fork
```

或从 CLI：
```bash
claude --resume auth-refactor --fork-session "try OAuth instead"
```

### 会话持久化

会话自动保存，可以恢复：

```bash
# 继续上次对话
claude -c

# 通过名称或 ID 恢复特定会话
claude -r "auth-refactor"

# 恢复并分叉以进行实验
claude --resume auth-refactor --fork-session "alternative approach"
```

---

## 交互功能

### 键盘快捷键

Claude Code 支持键盘快捷键以提高效率。以下是官方文档的完整参考：

| 快捷键 | 描述 |
|--------|------|
| `Ctrl+C` | 取消当前输入/生成 |
| `Ctrl+D` | 退出 Claude Code |
| `Ctrl+G` | 在外部编辑器中编辑计划 |
| `Ctrl+L` | 清除终端屏幕 |
| `Ctrl+O` | 切换详细输出（查看推理） |
| `Ctrl+R` | 反向搜索历史 |
| `Ctrl+T` | 切换任务列表视图 |
| `Ctrl+B` | 后台运行任务 |
| `Esc+Esc` | 回退代码/对话 |
| `Shift+Tab` / `Alt+M` | 切换权限模式 |
| `Option+P` / `Alt+P` | 切换模型 |
| `Option+T` / `Alt+T` | 切换扩展思考 |

**行编辑（标准 readline 快捷键）：**

| 快捷键 | 操作 |
|--------|------|
| `Ctrl + A` | 移动到行首 |
| `Ctrl + E` | 移动到行尾 |
| `Ctrl + K` | 剪切到行尾 |
| `Ctrl + U` | 剪切到行首 |
| `Ctrl + W` | 向后删除一个词 |
| `Ctrl + Y` | 粘贴（yank） |
| `Tab` | 自动补全 |
| `↑ / ↓` | 命令历史 |

### 自定义快捷键绑定

通过运行 `/keybindings` 创建自定义键盘快捷键，这将打开 `~/.claude/keybindings.json` 供编辑（v2.1.18+）。

**配置格式**：

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null,
        "ctrl+k ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Confirmation",
      "bindings": {
        "ctrl+a": "confirmation:yes"
      }
    }
  ]
}
```

将绑定设为 `null` 以取消默认快捷键。

### 可用上下文

快捷键绑定限定在特定的 UI 上下文中：

| 上下文 | 关键操作 |
|--------|----------|
| **Chat** | `submit`、`cancel`、`cycleMode`、`modelPicker`、`thinkingToggle`、`undo`、`externalEditor`、`stash`、`imagePaste` |
| **Confirmation** | `yes`、`no`、`previous`、`next`、`nextField`、`cycleMode`、`toggleExplanation` |
| **Global** | `interrupt`、`exit`、`toggleTodos`、`toggleTranscript` |
| **Autocomplete** | `accept`、`dismiss`、`next`、`previous` |
| **HistorySearch** | `search`、`previous`、`next` |
| **Settings** | 特定上下文的设置导航 |
| **Tabs** | 标签页切换和管理 |
| **Help** | 帮助面板导航 |

共有 18 个上下文，包括 `Transcript`、`Task`、`ThemePicker`、`Attachments`、`Footer`、`MessageSelector`、`DiffDialog`、`ModelPicker` 和 `Select`。

### 和弦支持

快捷键绑定支持和弦序列（多键组合）：

```
"ctrl+k ctrl+s"   → 两键序列：按 ctrl+k，然后按 ctrl+s
"ctrl+shift+p"    → 同时按修饰键
```

**按键语法**：
- **修饰键**：`ctrl`、`alt`（或 `opt`）、`shift`、`meta`（或 `cmd`）
- **大写字母隐含 Shift**：`K` 等同于 `shift+k`
- **特殊键**：`escape`、`enter`、`return`、`tab`、`space`、`backspace`、`delete`、方向键

### 保留键和冲突键

| 键 | 状态 | 说明 |
|----|------|------|
| `Ctrl+C` | 保留 | 不能重新绑定（中断） |
| `Ctrl+D` | 保留 | 不能重新绑定（退出） |
| `Ctrl+B` | 终端冲突 | tmux 前缀键 |
| `Ctrl+A` | 终端冲突 | GNU Screen 前缀键 |
| `Ctrl+Z` | 终端冲突 | 进程挂起 |

> **提示**：如果快捷键不工作，请检查是否与你的终端模拟器或多路复用器冲突。

### Tab 补全

Claude Code 提供智能 Tab 补全：

```
用户：/rew<TAB>
→ /rewind

用户：/plu<TAB>
→ /plugin

用户：/plugin <TAB>
→ /plugin install
→ /plugin enable
→ /plugin disable
```

### 命令历史

访问之前的命令：

```
用户：<↑>  # 上一条命令
用户：<↓>  # 下一条命令
用户：Ctrl+R  # 搜索历史

(reverse-i-search)`test': run all tests
```

### 多行输入

对于复杂查询，使用多行模式：

```bash
用户：\
> 跨越多行的
> 长复杂提示词
> \end
```

**示例：**

```
用户：\
> 实现一个用户认证系统
> 包含以下需求：
> - JWT 令牌
> - 邮箱验证
> - 密码重置
> - 双因素认证支持
> \end

Claude：[处理多行请求]
```

### 行内编辑

发送前编辑命令：

```
用户：Deploy to prodcution<Backspace><Backspace>uction

[发送前就地编辑]
```

### Vim 模式

启用 Vi/Vim 键绑定进行文本编辑：

**激活**：
- 使用 `/vim` 命令或 `/config` 启用
- 模式切换：`Esc` 进入 NORMAL 模式，`i/a/o` 进入 INSERT 模式

**导航键**：
- `h` / `l` - 左/右移动
- `j` / `k` - 下/上移动
- `w` / `b` / `e` - 按词移动
- `0` / `$` - 移动到行首/行尾
- `gg` / `G` - 跳到文本开头/结尾

**文本对象**：
- `iw` / `aw` - 词内/词周围
- `i"` / `a"` - 引号内/引号周围
- `i(` / `a(` - 括号内/括号周围

### Bash 模式

使用 `!` 前缀直接执行 Shell 命令：

```bash
! npm test
! git status
! cat src/index.js
```

用于快速命令执行而无需切换上下文。

---

## 语音输入

语音输入为 Claude Code 提供按住说话的语音输入功能，允许你用语音而非打字来输入提示词。

### 激活语音输入

```
/voice
```

### 功能

| 功能 | 描述 |
|------|------|
| **按住说话** | 按住键录音，松开发送 |
| **20 种语言** | 语音转文字支持 20 种语言 |
| **自定义按键绑定** | 通过 `/keybindings` 配置按住说话的按键 |
| **账户要求** | 需要 Claude.ai 账户用于语音转文字处理 |

### 配置

在快捷键绑定文件（`/keybindings`）中自定义按住说话的按键绑定。语音输入使用你的 Claude.ai 账户进行语音转文字处理。

---

## 频道

频道（研究预览）允许 MCP 服务器将消息推送到运行中的 Claude Code 会话，实现与外部服务的实时集成。

### 订阅频道

```bash
# 启动时订阅频道插件
claude --channels discord,telegram
```

### 支持的集成

| 集成 | 描述 |
|------|------|
| **Discord** | 在会话中接收和回复 Discord 消息 |
| **Telegram** | 在会话中接收和回复 Telegram 消息 |

### 配置

**企业部署的托管设置**：

```json
{
  "allowedChannelPlugins": ["discord", "telegram"]
}
```

`allowedChannelPlugins` 托管设置控制组织中允许使用哪些频道插件。

### 工作原理

1. MCP 服务器作为频道插件连接到外部服务
2. 传入的消息被推送到活跃的 Claude Code 会话
3. Claude 可以在会话上下文中读取和回复消息
4. 频道插件必须通过 `allowedChannelPlugins` 托管设置批准

---

## Chrome 集成

Chrome 集成将 Claude Code 连接到你的 Chrome 或 Microsoft Edge 浏览器，用于实时 Web 自动化和调试。这是一个 Beta 功能，自 v2.0.73+ 可用（Edge 支持在 v1.0.36+ 添加）。

### 启用 Chrome 集成

**启动时**：

```bash
claude --chrome      # 启用 Chrome 连接
claude --no-chrome   # 禁用 Chrome 连接
```

**在会话中**：

```
/chrome
```

选择"默认启用"以在所有未来会话中激活 Chrome 集成。Claude Code 共享你的浏览器登录状态，因此它可以与已认证的 Web 应用交互。

### 能力

| 能力 | 描述 |
|------|------|
| **实时调试** | 读取控制台日志、检查 DOM 元素、实时调试 JavaScript |
| **设计验证** | 将渲染的页面与设计稿进行比较 |
| **表单验证** | 测试表单提交、输入验证和错误处理 |
| **Web 应用测试** | 与已认证的应用交互（Gmail、Google Docs、Notion 等） |
| **数据提取** | 从网页中抓取和处理内容 |
| **会话录制** | 将浏览器交互录制为 GIF 文件 |

### 站点级权限

Chrome 扩展管理每个站点的访问权限。随时通过扩展弹出窗口授予或撤销特定站点的访问权限。Claude Code 只与你明确允许的站点交互。

### 工作原理

Claude Code 在可见窗口中控制浏览器 — 你可以实时观看操作。当浏览器遇到登录页面或验证码时，Claude 会暂停并等待你手动处理后再继续。

### 已知限制

- **浏览器支持**：仅支持 Chrome 和 Edge — 不支持 Brave、Arc 和其他 Chromium 浏览器
- **WSL**：在 Windows Subsystem for Linux 中不可用
- **第三方提供商**：不支持 Bedrock、Vertex 或 Foundry API 提供商
- **Service Worker 空闲**：在长时间会话中 Chrome 扩展的 Service Worker 可能会进入空闲状态

> **提示**：Chrome 集成是 Beta 功能。浏览器支持可能在未来版本中扩展。

---

## 远程控制

远程控制允许你从手机、平板或任何浏览器继续本地运行的 Claude Code 会话。你的本地会话继续在你的机器上运行 — 不会迁移到云端。适用于 Pro、Max、Team 和 Enterprise 套餐（v2.1.51+）。

### 启动远程控制

**从 CLI**：

```bash
# 使用默认会话名称启动
claude remote-control

# 使用自定义名称启动
claude remote-control --name "Auth Refactor"
```

**从会话内部**：

```
/remote-control
/remote-control "Auth Refactor"
```

**可用标志**：

| 标志 | 描述 |
|------|------|
| `--name "title"` | 自定义会话标题，便于识别 |
| `--verbose` | 显示详细的连接日志 |
| `--sandbox` | 启用文件系统和网络隔离 |
| `--no-sandbox` | 禁用沙盒（默认） |

### 连接到会话

从另一个设备连接的三种方式：

1. **会话 URL** — 会话启动时打印在终端；在任何浏览器中打开
2. **二维码** — 启动后按空格键显示可扫描的二维码
3. **按名称查找** — 在 claude.ai/code 或 Claude 移动应用（iOS/Android）中浏览你的会话

### 安全性

- 你的机器上**不开放入站端口**
- **仅出站 HTTPS**，使用 TLS
- **范围凭据** — 多个短期、窄范围的令牌
- **会话隔离** — 每个远程会话是独立的

### 远程控制 vs Web 版 Claude Code

| 方面 | 远程控制 | Web 版 Claude Code |
|------|----------|-------------------|
| **执行位置** | 在你的机器上运行 | 在 Anthropic 云端运行 |
| **本地工具** | 完全访问本地 MCP 服务器、文件和 CLI | 无本地依赖 |
| **使用场景** | 从另一个设备继续本地工作 | 从任何浏览器全新开始 |

### 限制

- 每个 Claude Code 实例一个远程会话
- 终端必须在主机上保持打开
- 网络不可达约 10 分钟后会话超时

### 使用场景

- 不在桌前时从移动设备或平板控制 Claude Code
- 使用更丰富的 claude.ai UI 同时保持本地工具执行
- 在外出时使用完整的本地开发环境进行快速代码审查

---

## Web 会话

Web 会话允许你直接在 claude.ai/code 的浏览器中运行 Claude Code，或从 CLI 创建 Web 会话。

### 创建 Web 会话

```bash
# 从 CLI 创建新的 Web 会话
claude --remote "implement the new API endpoints"
```

这会在 claude.ai 上启动一个 Claude Code 会话，你可以从任何浏览器访问。

### 在本地恢复 Web 会话

如果你在 Web 上启动了会话并想在本地继续：

```bash
# 在本地终端恢复 Web 会话
claude --teleport
```

或在交互式 REPL 中：
```
/teleport
```

### 使用场景

- 在一台机器上开始工作，在另一台上继续
- 与团队成员共享会话 URL
- 使用 Web UI 进行可视化差异审查，然后切换到终端执行

---

## 桌面应用

Claude Code 桌面应用提供独立应用程序，具有可视化差异审查、并行会话和集成连接器。适用于 macOS 和 Windows（Pro、Max、Team 和 Enterprise 套餐）。

### 安装

从 [claude.ai](https://claude.ai) 下载适用于你平台的版本：
- **macOS**：Universal 构建（Apple Silicon 和 Intel）
- **Windows**：提供 x64 和 ARM64 安装程序

查看[桌面快速入门](https://code.claude.com/docs/en/desktop-quickstart)获取设置说明。

### 从 CLI 交接

将当前 CLI 会话转移到桌面应用：

```
/desktop
```

### 核心功能

| 功能 | 描述 |
|------|------|
| **差异视图** | 逐文件可视化审查，带行内评论；Claude 读取评论并修订 |
| **应用预览** | 自动启动开发服务器，内嵌浏览器用于实时验证 |
| **PR 监控** | GitHub CLI 集成，自动修复 CI 失败并在检查通过时自动合并 |
| **并行会话** | 侧边栏中的多个会话，自动 Git 工作树隔离 |
| **定时任务** | 循环任务（每小时、每天、工作日、每周），在应用打开时运行 |
| **富渲染** | 代码、Markdown 和图表渲染，带语法高亮 |

### 应用预览配置

在 `.claude/launch.json` 中配置开发服务器行为：

```json
{
  "command": "npm run dev",
  "port": 3000,
  "readyPattern": "ready on",
  "persistCookies": true
}
```

### 连接器

连接外部服务以获得更丰富的上下文：

| 连接器 | 能力 |
|--------|------|
| **GitHub** | PR 监控、问题跟踪、代码审查 |
| **Slack** | 通知、频道上下文 |
| **Linear** | 问题跟踪、冲刺管理 |
| **Notion** | 文档、知识库访问 |
| **Asana** | 任务管理、项目跟踪 |
| **Calendar** | 日程感知、会议上下文 |

> **注意**：连接器不适用于远程（云端）会话。

### 远程和 SSH 会话

- **远程会话**：在 Anthropic 云端基础设施上运行；即使应用关闭也会继续。可从 claude.ai/code 或 Claude 移动应用访问
- **SSH 会话**：通过 SSH 连接到远程机器，完全访问远程文件系统和工具。Claude Code 必须安装在远程机器上

### 桌面应用中的权限模式

桌面应用支持与 CLI 相同的 4 种权限模式：

| 模式 | 行为 |
|------|------|
| **请求权限**（默认） | 审查和批准每次编辑和命令 |
| **自动接受编辑** | 文件编辑自动批准；命令需要手动批准 |
| **规划模式** | 在进行任何更改前审查方案 |
| **绕过权限** | 自动执行（仅限沙盒，管理员控制） |

### 企业功能

- **管理控制台**：为组织控制 Code 标签页访问和权限设置
- **MDM 部署**：在 macOS 上通过 MDM 或在 Windows 上通过 MSIX 部署
- **SSO 集成**：要求组织成员使用单点登录
- **托管设置**：集中管理团队配置和模型可用性

---

## 任务列表

任务列表功能提供持久化的任务跟踪，在上下文压缩（对话历史被修剪以适应上下文窗口时）后仍然保留。

### 切换任务列表

在会话中按 `Ctrl+T` 切换任务列表视图的显示和隐藏。

### 持久化任务

任务在上下文压缩后持久保留，确保长时间运行的工作项不会在对话上下文被修剪时丢失。这对于复杂的多步骤实现特别有用。

### 命名任务目录

使用 `CLAUDE_CODE_TASK_LIST_ID` 环境变量创建跨会话共享的命名任务目录：

```bash
export CLAUDE_CODE_TASK_LIST_ID=my-project-sprint-3
```

这允许多个会话共享同一个任务列表，适用于团队工作流或多会话项目。

---

## 提示词建议

提示词建议根据你的 git 历史和当前对话上下文显示灰色的示例命令。

### 工作原理

- 建议以灰色文本显示在输入提示词下方
- 按 `Tab` 接受建议
- 按 `Enter` 接受并立即提交
- 建议具有上下文感知能力，从 git 历史和对话状态中提取

### 禁用提示词建议

```bash
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
```

---

## Git 工作树

Git 工作树允许你在隔离的工作树中启动 Claude Code，实现在不同分支上并行工作，无需暂存或切换。

### 在工作树中启动

```bash
# 在隔离的工作树中启动 Claude Code
claude --worktree
# 或
claude -w
```

### 工作树位置

工作树创建在：
```
<repo>/.claude/worktrees/<name>
```

### 单仓库的稀疏检出

使用 `worktree.sparsePaths` 设置在单仓库中执行稀疏检出，减少磁盘使用和克隆时间：

```json
{
  "worktree": {
    "sparsePaths": ["packages/my-package", "shared/"]
  }
}
```

### 工作树工具和钩子

| 项目 | 描述 |
|------|------|
| `ExitWorktree` | 退出并清理当前工作树的工具 |
| `WorktreeCreate` | 工作树创建时触发的钩子事件 |
| `WorktreeRemove` | 工作树移除时触发的钩子事件 |

### 自动清理

如果在工作树中没有进行任何更改，会话结束时会自动清理。

### 使用场景

- 在功能分支上工作，同时保持主分支不受影响
- 在隔离环境中运行测试而不影响工作目录
- 在可丢弃的环境中尝试实验性更改
- 在单仓库中稀疏检出特定包以加快启动

---

## 沙盒

沙盒为 Claude Code 执行的 Bash 命令提供操作系统级别的文件系统和网络隔离。这是权限规则的补充，提供额外的安全层。

### 启用沙盒

**斜杠命令**：
```
/sandbox
```

**CLI 标志**：
```bash
claude --sandbox       # 启用沙盒
claude --no-sandbox    # 禁用沙盒
```

### 配置设置

| 设置 | 描述 |
|------|------|
| `sandbox.enabled` | 启用或禁用沙盒 |
| `sandbox.failIfUnavailable` | 如果无法激活沙盒则失败 |
| `sandbox.filesystem.allowWrite` | 允许写入访问的路径 |
| `sandbox.filesystem.allowRead` | 允许读取访问的路径 |
| `sandbox.filesystem.denyRead` | 拒绝读取访问的路径 |
| `sandbox.enableWeakerNetworkIsolation` | 在 macOS 上启用较弱的网络隔离 |

### 配置示例

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "filesystem": {
      "allowWrite": ["/Users/me/project"],
      "allowRead": ["/Users/me/project", "/usr/local/lib"],
      "denyRead": ["/Users/me/.ssh", "/Users/me/.aws"]
    },
    "enableWeakerNetworkIsolation": true
  }
}
```

### 工作原理

- Bash 命令在具有受限文件系统访问的沙盒环境中运行
- 可以隔离网络访问以防止意外的外部连接
- 与权限规则配合工作，实现纵深防御
- 在 macOS 上，使用 `sandbox.enableWeakerNetworkIsolation` 进行网络限制（macOS 上不支持完全网络隔离）

### 使用场景

- 安全地运行不受信任的或生成的代码
- 防止意外修改项目外的文件
- 在自动化任务期间限制网络访问

---

## 托管设置（企业版）

托管设置使企业管理员能够使用平台原生管理工具在组织范围内部署 Claude Code 配置。

### 部署方式

| 平台 | 方式 | 可用版本 |
|------|------|----------|
| macOS | 托管 plist 文件（MDM） | v2.1.51+ |
| Windows | Windows 注册表 | v2.1.51+ |
| 跨平台 | 托管配置文件 | v2.1.51+ |
| 跨平台 | 托管 drop-in（`managed-settings.d/` 目录） | v2.1.83+ |

### 托管 Drop-in

自 v2.1.83 起，管理员可以将多个托管设置文件部署到 `managed-settings.d/` 目录。文件按字母顺序合并，允许跨团队的模块化配置：

```
~/.claude/managed-settings.d/
  00-org-defaults.json
  10-team-policies.json
  20-project-overrides.json
```

### 可用的托管设置

| 设置 | 描述 |
|------|------|
| `disableBypassPermissionsMode` | 防止用户启用绕过权限模式 |
| `availableModels` | 限制用户可以选择的模型 |
| `allowedChannelPlugins` | 控制允许使用哪些频道插件 |
| `autoMode.environment` | 为自动模式配置可信基础设施 |
| 自定义策略 | 组织特定的权限和工具策略 |

### 示例：macOS Plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>disableBypassPermissionsMode</key>
  <true/>
  <key>availableModels</key>
  <array>
    <string>claude-sonnet-4-6</string>
    <string>claude-haiku-4-5</string>
  </array>
</dict>
</plist>
```

---

## 配置与设置

### 配置文件位置

1. **全局配置**：`~/.claude/config.json`
2. **项目配置**：`./.claude/config.json`
3. **用户配置**：`~/.config/claude-code/settings.json`

### 完整配置示例

**核心高级功能配置：**

```json
{
  "permissions": {
    "mode": "default"
  },
  "hooks": {
    "PreToolUse:Edit": "eslint --fix ${file_path}",
    "PostToolUse:Write": "~/.claude/hooks/security-scan.sh"
  },
  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

**扩展配置示例：**

```json
{
  "permissions": {
    "mode": "default",
    "allowedTools": ["Bash(git log:*)", "Read"],
    "disallowedTools": ["Bash(rm -rf:*)"]
  },

  "hooks": {
    "PreToolUse": [{ "matcher": "Edit", "hooks": ["eslint --fix ${file_path}"] }],
    "PostToolUse": [{ "matcher": "Write", "hooks": ["~/.claude/hooks/security-scan.sh"] }],
    "Stop": [{ "hooks": ["~/.claude/hooks/notify.sh"] }]
  },

  "mcp": {
    "enabled": true,
    "servers": {
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

### 环境变量

通过环境变量覆盖配置：

```bash
# 模型选择
export ANTHROPIC_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-6
export ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
export ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5

# API 配置
export ANTHROPIC_API_KEY=sk-ant-...

# 思考配置
export MAX_THINKING_TOKENS=16000
export CLAUDE_CODE_EFFORT_LEVEL=high

# 功能开关
export CLAUDE_CODE_DISABLE_AUTO_MEMORY=true
export CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=true
export CLAUDE_CODE_DISABLE_CRON=1
export CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=true
export CLAUDE_CODE_DISABLE_TERMINAL_TITLE=true
export CLAUDE_CODE_DISABLE_1M_CONTEXT=true
export CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=true
export CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false
export CLAUDE_CODE_ENABLE_TASKS=true
export CLAUDE_CODE_SIMPLE=true              # 由 --bare 标志设置

# MCP 配置
export MAX_MCP_OUTPUT_TOKENS=50000
export ENABLE_TOOL_SEARCH=true

# 任务管理
export CLAUDE_CODE_TASK_LIST_ID=my-project-tasks

# 代理团队（实验性）
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=true

# 子代理和插件配置
export CLAUDE_CODE_SUBAGENT_MODEL=sonnet
export CLAUDE_CODE_PLUGIN_SEED_DIR=./my-plugins
export CLAUDE_CODE_NEW_INIT=true

# 子进程和流式传输
export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB="SECRET_KEY,DB_PASSWORD"
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=30000
export ANTHROPIC_CUSTOM_MODEL_OPTION=my-custom-model
export SLASH_COMMAND_TOOL_CHAR_BUDGET=50000
```

### 配置管理命令

```
用户：/config
[打开交互式配置菜单]
```

`/config` 命令提供交互式菜单来切换设置，例如：
- 扩展思考开/关
- 详细输出
- 权限模式
- 模型选择

### 按项目配置

在项目中创建 `.claude/config.json`：

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": ["npm test && npm run lint"] }]
  },
  "permissions": {
    "mode": "default"
  },
  "mcp": {
    "servers": {
      "project-db": {
        "command": "mcp-postgres",
        "env": {
          "DATABASE_URL": "${PROJECT_DB_URL}"
        }
      }
    }
  }
}
```

---

## 最佳实践

### 规划模式
- ✅ 用于复杂的多步骤任务
- ✅ 在批准前审查计划
- ✅ 需要时修改计划
- ❌ 不要用于简单任务

### 扩展思考
- ✅ 用于架构决策
- ✅ 用于复杂问题求解
- ✅ 审查思考过程
- ❌ 不要用于简单查询

### 后台任务
- ✅ 用于长时间运行的操作
- ✅ 监控任务进度
- ✅ 优雅地处理任务失败
- ❌ 不要启动过多的并发任务

### 权限
- ✅ 使用 `plan` 进行代码审查（只读）
- ✅ 使用 `default` 进行交互式开发
- ✅ 使用 `acceptEdits` 进行自动化工作流
- ✅ 使用 `auto` 进行带安全护栏的自主工作
- ❌ 除非绝对必要，不要使用 `bypassPermissions`

### 会话
- ✅ 为不同任务使用不同的会话
- ✅ 保存重要的会话状态
- ✅ 清理旧会话
- ❌ 不要在一个会话中混合不相关的工作

---

## 其他资源

有关 Claude Code 和相关功能的更多信息：

- [官方交互模式文档](https://code.claude.com/docs/en/interactive-mode)
- [官方无头模式文档](https://code.claude.com/docs/en/headless)
- [CLI 参考](https://code.claude.com/docs/en/cli-reference)
- [检查点指南](../08-checkpoints/) - 会话管理和回退
- [斜杠命令](../01-slash-commands/) - 命令参考
- [记忆指南](../02-memory/) - 持久化上下文
- [技能指南](../03-skills/) - 自主能力
- [子代理指南](../04-subagents/) - 委派任务执行
- [MCP 指南](../05-mcp/) - 外部数据访问
- [钩子指南](../06-hooks/) - 事件驱动的自动化
- [插件指南](../07-plugins/) - 捆绑的扩展
- [官方定时任务文档](https://code.claude.com/docs/en/scheduled-tasks)
- [官方 Chrome 集成文档](https://code.claude.com/docs/en/chrome)
- [官方远程控制文档](https://code.claude.com/docs/en/remote-control)
- [官方快捷键绑定文档](https://code.claude.com/docs/en/keybindings)
- [官方桌面应用文档](https://code.claude.com/docs/en/desktop)
