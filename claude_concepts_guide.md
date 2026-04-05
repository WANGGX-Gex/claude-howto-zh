<picture>
  <source media="(prefers-color-scheme: dark)" srcset="resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="resources/logos/claude-howto-logo.svg">
</picture>

# Claude 概念完全指南

一份涵盖斜杠命令（Slash Command）、子代理（Subagent）、记忆（Memory）、MCP 协议、代理技能（Skill）的综合参考指南，包含表格、图表和实用示例。

---

## 目录

1. [斜杠命令](#斜杠命令)
2. [子代理](#子代理)
3. [记忆](#记忆)
4. [MCP 协议](#mcp-协议)
5. [代理技能](#代理技能)
6. [插件](#claude-code-插件)
7. [钩子](#钩子)
8. [检查点与回退](#检查点与回退)
9. [高级功能](#高级功能)
10. [对比与集成](#对比与集成)

---

## 斜杠命令

### 概述

斜杠命令是以 Markdown 文件形式存储的用户调用快捷方式，Claude Code 可以执行这些命令。它们使团队能够标准化常用的提示词（Prompt）和工作流。

### 架构

```mermaid
graph TD
    A["用户输入：/command-name"] -->|触发| B["搜索 .claude/commands/"]
    B -->|找到| C["command-name.md"]
    C -->|加载| D["Markdown 内容"]
    D -->|执行| E["Claude 处理提示词"]
    E -->|返回| F["结果进入上下文"]
```

### 文件结构

```mermaid
graph LR
    A["项目根目录"] -->|包含| B[".claude/commands/"]
    B -->|包含| C["optimize.md"]
    B -->|包含| D["test.md"]
    B -->|包含| E["docs/"]
    E -->|包含| F["generate-api-docs.md"]
    E -->|包含| G["generate-readme.md"]
```

### 命令组织表

| 位置 | 作用域 | 可用范围 | 用例 | Git 追踪 |
|------|--------|---------|------|----------|
| `.claude/commands/` | 项目级 | 团队成员 | 团队工作流、共享标准 | ✅ 是 |
| `~/.claude/commands/` | 个人级 | 单个用户 | 跨项目的个人快捷方式 | ❌ 否 |
| 子目录 | 命名空间化 | 取决于父级 | 按类别组织 | ✅ 是 |

### 功能与能力

| 功能 | 示例 | 支持 |
|------|------|------|
| Shell 脚本执行 | `bash scripts/deploy.sh` | ✅ 是 |
| 文件引用 | `@path/to/file.js` | ✅ 是 |
| Bash 集成 | `$(git log --oneline)` | ✅ 是 |
| 参数 | `/pr --verbose` | ✅ 是 |
| MCP 命令 | `/mcp__github__list_prs` | ✅ 是 |

### 实用示例

#### 示例 1：代码优化命令

**文件：** `.claude/commands/optimize.md`

```markdown
---
name: Code Optimization
description: Analyze code for performance issues and suggest optimizations
tags: performance, analysis
---

# Code Optimization

Review the provided code for the following issues in order of priority:

1. **Performance bottlenecks** - identify O(n²) operations, inefficient loops
2. **Memory leaks** - find unreleased resources, circular references
3. **Algorithm improvements** - suggest better algorithms or data structures
4. **Caching opportunities** - identify repeated computations
5. **Concurrency issues** - find race conditions or threading problems

Format your response with:
- Issue severity (Critical/High/Medium/Low)
- Location in code
- Explanation
- Recommended fix with code example
```

**用法：**
```bash
# 用户在 Claude Code 中输入
/optimize

# Claude 加载提示词并等待代码输入
```

#### 示例 2：Pull Request 辅助命令

**文件：** `.claude/commands/pr.md`

```markdown
---
name: Prepare Pull Request
description: Clean up code, stage changes, and prepare a pull request
tags: git, workflow
---

# Pull Request Preparation Checklist

Before creating a PR, execute these steps:

1. Run linting: `prettier --write .`
2. Run tests: `npm test`
3. Review git diff: `git diff HEAD`
4. Stage changes: `git add .`
5. Create commit message following conventional commits:
   - `fix:` for bug fixes
   - `feat:` for new features
   - `docs:` for documentation
   - `refactor:` for code restructuring
   - `test:` for test additions
   - `chore:` for maintenance

6. Generate PR summary including:
   - What changed
   - Why it changed
   - Testing performed
   - Potential impacts
```

**用法：**
```bash
/pr

# Claude 按照清单逐步执行并准备 PR
```

#### 示例 3：层级化文档生成器

**文件：** `.claude/commands/docs/generate-api-docs.md`

```markdown
---
name: Generate API Documentation
description: Create comprehensive API documentation from source code
tags: documentation, api
---

# API Documentation Generator

Generate API documentation by:

1. Scanning all files in `/src/api/`
2. Extracting function signatures and JSDoc comments
3. Organizing by endpoint/module
4. Creating markdown with examples
5. Including request/response schemas
6. Adding error documentation

Output format:
- Markdown file in `/docs/api.md`
- Include curl examples for all endpoints
- Add TypeScript types
```

### 命令生命周期图

```mermaid
sequenceDiagram
    participant User as 用户
    participant Claude as Claude Code
    participant FS as 文件系统
    participant CLI as Shell/Bash

    User->>Claude: 输入 /optimize
    Claude->>FS: 搜索 .claude/commands/
    FS-->>Claude: 返回 optimize.md
    Claude->>Claude: 加载 Markdown 内容
    Claude->>User: 显示提示词上下文
    User->>Claude: 提供要分析的代码
    Claude->>CLI: （可能执行脚本）
    CLI-->>Claude: 结果
    Claude->>User: 返回分析结果
```

### 最佳实践

| ✅ 推荐做法 | ❌ 不推荐做法 |
|------------|-------------|
| 使用清晰、面向操作的名称 | 为一次性任务创建命令 |
| 在描述中记录触发词 | 在命令中构建复杂逻辑 |
| 保持命令专注于单一任务 | 创建冗余命令 |
| 对项目命令进行版本控制 | 硬编码敏感信息 |
| 使用子目录组织 | 创建过长的命令列表 |
| 使用简单、可读的提示词 | 使用缩写或含义模糊的措辞 |

---

## 子代理

### 概述

子代理是具有隔离上下文窗口（Context Window）和自定义系统提示词的专业化 AI 助手。它们支持委派式任务执行，同时保持清晰的关注点分离。

### 架构图

```mermaid
graph TB
    User["👤 用户"]
    Main["🎯 主代理<br/>（协调器）"]
    Reviewer["🔍 代码审查<br/>子代理"]
    Tester["✅ 测试工程师<br/>子代理"]
    Docs["📝 文档编写<br/>子代理"]

    User -->|请求| Main
    Main -->|委派| Reviewer
    Main -->|委派| Tester
    Main -->|委派| Docs
    Reviewer -->|返回结果| Main
    Tester -->|返回结果| Main
    Docs -->|返回结果| Main
    Main -->|综合| User
```

### 子代理生命周期

```mermaid
sequenceDiagram
    participant User as 用户
    participant MainAgent as 主代理
    participant CodeReviewer as 代码审查<br/>子代理
    participant Context as 独立<br/>上下文窗口

    User->>MainAgent: "构建新的认证功能"
    MainAgent->>MainAgent: 分析任务
    MainAgent->>CodeReviewer: "审查这段代码"
    CodeReviewer->>Context: 初始化干净上下文
    Context->>CodeReviewer: 加载审查指令
    CodeReviewer->>CodeReviewer: 执行审查
    CodeReviewer-->>MainAgent: 返回发现
    MainAgent->>MainAgent: 整合结果
    MainAgent-->>User: 提供综合报告
```

### 子代理配置表

| 配置项 | 类型 | 用途 | 示例 |
|--------|------|------|------|
| `name` | String | 代理标识符 | `code-reviewer` |
| `description` | String | 用途和触发词 | `Comprehensive code quality analysis` |
| `tools` | List/String | 允许的能力 | `read, grep, diff, lint_runner` |
| `system_prompt` | Markdown | 行为指令 | 自定义指南 |

### 工具访问层级

```mermaid
graph TD
    A["子代理配置"] -->|选项 1| B["继承主线程的<br/>所有工具"]
    A -->|选项 2| C["指定单独的工具"]
    B -->|包含| B1["文件操作"]
    B -->|包含| B2["Shell 命令"]
    B -->|包含| B3["MCP 工具"]
    C -->|显式列表| C1["read, grep, diff"]
    C -->|显式列表| C2["Bash(npm:*), Bash(test:*)"]
```

### 实用示例

#### 示例 1：完整的子代理配置

**文件：** `.claude/agents/code-reviewer.md`

```yaml
---
name: code-reviewer
description: Comprehensive code quality and maintainability analysis
tools: read, grep, diff, lint_runner
---

# Code Reviewer Agent

You are an expert code reviewer specializing in:
- Performance optimization
- Security vulnerabilities
- Code maintainability
- Testing coverage
- Design patterns

## Review Priorities (in order)

1. **Security Issues** - Authentication, authorization, data exposure
2. **Performance Problems** - O(n²) operations, memory leaks, inefficient queries
3. **Code Quality** - Readability, naming, documentation
4. **Test Coverage** - Missing tests, edge cases
5. **Design Patterns** - SOLID principles, architecture

## Review Output Format

For each issue:
- **Severity**: Critical / High / Medium / Low
- **Category**: Security / Performance / Quality / Testing / Design
- **Location**: File path and line number
- **Issue Description**: What's wrong and why
- **Suggested Fix**: Code example
- **Impact**: How this affects the system

## Example Review

### Issue: N+1 Query Problem
- **Severity**: High
- **Category**: Performance
- **Location**: src/user-service.ts:45
- **Issue**: Loop executes database query in each iteration
- **Fix**: Use JOIN or batch query
```

**文件：** `.claude/agents/test-engineer.md`

```yaml
---
name: test-engineer
description: Test strategy, coverage analysis, and automated testing
tools: read, write, bash, grep
---

# Test Engineer Agent

You are expert at:
- Writing comprehensive test suites
- Ensuring high code coverage (>80%)
- Testing edge cases and error scenarios
- Performance benchmarking
- Integration testing

## Testing Strategy

1. **Unit Tests** - Individual functions/methods
2. **Integration Tests** - Component interactions
3. **End-to-End Tests** - Complete workflows
4. **Edge Cases** - Boundary conditions
5. **Error Scenarios** - Failure handling

## Test Output Requirements

- Use Jest for JavaScript/TypeScript
- Include setup/teardown for each test
- Mock external dependencies
- Document test purpose
- Include performance assertions when relevant

## Coverage Requirements

- Minimum 80% code coverage
- 100% for critical paths
- Report missing coverage areas
```

**文件：** `.claude/agents/documentation-writer.md`

```yaml
---
name: documentation-writer
description: Technical documentation, API docs, and user guides
tools: read, write, grep
---

# Documentation Writer Agent

You create:
- API documentation with examples
- User guides and tutorials
- Architecture documentation
- Changelog entries
- Code comment improvements

## Documentation Standards

1. **Clarity** - Use simple, clear language
2. **Examples** - Include practical code examples
3. **Completeness** - Cover all parameters and returns
4. **Structure** - Use consistent formatting
5. **Accuracy** - Verify against actual code

## Documentation Sections

### For APIs
- Description
- Parameters (with types)
- Returns (with types)
- Throws (possible errors)
- Examples (curl, JavaScript, Python)
- Related endpoints

### For Features
- Overview
- Prerequisites
- Step-by-step instructions
- Expected outcomes
- Troubleshooting
- Related topics
```

#### 示例 2：子代理委派实战

```markdown
# 场景：构建支付功能

## 用户请求
"构建一个与 Stripe 集成的安全支付处理功能"

## 主代理流程

1. **规划阶段**
   - 理解需求
   - 确定所需任务
   - 规划架构

2. **委派给代码审查子代理**
   - 任务："审查支付处理实现的安全性"
   - 上下文：认证、API 密钥、令牌处理
   - 审查：SQL 注入、密钥泄露、HTTPS 强制执行

3. **委派给测试工程师子代理**
   - 任务："为支付流程创建全面测试"
   - 上下文：成功场景、失败场景、边界用例
   - 创建测试：有效支付、拒绝卡片、网络故障、Webhook

4. **委派给文档编写子代理**
   - 任务："编写支付 API 端点文档"
   - 上下文：请求/响应模式
   - 产出：包含 curl 示例和错误码的 API 文档

5. **综合**
   - 主代理收集所有输出
   - 整合发现
   - 向用户返回完整解决方案
```

#### 示例 3：工具权限范围控制

**限制性配置 — 限于特定命令**

```yaml
---
name: secure-reviewer
description: Security-focused code review with minimal permissions
tools: read, grep
---

# Secure Code Reviewer

Reviews code for security vulnerabilities only.

This agent:
- ✅ Reads files to analyze
- ✅ Searches for patterns
- ❌ Cannot execute code
- ❌ Cannot modify files
- ❌ Cannot run tests

This ensures the reviewer doesn't accidentally break anything.
```

**扩展性配置 — 用于实现的全部工具**

```yaml
---
name: implementation-agent
description: Full implementation capabilities for feature development
tools: read, write, bash, grep, edit, glob
---

# Implementation Agent

Builds features from specifications.

This agent:
- ✅ Reads specifications
- ✅ Writes new code files
- ✅ Runs build commands
- ✅ Searches codebase
- ✅ Edits existing files
- ✅ Finds files matching patterns

Full capabilities for independent feature development.
```

### 子代理上下文管理

```mermaid
graph TB
    A["主代理上下文<br/>50,000 令牌"]
    B["子代理 1 上下文<br/>20,000 令牌"]
    C["子代理 2 上下文<br/>20,000 令牌"]
    D["子代理 3 上下文<br/>20,000 令牌"]

    A -->|干净上下文| B
    A -->|干净上下文| C
    A -->|干净上下文| D

    B -->|仅返回结果| A
    C -->|仅返回结果| A
    D -->|仅返回结果| A

    style A fill:#e1f5ff
    style B fill:#fff9c4
    style C fill:#fff9c4
    style D fill:#fff9c4
```

### 何时使用子代理

| 场景 | 使用子代理 | 原因 |
|------|-----------|------|
| 多步骤的复杂功能 | ✅ 是 | 分离关注点，防止上下文污染 |
| 快速代码审查 | ❌ 否 | 不必要的开销 |
| 并行任务执行 | ✅ 是 | 每个子代理有独立上下文 |
| 需要专业化能力 | ✅ 是 | 自定义系统提示词 |
| 长时间运行的分析 | ✅ 是 | 防止主上下文耗尽 |
| 单一任务 | ❌ 否 | 不必要地增加延迟 |

### 代理团队

代理团队协调多个代理处理相关任务。与一次委派一个子代理不同，代理团队允许主代理编排一组协作的代理，它们共享中间结果，朝着共同目标工作。这适用于大规模任务，如全栈功能开发，其中前端代理、后端代理和测试代理并行工作。

---

## 记忆

### 概述

记忆使 Claude 能够跨会话和对话保留上下文。它以两种形式存在：claude.ai 中的自动综合，以及 Claude Code 中基于文件系统的 CLAUDE.md。

### 记忆架构

```mermaid
graph TB
    A["Claude 会话"]
    B["用户输入"]
    C["记忆系统"]
    D["记忆存储"]

    B -->|用户提供信息| C
    C -->|每 24 小时综合| D
    D -->|自动加载| A
    A -->|使用上下文| C
```

### Claude Code 中的记忆层级（7 层）

Claude Code 从 7 个层级加载记忆，按优先级从高到低排列：

```mermaid
graph TD
    A["1. 托管策略<br/>企业管理员策略"] --> B["2. 项目记忆<br/>./CLAUDE.md"]
    B --> C["3. 项目规则<br/>.claude/rules/*.md"]
    C --> D["4. 用户记忆<br/>~/.claude/CLAUDE.md"]
    D --> E["5. 用户规则<br/>~/.claude/rules/*.md"]
    E --> F["6. 本地记忆<br/>.claude/local/CLAUDE.md"]
    F --> G["7. 自动记忆<br/>自动捕获的偏好"]

    style A fill:#fce4ec,stroke:#333,color:#333
    style B fill:#e1f5fe,stroke:#333,color:#333
    style C fill:#e1f5fe,stroke:#333,color:#333
    style D fill:#f3e5f5,stroke:#333,color:#333
    style E fill:#f3e5f5,stroke:#333,color:#333
    style F fill:#e8f5e9,stroke:#333,color:#333
    style G fill:#fff3e0,stroke:#333,color:#333
```

### 记忆位置表

| 层级 | 位置 | 作用域 | 优先级 | 共享 | 最佳用途 |
|------|------|--------|--------|------|---------|
| 1. 托管策略 | 企业管理员 | 组织 | 最高 | 所有组织用户 | 合规、安全策略 |
| 2. 项目 | `./CLAUDE.md` | 项目 | 高 | 团队（Git） | 团队标准、架构 |
| 3. 项目规则 | `.claude/rules/*.md` | 项目 | 高 | 团队（Git） | 模块化项目约定 |
| 4. 用户 | `~/.claude/CLAUDE.md` | 个人 | 中 | 仅个人 | 个人偏好 |
| 5. 用户规则 | `~/.claude/rules/*.md` | 个人 | 中 | 仅个人 | 个人规则模块 |
| 6. 本地 | `.claude/local/CLAUDE.md` | 本地 | 低 | 不共享 | 特定机器设置 |
| 7. 自动记忆 | 自动 | 会话 | 最低 | 仅个人 | 学习到的偏好和模式 |

### 自动记忆

自动记忆在会话中自动捕获用户偏好和观察到的模式。Claude 从你的交互中学习并记住：

- 编码风格偏好
- 你常做的修正
- 框架和工具选择
- 沟通风格偏好

自动记忆在后台工作，不需要手动配置。

### 记忆更新生命周期

```mermaid
sequenceDiagram
    participant User as 用户
    participant Claude as Claude Code
    participant Editor as 文件系统
    participant Memory as CLAUDE.md

    User->>Claude: "记住：使用 async/await"
    Claude->>User: "保存到哪个记忆文件？"
    User->>Claude: "项目记忆"
    Claude->>Editor: 打开 ~/.claude/settings.json
    Claude->>Memory: 写入 ./CLAUDE.md
    Memory-->>Claude: 文件已保存
    Claude->>Claude: 加载更新后的记忆
    Claude-->>User: "记忆已保存！"
```

### 实用示例

#### 示例 1：项目记忆结构

**文件：** `./CLAUDE.md`

```markdown
# Project Configuration

## Project Overview
- **Name**: E-commerce Platform
- **Tech Stack**: Node.js, PostgreSQL, React 18, Docker
- **Team Size**: 5 developers
- **Deadline**: Q4 2025

## Architecture
@docs/architecture.md
@docs/api-standards.md
@docs/database-schema.md

## Development Standards

### Code Style
- Use Prettier for formatting
- Use ESLint with airbnb config
- Maximum line length: 100 characters
- Use 2-space indentation

### Naming Conventions
- **Files**: kebab-case (user-controller.js)
- **Classes**: PascalCase (UserService)
- **Functions/Variables**: camelCase (getUserById)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL)
- **Database Tables**: snake_case (user_accounts)

### Git Workflow
- Branch names: `feature/description` or `fix/description`
- Commit messages: Follow conventional commits
- PR required before merge
- All CI/CD checks must pass
- Minimum 1 approval required

### Testing Requirements
- Minimum 80% code coverage
- All critical paths must have tests
- Use Jest for unit tests
- Use Cypress for E2E tests
- Test filenames: `*.test.ts` or `*.spec.ts`

### API Standards
- RESTful endpoints only
- JSON request/response
- Use HTTP status codes correctly
- Version API endpoints: `/api/v1/`
- Document all endpoints with examples

### Database
- Use migrations for schema changes
- Never hardcode credentials
- Use connection pooling
- Enable query logging in development
- Regular backups required

### Deployment
- Docker-based deployment
- Kubernetes orchestration
- Blue-green deployment strategy
- Automatic rollback on failure
- Database migrations run before deploy

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm test` | Run test suite |
| `npm run lint` | Check code style |
| `npm run build` | Build for production |
| `npm run migrate` | Run database migrations |

## Team Contacts
- Tech Lead: Sarah Chen (@sarah.chen)
- Product Manager: Mike Johnson (@mike.j)
- DevOps: Alex Kim (@alex.k)

## Known Issues & Workarounds
- PostgreSQL connection pooling limited to 20 during peak hours
- Workaround: Implement query queuing
- Safari 14 compatibility issues with async generators
- Workaround: Use Babel transpiler

## Related Projects
- Analytics Dashboard: `/projects/analytics`
- Mobile App: `/projects/mobile`
- Admin Panel: `/projects/admin`
```

#### 示例 2：目录级记忆

**文件：** `./src/api/CLAUDE.md`

~~~~markdown
# API Module Standards

This file overrides root CLAUDE.md for everything in /src/api/

## API-Specific Standards

### Request Validation
- Use Zod for schema validation
- Always validate input
- Return 400 with validation errors
- Include field-level error details

### Authentication
- All endpoints require JWT token
- Token in Authorization header
- Token expires after 24 hours
- Implement refresh token mechanism

### Response Format

All responses must follow this structure:

```json
{
  "success": true,
  "data": { /* actual data */ },
  "timestamp": "2025-11-06T10:30:00Z",
  "version": "1.0"
}
```

### Error responses:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User message",
    "details": { /* field errors */ }
  },
  "timestamp": "2025-11-06T10:30:00Z"
}
```

### Pagination
- Use cursor-based pagination (not offset)
- Include `hasMore` boolean
- Limit max page size to 100
- Default page size: 20

### Rate Limiting
- 1000 requests per hour for authenticated users
- 100 requests per hour for public endpoints
- Return 429 when exceeded
- Include retry-after header

### Caching
- Use Redis for session caching
- Cache duration: 5 minutes default
- Invalidate on write operations
- Tag cache keys with resource type
~~~~

#### 示例 3：个人记忆

**文件：** `~/.claude/CLAUDE.md`

~~~~markdown
# My Development Preferences

## About Me
- **Experience Level**: 8 years full-stack development
- **Preferred Languages**: TypeScript, Python
- **Communication Style**: Direct, with examples
- **Learning Style**: Visual diagrams with code

## Code Preferences

### Error Handling
I prefer explicit error handling with try-catch blocks and meaningful error messages.
Avoid generic errors. Always log errors for debugging.

### Comments
Use comments for WHY, not WHAT. Code should be self-documenting.
Comments should explain business logic or non-obvious decisions.

### Testing
I prefer TDD (test-driven development).
Write tests first, then implementation.
Focus on behavior, not implementation details.

### Architecture
I prefer modular, loosely-coupled design.
Use dependency injection for testability.
Separate concerns (Controllers, Services, Repositories).

## Debugging Preferences
- Use console.log with prefix: `[DEBUG]`
- Include context: function name, relevant variables
- Use stack traces when available
- Always include timestamps in logs

## Communication
- Explain complex concepts with diagrams
- Show concrete examples before explaining theory
- Include before/after code snippets
- Summarize key points at the end

## Project Organization
I organize my projects as:
```
project/
  ├── src/
  │   ├── api/
  │   ├── services/
  │   ├── models/
  │   └── utils/
  ├── tests/
  ├── docs/
  └── docker/
```

## Tooling
- **IDE**: VS Code with vim keybindings
- **Terminal**: Zsh with Oh-My-Zsh
- **Format**: Prettier (100 char line length)
- **Linter**: ESLint with airbnb config
- **Test Framework**: Jest with React Testing Library
~~~~

#### 示例 4：会话中的记忆更新

**会话交互：**

```markdown
User: Remember that I prefer using React hooks instead of class components
     for all new components.

Claude: I'm adding that to your memory. Which memory file should this go in?
        1. Project memory (./CLAUDE.md)
        2. Personal memory (~/.claude/CLAUDE.md)

User: Project memory

Claude: ✅ Memory saved!

Added to ./CLAUDE.md:
---

### Component Development
- Use functional components with React Hooks
- Prefer hooks over class components
- Custom hooks for reusable logic
- Use useCallback for event handlers
- Use useMemo for expensive computations
```

### Claude Web/桌面版中的记忆

#### 记忆综合时间线

```mermaid
graph LR
    A["第 1 天：用户<br/>对话"] -->|24 小时| B["第 2 天：记忆<br/>综合"]
    B -->|自动| C["记忆已更新<br/>已总结"]
    C -->|加载到| D["第 2-N 天：<br/>新对话"]
    D -->|添加到| E["记忆"]
    E -->|24 小时后| F["记忆刷新"]
```

**记忆摘要示例：**

```markdown
## Claude's Memory of User

### Professional Background
- Senior full-stack developer with 8 years experience
- Focus on TypeScript/Node.js backends and React frontends
- Active open source contributor
- Interested in AI and machine learning

### Project Context
- Currently building e-commerce platform
- Tech stack: Node.js, PostgreSQL, React 18, Docker
- Working with team of 5 developers
- Using CI/CD and blue-green deployments

### Communication Preferences
- Prefers direct, concise explanations
- Likes visual diagrams and examples
- Appreciates code snippets
- Explains business logic in comments

### Current Goals
- Improve API performance
- Increase test coverage to 90%
- Implement caching strategy
- Document architecture
```

### 记忆功能对比

| 功能 | Claude Web/桌面版 | Claude Code（CLAUDE.md） |
|------|-------------------|------------------------|
| 自动综合 | ✅ 每 24 小时 | ❌ 手动 |
| 跨项目 | ✅ 共享 | ❌ 项目专属 |
| 团队访问 | ✅ 共享项目 | ✅ Git 追踪 |
| 可搜索 | ✅ 内置 | ✅ 通过 `/memory` |
| 可编辑 | ✅ 聊天内 | ✅ 直接编辑文件 |
| 导入/导出 | ✅ 是 | ✅ 复制/粘贴 |
| 持久性 | ✅ 24 小时以上 | ✅ 无限期 |

---

## MCP 协议

### 概述

MCP（模型上下文协议）是 Claude 访问外部工具、API 和实时数据源的标准化方式。与记忆不同，MCP 提供对动态变化数据的实时访问。

### MCP 架构

```mermaid
graph TB
    A["Claude"]
    B["MCP 服务器"]
    C["外部服务"]

    A -->|请求：list_issues| B
    B -->|查询| C
    C -->|数据| B
    B -->|响应| A

    A -->|请求：create_issue| B
    B -->|操作| C
    C -->|结果| B
    B -->|响应| A
```

### MCP 生态系统

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
```

### MCP 配置流程

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
    Claude->>User: ✅ MCP 已连接！
```

### 可用 MCP 服务器表

| MCP 服务器 | 用途 | 常用工具 | 认证方式 | 实时 |
|-----------|------|---------|---------|------|
| **Filesystem** | 文件操作 | read, write, delete | 操作系统权限 | ✅ 是 |
| **GitHub** | 仓库管理 | list_prs, create_issue, push | OAuth | ✅ 是 |
| **Slack** | 团队通信 | send_message, list_channels | Token | ✅ 是 |
| **Database** | SQL 查询 | query, insert, update | 凭据 | ✅ 是 |
| **Google Docs** | 文档访问 | read, write, share | OAuth | ✅ 是 |
| **Asana** | 项目管理 | create_task, update_status | API Key | ✅ 是 |
| **Stripe** | 支付数据 | list_charges, create_invoice | API Key | ✅ 是 |
| **Memory** | 持久化记忆 | store, retrieve, delete | 本地 | ❌ 否 |

### 实用示例

#### 示例 1：GitHub MCP 配置

**文件：** `.mcp.json`（项目级）或 `~/.claude.json`（用户级）

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

~~~~markdown
# GitHub MCP Tools

## Pull Request Management
- `list_prs` - List all PRs in repository
- `get_pr` - Get PR details including diff
- `create_pr` - Create new PR
- `update_pr` - Update PR description/title
- `merge_pr` - Merge PR to main branch
- `review_pr` - Add review comments

Example request:
```
/mcp__github__get_pr 456

# Returns:
Title: Add dark mode support
Author: @alice
Description: Implements dark theme using CSS variables
Status: OPEN
Reviewers: @bob, @charlie
```

## Issue Management
- `list_issues` - List all issues
- `get_issue` - Get issue details
- `create_issue` - Create new issue
- `close_issue` - Close issue
- `add_comment` - Add comment to issue

## Repository Information
- `get_repo_info` - Repository details
- `list_files` - File tree structure
- `get_file_content` - Read file contents
- `search_code` - Search across codebase

## Commit Operations
- `list_commits` - Commit history
- `get_commit` - Specific commit details
- `create_commit` - Create new commit
~~~~

#### 示例 2：数据库 MCP 配置

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
User: Fetch all users with more than 10 orders

Claude: I'll query your database to find that information.

# Using MCP database tool:
SELECT u.*, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING COUNT(o.id) > 10
ORDER BY order_count DESC;

# Results:
- Alice: 15 orders
- Bob: 12 orders
- Charlie: 11 orders
```

#### 示例 3：多 MCP 工作流

**场景：每日报告生成**

```markdown
# Daily Report Workflow using Multiple MCPs

## Setup
1. GitHub MCP - fetch PR metrics
2. Database MCP - query sales data
3. Slack MCP - post report
4. Filesystem MCP - save report

## Workflow

### Step 1: Fetch GitHub Data
/mcp__github__list_prs completed:true last:7days

Output:
- Total PRs: 42
- Average merge time: 2.3 hours
- Review turnaround: 1.1 hours

### Step 2: Query Database
SELECT COUNT(*) as sales, SUM(amount) as revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '1 day'

Output:
- Sales: 247
- Revenue: $12,450

### Step 3: Generate Report
Combine data into HTML report

### Step 4: Save to Filesystem
Write report.html to /reports/

### Step 5: Post to Slack
Send summary to #daily-reports channel

Final Output:
✅ Report generated and posted
📊 47 PRs merged this week
💰 $12,450 in daily sales
```

#### 示例 4：文件系统 MCP 操作

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

### MCP 与记忆：决策矩阵

```mermaid
graph TD
    A["需要外部数据？"]
    A -->|否| B["使用记忆"]
    A -->|是| C["数据是否频繁变化？"]
    C -->|否/很少| B
    C -->|是/经常| D["使用 MCP"]

    B -->|存储| E["偏好<br/>上下文<br/>历史"]
    D -->|访问| F["实时 API<br/>数据库<br/>服务"]

    style B fill:#e1f5ff
    style D fill:#fff9c4
```

### 请求/响应模式

```mermaid
sequenceDiagram
    participant App as Claude
    participant MCP as MCP 服务器
    participant DB as 数据库

    App->>MCP: 请求："SELECT * FROM users WHERE id=1"
    MCP->>DB: 执行查询
    DB-->>MCP: 结果集
    MCP-->>App: 返回解析后的数据
    App->>App: 处理结果
    App->>App: 继续任务

    Note over MCP,DB: 实时访问<br/>无缓存
```

---

## 代理技能

### 概述

代理技能是可复用的、由模型调用的能力，以包含指令、脚本和资源的文件夹形式打包。Claude 会自动检测并使用相关技能。

### 技能架构

```mermaid
graph TB
    A["技能目录"]
    B["SKILL.md"]
    C["YAML 元数据"]
    D["指令"]
    E["脚本"]
    F["模板"]

    A --> B
    B --> C
    B --> D
    E --> A
    F --> A
```

### 技能加载流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant Claude as Claude
    participant System as 系统
    participant Skill as 技能

    User->>Claude: "创建 Excel 报告"
    Claude->>System: 扫描可用技能
    System->>System: 加载技能元数据
    Claude->>Claude: 匹配用户请求与技能
    Claude->>Skill: 加载 xlsx 技能 SKILL.md
    Skill-->>Claude: 返回指令 + 工具
    Claude->>Claude: 执行技能
    Claude->>User: 生成 Excel 文件
```

### 技能类型与位置表

| 类型 | 位置 | 作用域 | 共享 | 同步 | 最佳用途 |
|------|------|--------|------|------|---------|
| 预置 | 内置 | 全局 | 所有用户 | 自动 | 文档创建 |
| 个人 | `~/.claude/skills/` | 个人 | 否 | 手动 | 个人自动化 |
| 项目 | `.claude/skills/` | 团队 | 是 | Git | 团队标准 |
| 插件 | 通过插件安装 | 取决于情况 | 取决于情况 | 自动 | 集成功能 |

### 预置技能

```mermaid
graph TB
    A["预置技能"]
    B["PowerPoint (pptx)"]
    C["Excel (xlsx)"]
    D["Word (docx)"]
    E["PDF"]

    A --> B
    A --> C
    A --> D
    A --> E

    B --> B1["创建演示文稿"]
    B --> B2["编辑幻灯片"]
    C --> C1["创建电子表格"]
    C --> C2["分析数据"]
    D --> D1["创建文档"]
    D --> D2["格式化文本"]
    E --> E1["生成 PDF"]
    E --> E2["填写表单"]
```

### 捆绑技能

Claude Code 现在包含 5 个开箱即用的捆绑技能：

| 技能 | 命令 | 用途 |
|------|------|------|
| **Simplify** | `/simplify` | 简化复杂代码或解释 |
| **Batch** | `/batch` | 跨多个文件或项目运行操作 |
| **Debug** | `/debug` | 系统性调试问题并进行根因分析 |
| **Loop** | `/loop` | 按定时器调度循环任务 |
| **Claude API** | `/claude-api` | 直接与 Anthropic API 交互 |

这些捆绑技能始终可用，无需安装或配置。

### 实用示例

#### 示例 1：自定义代码审查技能

**目录结构：**

```
~/.claude/skills/code-review/
├── SKILL.md
├── templates/
│   ├── review-checklist.md
│   └── finding-template.md
└── scripts/
    ├── analyze-metrics.py
    └── compare-complexity.py
```

**文件：** `~/.claude/skills/code-review/SKILL.md`

```yaml
---
name: Code Review Specialist
description: Comprehensive code review with security, performance, and quality analysis
version: "1.0.0"
tags:
  - code-review
  - quality
  - security
when_to_use: When users ask to review code, analyze code quality, or evaluate pull requests
effort: high
shell: bash
---

# Code Review Skill

This skill provides comprehensive code review capabilities focusing on:

1. **Security Analysis**
   - Authentication/authorization issues
   - Data exposure risks
   - Injection vulnerabilities
   - Cryptographic weaknesses
   - Sensitive data logging

2. **Performance Review**
   - Algorithm efficiency (Big O analysis)
   - Memory optimization
   - Database query optimization
   - Caching opportunities
   - Concurrency issues

3. **Code Quality**
   - SOLID principles
   - Design patterns
   - Naming conventions
   - Documentation
   - Test coverage

4. **Maintainability**
   - Code readability
   - Function size (should be < 50 lines)
   - Cyclomatic complexity
   - Dependency management
   - Type safety

## Review Template

For each piece of code reviewed, provide:

### Summary
- Overall quality assessment (1-5)
- Key findings count
- Recommended priority areas

### Critical Issues (if any)
- **Issue**: Clear description
- **Location**: File and line number
- **Impact**: Why this matters
- **Severity**: Critical/High/Medium
- **Fix**: Code example

### Findings by Category

#### Security (if issues found)
List security vulnerabilities with examples

#### Performance (if issues found)
List performance problems with complexity analysis

#### Quality (if issues found)
List code quality issues with refactoring suggestions

#### Maintainability (if issues found)
List maintainability problems with improvements
```
## Python 脚本：analyze-metrics.py

```python
#!/usr/bin/env python3
import re
import sys

def analyze_code_metrics(code):
    """Analyze code for common metrics."""

    # Count functions
    functions = len(re.findall(r'^def\s+\w+', code, re.MULTILINE))

    # Count classes
    classes = len(re.findall(r'^class\s+\w+', code, re.MULTILINE))

    # Average line length
    lines = code.split('\n')
    avg_length = sum(len(l) for l in lines) / len(lines) if lines else 0

    # Estimate complexity
    complexity = len(re.findall(r'\b(if|elif|else|for|while|and|or)\b', code))

    return {
        'functions': functions,
        'classes': classes,
        'avg_line_length': avg_length,
        'complexity_score': complexity
    }

if __name__ == '__main__':
    with open(sys.argv[1], 'r') as f:
        code = f.read()
    metrics = analyze_code_metrics(code)
    for key, value in metrics.items():
        print(f"{key}: {value:.2f}")
```

## Python 脚本：compare-complexity.py

```python
#!/usr/bin/env python3
"""
Compare cyclomatic complexity of code before and after changes.
Helps identify if refactoring actually simplifies code structure.
"""

import re
import sys
from typing import Dict, Tuple

class ComplexityAnalyzer:
    """Analyze code complexity metrics."""

    def __init__(self, code: str):
        self.code = code
        self.lines = code.split('\n')

    def calculate_cyclomatic_complexity(self) -> int:
        """
        Calculate cyclomatic complexity using McCabe's method.
        Count decision points: if, elif, else, for, while, except, and, or
        """
        complexity = 1  # Base complexity

        # Count decision points
        decision_patterns = [
            r'\bif\b',
            r'\belif\b',
            r'\bfor\b',
            r'\bwhile\b',
            r'\bexcept\b',
            r'\band\b(?!$)',
            r'\bor\b(?!$)'
        ]

        for pattern in decision_patterns:
            matches = re.findall(pattern, self.code)
            complexity += len(matches)

        return complexity

    def calculate_cognitive_complexity(self) -> int:
        """
        Calculate cognitive complexity - how hard is it to understand?
        Based on nesting depth and control flow.
        """
        cognitive = 0
        nesting_depth = 0

        for line in self.lines:
            # Track nesting depth
            if re.search(r'^\s*(if|for|while|def|class|try)\b', line):
                nesting_depth += 1
                cognitive += nesting_depth
            elif re.search(r'^\s*(elif|else|except|finally)\b', line):
                cognitive += nesting_depth

            # Reduce nesting when unindenting
            if line and not line[0].isspace():
                nesting_depth = 0

        return cognitive

    def calculate_maintainability_index(self) -> float:
        """
        Maintainability Index ranges from 0-100.
        > 85: Excellent
        > 65: Good
        > 50: Fair
        < 50: Poor
        """
        lines = len(self.lines)
        cyclomatic = self.calculate_cyclomatic_complexity()
        cognitive = self.calculate_cognitive_complexity()

        # Simplified MI calculation
        mi = 171 - 5.2 * (cyclomatic / lines) - 0.23 * (cognitive) - 16.2 * (lines / 1000)

        return max(0, min(100, mi))

    def get_complexity_report(self) -> Dict:
        """Generate comprehensive complexity report."""
        return {
            'cyclomatic_complexity': self.calculate_cyclomatic_complexity(),
            'cognitive_complexity': self.calculate_cognitive_complexity(),
            'maintainability_index': round(self.calculate_maintainability_index(), 2),
            'lines_of_code': len(self.lines),
            'avg_line_length': round(sum(len(l) for l in self.lines) / len(self.lines), 2) if self.lines else 0
        }


def compare_files(before_file: str, after_file: str) -> None:
    """Compare complexity metrics between two code versions."""

    with open(before_file, 'r') as f:
        before_code = f.read()

    with open(after_file, 'r') as f:
        after_code = f.read()

    before_analyzer = ComplexityAnalyzer(before_code)
    after_analyzer = ComplexityAnalyzer(after_code)

    before_metrics = before_analyzer.get_complexity_report()
    after_metrics = after_analyzer.get_complexity_report()

    print("=" * 60)
    print("CODE COMPLEXITY COMPARISON")
    print("=" * 60)

    print("\nBEFORE:")
    print(f"  Cyclomatic Complexity:    {before_metrics['cyclomatic_complexity']}")
    print(f"  Cognitive Complexity:     {before_metrics['cognitive_complexity']}")
    print(f"  Maintainability Index:    {before_metrics['maintainability_index']}")
    print(f"  Lines of Code:            {before_metrics['lines_of_code']}")
    print(f"  Avg Line Length:          {before_metrics['avg_line_length']}")

    print("\nAFTER:")
    print(f"  Cyclomatic Complexity:    {after_metrics['cyclomatic_complexity']}")
    print(f"  Cognitive Complexity:     {after_metrics['cognitive_complexity']}")
    print(f"  Maintainability Index:    {after_metrics['maintainability_index']}")
    print(f"  Lines of Code:            {after_metrics['lines_of_code']}")
    print(f"  Avg Line Length:          {after_metrics['avg_line_length']}")

    print("\nCHANGES:")
    cyclomatic_change = after_metrics['cyclomatic_complexity'] - before_metrics['cyclomatic_complexity']
    cognitive_change = after_metrics['cognitive_complexity'] - before_metrics['cognitive_complexity']
    mi_change = after_metrics['maintainability_index'] - before_metrics['maintainability_index']
    loc_change = after_metrics['lines_of_code'] - before_metrics['lines_of_code']

    print(f"  Cyclomatic Complexity:    {cyclomatic_change:+d}")
    print(f"  Cognitive Complexity:     {cognitive_change:+d}")
    print(f"  Maintainability Index:    {mi_change:+.2f}")
    print(f"  Lines of Code:            {loc_change:+d}")

    print("\nASSESSMENT:")
    if mi_change > 0:
        print("  ✅ Code is MORE maintainable")
    elif mi_change < 0:
        print("  ⚠️  Code is LESS maintainable")
    else:
        print("  ➡️  Maintainability unchanged")

    if cyclomatic_change < 0:
        print("  ✅ Complexity DECREASED")
    elif cyclomatic_change > 0:
        print("  ⚠️  Complexity INCREASED")
    else:
        print("  ➡️  Complexity unchanged")

    print("=" * 60)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python compare-complexity.py <before_file> <after_file>")
        sys.exit(1)

    compare_files(sys.argv[1], sys.argv[2])
```

## 模板：review-checklist.md

```markdown
# Code Review Checklist

## Security Checklist
- [ ] No hardcoded credentials or secrets
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] CSRF protection on state-changing operations
- [ ] XSS prevention with proper escaping
- [ ] Authentication checks on protected endpoints
- [ ] Authorization checks on resources
- [ ] Secure password hashing (bcrypt, argon2)
- [ ] No sensitive data in logs
- [ ] HTTPS enforced

## Performance Checklist
- [ ] No N+1 queries
- [ ] Appropriate use of indexes
- [ ] Caching implemented where beneficial
- [ ] No blocking operations on main thread
- [ ] Async/await used correctly
- [ ] Large datasets paginated
- [ ] Database connections pooled
- [ ] Regular expressions optimized
- [ ] No unnecessary object creation
- [ ] Memory leaks prevented

## Quality Checklist
- [ ] Functions < 50 lines
- [ ] Clear variable naming
- [ ] No duplicate code
- [ ] Proper error handling
- [ ] Comments explain WHY, not WHAT
- [ ] No console.logs in production
- [ ] Type checking (TypeScript/JSDoc)
- [ ] SOLID principles followed
- [ ] Design patterns applied correctly
- [ ] Self-documenting code

## Testing Checklist
- [ ] Unit tests written
- [ ] Edge cases covered
- [ ] Error scenarios tested
- [ ] Integration tests present
- [ ] Coverage > 80%
- [ ] No flaky tests
- [ ] Mock external dependencies
- [ ] Clear test names
```

## 模板：finding-template.md

~~~~markdown
# Code Review Finding Template

Use this template when documenting each issue found during code review.

---

## Issue: [TITLE]

### Severity
- [ ] Critical (blocks deployment)
- [ ] High (should fix before merge)
- [ ] Medium (should fix soon)
- [ ] Low (nice to have)

### Category
- [ ] Security
- [ ] Performance
- [ ] Code Quality
- [ ] Maintainability
- [ ] Testing
- [ ] Design Pattern
- [ ] Documentation

### Location
**File:** `src/components/UserCard.tsx`

**Lines:** 45-52

**Function/Method:** `renderUserDetails()`

### Issue Description

**What:** Describe what the issue is.

**Why it matters:** Explain the impact and why this needs to be fixed.

**Current behavior:** Show the problematic code or behavior.

**Expected behavior:** Describe what should happen instead.

### Code Example

#### Current (Problematic)

```typescript
// Shows the N+1 query problem
const users = fetchUsers();
users.forEach(user => {
  const posts = fetchUserPosts(user.id); // Query per user!
  renderUserPosts(posts);
});
```

#### Suggested Fix

```typescript
// Optimized with JOIN query
const usersWithPosts = fetchUsersWithPosts();
usersWithPosts.forEach(({ user, posts }) => {
  renderUserPosts(posts);
});
```

### Impact Analysis

| Aspect | Impact | Severity |
|--------|--------|----------|
| Performance | 100+ queries for 20 users | High |
| User Experience | Slow page load | High |
| Scalability | Breaks at scale | Critical |
| Maintainability | Hard to debug | Medium |

### Related Issues

- Similar issue in `AdminUserList.tsx` line 120
- Related PR: #456
- Related issue: #789

### Additional Resources

- [N+1 Query Problem](https://en.wikipedia.org/wiki/N%2B1_problem)
- [Database Join Documentation](https://docs.example.com/joins)

### Reviewer Notes

- This is a common pattern in this codebase
- Consider adding this to the code style guide
- Might be worth creating a helper function

### Author Response (for feedback)

*To be filled by the code author:*

- [ ] Fix implemented in commit: `abc123`
- [ ] Fix status: Complete / In Progress / Needs Discussion
- [ ] Questions or concerns: (describe)

---

## Finding Statistics (for Reviewer)

When reviewing multiple findings, track:

- **Total Issues Found:** X
- **Critical:** X
- **High:** X
- **Medium:** X
- **Low:** X

**Recommendation:** ✅ Approve / ⚠️ Request Changes / 🔄 Needs Discussion

**Overall Code Quality:** 1-5 stars
~~~~

## 使用示例

~~~~markdown
User: Review this React component code

Claude: I'll conduct a comprehensive code review using my Code Review Skill.

[Loads SKILL.md]
[Analyzes code against checklist]
[Runs Python metrics script]
[Applies templates]

## Code Review Results

### Summary
Quality Score: 3.5/5
Key Findings: 7 items
Priority Areas: Performance optimization, error handling

### Critical Issues: 1

**Issue**: N+1 Query Problem
**Location**: UserComponent.tsx, lines 45-52
**Impact**: Renders 100+ database queries for list of 20 users
**Severity**: High
**Fix**:
```javascript
// Before: N+1 queries
const users = fetchUsers();
users.forEach(user => fetchUserPosts(user.id)); // 20+ queries

// After: Single query with JOIN
const users = fetchUsersWithPosts(); // 1 query
```

### Performance Findings
- Missing pagination on large lists
- Recommendation: Use React.memo() for items
- Database query: Could be optimized with index

### Quality Findings
- Function in line 20 is 127 lines (max: 50)
- Missing error boundary
- Props should have TypeScript types
~~~~

#### 示例 2：品牌声音技能

**目录结构：**

```
.claude/skills/brand-voice/
├── SKILL.md
├── brand-guidelines.md
├── tone-examples.md
└── templates/
    ├── email-template.txt
    ├── social-post-template.txt
    └── blog-post-template.md
```

**文件：** `.claude/skills/brand-voice/SKILL.md`

```yaml
---
name: Brand Voice Consistency
description: Ensure all communication matches brand voice and tone guidelines
tags:
  - brand
  - writing
  - consistency
when_to_use: When creating marketing copy, customer communications, or public-facing content
---

# Brand Voice Skill

## Overview
This skill ensures all communications maintain consistent brand voice, tone, and messaging.

## Brand Identity

### Mission
Help teams automate their development workflows with AI

### Values
- **Simplicity**: Make complex things simple
- **Reliability**: Rock-solid execution
- **Empowerment**: Enable human creativity

### Tone of Voice
- **Friendly but professional** - approachable without being casual
- **Clear and concise** - avoid jargon, explain technical concepts simply
- **Confident** - we know what we're doing
- **Empathetic** - understand user needs and pain points

## Writing Guidelines

### Do's ✅
- Use "you" when addressing readers
- Use active voice: "Claude generates reports" not "Reports are generated by Claude"
- Start with value proposition
- Use concrete examples
- Keep sentences under 20 words
- Use lists for clarity
- Include calls-to-action

### Don'ts ❌
- Don't use corporate jargon
- Don't patronize or oversimplify
- Don't use "we believe" or "we think"
- Don't use ALL CAPS except for emphasis
- Don't create walls of text
- Don't assume technical knowledge

## Vocabulary

### ✅ Preferred Terms
- Claude (not "the Claude AI")
- Code generation (not "auto-coding")
- Agent (not "bot")
- Streamline (not "revolutionize")
- Integrate (not "synergize")

### ❌ Avoid Terms
- "Cutting-edge" (overused)
- "Game-changer" (vague)
- "Leverage" (corporate-speak)
- "Utilize" (use "use")
- "Paradigm shift" (unclear)
```
## 示例

### ✅ 良好示例
"Claude automates your code review process. Instead of manually checking each PR, Claude reviews security, performance, and quality—saving your team hours every week."

为什么有效：清晰的价值、具体的收益、面向行动

### ❌ 不良示例
"Claude leverages cutting-edge AI to provide comprehensive software development solutions."

为什么无效：含糊、企业术语、没有具体价值

## 模板：邮件

```
Subject: [Clear, benefit-driven subject]

Hi [Name],

[Opening: What's the value for them]

[Body: How it works / What they'll get]

[Specific example or benefit]

[Call to action: Clear next step]

Best regards,
[Name]
```

## 模板：社交媒体

```
[Hook: Grab attention in first line]
[2-3 lines: Value or interesting fact]
[Call to action: Link, question, or engagement]
[Emoji: 1-2 max for visual interest]
```

## 文件：tone-examples.md
```
Exciting announcement:
"Save 8 hours per week on code reviews. Claude reviews your PRs automatically."

Empathetic support:
"We know deployments can be stressful. Claude handles testing so you don't have to worry."

Confident product feature:
"Claude doesn't just suggest code. It understands your architecture and maintains consistency."

Educational blog post:
"Let's explore how agents improve code review workflows. Here's what we learned..."
```

#### 示例 3：文档生成技能

**文件：** `.claude/skills/doc-generator/SKILL.md`

~~~~yaml
---
name: API Documentation Generator
description: Generate comprehensive, accurate API documentation from source code
version: "1.0.0"
tags:
  - documentation
  - api
  - automation
when_to_use: When creating or updating API documentation
---

# API Documentation Generator Skill

## Generates

- OpenAPI/Swagger specifications
- API endpoint documentation
- SDK usage examples
- Integration guides
- Error code references
- Authentication guides

## Documentation Structure

### For Each Endpoint

```markdown
## GET /api/v1/users/:id

### Description
Brief explanation of what this endpoint does

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | User ID |

### Response

**200 Success**
```json
{
  "id": "usr_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-01-15T10:30:00Z"
}
```

**404 Not Found**
```json
{
  "error": "USER_NOT_FOUND",
  "message": "User does not exist"
}
```

### Examples

**cURL**
```bash
curl -X GET "https://api.example.com/api/v1/users/usr_123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript**
```javascript
const user = await fetch('/api/v1/users/usr_123', {
  headers: { 'Authorization': 'Bearer token' }
}).then(r => r.json());
```

**Python**
```python
response = requests.get(
    'https://api.example.com/api/v1/users/usr_123',
    headers={'Authorization': 'Bearer token'}
)
user = response.json()
```

## Python Script: generate-docs.py

```python
#!/usr/bin/env python3
import ast
import json
from typing import Dict, List

class APIDocExtractor(ast.NodeVisitor):
    """Extract API documentation from Python source code."""

    def __init__(self):
        self.endpoints = []

    def visit_FunctionDef(self, node):
        """Extract function documentation."""
        if node.name.startswith('get_') or node.name.startswith('post_'):
            doc = ast.get_docstring(node)
            endpoint = {
                'name': node.name,
                'docstring': doc,
                'params': [arg.arg for arg in node.args.args],
                'returns': self._extract_return_type(node)
            }
            self.endpoints.append(endpoint)
        self.generic_visit(node)

    def _extract_return_type(self, node):
        """Extract return type from function annotation."""
        if node.returns:
            return ast.unparse(node.returns)
        return "Any"

def generate_markdown_docs(endpoints: List[Dict]) -> str:
    """Generate markdown documentation from endpoints."""
    docs = "# API Documentation\n\n"

    for endpoint in endpoints:
        docs += f"## {endpoint['name']}\n\n"
        docs += f"{endpoint['docstring']}\n\n"
        docs += f"**Parameters**: {', '.join(endpoint['params'])}\n\n"
        docs += f"**Returns**: {endpoint['returns']}\n\n"
        docs += "---\n\n"

    return docs

if __name__ == '__main__':
    import sys
    with open(sys.argv[1], 'r') as f:
        tree = ast.parse(f.read())

    extractor = APIDocExtractor()
    extractor.visit(tree)

    markdown = generate_markdown_docs(extractor.endpoints)
    print(markdown)
~~~~
### 技能发现与调用

```mermaid
graph TD
    A["用户请求"] --> B["Claude 分析"]
    B -->|扫描| C["可用技能"]
    C -->|元数据检查| D["技能描述匹配？"]
    D -->|是| E["加载 SKILL.md"]
    D -->|否| F["尝试下一个技能"]
    F -->|还有更多技能？| D
    F -->|没有更多| G["使用通用知识"]
    E --> H["提取指令"]
    H --> I["执行技能"]
    I --> J["返回结果"]
```

### 技能与其他功能对比

```mermaid
graph TB
    A["扩展 Claude"]
    B["斜杠命令"]
    C["子代理"]
    D["记忆"]
    E["MCP"]
    F["技能"]

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F

    B -->|用户调用| G["快速快捷方式"]
    C -->|自动委派| H["隔离上下文"]
    D -->|持久化| I["跨会话上下文"]
    E -->|实时| J["外部数据访问"]
    F -->|自动调用| K["自主执行"]
```

---

## Claude Code 插件

### 概述

Claude Code 插件是捆绑的自定义集合（斜杠命令、子代理、MCP 服务器和钩子），通过单一命令安装。它们代表最高级别的扩展机制 — 将多种功能组合成有凝聚力的、可共享的包。

### 架构

```mermaid
graph TB
    A["插件"]
    B["斜杠命令"]
    C["子代理"]
    D["MCP 服务器"]
    E["钩子"]
    F["配置"]

    A -->|捆绑| B
    A -->|捆绑| C
    A -->|捆绑| D
    A -->|捆绑| E
    A -->|捆绑| F
```

### 插件加载流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant Claude as Claude Code
    participant Plugin as 插件市场
    participant Install as 安装程序
    participant SlashCmds as 斜杠命令
    participant Subagents as 子代理
    participant MCPServers as MCP 服务器
    participant Hooks as 钩子
    participant Tools as 已配置工具

    User->>Claude: /plugin install pr-review
    Claude->>Plugin: 下载插件清单
    Plugin-->>Claude: 返回插件定义
    Claude->>Install: 提取组件
    Install->>SlashCmds: 配置
    Install->>Subagents: 配置
    Install->>MCPServers: 配置
    Install->>Hooks: 配置
    SlashCmds-->>Tools: 可以使用
    Subagents-->>Tools: 可以使用
    MCPServers-->>Tools: 可以使用
    Hooks-->>Tools: 可以使用
    Tools-->>Claude: 插件已安装 ✅
```

### 插件类型与分发

| 类型 | 作用域 | 共享 | 来源 | 示例 |
|------|--------|------|------|------|
| 官方 | 全局 | 所有用户 | Anthropic | PR 审查、安全指导 |
| 社区 | 公开 | 所有用户 | 社区 | DevOps、数据科学 |
| 组织 | 内部 | 团队成员 | 公司 | 内部标准、工具 |
| 个人 | 个人 | 单个用户 | 开发者 | 自定义工作流 |

### 插件定义结构

```yaml
---
name: plugin-name
version: "1.0.0"
description: "What this plugin does"
author: "Your Name"
license: MIT

# Plugin metadata
tags:
  - category
  - use-case

# Requirements
requires:
  - claude-code: ">=1.0.0"

# Components bundled
components:
  - type: commands
    path: commands/
  - type: agents
    path: agents/
  - type: mcp
    path: mcp/
  - type: hooks
    path: hooks/

# Configuration
config:
  auto_load: true
  enabled_by_default: true
---
```

### 插件结构

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   ├── task-1.md
│   ├── task-2.md
│   └── workflows/
├── agents/
│   ├── specialist-1.md
│   ├── specialist-2.md
│   └── configs/
├── skills/
│   ├── skill-1.md
│   └── skill-2.md
├── hooks/
│   └── hooks.json
├── .mcp.json
├── .lsp.json
├── settings.json
├── templates/
│   └── issue-template.md
├── scripts/
│   ├── helper-1.sh
│   └── helper-2.py
├── docs/
│   ├── README.md
│   └── USAGE.md
└── tests/
    └── plugin.test.js
```

### 实用示例

#### 示例 1：PR 审查插件

**文件：** `.claude-plugin/plugin.json`

```json
{
  "name": "pr-review",
  "version": "1.0.0",
  "description": "Complete PR review workflow with security, testing, and docs",
  "author": {
    "name": "Anthropic"
  },
  "license": "MIT"
}
```

**文件：** `commands/review-pr.md`

```markdown
---
name: Review PR
description: Start comprehensive PR review with security and testing checks
---

# PR Review

This command initiates a complete pull request review including:

1. Security analysis
2. Test coverage verification
3. Documentation updates
4. Code quality checks
5. Performance impact assessment
```

**文件：** `agents/security-reviewer.md`

```yaml
---
name: security-reviewer
description: Security-focused code review
tools: read, grep, diff
---

# Security Reviewer

Specializes in finding security vulnerabilities:
- Authentication/authorization issues
- Data exposure
- Injection attacks
- Secure configuration
```

**安装：**

```bash
/plugin install pr-review

# Result:
# ✅ 3 slash commands installed
# ✅ 3 subagents configured
# ✅ 2 MCP servers connected
# ✅ 4 hooks registered
# ✅ Ready to use!
```

#### 示例 2：DevOps 插件

**组件：**

```
devops-automation/
├── commands/
│   ├── deploy.md
│   ├── rollback.md
│   ├── status.md
│   └── incident.md
├── agents/
│   ├── deployment-specialist.md
│   ├── incident-commander.md
│   └── alert-analyzer.md
├── mcp/
│   ├── github-config.json
│   ├── kubernetes-config.json
│   └── prometheus-config.json
├── hooks/
│   ├── pre-deploy.js
│   ├── post-deploy.js
│   └── on-error.js
└── scripts/
    ├── deploy.sh
    ├── rollback.sh
    └── health-check.sh
```

#### 示例 3：文档插件

**捆绑组件：**

```
documentation/
├── commands/
│   ├── generate-api-docs.md
│   ├── generate-readme.md
│   ├── sync-docs.md
│   └── validate-docs.md
├── agents/
│   ├── api-documenter.md
│   ├── code-commentator.md
│   └── example-generator.md
├── mcp/
│   ├── github-docs-config.json
│   └── slack-announce-config.json
└── templates/
    ├── api-endpoint.md
    ├── function-docs.md
    └── adr-template.md
```

### 插件市场

```mermaid
graph TB
    A["插件市场"]
    B["官方<br/>Anthropic"]
    C["社区<br/>市场"]
    D["企业<br/>注册中心"]

    A --> B
    A --> C
    A --> D

    B -->|类别| B1["开发"]
    B -->|类别| B2["DevOps"]
    B -->|类别| B3["文档"]

    C -->|搜索| C1["DevOps 自动化"]
    C -->|搜索| C2["移动端开发"]
    C -->|搜索| C3["数据科学"]

    D -->|内部| D1["公司标准"]
    D -->|内部| D2["遗留系统"]
    D -->|内部| D3["合规"]
```

### 插件安装与生命周期

```mermaid
graph LR
    A["发现"] -->|浏览| B["市场"]
    B -->|选择| C["插件页面"]
    C -->|查看| D["组件"]
    D -->|安装| E["/plugin install"]
    E -->|提取| F["配置"]
    F -->|激活| G["使用"]
    G -->|检查| H["更新"]
    H -->|有可用更新| G
    G -->|完成| I["禁用"]
    I -->|稍后| J["启用"]
    J -->|回到| G
```

### 插件功能对比

| 功能 | 斜杠命令 | 技能 | 子代理 | 插件 |
|------|---------|------|--------|------|
| **安装方式** | 手动复制 | 手动复制 | 手动配置 | 一条命令 |
| **配置时间** | 5 分钟 | 10 分钟 | 15 分钟 | 2 分钟 |
| **捆绑** | 单个文件 | 单个文件 | 单个文件 | 多个文件 |
| **版本控制** | 手动 | 手动 | 手动 | 自动 |
| **团队共享** | 复制文件 | 复制文件 | 复制文件 | 安装 ID |
| **更新** | 手动 | 手动 | 手动 | 自动可用 |
| **依赖** | 无 | 无 | 无 | 可能包含 |
| **市场** | 否 | 否 | 否 | 是 |
| **分发** | 仓库 | 仓库 | 仓库 | 市场 |

### 插件用例

| 用例 | 建议 | 原因 |
|------|------|------|
| **团队入门** | ✅ 使用插件 | 即时配置，所有配置就绪 |
| **框架配置** | ✅ 使用插件 | 捆绑框架特定的命令 |
| **企业标准** | ✅ 使用插件 | 集中分发，版本控制 |
| **快速任务自动化** | ❌ 使用命令 | 过于复杂 |
| **单一领域专业能力** | ❌ 使用技能 | 太重，使用技能替代 |
| **专业化分析** | ❌ 使用子代理 | 手动创建或使用技能 |
| **实时数据访问** | ❌ 使用 MCP | 独立使用，不要捆绑 |

### 何时创建插件

```mermaid
graph TD
    A["是否应该创建插件？"]
    A -->|需要多个组件| B{"多个命令<br/>或子代理<br/>或 MCP？"}
    B -->|是| C["✅ 创建插件"]
    B -->|否| D["使用单独的功能"]
    A -->|团队工作流| E{"与团队<br/>共享？"}
    E -->|是| C
    E -->|否| F["保持为本地配置"]
    A -->|复杂配置| G{"需要自动<br/>配置？"}
    G -->|是| C
    G -->|否| D
```

### 发布插件

**发布步骤：**

1. 创建包含所有组件的插件结构
2. 编写 `.claude-plugin/plugin.json` 清单
3. 创建 `README.md` 文档
4. 使用 `/plugin install ./my-plugin` 本地测试
5. 提交到插件市场
6. 接受审查和批准
7. 在市场上发布
8. 用户可以一条命令安装

**提交示例：**

~~~~markdown
# PR Review Plugin

## Description
Complete PR review workflow with security, testing, and documentation checks.

## What's Included
- 3 slash commands for different review types
- 3 specialized subagents
- GitHub and CodeQL MCP integration
- Automated security scanning hooks

## Installation
```bash
/plugin install pr-review
```

## Features
✅ Security analysis
✅ Test coverage checking
✅ Documentation verification
✅ Code quality assessment
✅ Performance impact analysis

## Usage
```bash
/review-pr
/check-security
/check-tests
```

## Requirements
- Claude Code 1.0+
- GitHub access
- CodeQL (optional)
~~~~

### 插件与手动配置对比

**手动配置（2 小时以上）：**
- 逐个安装斜杠命令
- 逐个创建子代理
- 分别配置 MCP
- 手动设置钩子
- 记录所有配置
- 与团队共享（希望他们正确配置）

**使用插件（2 分钟）：**
```bash
/plugin install pr-review
# ✅ Everything installed and configured
# ✅ Ready to use immediately
# ✅ Team can reproduce exact setup
```

---

## 对比与集成

### 功能对比矩阵

| 功能 | 调用方式 | 持久性 | 作用域 | 用例 |
|------|---------|--------|--------|------|
| **斜杠命令** | 手动（`/cmd`） | 仅会话 | 单一命令 | 快速快捷方式 |
| **子代理** | 自动委派 | 隔离上下文 | 专业化任务 | 任务分配 |
| **记忆** | 自动加载 | 跨会话 | 用户/团队上下文 | 长期学习 |
| **MCP 协议** | 自动查询 | 实时外部 | 实时数据访问 | 动态信息 |
| **技能** | 自动调用 | 基于文件系统 | 可复用专业能力 | 自动化工作流 |

### 交互时间线

```mermaid
graph LR
    A["会话开始"] -->|加载| B["记忆（CLAUDE.md）"]
    B -->|发现| C["可用技能"]
    C -->|注册| D["斜杠命令"]
    D -->|连接| E["MCP 服务器"]
    E -->|就绪| F["用户交互"]

    F -->|输入 /cmd| G["斜杠命令"]
    F -->|请求| H["技能自动调用"]
    F -->|查询| I["MCP 数据"]
    F -->|复杂任务| J["委派给子代理"]

    G -->|使用| B
    H -->|使用| B
    I -->|使用| B
    J -->|使用| B
```

### 实际集成示例：客户支持自动化

#### 架构

```mermaid
graph TB
    User["客户邮件"] -->|接收| Router["支持路由器"]

    Router -->|分析| Memory["记忆<br/>客户历史"]
    Router -->|查询| MCP1["MCP：客户数据库<br/>历史工单"]
    Router -->|检查| MCP2["MCP：Slack<br/>团队状态"]

    Router -->|路由复杂问题| Sub1["子代理：技术支持<br/>上下文：技术问题"]
    Router -->|路由简单问题| Sub2["子代理：账单<br/>上下文：支付问题"]
    Router -->|路由紧急问题| Sub3["子代理：升级<br/>上下文：优先处理"]

    Sub1 -->|格式化| Skill1["技能：响应生成器<br/>品牌声音一致"]
    Sub2 -->|格式化| Skill2["技能：响应生成器"]
    Sub3 -->|格式化| Skill3["技能：响应生成器"]

    Skill1 -->|生成| Output["格式化响应"]
    Skill2 -->|生成| Output
    Skill3 -->|生成| Output

    Output -->|发送| MCP3["MCP：Slack<br/>通知团队"]
    Output -->|发送| Reply["客户回复"]
```

#### 请求流程

```markdown
## 客户支持请求流程

### 1. 收到邮件
"I'm getting error 500 when trying to upload files. This is blocking my workflow!"

### 2. 记忆查询
- 加载 CLAUDE.md 中的支持标准
- 检查客户历史：VIP 客户，本月第 3 次事件

### 3. MCP 查询
- GitHub MCP：列出已打开的 Issue（发现相关 Bug 报告）
- Database MCP：检查系统状态（无宕机报告）
- Slack MCP：检查工程团队是否已知悉

### 4. 技能检测与加载
- 请求匹配"技术支持"技能
- 从技能中加载支持响应模板

### 5. 子代理委派
- 路由到技术支持子代理
- 提供上下文：客户历史、错误详情、已知问题
- 子代理拥有完整工具访问权限：read, bash, grep

### 6. 子代理处理
技术支持子代理：
- 在代码库中搜索文件上传的 500 错误
- 发现最近在提交 8f4a2c 中的更改
- 创建临时解决方案文档

### 7. 技能执行
响应生成器技能：
- 使用品牌声音指南
- 以同理心格式化响应
- 包含临时解决方案步骤
- 链接到相关文档

### 8. MCP 输出
- 发布更新到 #support Slack 频道
- 标记工程团队
- 在 Jira MCP 中更新工单

### 9. 响应
客户收到：
- 富有同理心的确认
- 原因解释
- 即时临时解决方案
- 永久修复时间表
- 相关问题链接
```

### 完整功能编排

```mermaid
sequenceDiagram
    participant User as 用户
    participant Claude as Claude Code
    participant Memory as 记忆<br/>CLAUDE.md
    participant MCP as MCP 服务器
    participant Skills as 技能
    participant SubAgent as 子代理

    User->>Claude: 请求："构建认证系统"
    Claude->>Memory: 加载项目标准
    Memory-->>Claude: 认证标准、团队实践
    Claude->>MCP: 查询 GitHub 中的类似实现
    MCP-->>Claude: 代码示例、最佳实践
    Claude->>Skills: 检测匹配的技能
    Skills-->>Claude: 安全审查技能 + 测试技能
    Claude->>SubAgent: 委派实现
    SubAgent->>SubAgent: 构建功能
    Claude->>Skills: 应用安全审查技能
    Skills-->>Claude: 安全检查清单结果
    Claude->>SubAgent: 委派测试
    SubAgent-->>Claude: 测试结果
    Claude->>User: 完整系统交付
```

### 何时使用各功能

```mermaid
graph TD
    A["新任务"] --> B{任务类型？}

    B -->|重复性工作流| C["斜杠命令"]
    B -->|需要实时数据| D["MCP 协议"]
    B -->|下次记住| E["记忆"]
    B -->|专业化子任务| F["子代理"]
    B -->|领域特定工作| G["技能"]

    C --> C1["✅ 团队快捷方式"]
    D --> D1["✅ 实时 API 访问"]
    E --> E1["✅ 持久化上下文"]
    F --> F1["✅ 并行执行"]
    G --> G1["✅ 自动调用的专业能力"]
```

### 选择决策树

```mermaid
graph TD
    Start["需要扩展 Claude？"]

    Start -->|快速重复任务| A{"手动还是自动？"}
    A -->|手动| B["斜杠命令"]
    A -->|自动| C["技能"]

    Start -->|需要外部数据| D{"实时？"}
    D -->|是| E["MCP 协议"]
    D -->|否/跨会话| F["记忆"]

    Start -->|复杂项目| G{"多角色？"}
    G -->|是| H["子代理"]
    G -->|否| I["技能 + 记忆"]

    Start -->|长期上下文| J["记忆"]
    Start -->|团队工作流| K["斜杠命令 +<br/>记忆"]
    Start -->|完全自动化| L["技能 +<br/>子代理 +<br/>MCP"]
```

---

## 总结表

| 方面 | 斜杠命令 | 子代理 | 记忆 | MCP | 技能 | 插件 |
|------|---------|--------|------|-----|------|------|
| **配置难度** | 简单 | 中等 | 简单 | 中等 | 中等 | 简单 |
| **学习曲线** | 低 | 中等 | 低 | 中等 | 中等 | 低 |
| **团队收益** | 高 | 高 | 中等 | 高 | 高 | 非常高 |
| **自动化程度** | 低 | 高 | 中等 | 高 | 高 | 非常高 |
| **上下文管理** | 单会话 | 隔离 | 持久化 | 实时 | 持久化 | 全部功能 |
| **维护负担** | 低 | 中等 | 低 | 中等 | 中等 | 低 |
| **可扩展性** | 良好 | 优秀 | 良好 | 优秀 | 优秀 | 优秀 |
| **可共享性** | 一般 | 一般 | 良好 | 良好 | 良好 | 优秀 |
| **版本控制** | 手动 | 手动 | 手动 | 手动 | 手动 | 自动 |
| **安装方式** | 手动复制 | 手动配置 | 无需 | 手动配置 | 手动复制 | 一条命令 |

---

## 快速入门指南

### 第 1 周：从简单开始
- 为常见任务创建 2-3 个斜杠命令
- 在设置中启用记忆
- 在 CLAUDE.md 中记录团队标准

### 第 2 周：添加实时访问
- 设置 1 个 MCP（GitHub 或数据库）
- 使用 `/mcp` 配置
- 在工作流中查询实时数据

### 第 3 周：分配工作
- 为特定角色创建第一个子代理
- 使用 `/agents` 命令
- 用简单任务测试委派

### 第 4 周：自动化一切
- 为重复性自动化创建第一个技能
- 使用技能市场或构建自定义技能
- 组合所有功能实现完整工作流

### 持续进行
- 每月审查和更新记忆
- 发现新模式时添加新技能
- 优化 MCP 查询
- 优化子代理提示词

---

## 钩子

### 概述

钩子（Hook）是事件驱动的 Shell 命令，在 Claude Code 事件发生时自动执行。它们支持自动化、验证和自定义工作流，无需手动干预。

### 钩子事件

Claude Code 支持 **25 个钩子事件**，分为四种钩子类型（command、http、prompt、agent）：

| 钩子事件 | 触发条件 | 用例 |
|---------|---------|------|
| **SessionStart** | 会话开始/恢复/清除/压缩 | 环境设置、初始化 |
| **InstructionsLoaded** | CLAUDE.md 或规则文件加载 | 验证、转换、增强 |
| **UserPromptSubmit** | 用户提交提示词 | 输入验证、提示词过滤 |
| **PreToolUse** | 任何工具运行前 | 验证、审批门控、日志 |
| **PermissionRequest** | 权限对话框显示 | 自动批准/拒绝流程 |
| **PostToolUse** | 工具成功后 | 自动格式化、通知、清理 |
| **PostToolUseFailure** | 工具执行失败 | 错误处理、日志 |
| **Notification** | 发送通知 | 告警、外部集成 |
| **SubagentStart** | 子代理启动 | 上下文注入、初始化 |
| **SubagentStop** | 子代理完成 | 结果验证、日志 |
| **Stop** | Claude 完成响应 | 摘要生成、清理任务 |
| **StopFailure** | API 错误结束回合 | 错误恢复、日志 |
| **TeammateIdle** | 代理团队队友空闲 | 工作分配、协调 |
| **TaskCompleted** | 任务标记完成 | 后续处理 |
| **TaskCreated** | 通过 TaskCreate 创建任务 | 任务跟踪、日志 |
| **ConfigChange** | 配置文件更改 | 验证、传播 |
| **CwdChanged** | 工作目录更改 | 特定目录设置 |
| **FileChanged** | 监视的文件更改 | 文件监控、重建触发 |
| **PreCompact** | 上下文压缩（Context Compaction）前 | 状态保留 |
| **PostCompact** | 压缩完成后 | 压缩后操作 |
| **WorktreeCreate** | 工作树（Worktree）创建中 | 环境设置、依赖安装 |
| **WorktreeRemove** | 工作树删除中 | 清理、资源释放 |
| **Elicitation** | MCP 服务器请求用户输入 | 输入验证 |
| **ElicitationResult** | 用户响应询问 | 响应处理 |
| **SessionEnd** | 会话终止 | 清理、最终日志 |

### 常用钩子

钩子在 `~/.claude/settings.json`（用户级）或 `.claude/settings.json`（项目级）中配置：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $CLAUDE_FILE_PATH"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "eslint $CLAUDE_FILE_PATH"
          }
        ]
      }
    ]
  }
}
```

### 钩子环境变量

- `$CLAUDE_FILE_PATH` — 正在编辑/写入的文件路径
- `$CLAUDE_TOOL_NAME` — 正在使用的工具名称
- `$CLAUDE_SESSION_ID` — 当前会话标识符
- `$CLAUDE_PROJECT_DIR` — 项目目录路径

### 最佳实践

✅ **推荐做法：**
- 保持钩子快速（< 1 秒）
- 使用钩子进行验证和自动化
- 优雅地处理错误
- 使用绝对路径

❌ **不推荐做法：**
- 使钩子具有交互性
- 将钩子用于长时间运行的任务
- 硬编码凭据

**参见**：[06-hooks/](06-hooks/) 获取详细示例

---

## 检查点与回退

### 概述

检查点（Checkpoint）允许你保存对话状态并回退到之前的节点，支持安全实验和多种方案探索。

### 核心概念

| 概念 | 描述 |
|------|------|
| **检查点** | 对话状态的快照，包含消息、文件和上下文 |
| **回退** | 返回到之前的检查点，丢弃后续更改 |
| **分支点** | 从该检查点探索多种方案 |

### 访问检查点

检查点在每次用户提示时自动创建。要回退：

```bash
# 按两次 Esc 打开检查点浏览器
Esc + Esc

# 或使用 /rewind 命令
/rewind
```

选择检查点后，有五个选项：
1. **恢复代码和对话** — 将两者都回退到该节点
2. **恢复对话** — 回退消息，保留当前代码
3. **恢复代码** — 回退文件，保留对话
4. **从此处总结** — 将对话压缩为摘要
5. **取消** — 取消操作

### 用例

| 场景 | 工作流 |
|------|--------|
| **探索方案** | 保存 -> 尝试 A -> 保存 -> 回退 -> 尝试 B -> 对比 |
| **安全重构** | 保存 -> 重构 -> 测试 -> 如果失败：回退 |
| **A/B 测试** | 保存 -> 设计 A -> 保存 -> 回退 -> 设计 B -> 对比 |
| **错误恢复** | 发现问题 -> 回退到最近的正常状态 |

### 配置

```json
{
  "autoCheckpoint": true
}
```

**参见**：[08-checkpoints/](08-checkpoints/) 获取详细示例

---

## 高级功能

### 规划模式

在编码前创建详细的实现计划。

**激活：**
```bash
/plan Implement user authentication system
```

**优势：**
- 带时间估算的清晰路线图
- 风险评估
- 系统性任务分解
- 审查和修改的机会

### 扩展思考

用于复杂问题的深度推理。

**激活：**
- 在会话中按 `Alt+T`（macOS 上为 `Option+T`）切换
- 通过 `MAX_THINKING_TOKENS` 环境变量进行编程控制

```bash
# 通过环境变量启用扩展思考
export MAX_THINKING_TOKENS=50000
claude -p "Should we use microservices or monolith?"
```

**优势：**
- 深入分析利弊
- 更好的架构决策
- 考虑边界用例
- 系统性评估

### 后台任务

在不阻塞对话的情况下运行长时间操作。

**用法：**
```bash
User: Run tests in background

Claude: Started task bg-1234

/task list           # 显示所有任务
/task status bg-1234 # 检查进度
/task show bg-1234   # 查看输出
/task cancel bg-1234 # 取消任务
```

### 权限模式（Permission Mode）

控制 Claude 可以执行的操作。

| 模式 | 描述 | 用例 |
|------|------|------|
| **default** | 标准权限，敏感操作时提示确认 | 一般开发 |
| **acceptEdits** | 自动接受文件编辑，无需确认 | 信任的编辑工作流 |
| **plan** | 仅分析和规划，不修改文件 | 代码审查、架构规划 |
| **auto** | 自动批准安全操作，仅对风险操作提示 | 安全与自主的平衡 |
| **dontAsk** | 执行所有操作无需确认 | 经验丰富的用户、自动化 |
| **bypassPermissions** | 完全无限制访问，无安全检查 | CI/CD 流水线、受信脚本 |

**用法：**
```bash
claude --permission-mode plan          # 只读分析
claude --permission-mode acceptEdits   # 自动接受编辑
claude --permission-mode auto          # 自动批准安全操作
claude --permission-mode dontAsk       # 无确认提示
```

### 无头模式（打印模式）

使用 `-p`（print）标志在无交互输入的情况下运行 Claude Code，用于自动化和 CI/CD。

**用法：**
```bash
# 运行特定任务
claude -p "Run all tests"

# 通过管道输入进行分析
cat error.log | claude -p "explain this error"

# CI/CD 集成（GitHub Actions）
- name: AI Code Review
  run: claude -p "Review PR changes and report issues"

# 用于脚本的 JSON 输出
claude -p --output-format json "list all functions in src/"
```

### 定时任务

使用 `/loop` 命令按循环计划运行任务。

**用法：**
```bash
/loop every 30m "Run tests and report failures"
/loop every 2h "Check for dependency updates"
/loop every 1d "Generate daily summary of code changes"
```

定时任务在后台运行，完成后报告结果。它们适用于持续监控、定期检查和自动化维护工作流。

### Chrome 集成

Claude Code 可以与 Chrome 浏览器集成进行 Web 自动化任务。这支持在开发工作流中直接进行网页导航、表单填写、截图和网站数据提取等操作。

### 会话管理

管理多个工作会话。

**命令：**
```bash
/resume                # 恢复之前的对话
/rename "Feature"      # 为当前会话命名
/fork                  # 分叉为新会话
claude -c              # 继续最近的对话
claude -r "Feature"    # 按名称/ID 恢复会话
```

### 交互功能

**键盘快捷键：**
- `Ctrl + R` — 搜索命令历史
- `Tab` — 自动补全
- `↑ / ↓` — 命令历史
- `Ctrl + L` — 清屏

**多行输入：**
```bash
User: \
> Long complex prompt
> spanning multiple lines
> \end
```

### 配置

完整配置示例：

```json
{
  "planning": {
    "autoEnter": true,
    "requireApproval": true
  },
  "extendedThinking": {
    "enabled": true,
    "showThinkingProcess": true
  },
  "backgroundTasks": {
    "enabled": true,
    "maxConcurrentTasks": 5
  },
  "permissions": {
    "mode": "default"
  }
}
```

**参见**：[09-advanced-features/](09-advanced-features/) 获取综合指南

---

## 资源

- [Claude Code 文档](https://code.claude.com/docs/en/overview)
- [Anthropic 文档](https://docs.anthropic.com)
- [MCP GitHub 服务器](https://github.com/modelcontextprotocol/servers)
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook)

---

*最后更新：2026 年 3 月*
*适用于 Claude Haiku 4.5、Sonnet 4.6 和 Opus 4.6*
*现已包含：钩子、检查点、规划模式、扩展思考、后台任务、权限模式（6 种模式）、无头模式、会话管理、自动记忆、代理团队、定时任务、Chrome 集成、频道、语音输入和捆绑技能*
