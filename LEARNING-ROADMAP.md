<picture>
  <source media="(prefers-color-scheme: dark)" srcset="resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="resources/logos/claude-howto-logo.svg">
</picture>

# 📚 Claude Code 学习路线图

**刚接触 Claude Code？** 本指南帮助你按自己的节奏掌握 Claude Code 的各项功能。无论你是完全的初学者还是经验丰富的开发者，都可以从下方的自我评估测验开始，找到适合你的学习路径。

---

## 🧭 找到你的级别

每个人的起点不同。通过这个快速自我评估找到合适的入口。

**诚实回答以下问题：**

- [ ] 我能启动 Claude Code 并进行对话（`claude`）
- [ ] 我创建或编辑过 CLAUDE.md 文件
- [ ] 我使用过至少 3 个内置斜杠命令（Slash Command）（如 /help、/compact、/model）
- [ ] 我创建过自定义斜杠命令或技能（Skill）（SKILL.md）
- [ ] 我配置过 MCP 服务器（如 GitHub、数据库）
- [ ] 我在 ~/.claude/settings.json 中设置过钩子（Hook）
- [ ] 我创建或使用过自定义子代理（Subagent）（.claude/agents/）
- [ ] 我使用过打印模式（`claude -p`）进行脚本编写或 CI/CD

**你的级别：**

| 勾选数 | 级别 | 从这里开始 | 完成时间 |
|--------|------|----------|----------|
| 0-2 | **级别 1：初学者** — 入门 | [里程碑 1A](#里程碑-1a第一批命令与记忆) | 约 3 小时 |
| 3-5 | **级别 2：中级** — 构建工作流 | [里程碑 2A](#里程碑-2a自动化技能与钩子) | 约 5 小时 |
| 6-8 | **级别 3：高级** — 高级用户与团队负责人 | [里程碑 3A](#里程碑-3a高级功能) | 约 5 小时 |

> **提示**：如果不确定，就从低一级开始。快速复习熟悉的内容总比错过基础概念要好。

> **交互版本**：在 Claude Code 中运行 `/self-assessment`，获取引导式交互测验，评估你在所有 10 个功能领域的熟练程度，并生成个性化学习路径。

---

## 🎯 学习理念

本仓库中的文件夹按**推荐的学习顺序**编号，基于三个关键原则：

1. **依赖关系** — 基础概念优先
2. **复杂度** — 简单功能先于高级功能
3. **使用频率** — 最常用的功能最先教授

这种方式确保你在获得即时生产力的同时，建立扎实的基础。

---

## 🗺️ 你的学习路径

```mermaid
graph TD
    Q["🧭 自我评估测验<br/>找到你的级别"] --> L1
    Q --> L2
    Q --> L3

    subgraph L1["🟢 级别 1：初学者 — 入门"]
        direction LR
        A["1A：第一批命令与记忆<br/>斜杠命令 + 记忆"] --> B["1B：安全探索<br/>检查点 + CLI 基础"]
    end

    subgraph L2["🔵 级别 2：中级 — 构建工作流"]
        direction LR
        C["2A：自动化<br/>技能 + 钩子"] --> D["2B：集成<br/>MCP + 子代理"]
    end

    subgraph L3["🔴 级别 3：高级 — 高级用户"]
        direction LR
        E["3A：高级功能<br/>规划 + 权限"] --> F["3B：团队与分发<br/>插件 + CLI 精通"]
    end

    L1 --> L2
    L2 --> L3

    style Q fill:#6A1B9A,color:#fff,stroke:#9C27B0,stroke-width:2px
    style A fill:#2E7D32,color:#fff
    style B fill:#2E7D32,color:#fff
    style C fill:#1565C0,color:#fff
    style D fill:#F57C00,color:#fff
    style E fill:#C62828,color:#fff
    style F fill:#B71C1C,color:#fff
```

**颜色图例：**
- 💜 紫色：自我评估测验
- 🟢 绿色：级别 1 — 初学者路径
- 🔵 蓝色 / 🟡 金色：级别 2 — 中级路径
- 🔴 红色：级别 3 — 高级路径

---

## 📊 完整路线图表格

| 步骤 | 功能 | 复杂度 | 时间 | 级别 | 依赖 | 为什么要学 | 核心收益 |
|------|------|--------|------|------|------|-----------|---------|
| **1** | [斜杠命令](01-slash-commands/) | ⭐ 初学者 | 30 分钟 | 级别 1 | 无 | 快速提升生产力（55+ 内置 + 5 个捆绑技能） | 即时自动化、团队标准化 |
| **2** | [记忆](02-memory/) | ⭐⭐ 初学者+ | 45 分钟 | 级别 1 | 无 | 所有功能的基础 | 持久化上下文、个人偏好 |
| **3** | [检查点](08-checkpoints/) | ⭐⭐ 中级 | 45 分钟 | 级别 1 | 会话管理 | 安全探索 | 实验、恢复 |
| **4** | [CLI 基础](10-cli/) | ⭐⭐ 初学者+ | 30 分钟 | 级别 1 | 无 | 核心 CLI 用法 | 交互与打印模式 |
| **5** | [技能](03-skills/) | ⭐⭐ 中级 | 1 小时 | 级别 2 | 斜杠命令 | 自动化专业能力 | 可复用能力、一致性 |
| **6** | [钩子](06-hooks/) | ⭐⭐ 中级 | 1 小时 | 级别 2 | 工具、命令 | 工作流自动化（25 个事件、4 种类型） | 验证、质量门控 |
| **7** | [MCP](05-mcp/) | ⭐⭐⭐ 中级+ | 1 小时 | 级别 2 | 配置 | 实时数据访问 | 实时集成、API |
| **8** | [子代理](04-subagents/) | ⭐⭐⭐ 中级+ | 1.5 小时 | 级别 2 | 记忆、命令 | 复杂任务处理（6 个内置，含 Bash） | 任务委派、专业化能力 |
| **9** | [高级功能](09-advanced-features/) | ⭐⭐⭐⭐⭐ 高级 | 2-3 小时 | 级别 3 | 以上全部 | 高级用户工具 | 规划、自动模式、频道、语音输入、权限 |
| **10** | [插件](07-plugins/) | ⭐⭐⭐⭐ 高级 | 2 小时 | 级别 3 | 以上全部 | 完整解决方案 | 团队入门、分发 |
| **11** | [CLI 精通](10-cli/) | ⭐⭐⭐ 高级 | 1 小时 | 级别 3 | 推荐：全部 | 精通命令行 | 脚本、CI/CD、自动化 |

**总学习时间**：约 11-13 小时（或直接跳到你的级别以节省时间）

---

## 🟢 级别 1：初学者 — 入门

**适用人群**：测验勾选 0-2 项的用户
**时间**：约 3 小时
**重点**：即时生产力、理解基础概念
**成果**：成为舒适的日常用户，准备进入级别 2

### 里程碑 1A：第一批命令与记忆

**主题**：斜杠命令 + 记忆（Memory）
**时间**：1-2 小时
**复杂度**：⭐ 初学者
**目标**：通过自定义命令和持久化上下文立即提升生产力

#### 你将实现什么
✅ 为重复性任务创建自定义斜杠命令
✅ 为团队标准设置项目记忆
✅ 配置个人偏好
✅ 理解 Claude 如何自动加载上下文

#### 实践练习

```bash
# 练习 1：安装你的第一个斜杠命令
mkdir -p .claude/commands
cp 01-slash-commands/optimize.md .claude/commands/

# 练习 2：创建项目记忆
cp 02-memory/project-CLAUDE.md ./CLAUDE.md

# 练习 3：试一试
# 在 Claude Code 中输入：/optimize
```

#### 成功标准
- [ ] 成功调用 `/optimize` 命令
- [ ] Claude 能从 CLAUDE.md 中记住你的项目标准
- [ ] 理解何时使用斜杠命令与记忆

#### 后续步骤
熟悉后，请阅读：
- [01-slash-commands/README.md](01-slash-commands/README.md)
- [02-memory/README.md](02-memory/README.md)

> **检验你的理解**：在 Claude Code 中运行 `/lesson-quiz slash-commands` 或 `/lesson-quiz memory` 来测试所学内容。

---

### 里程碑 1B：安全探索

**主题**：检查点（Checkpoint） + CLI 基础
**时间**：1 小时
**复杂度**：⭐⭐ 初学者+
**目标**：学会安全实验并使用核心 CLI 命令

#### 你将实现什么
✅ 创建和恢复检查点以安全实验
✅ 理解交互模式与打印模式
✅ 使用基本的 CLI 标志和选项
✅ 通过管道处理文件

#### 实践练习

```bash
# 练习 1：尝试检查点工作流
# 在 Claude Code 中：
# 做一些实验性更改，然后按 Esc+Esc 或使用 /rewind
# 选择实验前的检查点
# 选择"恢复代码和对话"以回到之前的状态

# 练习 2：交互模式与打印模式
claude "explain this project"           # 交互模式
claude -p "explain this function"       # 打印模式（非交互式）

# 练习 3：通过管道处理文件内容
cat error.log | claude -p "explain this error"
```

#### 成功标准
- [ ] 创建并回退到检查点
- [ ] 使用了交互模式和打印模式
- [ ] 通过管道将文件传给 Claude 分析
- [ ] 理解何时使用检查点进行安全实验

#### 后续步骤
- 阅读：[08-checkpoints/README.md](08-checkpoints/README.md)
- 阅读：[10-cli/README.md](10-cli/README.md)
- **准备进入级别 2！** 前往[里程碑 2A](#里程碑-2a自动化技能与钩子)

> **检验你的理解**：运行 `/lesson-quiz checkpoints` 或 `/lesson-quiz cli` 以确认你已准备好进入级别 2。

---

## 🔵 级别 2：中级 — 构建工作流

**适用人群**：测验勾选 3-5 项的用户
**时间**：约 5 小时
**重点**：自动化、集成、任务委派
**成果**：自动化工作流、外部集成，准备进入级别 3

### 前置条件检查

在开始级别 2 之前，确保你已掌握以下级别 1 的概念：

- [ ] 能创建和使用斜杠命令（[01-slash-commands/](01-slash-commands/)）
- [ ] 已通过 CLAUDE.md 设置项目记忆（[02-memory/](02-memory/)）
- [ ] 知道如何创建和恢复检查点（[08-checkpoints/](08-checkpoints/)）
- [ ] 能从命令行使用 `claude` 和 `claude -p`（[10-cli/](10-cli/)）

> **有差距？** 请先复习上方链接的教程。

---

### 里程碑 2A：自动化（技能 + 钩子）

**主题**：技能 + 钩子
**时间**：2-3 小时
**复杂度**：⭐⭐ 中级
**目标**：自动化常见工作流和质量检查

#### 你将实现什么
✅ 通过 YAML 前置元数据（Frontmatter）自动调用专业能力（包括 `effort` 和 `shell` 字段）
✅ 在 25 个钩子事件中设置事件驱动自动化
✅ 使用全部 4 种钩子类型（command、http、prompt、agent）
✅ 强制执行代码质量标准
✅ 为你的工作流创建自定义钩子

#### 实践练习

```bash
# 练习 1：安装一个技能
cp -r 03-skills/code-review ~/.claude/skills/

# 练习 2：设置钩子
mkdir -p ~/.claude/hooks
cp 06-hooks/pre-tool-check.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/pre-tool-check.sh

# 练习 3：在设置中配置钩子
# 添加到 ~/.claude/settings.json：
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/pre-tool-check.sh"
          }
        ]
      }
    ]
  }
}
```

#### 成功标准
- [ ] 代码审查技能在相关场景自动调用
- [ ] PreToolUse 钩子在工具执行前运行
- [ ] 理解技能自动调用与钩子事件触发的区别

#### 后续步骤
- 创建你自己的自定义技能
- 为你的工作流设置更多钩子
- 阅读：[03-skills/README.md](03-skills/README.md)
- 阅读：[06-hooks/README.md](06-hooks/README.md)

> **检验你的理解**：运行 `/lesson-quiz skills` 或 `/lesson-quiz hooks` 在继续之前测试你的知识。

---

### 里程碑 2B：集成（MCP + 子代理）

**主题**：MCP + 子代理
**时间**：2-3 小时
**复杂度**：⭐⭐⭐ 中级+
**目标**：集成外部服务并委派复杂任务

#### 你将实现什么
✅ 从 GitHub、数据库等访问实时数据
✅ 将工作委派给专业化 AI 代理（Agent）
✅ 理解何时使用 MCP 与子代理
✅ 构建集成工作流

#### 实践练习

```bash
# 练习 1：设置 GitHub MCP
export GITHUB_TOKEN="your_github_token"
claude mcp add github -- npx -y @modelcontextprotocol/server-github

# 练习 2：测试 MCP 集成
# 在 Claude Code 中：/mcp__github__list_prs

# 练习 3：安装子代理
mkdir -p .claude/agents
cp 04-subagents/*.md .claude/agents/
```

#### 集成练习
尝试这个完整的工作流：
1. 使用 MCP 获取一个 GitHub PR
2. 让 Claude 将审查任务委派给代码审查子代理
3. 使用钩子自动运行测试

#### 成功标准
- [ ] 通过 MCP 成功查询 GitHub 数据
- [ ] Claude 将复杂任务委派给子代理
- [ ] 理解 MCP 和子代理的区别
- [ ] 在工作流中组合使用 MCP + 子代理 + 钩子

#### 后续步骤
- 设置更多 MCP 服务器（数据库、Slack 等）
- 为你的领域创建自定义子代理
- 阅读：[05-mcp/README.md](05-mcp/README.md)
- 阅读：[04-subagents/README.md](04-subagents/README.md)
- **准备进入级别 3！** 前往[里程碑 3A](#里程碑-3a高级功能)

> **检验你的理解**：运行 `/lesson-quiz mcp` 或 `/lesson-quiz subagents` 以确认你已准备好进入级别 3。

---

## 🔴 级别 3：高级 — 高级用户与团队负责人

**适用人群**：测验勾选 6-8 项的用户
**时间**：约 5 小时
**重点**：团队工具、CI/CD、企业功能、插件（Plugin）开发
**成果**：成为高级用户，能搭建团队工作流和 CI/CD

### 前置条件检查

在开始级别 3 之前，确保你已掌握以下级别 2 的概念：

- [ ] 能创建和使用具有自动调用功能的技能（[03-skills/](03-skills/)）
- [ ] 已设置事件驱动自动化的钩子（[06-hooks/](06-hooks/)）
- [ ] 能配置 MCP 服务器以访问外部数据（[05-mcp/](05-mcp/)）
- [ ] 知道如何使用子代理进行任务委派（[04-subagents/](04-subagents/)）

> **有差距？** 请先复习上方链接的教程。

---

### 里程碑 3A：高级功能

**主题**：高级功能（规划、权限、扩展思考、自动模式、频道、语音输入、远程/桌面/Web）
**时间**：2-3 小时
**复杂度**：⭐⭐⭐⭐⭐ 高级
**目标**：掌握高级工作流和高级用户工具

#### 你将实现什么
✅ 规划模式处理复杂功能
✅ 6 种权限模式的细粒度控制（default、acceptEdits、plan、auto、dontAsk、bypassPermissions）
✅ 通过 Alt+T / Option+T 切换扩展思考
✅ 后台任务管理
✅ 自动记忆学习偏好
✅ 带后台安全分类器的自动模式
✅ 频道实现结构化多会话工作流
✅ 语音输入实现免手操作
✅ 远程控制、桌面应用和 Web 会话
✅ 代理团队实现多代理协作

#### 实践练习

```bash
# 练习 1：使用规划模式
/plan Implement user authentication system

# 练习 2：尝试权限模式（6 种可用：default、acceptEdits、plan、auto、dontAsk、bypassPermissions）
claude --permission-mode plan "analyze this codebase"
claude --permission-mode acceptEdits "refactor the auth module"
claude --permission-mode auto "implement the feature"

# 练习 3：启用扩展思考
# 在会话中按 Alt+T（macOS 上为 Option+T）来切换

# 练习 4：高级检查点工作流
# 1. 创建检查点 "Clean state"
# 2. 使用规划模式设计功能
# 3. 通过子代理委派来实现
# 4. 在后台运行测试
# 5. 如果测试失败，回退到检查点
# 6. 尝试替代方案

# 练习 5：尝试自动模式（后台安全分类器）
claude --permission-mode auto "implement user settings page"

# 练习 6：启用代理团队
export CLAUDE_AGENT_TEAMS=1
# 询问 Claude："Implement feature X using a team approach"

# 练习 7：定时任务
/loop 5m /check-status
# 或使用 CronCreate 创建持久化定时任务

# 练习 8：多会话工作流的频道
# 使用频道跨会话组织工作

# 练习 9：语音输入
# 使用语音输入与 Claude Code 进行免手操作交互
```

#### 成功标准
- [ ] 使用规划模式完成复杂功能
- [ ] 配置了权限模式（plan、acceptEdits、auto、dontAsk）
- [ ] 使用 Alt+T / Option+T 切换扩展思考
- [ ] 使用了带后台安全分类器的自动模式
- [ ] 使用后台任务执行长时间操作
- [ ] 探索了频道的多会话工作流
- [ ] 尝试了语音输入的免手操作
- [ ] 了解远程控制、桌面应用和 Web 会话
- [ ] 启用并使用代理团队进行协作任务
- [ ] 使用 `/loop` 进行循环任务或定时监控

#### 后续步骤
- 阅读：[09-advanced-features/README.md](09-advanced-features/README.md)

> **检验你的理解**：运行 `/lesson-quiz advanced` 测试你对高级用户功能的掌握程度。

---

### 里程碑 3B：团队与分发（插件 + CLI 精通）

**主题**：插件 + CLI 精通 + CI/CD
**时间**：2-3 小时
**复杂度**：⭐⭐⭐⭐ 高级
**目标**：构建团队工具、创建插件、精通 CI/CD 集成

#### 你将实现什么
✅ 安装和创建完整的捆绑插件
✅ 精通用于脚本和自动化的 CLI
✅ 使用 `claude -p` 设置 CI/CD 集成
✅ 用于自动化流水线的 JSON 输出
✅ 会话管理和批量处理

#### 实践练习

```bash
# 练习 1：安装一个完整的插件
# 在 Claude Code 中：/plugin install pr-review

# 练习 2：用于 CI/CD 的打印模式
claude -p "Run all tests and generate report"

# 练习 3：用于脚本的 JSON 输出
claude -p --output-format json "list all functions"

# 练习 4：会话管理和恢复
claude -r "feature-auth" "continue implementation"

# 练习 5：带约束的 CI/CD 集成
claude -p --max-turns 3 --output-format json "review code"

# 练习 6：批量处理
for file in *.md; do
  claude -p --output-format json "summarize this: $(cat $file)" > ${file%.md}.summary.json
done
```

#### CI/CD 集成练习
创建一个简单的 CI/CD 脚本：
1. 使用 `claude -p` 审查更改的文件
2. 以 JSON 格式输出结果
3. 用 `jq` 处理特定问题
4. 集成到 GitHub Actions 工作流中

#### 成功标准
- [ ] 安装并使用了插件
- [ ] 为团队构建或修改了插件
- [ ] 在 CI/CD 中使用了打印模式（`claude -p`）
- [ ] 生成了用于脚本的 JSON 输出
- [ ] 成功恢复了之前的会话
- [ ] 创建了批量处理脚本
- [ ] 将 Claude 集成到 CI/CD 工作流中

#### CLI 的实际用例
- **代码审查自动化**：在 CI/CD 流水线中运行代码审查
- **日志分析**：分析错误日志和系统输出
- **文档生成**：批量生成文档
- **测试洞察**：分析测试失败
- **性能分析**：审查性能指标
- **数据处理**：转换和分析数据文件

#### 后续步骤
- 阅读：[07-plugins/README.md](07-plugins/README.md)
- 阅读：[10-cli/README.md](10-cli/README.md)
- 创建团队级 CLI 快捷方式和插件
- 设置批量处理脚本

> **检验你的理解**：运行 `/lesson-quiz plugins` 或 `/lesson-quiz cli` 确认你的掌握程度。

---

## 🧪 测试你的知识

本仓库包含两个交互式技能，你可以随时在 Claude Code 中使用来评估你的理解程度：

| 技能 | 命令 | 用途 |
|------|------|------|
| **自我评估** | `/self-assessment` | 评估你在所有 10 个功能方面的总体熟练程度。选择快速（2 分钟）或深度（5 分钟）模式，获取个性化技能概况和学习路径。 |
| **课程测验** | `/lesson-quiz [lesson]` | 用 10 道题测试你对特定课程的理解。可在课前（预测试）、课中（进度检查）或课后（掌握度验证）使用。 |

**示例：**
```
/self-assessment                  # 查看你的总体级别
/lesson-quiz hooks                # 第 06 课测验：钩子
/lesson-quiz 03                   # 第 03 课测验：技能
/lesson-quiz advanced-features    # 第 09 课测验
```

---

## ⚡ 快速入门路径

### 如果你只有 15 分钟
**目标**：获得第一次成功体验

1. 复制一个斜杠命令：`cp 01-slash-commands/optimize.md .claude/commands/`
2. 在 Claude Code 中试用：`/optimize`
3. 阅读：[01-slash-commands/README.md](01-slash-commands/README.md)

**成果**：你将拥有一个可用的斜杠命令并理解基本概念

---

### 如果你有 1 小时
**目标**：搭建基本生产力工具

1. **斜杠命令**（15 分钟）：复制并测试 `/optimize` 和 `/pr`
2. **项目记忆**（15 分钟）：用你的项目标准创建 CLAUDE.md
3. **安装技能**（15 分钟）：设置代码审查技能
4. **综合使用**（15 分钟）：看看它们如何协同工作

**成果**：通过命令、记忆和自动技能获得基本生产力提升

---

### 如果你有一个周末
**目标**：熟练掌握大部分功能

**周六上午**（3 小时）：
- 完成里程碑 1A：斜杠命令 + 记忆
- 完成里程碑 1B：检查点 + CLI 基础

**周六下午**（3 小时）：
- 完成里程碑 2A：技能 + 钩子
- 完成里程碑 2B：MCP + 子代理

**周日**（4 小时）：
- 完成里程碑 3A：高级功能
- 完成里程碑 3B：插件 + CLI 精通 + CI/CD
- 为你的团队构建一个自定义插件

**成果**：你将成为 Claude Code 高级用户，能够培训他人并自动化复杂工作流

---

## 💡 学习建议

### ✅ 推荐做法

- **先做测验**找到你的起点
- **完成每个里程碑的实践练习**
- **从简单开始**逐步增加复杂度
- **测试每个功能**后再进入下一个
- **记笔记**记录适合你工作流的内容
- **回顾**学习高级主题时参考之前的概念
- **安全实验**使用检查点
- **分享知识**与团队共享

### ❌ 不推荐做法

- **跳过前置条件检查**直接进入更高级别
- **试图一次学完所有内容** — 会让人不堪重负
- **不理解就复制配置** — 出问题时你不知道如何调试
- **忘记测试** — 始终验证功能是否正常工作
- **匆忙完成里程碑** — 花时间去理解
- **忽略文档** — 每个 README 都有宝贵的细节
- **孤立工作** — 与队友讨论

---

## 🎓 学习风格

### 视觉型学习者
- 研究每个 README 中的 Mermaid 图表
- 观察命令执行流程
- 绘制自己的工作流图
- 使用上方的可视化学习路径

### 实践型学习者
- 完成每一个实践练习
- 尝试各种变体
- 大胆尝试并修复（使用检查点！）
- 创建自己的示例

### 阅读型学习者
- 仔细阅读每个 README
- 研究代码示例
- 查看对比表格
- 阅读资源中链接的博客文章

### 社交型学习者
- 安排结对编程会议
- 向队友讲解概念
- 加入 Claude Code 社区讨论
- 分享你的自定义配置

---

## 📈 进度跟踪

使用这些清单按级别跟踪你的进度。随时运行 `/self-assessment` 获取更新的技能概况，或在每个教程后运行 `/lesson-quiz [lesson]` 验证你的理解。

### 🟢 级别 1：初学者
- [ ] 完成 [01-slash-commands](01-slash-commands/)
- [ ] 完成 [02-memory](02-memory/)
- [ ] 创建了第一个自定义斜杠命令
- [ ] 设置了项目记忆
- [ ] **里程碑 1A 达成**
- [ ] 完成 [08-checkpoints](08-checkpoints/)
- [ ] 完成 [10-cli](10-cli/) 基础
- [ ] 创建并回退到检查点
- [ ] 使用了交互模式和打印模式
- [ ] **里程碑 1B 达成**

### 🔵 级别 2：中级
- [ ] 完成 [03-skills](03-skills/)
- [ ] 完成 [06-hooks](06-hooks/)
- [ ] 安装了第一个技能
- [ ] 设置了 PreToolUse 钩子
- [ ] **里程碑 2A 达成**
- [ ] 完成 [05-mcp](05-mcp/)
- [ ] 完成 [04-subagents](04-subagents/)
- [ ] 连接了 GitHub MCP
- [ ] 创建了自定义子代理
- [ ] 在工作流中组合使用了各项集成
- [ ] **里程碑 2B 达成**

### 🔴 级别 3：高级
- [ ] 完成 [09-advanced-features](09-advanced-features/)
- [ ] 成功使用规划模式
- [ ] 配置了权限模式（6 种模式含自动模式）
- [ ] 使用了带安全分类器的自动模式
- [ ] 使用了扩展思考切换
- [ ] 探索了频道和语音输入
- [ ] **里程碑 3A 达成**
- [ ] 完成 [07-plugins](07-plugins/)
- [ ] 完成 [10-cli](10-cli/) 高级用法
- [ ] 设置了打印模式（`claude -p`）CI/CD
- [ ] 创建了用于自动化的 JSON 输出
- [ ] 将 Claude 集成到 CI/CD 流水线
- [ ] 创建了团队插件
- [ ] **里程碑 3B 达成**

---

## 🆘 常见学习挑战

### 挑战 1："概念太多，一次记不住"
**解决方案**：一次专注一个里程碑。完成所有练习后再继续前进。

### 挑战 2："不知道何时使用哪个功能"
**解决方案**：参考主 README 中的[用例矩阵](README.md#use-case-matrix)。

### 挑战 3："配置不起作用"
**解决方案**：查看[故障排除](README.md#troubleshooting)章节并验证文件位置。

### 挑战 4："概念似乎有重叠"
**解决方案**：查看[功能对比](README.md#feature-comparison)表格以理解区别。

### 挑战 5："很难记住所有内容"
**解决方案**：创建自己的速查表。使用检查点安全实验。

### 挑战 6："我有经验但不确定从哪里开始"
**解决方案**：做上方的[自我评估测验](#-找到你的级别)。跳到你的级别，使用前置条件检查找出差距。

---

## 🎯 完成所有内容后的下一步

完成所有里程碑后：

1. **创建团队文档** — 记录团队的 Claude Code 配置
2. **构建自定义插件** — 将团队工作流打包
3. **探索远程控制** — 从外部工具以编程方式控制 Claude Code 会话
4. **尝试 Web 会话** — 通过浏览器界面使用 Claude Code 进行远程开发
5. **使用桌面应用** — 通过原生桌面应用访问 Claude Code 功能
6. **使用自动模式** — 让 Claude 在后台安全分类器的保护下自主工作
7. **利用自动记忆** — 让 Claude 自动学习你的偏好
8. **设置代理团队** — 协调多个代理处理复杂的多方面任务
9. **使用频道** — 跨结构化多会话工作流组织工作
10. **尝试语音输入** — 使用免手操作的语音与 Claude Code 交互
11. **使用定时任务** — 通过 `/loop` 和 cron 工具自动化循环检查
12. **贡献示例** — 与社区分享
13. **指导他人** — 帮助队友学习
14. **优化工作流** — 根据使用情况持续改进
15. **保持更新** — 关注 Claude Code 的发布和新功能

---

## 📚 附加资源

### 官方文档
- [Claude Code 文档](https://code.claude.com/docs/en/overview)
- [Anthropic 文档](https://docs.anthropic.com)
- [MCP 协议规范](https://modelcontextprotocol.io)

### 博客文章
- [探索 Claude Code 斜杠命令](https://medium.com/@luongnv89/discovering-claude-code-slash-commands-cdc17f0dfb29)

### 社区
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook)
- [MCP 服务器仓库](https://github.com/modelcontextprotocol/servers)

---

## 💬 反馈与支持

- **发现问题？** 在仓库中创建 Issue
- **有建议？** 提交 Pull Request
- **需要帮助？** 查看文档或向社区提问

---

**最后更新**：2026 年 3 月
**维护者**：Claude How-To 贡献者
**许可证**：教育用途，免费使用和改编

---

[← 返回主 README](README.md)
