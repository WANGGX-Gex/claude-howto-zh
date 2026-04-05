<picture>
  <source media="(prefers-color-scheme: dark)" srcset="resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="resources/logos/claude-howto-logo.svg">
</picture>

# Claude Code 示例 - 快速参考卡片

## 安装快速命令

### 斜杠命令（Slash Command）
```bash
# 安装全部
cp 01-slash-commands/*.md .claude/commands/

# 安装特定命令
cp 01-slash-commands/optimize.md .claude/commands/
```

### 记忆（Memory）
```bash
# 项目记忆
cp 02-memory/project-CLAUDE.md ./CLAUDE.md

# 个人记忆
cp 02-memory/personal-CLAUDE.md ~/.claude/CLAUDE.md
```

### 技能（Skill）
```bash
# 个人技能
cp -r 03-skills/code-review ~/.claude/skills/

# 项目技能
cp -r 03-skills/code-review .claude/skills/
```

### 子代理（Subagent）
```bash
# 安装全部
cp 04-subagents/*.md .claude/agents/

# 安装特定代理
cp 04-subagents/code-reviewer.md .claude/agents/
```

### MCP
```bash
# 设置凭据
export GITHUB_TOKEN="your_token"
export DATABASE_URL="postgresql://..."

# 安装配置（项目级）
cp 05-mcp/github-mcp.json .mcp.json

# 或用户级: 添加到 ~/.claude.json
```

### 钩子（Hook）
```bash
# 安装钩子
mkdir -p ~/.claude/hooks
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh

# 在设置中配置（~/.claude/settings.json）
```

### 插件（Plugin）
```bash
# 从示例安装（如果已发布）
/plugin install pr-review
/plugin install devops-automation
/plugin install documentation
```

### 检查点（Checkpoint）
```bash
# 检查点在每次用户提示时自动创建
# 要回退，按两次 Esc 或使用：
/rewind

# 然后选择: 恢复代码和对话、恢复对话、
# 恢复代码、从此处总结、或取消
```

### 高级功能
```bash
# 在设置中配置（.claude/settings.json）
# 参见 09-advanced-features/config-examples.json

# 规划模式
/plan Task description

# 权限模式（Permission Mode）（使用 --permission-mode 标志）
# default        - 对风险操作请求批准
# acceptEdits    - 自动接受文件编辑，其他操作需询问
# plan           - 只读分析，不做修改
# dontAsk        - 接受所有操作，除了风险操作
# auto           - 后台分类器自动决定权限
# bypassPermissions - 全部接受（需要 --dangerously-skip-permissions）

# 会话管理
/resume                # 恢复之前的对话
/rename "name"         # 为当前会话命名
/fork                  # 分叉当前会话
claude -c              # 继续最近的对话
claude -r "session"    # 按名称/ID 恢复会话
```

---

## 功能速查表

| 功能 | 安装路径 | 使用方式 |
|------|---------|---------|
| **斜杠命令 (55+)** | `.claude/commands/*.md` | `/command-name` |
| **记忆** | `./CLAUDE.md` | 自动加载 |
| **技能** | `.claude/skills/*/SKILL.md` | 自动调用 |
| **子代理** | `.claude/agents/*.md` | 自动委派 |
| **MCP** | `.mcp.json`（项目级）或 `~/.claude.json`（用户级） | `/mcp__server__action` |
| **钩子 (25 个事件)** | `~/.claude/hooks/*.sh` | 事件触发（4 种类型） |
| **插件** | 通过 `/plugin install` | 包含所有功能 |
| **检查点** | 内置 | `Esc+Esc` 或 `/rewind` |
| **规划模式** | 内置 | `/plan <task>` |
| **权限模式 (6)** | 内置 | `--allowedTools`, `--permission-mode` |
| **会话** | 内置 | `/session <command>` |
| **后台任务** | 内置 | 在后台运行 |
| **远程控制** | 内置 | WebSocket API |
| **Web 会话** | 内置 | `claude web` |
| **Git 工作树（Worktree）** | 内置 | `/worktree` |
| **自动记忆** | 内置 | 自动保存到 CLAUDE.md |
| **任务列表** | 内置 | `/task list` |
| **内置技能 (5)** | 内置 | `/simplify`, `/loop`, `/claude-api`, `/voice`, `/browse` |

---

## 常见用例

### 代码审查
```bash
# 方法 1: 斜杠命令
cp 01-slash-commands/optimize.md .claude/commands/
# 使用: /optimize

# 方法 2: 子代理
cp 04-subagents/code-reviewer.md .claude/agents/
# 使用: 自动委派

# 方法 3: 技能
cp -r 03-skills/code-review ~/.claude/skills/
# 使用: 自动调用

# 方法 4: 插件（最佳）
/plugin install pr-review
# 使用: /review-pr
```

### 文档
```bash
# 斜杠命令
cp 01-slash-commands/generate-api-docs.md .claude/commands/

# 子代理
cp 04-subagents/documentation-writer.md .claude/agents/

# 技能
cp -r 03-skills/doc-generator ~/.claude/skills/

# 插件（完整解决方案）
/plugin install documentation
```

### DevOps
```bash
# 完整插件
/plugin install devops-automation

# 命令: /deploy, /rollback, /status, /incident
```

### 团队标准
```bash
# 项目记忆
cp 02-memory/project-CLAUDE.md ./CLAUDE.md

# 按团队需求编辑
vim CLAUDE.md
```

### 自动化和钩子
```bash
# 安装钩子（25 个事件，4 种类型: command, http, prompt, agent（代理））
mkdir -p ~/.claude/hooks
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh

# 示例:
# - 提交前测试: pre-commit.sh
# - 自动格式化代码: format-code.sh
# - 安全扫描: security-scan.sh

# 使用 Auto 模式实现完全自主的工作流
claude --enable-auto-mode -p "Refactor and test the auth module"
# 或在交互模式中使用 Shift+Tab 切换模式
```

### 安全重构
```bash
# 检查点在每次提示词（Prompt）前自动创建
# 尝试重构
# 如果成功: 继续
# 如果失败: 按 Esc+Esc 或使用 /rewind 回退
```

### 复杂实现
```bash
# 使用规划模式
/plan Implement user authentication system

# Claude 创建详细计划
# 审查并批准
# Claude 系统化实施
```

### CI/CD 集成
```bash
# 在无头模式（非交互）下运行
claude -p "Run all tests and generate report"

# 使用适合 CI 的权限模式
claude -p "Run tests" --permission-mode dontAsk

# 使用 Auto 模式实现完全自主的 CI 任务
claude --enable-auto-mode -p "Run tests and fix failures"

# 使用钩子实现自动化
# 参见 09-advanced-features/README.md
```

### 学习和实验
```bash
# 使用 plan 模式进行安全分析
claude --permission-mode plan

# 安全实验 - 检查点自动创建
# 如果需要回退: 按 Esc+Esc 或使用 /rewind
```

### 代理团队
```bash
# 启用代理团队
export CLAUDE_AGENT_TEAMS=1

# 或在 settings.json 中
{ "agentTeams": { "enabled": true } }

# 开始使用: "Implement feature X using a team approach"
```

### 定时任务
```bash
# 每 5 分钟运行一个命令
/loop 5m /check-status

# 一次性提醒
/loop 30m "remind me to check the deploy"
```

---

## 文件位置参考

```
你的项目/
├── .claude/
│   ├── commands/              # 斜杠命令放在这里
│   ├── agents/                # 子代理放在这里
│   ├── skills/                # 项目技能放在这里
│   └── settings.json          # 项目设置（钩子等）
├── .mcp.json                  # MCP 配置（项目级）
├── CLAUDE.md                  # 项目记忆
└── src/
    └── api/
        └── CLAUDE.md          # 目录特定记忆

用户主目录/
├── .claude/
│   ├── commands/              # 个人命令
│   ├── agents/                # 个人代理
│   ├── skills/                # 个人技能
│   ├── hooks/                 # 钩子脚本
│   ├── settings.json          # 用户设置
│   ├── managed-settings.d/    # 管理设置（企业/组织）
│   └── CLAUDE.md              # 个人记忆
└── .claude.json               # 个人 MCP 配置（用户级）
```

---

## 查找示例

### 按分类
- **斜杠命令**: `01-slash-commands/`
- **记忆**: `02-memory/`
- **技能**: `03-skills/`
- **子代理**: `04-subagents/`
- **MCP**: `05-mcp/`
- **钩子**: `06-hooks/`
- **插件**: `07-plugins/`
- **检查点**: `08-checkpoints/`
- **高级功能**: `09-advanced-features/`
- **CLI**: `10-cli/`

### 按用例
- **性能**: `01-slash-commands/optimize.md`
- **安全**: `04-subagents/secure-reviewer.md`
- **测试**: `04-subagents/test-engineer.md`
- **文档**: `03-skills/doc-generator/`
- **DevOps**: `07-plugins/devops-automation/`

### 按复杂度
- **简单**: 斜杠命令
- **中等**: 子代理、记忆
- **高级**: 技能、钩子
- **完整**: 插件

---

## 学习路径

### 第 1 天
```bash
# 阅读概览
cat README.md

# 安装一个命令
cp 01-slash-commands/optimize.md .claude/commands/

# 试试看
/optimize
```

### 第 2-3 天
```bash
# 设置记忆
cp 02-memory/project-CLAUDE.md ./CLAUDE.md
vim CLAUDE.md

# 安装子代理
cp 04-subagents/code-reviewer.md .claude/agents/
```

### 第 4-5 天
```bash
# 设置 MCP
export GITHUB_TOKEN="your_token"
cp 05-mcp/github-mcp.json .mcp.json

# 试试 MCP 命令
/mcp__github__list_prs
```

### 第 2 周
```bash
# 安装技能
cp -r 03-skills/code-review ~/.claude/skills/

# 让它自动调用
# 只需说: "Review this code for issues"
```

### 第 3 周+
```bash
# 安装完整插件
/plugin install pr-review

# 使用捆绑功能
/review-pr
/check-security
/check-tests
```

---

## 新功能（2026 年 3 月）

| 功能 | 描述 | 使用方式 |
|------|------|---------|
| **Auto 模式** | 带后台分类器的完全自主操作 | `--enable-auto-mode` 标志，`Shift+Tab` 切换模式 |
| **频道** | Discord 和 Telegram 集成 | `--channels` 标志，Discord/Telegram 机器人 |
| **语音听写** | 向 Claude 说出命令和上下文 | `/voice` 命令 |
| **钩子 (25 个事件)** | 扩展的钩子系统，4 种类型 | command, http, prompt, agent 钩子类型 |
| **MCP Elicitation** | MCP 服务器可在运行时请求用户输入 | 当服务器需要澄清时自动提示 |
| **WebSocket MCP** | MCP 连接的 WebSocket 传输 | 在 `.mcp.json` 中配置 `ws://` URL |
| **插件 LSP** | 插件的语言服务器协议支持 | `userConfig`, `${CLAUDE_PLUGIN_DATA}` 变量 |
| **远程控制** | 通过 WebSocket API 控制 Claude Code | `claude --remote` 用于外部集成 |
| **Web 会话** | 基于浏览器的 Claude Code 界面 | `claude web` 启动 |
| **桌面应用** | 原生桌面应用程序 | 从 claude.ai/download 下载 |
| **任务列表** | 管理后台任务 | `/task list`, `/task status <id>` |
| **自动记忆** | 从对话中自动保存记忆 | Claude 自动将关键上下文保存到 CLAUDE.md |
| **Git 工作树** | 并行开发的隔离工作空间 | `/worktree` 创建隔离工作空间 |
| **模型选择** | 在 Sonnet 4.6 和 Opus 4.6 之间切换 | `/model` 或 `--model` 标志 |
| **代理团队** | 协调多个代理完成任务 | 使用 `CLAUDE_AGENT_TEAMS=1` 环境变量启用 |
| **定时任务** | 使用 `/loop` 的周期性任务 | `/loop 5m /command` 或 CronCreate 工具 |
| **Chrome 集成** | 浏览器自动化 | `--chrome` 标志或 `/chrome` 命令 |
| **键盘自定义** | 自定义键位绑定 | `/keybindings` 命令 |

---

## 提示和技巧

### 自定义
- 从示例原样开始
- 根据你的需求修改
- 分享给团队前先测试
- 对配置进行版本控制

### 最佳实践
- 使用记忆存储团队标准
- 使用插件获取完整工作流
- 使用子代理处理复杂任务
- 使用斜杠命令处理快速任务

### 故障排除
```bash
# 检查文件位置
ls -la .claude/commands/
ls -la .claude/agents/

# 验证 YAML 语法
head -20 .claude/agents/code-reviewer.md

# 测试 MCP 连接
echo $GITHUB_TOKEN
```

---

## 功能矩阵

| 需求 | 使用这个 | 示例 |
|------|---------|------|
| 快速快捷方式 | 斜杠命令 (55+) | `01-slash-commands/optimize.md` |
| 团队标准 | 记忆 | `02-memory/project-CLAUDE.md` |
| 自动工作流 | 技能 | `03-skills/code-review/` |
| 专业任务 | 子代理 | `04-subagents/code-reviewer.md` |
| 外部数据 | MCP (+ Elicitation, WebSocket) | `05-mcp/github-mcp.json` |
| 事件自动化 | 钩子 (25 个事件, 4 种类型) | `06-hooks/pre-commit.sh` |
| 完整解决方案 | 插件 (+ LSP 支持) | `07-plugins/pr-review/` |
| 安全实验 | 检查点 | `08-checkpoints/checkpoint-examples.md` |
| 完全自主 | Auto 模式 | `--enable-auto-mode` 或 `Shift+Tab` |
| 聊天集成 | 频道 | `--channels` (Discord, Telegram) |
| CI/CD 流水线 | 命令行界面（CLI） | `10-cli/README.md` |

---

## 快速链接

- **主指南**: `README.md`
- **完整索引**: `INDEX.md`
- **概念指南**: `claude_concepts_guide.md`

---

## 常见问题

**问: 应该使用哪个？**
答: 从斜杠命令开始，按需添加功能。

**问: 可以混合使用功能吗？**
答: 可以！它们协同工作。记忆 + 命令 + MCP = 强大。

**问: 如何与团队共享？**
答: 将 `.claude/` 目录提交到 git。

**问: 密钥怎么办？**
答: 使用环境变量，永远不要硬编码。

**问: 可以修改示例吗？**
答: 当然！它们是可以自定义的模板。

---

## 检查清单

入门检查清单：

- [ ] 阅读 `README.md`
- [ ] 安装 1 个斜杠命令
- [ ] 尝试该命令
- [ ] 创建项目 `CLAUDE.md`
- [ ] 安装 1 个子代理
- [ ] 设置 1 个 MCP 集成
- [ ] 安装 1 个技能
- [ ] 尝试一个完整插件
- [ ] 根据需求自定义
- [ ] 与团队共享

---

**快速入门**: `cat README.md`

**完整索引**: `cat INDEX.md`

**本卡片**: 随手保存以便快速参考！
