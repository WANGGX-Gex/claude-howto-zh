<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="../resources/logos/claude-howto-logo.svg">
</picture>

# MCP（模型上下文协议）

本文件夹包含模型上下文协议（MCP）服务器配置及其在 Claude Code 中使用的综合文档和示例。

## 概述

MCP（模型上下文协议）是一种标准化方式，使 Claude 能够访问外部工具、API 和实时数据源。与记忆（Memory）不同，MCP 提供对动态变化数据的实时访问。

核心特性：
- 实时访问外部服务
- 实时数据同步
- 可扩展架构
- 安全认证
- 基于工具的交互

## MCP 架构

```mermaid
graph TB
    A["Claude"]
    B["MCP 服务器"]
    C["外部服务"]

    A -->|请求: list_issues| B
    B -->|查询| C
    C -->|数据| B
    B -->|响应| A

    A -->|请求: create_issue| B
    B -->|操作| C
    C -->|结果| B
    B -->|响应| A

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#e8f5e9,stroke:#333,color:#333
```

## MCP 生态系统

```mermaid
graph TB
    A["Claude"] -->|MCP| B["文件系统<br/>MCP 服务器"]
    A -->|MCP| C["GitHub<br/>MCP 服务器"]
    A -->|MCP| D["数据库<br/>MCP 服务器"]
    A -->|MCP| E["Slack<br/>MCP 服务器"]
    A -->|MCP| F["Google Docs<br/>MCP 服务器"]

    B -->|文件 I/O| G["本地文件"]
    C -->|API| H["GitHub 仓库"]
    D -->|查询| I["PostgreSQL/MySQL"]
    E -->|消息| J["Slack 工作区"]
    F -->|文档| K["Google Drive"]

    style A fill:#e1f5fe,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#f3e5f5,stroke:#333,color:#333
    style F fill:#f3e5f5,stroke:#333,color:#333
    style G fill:#e8f5e9,stroke:#333,color:#333
    style H fill:#e8f5e9,stroke:#333,color:#333
    style I fill:#e8f5e9,stroke:#333,color:#333
    style J fill:#e8f5e9,stroke:#333,color:#333
    style K fill:#e8f5e9,stroke:#333,color:#333
```

## MCP 安装方法

Claude Code 支持多种 MCP 服务器连接的传输协议：

### HTTP 传输（推荐）

```bash
# 基础 HTTP 连接
claude mcp add --transport http notion https://mcp.notion.com/mcp

# 带认证头的 HTTP
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### Stdio 传输（本地）

用于本地运行的 MCP 服务器：

```bash
# 本地 Node.js 服务器
claude mcp add --transport stdio myserver -- npx @myorg/mcp-server

# 带环境变量
claude mcp add --transport stdio myserver --env KEY=value -- npx server
```

### SSE 传输（已弃用）

Server-Sent Events 传输已被 `http` 取代，但仍然支持：

```bash
claude mcp add --transport sse legacy-server https://example.com/sse
```

### WebSocket 传输

WebSocket 传输用于持久的双向连接：

```bash
claude mcp add --transport ws realtime-server wss://example.com/mcp
```

### Windows 特别说明

在原生 Windows（非 WSL）上，使用 `cmd /c` 执行 npx 命令：

```bash
claude mcp add --transport stdio my-server -- cmd /c npx -y @some/package
```

### OAuth 2.0 认证

Claude Code 支持需要 OAuth 2.0 的 MCP 服务器。连接到启用 OAuth 的服务器时，Claude Code 会处理整个认证流程：

```bash
# 连接到启用 OAuth 的 MCP 服务器（交互式流程）
claude mcp add --transport http my-service https://my-service.example.com/mcp

# 为非交互式设置预配置 OAuth 凭据
claude mcp add --transport http my-service https://my-service.example.com/mcp \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --callback-port 8080
```

| 功能 | 描述 |
|------|------|
| **交互式 OAuth** | 使用 `/mcp` 触发基于浏览器的 OAuth 流程 |
| **预配置 OAuth 客户端** | 内置 Notion、Stripe 等常用服务的 OAuth 客户端（v2.1.30+） |
| **预配置凭据** | `--client-id`、`--client-secret`、`--callback-port` 标志用于自动化设置 |
| **令牌存储** | 令牌（Token）安全存储在系统密钥链中 |
| **升级认证** | 支持特权操作的升级认证 |
| **发现缓存** | OAuth 发现元数据被缓存以加快重连速度 |
| **元数据覆盖** | `.mcp.json` 中的 `oauth.authServerMetadataUrl` 可覆盖默认的 OAuth 元数据发现 |

#### 覆盖 OAuth 元数据发现

如果你的 MCP 服务器在标准 OAuth 元数据端点（`/.well-known/oauth-authorization-server`）返回错误，但暴露了可用的 OIDC 端点，你可以指定 Claude Code 从特定 URL 获取 OAuth 元数据。在服务器配置的 `oauth` 对象中设置 `authServerMetadataUrl`：

```json
{
  "mcpServers": {
    "my-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "authServerMetadataUrl": "https://auth.example.com/.well-known/openid-configuration"
      }
    }
  }
}
```

URL 必须使用 `https://`。此选项需要 Claude Code v2.1.64 或更高版本。

### Claude.ai MCP 连接器

在 Claude.ai 帐户中配置的 MCP 服务器会自动在 Claude Code 中可用。这意味着通过 Claude.ai 网页界面设置的任何 MCP 连接无需额外配置即可访问。

Claude.ai MCP 连接器也可在 `--print` 模式下使用（v2.1.83+），支持非交互式和脚本化使用。

要在 Claude Code 中禁用 Claude.ai MCP 服务器，设置 `ENABLE_CLAUDEAI_MCP_SERVERS` 环境变量为 `false`：

```bash
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

> **注意：** 此功能仅适用于使用 Claude.ai 帐户登录的用户。

## MCP 设置流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant Claude as Claude Code
    participant Config as 配置文件
    participant Service as 外部服务

    User->>Claude: 输入 /mcp
    Claude->>Claude: 列出可用的 MCP 服务器
    Claude->>User: 显示选项
    User->>Claude: 选择 GitHub MCP
    Claude->>Config: 更新配置
    Config->>Claude: 激活连接
    Claude->>Service: 测试连接
    Service-->>Claude: 认证成功
    Claude->>User: MCP 已连接！
```

## MCP 工具搜索

当 MCP 工具描述超过上下文窗口的 10% 时，Claude Code 会自动启用工具搜索，以高效地选择合适的工具而不会占满模型上下文。

| 设置 | 值 | 描述 |
|------|-----|------|
| `ENABLE_TOOL_SEARCH` | `auto`（默认） | 当工具描述超过上下文的 10% 时自动启用 |
| `ENABLE_TOOL_SEARCH` | `auto:<N>` | 在自定义阈值 `N` 个工具时自动启用 |
| `ENABLE_TOOL_SEARCH` | `true` | 始终启用，无视工具数量 |
| `ENABLE_TOOL_SEARCH` | `false` | 禁用；发送所有完整的工具描述 |

> **注意：** 工具搜索需要 Sonnet 4 或更高版本，或 Opus 4 或更高版本。Haiku 模型不支持工具搜索。

## 动态工具更新

Claude Code 支持 MCP `list_changed` 通知。当 MCP 服务器动态添加、移除或修改其可用工具时，Claude Code 会接收更新并自动调整其工具列表 — 无需重连或重启。

## MCP 引出

MCP 服务器可以通过交互式对话框向用户请求结构化输入（v2.1.49+）。这允许 MCP 服务器在工作流中途请求额外信息 — 例如，提示确认、从选项列表中选择或填写必填字段 — 为 MCP 服务器交互增加互动性。

## 工具描述和指令上限

从 v2.1.84 起，Claude Code 对每个 MCP 服务器的工具描述和指令执行 **2 KB 上限**。这防止单个服务器用过于冗长的工具定义消耗过多上下文，减少上下文膨胀并保持交互效率。

## MCP 提示词作为斜杠命令

MCP 服务器可以暴露显示为 Claude Code 中斜杠命令（Slash Command）的提示词。使用以下命名约定访问提示词：

```
/mcp__<server>__<prompt>
```

例如，如果名为 `github` 的服务器暴露了一个名为 `review` 的提示词，可以通过 `/mcp__github__review` 调用。

## 服务器去重

当同一个 MCP 服务器在多个作用域（本地、项目、用户）定义时，本地配置优先。这允许你用本地自定义设置覆盖项目级或用户级的 MCP 设置而不产生冲突。

## 通过 @ 提及引用 MCP 资源

你可以使用 `@` 提及语法在提示词中直接引用 MCP 资源：

```
@server-name:protocol://resource/path
```

例如，引用特定的数据库资源：

```
@database:postgres://mydb/users
```

这允许 Claude 获取并内联包含 MCP 资源内容作为对话上下文的一部分。

## MCP 作用域

MCP 配置可以存储在不同的作用域，具有不同的共享级别：

| 作用域 | 位置 | 描述 | 共享对象 | 需要审批 |
|--------|------|------|----------|----------|
| **本地**（默认） | `~/.claude.json`（项目路径下） | 仅限当前用户、当前项目（旧版本中称为 `project`） | 仅自己 | 否 |
| **项目** | `.mcp.json` | 提交到 git 仓库 | 团队成员 | 是（首次使用） |
| **用户** | `~/.claude.json` | 跨所有项目可用（旧版本中称为 `global`） | 仅自己 | 否 |

### 使用项目作用域

在 `.mcp.json` 中存储项目特定的 MCP 配置：

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp"
    }
  }
}
```

团队成员首次使用项目 MCP 时会看到审批提示。

## MCP 配置管理

### 添加 MCP 服务器

```bash
# 添加基于 HTTP 的服务器
claude mcp add --transport http github https://api.github.com/mcp

# 添加本地 stdio 服务器
claude mcp add --transport stdio database -- npx @company/db-server

# 列出所有 MCP 服务器
claude mcp list

# 获取特定服务器的详情
claude mcp get github

# 移除 MCP 服务器
claude mcp remove github

# 重置项目特定的审批选择
claude mcp reset-project-choices

# 从 Claude Desktop 导入
claude mcp add-from-claude-desktop
```

## 可用 MCP 服务器表

| MCP 服务器 | 用途 | 常用工具 | 认证方式 | 实时性 |
|------------|------|----------|----------|--------|
| **Filesystem** | 文件操作 | read、write、delete | 操作系统权限 | 是 |
| **GitHub** | 仓库管理 | list_prs、create_issue、push | OAuth | 是 |
| **Slack** | 团队通信 | send_message、list_channels | Token | 是 |
| **Database** | SQL 查询 | query、insert、update | 凭据 | 是 |
| **Google Docs** | 文档访问 | read、write、share | OAuth | 是 |
| **Asana** | 项目管理 | create_task、update_status | API Key | 是 |
| **Stripe** | 支付数据 | list_charges、create_invoice | API Key | 是 |
| **Memory** | 持久记忆 | store、retrieve、delete | 本地 | 否 |

## 实际示例

### 示例 1：GitHub MCP 配置

**文件：** `.mcp.json`（项目根目录）

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**可用的 GitHub MCP 工具：**

#### Pull Request 管理
- `list_prs` — 列出仓库中的所有 PR
- `get_pr` — 获取 PR 详情（包括 diff）
- `create_pr` — 创建新 PR
- `update_pr` — 更新 PR 描述/标题
- `merge_pr` — 将 PR 合并到主分支
- `review_pr` — 添加审查评论

**示例请求：**
```
/mcp__github__get_pr 456

# 返回：
Title: Add dark mode support
Author: @alice
Description: Implements dark theme using CSS variables
Status: OPEN
Reviewers: @bob, @charlie
```

#### Issue 管理
- `list_issues` — 列出所有 issue
- `get_issue` — 获取 issue 详情
- `create_issue` — 创建新 issue
- `close_issue` — 关闭 issue
- `add_comment` — 为 issue 添加评论

#### 仓库信息
- `get_repo_info` — 仓库详情
- `list_files` — 文件树结构
- `get_file_content` — 读取文件内容
- `search_code` — 跨代码库搜索

#### 提交操作
- `list_commits` — 提交历史
- `get_commit` — 特定提交详情
- `create_commit` — 创建新提交

**设置**：
```bash
export GITHUB_TOKEN="your_github_token"
# 或使用 CLI 直接添加：
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

### 配置中的环境变量展开

MCP 配置支持带回退默认值的环境变量展开。`${VAR}` 和 `${VAR:-default}` 语法适用于以下字段：`command`、`args`、`env`、`url` 和 `headers`。

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}",
        "X-Custom-Header": "${CUSTOM_HEADER:-default-value}"
      }
    },
    "local-server": {
      "command": "${MCP_BIN_PATH:-npx}",
      "args": ["${MCP_PACKAGE:-@company/mcp-server}"],
      "env": {
        "DB_URL": "${DATABASE_URL:-postgresql://localhost/dev}"
      }
    }
  }
}
```

变量在运行时展开：
- `${VAR}` — 使用环境变量，未设置则报错
- `${VAR:-default}` — 使用环境变量，未设置则回退到默认值

### 示例 2：数据库 MCP 设置

**配置：**

```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-database"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

**使用示例：**

```markdown
用户: 查找订单超过 10 个的所有用户

Claude: 我将查询你的数据库来找到相关信息。

# 使用 MCP 数据库工具：
SELECT u.*, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING COUNT(o.id) > 10
ORDER BY order_count DESC;

# 结果：
- Alice: 15 个订单
- Bob: 12 个订单
- Charlie: 11 个订单
```

**设置**：
```bash
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
# 或使用 CLI 直接添加：
claude mcp add --transport stdio database -- npx @modelcontextprotocol/server-database
```

### 示例 3：多 MCP 工作流

**场景：每日报告生成**

```markdown
# 使用多个 MCP 的每日报告工作流

## 设置
1. GitHub MCP — 获取 PR 指标
2. 数据库 MCP — 查询销售数据
3. Slack MCP — 发布报告
4. 文件系统 MCP — 保存报告

## 工作流

### 步骤 1：获取 GitHub 数据
/mcp__github__list_prs completed:true last:7days

输出：
- PR 总数: 42
- 平均合并时间: 2.3 小时
- 审查周转时间: 1.1 小时

### 步骤 2：查询数据库
SELECT COUNT(*) as sales, SUM(amount) as revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '1 day'

输出：
- 销售量: 247
- 收入: $12,450

### 步骤 3：生成报告
将数据合并为 HTML 报告

### 步骤 4：保存到文件系统
将 report.html 写入 /reports/

### 步骤 5：发布到 Slack
将摘要发送到 #daily-reports 频道

最终输出：
报告已生成并发布
本周合并 47 个 PR
每日销售额 $12,450
```

**设置**：
```bash
export GITHUB_TOKEN="your_github_token"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="your_slack_token"
# 通过 CLI 添加每个 MCP 服务器或在 .mcp.json 中配置
```

### 示例 4：文件系统 MCP 操作

**配置：**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
```

**可用操作：**

| 操作 | 命令 | 用途 |
|------|------|------|
| 列出文件 | `ls ~/projects` | 显示目录内容 |
| 读取文件 | `cat src/main.ts` | 读取文件内容 |
| 写入文件 | `create docs/api.md` | 创建新文件 |
| 编辑文件 | `edit src/app.ts` | 修改文件 |
| 搜索 | `grep "async function"` | 在文件中搜索 |
| 删除 | `rm old-file.js` | 删除文件 |

**设置**：
```bash
# 使用 CLI 直接添加：
claude mcp add --transport stdio filesystem -- npx @modelcontextprotocol/server-filesystem /home/user/projects
```

## MCP vs 记忆：决策矩阵

```mermaid
graph TD
    A["需要外部数据？"]
    A -->|否| B["使用记忆"]
    A -->|是| C["数据是否频繁变化？"]
    C -->|否/很少| B
    C -->|是/经常| D["使用 MCP"]

    B -->|存储| E["偏好设置<br/>上下文<br/>历史记录"]
    D -->|访问| F["实时 API<br/>数据库<br/>服务"]

    style A fill:#fff3e0,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#fff3e0,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#e8f5e9,stroke:#333,color:#333
    style F fill:#e8f5e9,stroke:#333,color:#333
```

## 请求/响应模式

```mermaid
sequenceDiagram
    participant App as Claude
    participant MCP as MCP 服务器
    participant DB as 数据库

    App->>MCP: 请求: "SELECT * FROM users WHERE id=1"
    MCP->>DB: 执行查询
    DB-->>MCP: 结果集
    MCP-->>App: 返回解析后的数据
    App->>App: 处理结果
    App->>App: 继续任务

    Note over MCP,DB: 实时访问<br/>无缓存
```

## 环境变量

将敏感凭据存储在环境变量中：

```bash
# ~/.bashrc 或 ~/.zshrc
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxx"
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
export SLACK_TOKEN="xoxb-xxxxxxxxxxxxx"
```

然后在 MCP 配置中引用：

```json
{
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"
  }
}
```

## Claude 作为 MCP 服务器 (`claude mcp serve`)

Claude Code 本身可以作为 MCP 服务器为其他应用程序提供服务。这使外部工具、编辑器和自动化系统能够通过标准 MCP 协议利用 Claude 的能力。

```bash
# 在 stdio 上启动 Claude Code 作为 MCP 服务器
claude mcp serve
```

其他应用程序可以像连接任何基于 stdio 的 MCP 服务器一样连接到此服务器。例如，在另一个 Claude Code 实例中将 Claude Code 添加为 MCP 服务器：

```bash
claude mcp add --transport stdio claude-agent -- claude mcp serve
```

这对于构建一个 Claude 实例编排另一个实例的多代理工作流非常有用。

## 受管 MCP 配置（企业版）

对于企业部署，IT 管理员可以通过 `managed-mcp.json` 配置文件强制执行 MCP 服务器策略。此文件提供对组织范围内允许或阻止哪些 MCP 服务器的独占控制。

**位置：**
- macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
- Linux: `~/.config/ClaudeCode/managed-mcp.json`
- Windows: `%APPDATA%\ClaudeCode\managed-mcp.json`

**功能：**
- `allowedMcpServers` — 允许的服务器白名单
- `deniedMcpServers` — 禁止的服务器黑名单
- 支持按服务器名称、命令和 URL 模式匹配
- 在用户配置之前强制执行组织级 MCP 策略
- 防止未经授权的服务器连接

**配置示例：**

```json
{
  "allowedMcpServers": [
    {
      "serverName": "github",
      "serverUrl": "https://api.github.com/mcp"
    },
    {
      "serverName": "company-internal",
      "serverCommand": "company-mcp-server"
    }
  ],
  "deniedMcpServers": [
    {
      "serverName": "untrusted-*"
    },
    {
      "serverUrl": "http://*"
    }
  ]
}
```

> **注意：** 当 `allowedMcpServers` 和 `deniedMcpServers` 同时匹配一个服务器时，拒绝规则优先。

## 插件提供的 MCP 服务器

插件可以捆绑自己的 MCP 服务器，在插件安装后自动可用。插件提供的 MCP 服务器可以通过两种方式定义：

1. **独立的 `.mcp.json`** — 在插件根目录放置 `.mcp.json` 文件
2. **内联在 `plugin.json` 中** — 直接在插件清单中定义 MCP 服务器

使用 `${CLAUDE_PLUGIN_ROOT}` 变量引用相对于插件安装目录的路径：

```json
{
  "mcpServers": {
    "plugin-tools": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/dist/mcp-server.js"],
      "env": {
        "CONFIG_PATH": "${CLAUDE_PLUGIN_ROOT}/config.json"
      }
    }
  }
}
```

## 子代理作用域的 MCP

MCP 服务器可以使用 `mcpServers:` 键在代理（Agent）前置元数据中内联定义，将其作用域限定在特定的子代理（Subagent）而非整个项目。当代理需要访问其他工作流中的代理不需要的特定 MCP 服务器时，这非常有用。

```yaml
---
mcpServers:
  my-tool:
    type: http
    url: https://my-tool.example.com/mcp
---

You are an agent with access to my-tool for specialized operations.
```

子代理作用域的 MCP 服务器仅在该代理的执行上下文中可用，不与父代理或兄弟代理共享。

## MCP 输出限制

Claude Code 对 MCP 工具输出执行限制以防止上下文溢出：

| 限制 | 阈值 | 行为 |
|------|------|------|
| **警告** | 10,000 令牌 | 显示输出过大的警告 |
| **默认上限** | 25,000 令牌 | 超出此限制的输出会被截断 |
| **磁盘持久化** | 50,000 字符 | 超过 50K 字符的工具结果会持久化到磁盘 |

最大输出限制可通过 `MAX_MCP_OUTPUT_TOKENS` 环境变量配置：

```bash
# 将最大输出增加到 50,000 令牌
export MAX_MCP_OUTPUT_TOKENS=50000
```

## 通过代码执行解决上下文膨胀

随着 MCP 使用规模扩大，连接数十个服务器和数百甚至数千个工具会带来一个重大挑战：**上下文膨胀**。这可以说是 MCP 规模化使用中最大的问题，Anthropic 的工程团队提出了一个优雅的解决方案 — 使用代码执行替代直接工具调用。

> **来源**：[Code Execution with MCP: Building More Efficient Agents](https://www.anthropic.com/engineering/code-execution-with-mcp) — Anthropic 工程博客

### 问题：令牌浪费的两个来源

**1. 工具定义占满上下文窗口**

大多数 MCP 客户端在启动时加载所有工具定义。当连接数千个工具时，模型在读取用户请求之前就必须处理数十万个令牌。

**2. 中间结果消耗额外令牌**

每个中间工具结果都经过模型的上下文。考虑将会议记录从 Google Drive 传输到 Salesforce — 完整的记录流经上下文**两次**：一次是读取时，一次是写入目标时。一个 2 小时的会议记录可能意味着 50,000+ 的额外令牌。

```mermaid
graph LR
    A["模型"] -->|"工具调用: getDocument"| B["MCP 服务器"]
    B -->|"完整记录 (50K 令牌)"| A
    A -->|"工具调用: updateRecord<br/>（重新发送完整记录）"| B
    B -->|"确认"| A

    style A fill:#ffcdd2,stroke:#333,color:#333
    style B fill:#f3e5f5,stroke:#333,color:#333
```

### 解决方案：将 MCP 工具作为代码 API

代理不再通过上下文窗口传递工具定义和结果，而是**编写代码**以 API 方式调用 MCP 工具。代码在沙盒执行环境中运行，只有最终结果返回给模型。

```mermaid
graph LR
    A["模型"] -->|"编写代码"| B["代码执行<br/>环境"]
    B -->|"直接调用工具"| C["MCP 服务器"]
    C -->|"数据留在<br/>执行环境中"| B
    B -->|"仅最终结果<br/>（最少令牌）"| A

    style A fill:#c8e6c9,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#f3e5f5,stroke:#333,color:#333
```

#### 工作原理

MCP 工具以类型化函数的文件树形式呈现：

```
servers/
├── google-drive/
│   ├── getDocument.ts
│   └── index.ts
├── salesforce/
│   ├── updateRecord.ts
│   └── index.ts
└── ...
```

每个工具文件包含一个类型化的包装器：

```typescript
// ./servers/google-drive/getDocument.ts
import { callMCPTool } from "../../../client.js";

interface GetDocumentInput {
  documentId: string;
}

interface GetDocumentResponse {
  content: string;
}

export async function getDocument(
  input: GetDocumentInput
): Promise<GetDocumentResponse> {
  return callMCPTool<GetDocumentResponse>(
    'google_drive__get_document', input
  );
}
```

代理然后编写代码来编排工具：

```typescript
import * as gdrive from './servers/google-drive';
import * as salesforce from './servers/salesforce';

// 数据直接在工具间流转 — 不经过模型
const transcript = (
  await gdrive.getDocument({ documentId: 'abc123' })
).content;

await salesforce.updateRecord({
  objectType: 'SalesMeeting',
  recordId: '00Q5f000001abcXYZ',
  data: { Notes: transcript }
});
```

**结果：令牌使用量从约 150,000 降到约 2,000 — 减少 98.7%。**

### 核心优势

| 优势 | 描述 |
|------|------|
| **渐进式披露** | 代理浏览文件系统，仅加载所需的工具定义，而非一次性加载所有工具 |
| **上下文高效的结果** | 数据在执行环境中过滤/转换后再返回模型 |
| **强大的控制流** | 循环、条件和错误处理在代码中运行，无需往返模型 |
| **隐私保护** | 中间数据（PII、敏感记录）留在执行环境中；不进入模型上下文 |
| **状态持久化** | 代理可以将中间结果保存到文件并构建可复用的技能函数 |

#### 示例：过滤大型数据集

```typescript
// 不使用代码执行 — 所有 10,000 行流经上下文
// TOOL CALL: gdrive.getSheet(sheetId: 'abc123')
//   -> 返回 10,000 行到上下文中

// 使用代码执行 — 在执行环境中过滤
const allRows = await gdrive.getSheet({ sheetId: 'abc123' });
const pendingOrders = allRows.filter(
  row => row["Status"] === 'pending'
);
console.log(`Found ${pendingOrders.length} pending orders`);
console.log(pendingOrders.slice(0, 5)); // 只有 5 行到达模型
```

#### 示例：无需往返的循环

```typescript
// 轮询部署通知 — 完全在代码中运行
let found = false;
while (!found) {
  const messages = await slack.getChannelHistory({
    channel: 'C123456'
  });
  found = messages.some(
    m => m.text.includes('deployment complete')
  );
  if (!found) await new Promise(r => setTimeout(r, 5000));
}
console.log('Deployment notification received');
```

### 需要权衡的因素

代码执行引入了自身的复杂性。运行代理生成的代码需要：

- 具有适当资源限制的**安全沙盒执行环境**
- 对已执行代码的**监控和日志记录**
- 相比直接工具调用额外的**基础设施开销**

这些优势 — 降低令牌成本、更低延迟、改进工具组合 — 应与这些实现成本进行权衡。对于只有少数 MCP 服务器的代理，直接工具调用可能更简单。对于大规模代理（数十个服务器、数百个工具），代码执行是一个显著的改进。

### MCPorter：MCP 工具组合的运行时

[MCPorter](https://github.com/steipete/mcporter) 是一个 TypeScript 运行时和 CLI 工具包，使调用 MCP 服务器无需样板代码即可实现 — 并通过选择性工具暴露和类型化包装器帮助减少上下文膨胀。

**解决的问题：** MCPorter 允许你按需发现、检查和调用特定工具，而不是预先加载所有 MCP 服务器的所有工具定义 — 保持上下文精简。

**核心功能：**

| 功能 | 描述 |
|------|------|
| **零配置发现** | 自动发现来自 Cursor、Claude、Codex 或本地配置的 MCP 服务器 |
| **类型化工具客户端** | `mcporter emit-ts` 生成 `.d.ts` 接口和可直接运行的包装器 |
| **可组合 API** | `createServerProxy()` 将工具暴露为 camelCase 方法，带有 `.text()`、`.json()`、`.markdown()` 辅助方法 |
| **CLI 生成** | `mcporter generate-cli` 将任何 MCP 服务器转换为独立 CLI，支持 `--include-tools` / `--exclude-tools` 过滤 |
| **参数隐藏** | 可选参数默认隐藏，减少 schema 冗余 |

**安装：**

```bash
npx mcporter list          # 无需安装 — 立即发现服务器
pnpm add mcporter          # 添加到项目
brew install steipete/tap/mcporter  # macOS 通过 Homebrew 安装
```

**示例 — 在 TypeScript 中组合工具：**

```typescript
import { createRuntime, createServerProxy } from "mcporter";

const runtime = await createRuntime();
const gdrive = createServerProxy(runtime, "google-drive");
const salesforce = createServerProxy(runtime, "salesforce");

// 数据在工具间流转，不经过模型上下文
const doc = await gdrive.getDocument({ documentId: "abc123" });
await salesforce.updateRecord({
  objectType: "SalesMeeting",
  recordId: "00Q5f000001abcXYZ",
  data: { Notes: doc.text() }
});
```

**示例 — CLI 工具调用：**

```bash
# 直接调用特定工具
npx mcporter call linear.create_comment issueId:ENG-123 body:'Looks good!'

# 列出可用的服务器和工具
npx mcporter list
```

MCPorter 通过提供以类型化 API 方式调用 MCP 工具的运行时基础设施，补充了上述代码执行方法 — 使中间数据远离模型上下文变得简单直接。

## 最佳实践

### 安全注意事项

#### 推荐做法
- 对所有凭据使用环境变量
- 定期轮换令牌和 API 密钥（建议每月）
- 尽可能使用只读令牌
- 将 MCP 服务器访问范围限制到最小所需
- 监控 MCP 服务器使用情况和访问日志
- 可用时使用 OAuth 进行外部服务认证
- 对 MCP 请求实施速率限制
- 生产使用前测试 MCP 连接
- 记录所有活跃的 MCP 连接
- 保持 MCP 服务器包更新

#### 避免做法
- 不要在配置文件中硬编码凭据
- 不要将令牌或密钥提交到 git
- 不要在团队聊天或邮件中共享令牌
- 不要对团队项目使用个人令牌
- 不要授予不必要的权限
- 不要忽略认证错误
- 不要公开暴露 MCP 端点
- 不要以 root/admin 权限运行 MCP 服务器
- 不要在日志中缓存敏感数据
- 不要禁用认证机制

### 配置最佳实践

1. **版本控制**：将 `.mcp.json` 纳入 git 但使用环境变量存储密钥
2. **最小权限**：为每个 MCP 服务器授予最小所需权限
3. **隔离**：尽可能在独立进程中运行不同的 MCP 服务器
4. **监控**：记录所有 MCP 请求和错误以便审计
5. **测试**：生产部署前测试所有 MCP 配置

### 性能建议

- 在应用层面缓存频繁访问的数据
- 使用具体的 MCP 查询以减少数据传输
- 监控 MCP 操作的响应时间
- 考虑对外部 API 的速率限制
- 执行多个操作时使用批处理

## 安装说明

### 前置条件
- 已安装 Node.js 和 npm
- 已安装 Claude Code CLI
- 外部服务的 API 令牌/凭据

### 分步设置

1. 使用 CLI **添加你的第一个 MCP 服务器**（示例：GitHub）：
```bash
claude mcp add --transport stdio github -- npx @modelcontextprotocol/server-github
```

   或在项目根目录创建 `.mcp.json` 文件：
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

2. **设置环境变量：**
```bash
export GITHUB_TOKEN="your_github_personal_access_token"
```

3. **测试连接：**
```bash
claude /mcp
```

4. **使用 MCP 工具：**
```bash
/mcp__github__list_prs
/mcp__github__create_issue "Title" "Description"
```

### 特定服务的安装

**GitHub MCP：**
```bash
npm install -g @modelcontextprotocol/server-github
```

**数据库 MCP：**
```bash
npm install -g @modelcontextprotocol/server-database
```

**文件系统 MCP：**
```bash
npm install -g @modelcontextprotocol/server-filesystem
```

**Slack MCP：**
```bash
npm install -g @modelcontextprotocol/server-slack
```

## 故障排除

### MCP 服务器未找到
```bash
# 验证 MCP 服务器是否已安装
npm list -g @modelcontextprotocol/server-github

# 缺失时安装
npm install -g @modelcontextprotocol/server-github
```

### 认证失败
```bash
# 验证环境变量是否设置
echo $GITHUB_TOKEN

# 需要时重新导出
export GITHUB_TOKEN="your_token"

# 验证令牌是否有正确的权限
# 在以下地址检查 GitHub 令牌权限: https://github.com/settings/tokens
```

### 连接超时
- 检查网络连接：`ping api.github.com`
- 验证 API 端点是否可访问
- 检查 API 的速率限制
- 尝试在配置中增加超时时间
- 检查防火墙或代理问题

### MCP 服务器崩溃
- 检查 MCP 服务器日志：`~/.claude/logs/`
- 验证所有环境变量是否已设置
- 确保正确的文件权限
- 尝试重新安装 MCP 服务器包
- 检查是否有冲突的进程占用相同端口

## 相关概念

### 记忆 vs MCP
- **记忆**：存储持久化的、不变的数据（偏好、上下文、历史）
- **MCP**：访问实时的、变化的数据（API、数据库、实时服务）

### 何时使用
- **使用记忆**：用户偏好、对话历史、学习的上下文
- **使用 MCP**：当前的 GitHub issue、实时数据库查询、实时数据

### 与其他 Claude 功能的集成
- 将 MCP 与记忆结合以获得丰富的上下文
- 在提示词中使用 MCP 工具以获得更好的推理
- 利用多个 MCP 实现复杂工作流

## 其他资源

- [官方 MCP 文档](https://code.claude.com/docs/en/mcp)
- [MCP 协议规范](https://modelcontextprotocol.io/specification)
- [MCP GitHub 仓库](https://github.com/modelcontextprotocol/servers)
- [可用的 MCP 服务器](https://github.com/modelcontextprotocol/servers)
- [MCPorter](https://github.com/steipete/mcporter) — 无样板代码调用 MCP 服务器的 TypeScript 运行时和 CLI
- [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) — Anthropic 关于解决上下文膨胀的工程博客
- [Claude Code CLI 参考](https://code.claude.com/docs/en/cli-reference)
- [Claude API 文档](https://docs.anthropic.com)
