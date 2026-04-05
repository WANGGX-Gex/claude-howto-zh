# 课程测验 — 题库

每课 10 道题。每题包含：类别、题目、选项（3-4 个）、正确答案、解释和复习章节。

---

## 课程 01：斜杠命令

### Q1
- **Category**: conceptual
- **Question**: Claude Code 中的四种斜杠命令（Slash Command）类型是什么？
- **Options**: A) 内置命令、技能、插件命令、MCP 提示词 | B) 内置命令、自定义命令、钩子命令、API 提示词 | C) 系统命令、用户命令、插件命令、终端命令 | D) 核心命令、扩展命令、宏命令、脚本命令
- **Correct**: A
- **Explanation**: Claude Code 有内置命令（如 `/help`、`/compact`）、技能（Skill）（`SKILL.md` 文件）、插件命令（命名空间格式 `plugin-name:command`）和 MCP 提示词（`/mcp__server__prompt`）。
- **Review**: 斜杠命令类型章节

### Q2
- **Category**: practical
- **Question**: 如何将用户提供的所有参数传递给一个技能？
- **Options**: A) 使用 `${args}` | B) 使用 `$ARGUMENTS` | C) 使用 `$@` | D) 使用 `$INPUT`
- **Correct**: B
- **Explanation**: `$ARGUMENTS` 会捕获命令名称后的所有文本。对于位置参数，可以使用 `$0`、`$1` 等。
- **Review**: 参数处理章节

### Q3
- **Category**: conceptual
- **Question**: 当同名的技能（`.claude/skills/name/SKILL.md`）和旧版命令（`.claude/commands/name.md`）同时存在时，哪个优先级更高？
- **Options**: A) 旧版命令 | B) 技能 | C) 先创建的优先 | D) Claude 会询问用户选择
- **Correct**: B
- **Explanation**: 技能优先于同名的旧版命令。技能系统取代了旧的命令系统。
- **Review**: 技能优先级章节

### Q4
- **Category**: practical
- **Question**: 如何将实时 shell 输出注入到技能的提示词中？
- **Options**: A) 使用 `$(command)` 语法 | B) 使用 `!`command`` （感叹号加反引号）语法 | C) 使用 `@shell:command` 语法 | D) 使用 `{command}` 语法
- **Correct**: B
- **Explanation**: `!`command`` 语法会运行一个 shell 命令，并在 Claude 看到之前将其输出注入到技能提示词中。
- **Review**: 动态上下文注入章节

### Q5
- **Category**: conceptual
- **Question**: 技能 frontmatter 中的 `disable-model-invocation: true` 有什么作用？
- **Options**: A) 完全阻止技能运行 | B) 只允许用户调用（Claude 不能自动调用） | C) 从 /help 菜单中隐藏 | D) 禁用技能的 AI 处理
- **Correct**: B
- **Explanation**: `disable-model-invocation: true` 表示只有用户可以通过 `/command-name` 触发该命令。Claude 永远不会自动调用它，适用于有副作用的技能（如部署）。
- **Review**: 控制调用方式章节

### Q6
- **Category**: practical
- **Question**: 你想创建一个只有 Claude 可以自动调用的技能（对用户的 / 菜单隐藏）。你应该设置哪个 frontmatter 字段？
- **Options**: A) `disable-model-invocation: true` | B) `user-invocable: false` | C) `hidden: true` | D) `auto-only: true`
- **Correct**: B
- **Explanation**: `user-invocable: false` 会从用户的斜杠菜单中隐藏技能，但允许 Claude 根据上下文自动调用它。
- **Review**: 调用控制矩阵

### Q7
- **Category**: practical
- **Question**: 创建名为 "deploy" 的自定义技能，正确的目录结构是什么？
- **Options**: A) `.claude/commands/deploy.md` | B) `.claude/skills/deploy/SKILL.md` | C) `.claude/skills/deploy.md` | D) `.claude/deploy/SKILL.md`
- **Correct**: B
- **Explanation**: 技能位于 `.claude/skills/` 下的目录中，目录内有一个 `SKILL.md` 文件。目录名称即为命令名称。
- **Review**: 技能类型和位置章节

### Q8
- **Category**: conceptual
- **Question**: 插件命令如何避免与用户命令的名称冲突？
- **Options**: A) 使用 `plugin-name:command-name` 命名空间 | B) 有特殊的 .plugin 扩展名 | C) 以 `p/` 为前缀 | D) 自动覆盖用户命令
- **Correct**: A
- **Explanation**: 插件命令使用命名空间，如 `pr-review:check-security`，以避免与独立用户命令的冲突。
- **Review**: 插件命令章节

### Q9
- **Category**: practical
- **Question**: 你想限制一个技能可以使用的工具。你应该添加哪个 frontmatter 字段？
- **Options**: A) `tools: [Read, Grep]` | B) `allowed-tools: [Read, Grep]` | C) `permissions: [Read, Grep]` | D) `restrict-tools: [Read, Grep]`
- **Correct**: B
- **Explanation**: `SKILL.md` frontmatter 中的 `allowed-tools` 字段用于限定命令可以调用的工具范围。
- **Review**: frontmatter 字段参考

### Q10
- **Category**: conceptual
- **Question**: 技能中 `@file` 语法的作用是什么？
- **Options**: A) 导入另一个技能 | B) 引用文件并将其内容包含在提示词中 | C) 创建符号链接 | D) 设置文件权限
- **Correct**: B
- **Explanation**: 技能中的 `@path/to/file` 语法会将引用文件的内容包含到提示词中，使技能可以引入模板或上下文文件。
- **Review**: 文件引用章节

---

## 课程 02：记忆

### Q1
- **Category**: conceptual
- **Question**: Claude Code 的记忆（Memory）层级有多少层？哪一层优先级最高？
- **Options**: A) 5 层，用户记忆最高 | B) 7 层，管理策略最高 | C) 3 层，项目记忆最高 | D) 7 层，自动记忆最高
- **Correct**: B
- **Explanation**: 层级共 7 层：管理策略 > 项目记忆 > 项目规则 > 用户记忆 > 用户规则 > 本地项目记忆 > 自动记忆。管理策略（由管理员设置）优先级最高。
- **Review**: 记忆层级章节

### Q2
- **Category**: practical
- **Question**: 如何在对话中快速添加新规则到记忆中？
- **Options**: A) 输入 `/memory add "规则文本"` | B) 消息前加 `#` 前缀（如 `# always use TypeScript`） | C) 输入 `/rule "规则文本"` | D) 使用 `@add-memory "规则文本"`
- **Correct**: B
- **Explanation**: `#` 前缀模式允许在对话中快速添加单条规则。Claude 会询问你保存到哪一层记忆。
- **Review**: 快速记忆更新章节

### Q3
- **Category**: conceptual
- **Question**: CLAUDE.md 中 `@path/to/file` 导入的最大嵌套深度是多少？
- **Options**: A) 3 层 | B) 5 层 | C) 10 层 | D) 无限制
- **Correct**: B
- **Explanation**: `@import` 语法支持递归导入，最大深度为 5 层，以防止无限循环。
- **Review**: 导入语法章节

### Q4
- **Category**: practical
- **Question**: 如何将规则文件的作用域限定为仅应用于 `src/api/` 目录下的文件？
- **Options**: A) 将规则放在 `src/api/CLAUDE.md` 中 | B) 在 `.claude/rules/*.md` 文件中添加 `paths: src/api/**` YAML frontmatter | C) 将文件命名为 `.claude/rules/api.md` | D) 在规则文件中使用 `@scope: src/api`
- **Correct**: B
- **Explanation**: `.claude/rules/` 中的文件支持 `paths:` frontmatter 字段，使用 glob 模式将规则限定到特定目录。
- **Review**: 路径限定规则章节

### Q5
- **Category**: conceptual
- **Question**: 自动记忆的 MEMORY.md 在会话开始时加载多少行？
- **Options**: A) 所有行 | B) 前 100 行 | C) 前 200 行 | D) 前 500 行
- **Correct**: C
- **Explanation**: MEMORY.md 的前 200 行会在会话开始时自动加载到上下文中。MEMORY.md 中引用的主题文件按需加载。
- **Review**: 自动记忆章节

### Q6
- **Category**: practical
- **Question**: 你想要不提交到 git 的个人项目偏好设置，应该使用哪个文件？
- **Options**: A) `~/.claude/CLAUDE.md` | B) `CLAUDE.local.md` | C) `.claude/rules/personal.md` | D) `.claude/memory/personal.md`
- **Correct**: B
- **Explanation**: 项目根目录下的 `CLAUDE.local.md` 用于个人项目特定偏好，应该被 git 忽略。
- **Review**: 记忆位置对比

### Q7
- **Category**: conceptual
- **Question**: `/init` 命令的作用是什么？
- **Options**: A) 从零开始初始化新的 Claude Code 项目 | B) 根据项目结构生成模板 CLAUDE.md | C) 将所有记忆重置为默认值 | D) 创建新会话
- **Correct**: B
- **Explanation**: `/init` 会分析你的项目并生成包含建议规则和标准的模板 CLAUDE.md。这是一个一次性引导工具。
- **Review**: /init 命令章节

### Q8
- **Category**: practical
- **Question**: 如何完全禁用自动记忆？
- **Options**: A) 删除 ~/.claude/projects 目录 | B) 设置 `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | C) 在 CLAUDE.md 中添加 `auto-memory: false` | D) 使用 `/memory disable auto`
- **Correct**: B
- **Explanation**: 设置 `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` 可禁用自动记忆。值为 `0` 则强制开启。未设置时默认开启。
- **Review**: 自动记忆配置章节

### Q9
- **Category**: conceptual
- **Question**: 低优先级的记忆层级能否覆盖高优先级层级的规则？
- **Options**: A) 是的，最新的规则总是优先 | B) 不能，高优先级层级始终优先 | C) 是的，如果低层级使用 `!important` 标志 | D) 取决于规则类型
- **Correct**: B
- **Explanation**: 记忆优先级从管理策略向下传递。低层级（如自动记忆）不能覆盖高层级（如项目记忆）。
- **Review**: 记忆层级章节

### Q10
- **Category**: practical
- **Question**: 你在两个仓库间工作，想让 Claude 同时加载两个仓库的 CLAUDE.md。应该使用什么标志？
- **Options**: A) `--multi-repo` | B) `--add-dir /path/to/other` | C) `--include /path/to/other` | D) `--merge-context /path/to/other`
- **Correct**: B
- **Explanation**: `--add-dir` 标志可以从额外目录加载 CLAUDE.md，实现多仓库上下文。
- **Review**: 额外目录章节

---

## 课程 03：技能

### Q1
- **Category**: conceptual
- **Question**: 技能系统的 3 个渐进披露（Progressive Disclosure）层级是什么？
- **Options**: A) 元数据、指令、资源 | B) 名称、正文、附件 | C) 头部、内容、脚本 | D) 摘要、详情、数据
- **Correct**: A
- **Explanation**: 第 1 层：元数据（约 100 token，始终加载），第 2 层：SKILL.md 正文（<5k token，触发时加载），第 3 层：捆绑资源（scripts/references/assets，按需加载）。
- **Review**: 渐进披露架构章节

### Q2
- **Category**: practical
- **Question**: 技能被 Claude 自动调用的最关键因素是什么？
- **Options**: A) 技能的文件名 | B) frontmatter 中包含使用场景关键词的 `description` 字段 | C) 技能的目录位置 | D) frontmatter 中的 `auto-invoke: true` 字段
- **Correct**: B
- **Explanation**: Claude 仅根据技能的 `description` 字段决定是否自动调用。该字段必须包含具体的触发短语和使用场景。
- **Review**: 自动调用章节

### Q3
- **Category**: conceptual
- **Question**: SKILL.md 文件的推荐最大长度是多少？
- **Options**: A) 100 行 | B) 250 行 | C) 500 行 | D) 1000 行
- **Correct**: C
- **Explanation**: SKILL.md 应保持在 500 行以内。更大的参考材料应放在 `references/` 子目录中。
- **Review**: 内容指南章节

### Q4
- **Category**: practical
- **Question**: 如何让技能在独立的子代理（Subagent）中运行，拥有自己的上下文？
- **Options**: A) 在 frontmatter 中设置 `isolation: true` | B) 在 frontmatter 中设置 `context: fork` 并添加 `agent` 字段 | C) 在 frontmatter 中设置 `subagent: true` | D) 将技能放在 `.claude/agents/` 中
- **Correct**: B
- **Explanation**: `context: fork` 使技能在独立上下文中运行，`agent` 字段指定使用哪种代理类型（如 `Explore`、`Plan`、自定义代理）。
- **Review**: 在子代理中运行技能章节

### Q5
- **Category**: conceptual
- **Question**: 技能元数据（第 1 层）大约占用多少上下文窗口预算？
- **Options**: A) 上下文窗口的 0.5% | B) 上下文窗口的 2% | C) 上下文窗口的 5% | D) 上下文窗口的 10%
- **Correct**: B
- **Explanation**: 技能元数据约占上下文窗口的 2%（后备值：16,000 字符）。可通过 `SLASH_COMMAND_TOOL_CHAR_BUDGET` 配置。
- **Review**: 上下文预算章节

### Q6
- **Category**: practical
- **Question**: 技能需要引用一个大型 API 规范。应该放在哪里？
- **Options**: A) 内联在 SKILL.md 中 | B) 放在技能目录内的 `references/api-spec.md` 文件中 | C) 放在项目的 CLAUDE.md 中 | D) 放在单独的 `.claude/rules/` 文件中
- **Correct**: B
- **Explanation**: 大型参考材料应放在 `references/` 子目录中。Claude 按需加载第 3 层资源，保持 SKILL.md 精简。
- **Review**: 支持文件结构章节

### Q7
- **Category**: conceptual
- **Question**: 技能中参考内容（Reference Content）和任务内容（Task Content）有什么区别？
- **Options**: A) 参考内容只读，任务内容可读写 | B) 参考内容向上下文添加知识，任务内容提供分步操作指令 | C) 参考内容用于文档，任务内容用于代码 | D) 没有区别
- **Correct**: B
- **Explanation**: 参考内容向 Claude 的上下文中添加领域知识（如品牌指南）。任务内容则提供可执行的分步工作流指令。
- **Review**: 技能内容类型章节

### Q8
- **Category**: practical
- **Question**: 技能 frontmatter 中 `name` 字段允许使用哪些字符？
- **Options**: A) 任何字符 | B) 仅限小写字母、数字和连字符（最多 64 个字符） | C) 字母和下划线 | D) 仅限字母数字
- **Correct**: B
- **Explanation**: 名称必须是 kebab-case（小写字母加连字符），最多 64 个字符，且不能包含 "anthropic" 或 "claude"。
- **Review**: SKILL.md 格式章节

### Q9
- **Category**: conceptual
- **Question**: Claude 搜索技能的顺序是什么？
- **Options**: A) 用户 > 项目 > 企业 | B) 企业 > 个人 > 项目（插件使用命名空间） | C) 项目 > 用户 > 企业 | D) 按字母顺序
- **Correct**: B
- **Explanation**: 优先级顺序为：企业 > 个人 > 项目。插件技能使用命名空间（`plugin-name:skill`），因此不会发生冲突。
- **Review**: 技能类型和位置章节

### Q10
- **Category**: practical
- **Question**: 如何阻止 Claude 自动调用技能，同时仍允许用户手动使用？
- **Options**: A) 设置 `user-invocable: false` | B) 设置 `disable-model-invocation: true` | C) 移除 description 字段 | D) 设置 `auto-invoke: false`
- **Correct**: B
- **Explanation**: `disable-model-invocation: true` 阻止 Claude 自动调用，但技能仍保留在用户的 `/` 菜单中供手动使用。
- **Review**: 控制调用方式章节

---

## 课程 04：子代理

### Q1
- **Category**: conceptual
- **Question**: 子代理相比内联对话的主要优势是什么？
- **Options**: A) 速度更快 | B) 在独立的干净上下文窗口中运行，防止上下文污染 | C) 可以使用更多工具 | D) 有更好的错误处理
- **Correct**: B
- **Explanation**: 子代理获得全新的上下文窗口，只接收主代理传递的内容。这防止了主对话被任务特定的细节所污染。
- **Review**: 概述章节

### Q2
- **Category**: practical
- **Question**: 代理定义的优先级顺序是什么？
- **Options**: A) 项目 > 用户 > CLI | B) CLI > 用户 > 项目 | C) 用户 > 项目 > CLI | D) 所有级别优先级相同
- **Correct**: B
- **Explanation**: CLI 定义的代理（`--agents` 标志）覆盖用户级别（`~/.claude/agents/`），用户级别覆盖项目级别（`.claude/agents/`）。
- **Review**: 文件位置章节

### Q3
- **Category**: conceptual
- **Question**: 哪个内置子代理使用 Haiku 模型，专为只读代码库探索而优化？
- **Options**: A) general-purpose | B) Plan | C) Explore | D) Bash
- **Correct**: C
- **Explanation**: Explore 子代理使用 Haiku 进行快速只读代码库探索。支持三种彻底程度：快速、中等、非常彻底。
- **Review**: 内置子代理章节

### Q4
- **Category**: practical
- **Question**: 如何限制协调器代理可以生成哪些子代理？
- **Options**: A) 使用 `allowed-agents:` 字段 | B) 在 `tools` 字段中使用 `Task(agent_name)` 语法 | C) 设置 `spawn-limit: 2` | D) 使用 `restrict-agents: [name1, name2]`
- **Correct**: B
- **Explanation**: 在 tools 字段中添加 `Task(worker, researcher)` 会创建允许列表——代理只能生成名为 "worker" 或 "researcher" 的子代理。
- **Review**: 限制可生成子代理章节

### Q5
- **Category**: conceptual
- **Question**: `isolation: worktree` 对子代理有什么作用？
- **Options**: A) 在 Docker 容器中运行代理 | B) 为代理提供独立的 git 工作树，使更改不影响主树 | C) 阻止代理读取任何文件 | D) 在沙箱中运行代理
- **Correct**: B
- **Explanation**: 工作树隔离会创建一个独立的 git 工作树。如果代理未做更改，会自动清理。如果有更改，会返回工作树路径和分支。
- **Review**: 工作树隔离章节

### Q6
- **Category**: practical
- **Question**: 如何让子代理在后台运行？
- **Options**: A) 在代理配置中设置 `background: true` | B) 在代理配置中使用 `async: true` | C) 启动后按 Ctrl+D | D) 使用 `--background` CLI 标志
- **Correct**: A
- **Explanation**: 代理配置中的 `background: true` 使子代理始终作为后台任务运行。用户也可以使用 Ctrl+B 将前台任务发送到后台。
- **Review**: 后台子代理章节

### Q7
- **Category**: conceptual
- **Question**: 子代理中 `memory` 字段设置 scope 为 `project` 有什么作用？
- **Options**: A) 授予对项目 CLAUDE.md 的读取权限 | B) 创建一个限定于当前项目的持久记忆目录 | C) 共享主代理的对话历史 | D) 加载项目的 git 历史
- **Correct**: B
- **Explanation**: `memory` 字段为子代理创建持久目录。scope 为 `project` 表示记忆绑定到当前项目。代理 MEMORY.md 的前 200 行会自动加载。
- **Review**: 持久记忆章节

### Q8
- **Category**: practical
- **Question**: 如何在子代理描述中添加短语，鼓励 Claude 自动委派任务给它？
- **Options**: A) 添加 "priority: high" | B) 在描述中包含 "use PROACTIVELY" 或 "MUST BE USED" | C) 设置 `auto-delegate: true` | D) 添加 "trigger: always"
- **Correct**: B
- **Explanation**: 在描述中包含 "use PROACTIVELY" 或 "MUST BE USED" 等短语会强烈鼓励 Claude 自动委派匹配的任务。
- **Review**: 自动委派章节

### Q9
- **Category**: conceptual
- **Question**: 子代理的 `permissionMode` 有哪些有效值？
- **Options**: A) read, write, admin | B) default, acceptEdits, bypassPermissions, plan, dontAsk, auto | C) safe, normal, dangerous | D) restricted, standard, elevated
- **Correct**: B
- **Explanation**: 子代理支持六种权限模式：default（所有操作都提示确认）、acceptEdits（自动接受文件编辑）、bypassPermissions（跳过所有检查）、plan（只读）、dontAsk（除预批准外自动拒绝）、auto（后台分类器决定）。
- **Review**: 配置字段章节

### Q10
- **Category**: practical
- **Question**: 如何恢复一个之前返回了 agentId 的子代理？
- **Options**: A) 使用 `/resume agent-id` | B) 调用 Task 工具时传递带有 agentId 的 `resume` 参数 | C) 使用 `claude -r agent-id` | D) 子代理不能被恢复
- **Correct**: B
- **Explanation**: 可以通过传递 `resume` 参数和之前返回的 agentId 来恢复子代理，完整上下文将被保留。
- **Review**: 可恢复代理章节

---

## 课程 05：MCP

### Q1
- **Category**: conceptual
- **Question**: 模型上下文协议（MCP）的三种传输协议是什么？推荐使用哪种？
- **Options**: A) HTTP（推荐）、Stdio、SSE（已弃用） | B) WebSocket（推荐）、REST、gRPC | C) TCP、UDP、HTTP | D) Stdio（推荐）、HTTP、SSE
- **Correct**: A
- **Explanation**: HTTP 推荐用于远程服务器。Stdio 用于本地进程（目前最常用）。SSE 已弃用但仍受支持。
- **Review**: 传输协议章节

### Q2
- **Category**: practical
- **Question**: 如何通过 CLI 添加一个 GitHub MCP 服务器？
- **Options**: A) `claude mcp install github` | B) `claude mcp add --transport http github https://api.github.com/mcp` | C) `claude plugin add github-mcp` | D) `claude connect github`
- **Correct**: B
- **Explanation**: 使用 `claude mcp add` 加上 `--transport` 标志、名称和服务器 URL。对于 stdio：`claude mcp add github -- npx -y @modelcontextprotocol/server-github`。
- **Review**: MCP 配置管理章节

### Q3
- **Category**: conceptual
- **Question**: 当 MCP 工具描述超过上下文窗口的 10% 时会发生什么？
- **Options**: A) 被截断 | B) 工具搜索自动启用，动态选择相关工具 | C) Claude 显示错误 | D) 多余的工具被禁用
- **Correct**: B
- **Explanation**: 当工具超过上下文的 10% 时，MCP 工具搜索（Tool Search）会自动启用。最低要求 Sonnet 4 或 Opus 4（不支持 Haiku）。
- **Review**: MCP 工具搜索章节

### Q4
- **Category**: practical
- **Question**: 如何在 MCP 配置中使用环境变量的回退值？
- **Options**: A) `${VAR || "default"}` | B) `${VAR:-default}` | C) `${VAR:default}` | D) `${VAR ? "default"}`
- **Correct**: B
- **Explanation**: `${VAR:-default}` 在环境变量未设置时提供回退值。不带回退的 `${VAR}` 在变量未设置时会报错。
- **Review**: 环境变量展开章节

### Q5
- **Category**: conceptual
- **Question**: MCP 和记忆在数据访问方面有什么区别？
- **Options**: A) MCP 更快，记忆更慢 | B) MCP 用于实时/变化的外部数据，记忆用于持久/静态的偏好设置 | C) MCP 用于代码，记忆用于文本 | D) 它们可以互换
- **Correct**: B
- **Explanation**: MCP 连接实时、变化的外部数据源（API、数据库）。记忆存储持久的、静态的项目上下文和偏好设置。
- **Review**: MCP 与记忆对比章节

### Q6
- **Category**: practical
- **Question**: 团队成员首次遇到项目级 `.mcp.json` 时会发生什么？
- **Options**: A) 自动加载 | B) 收到安全审批提示，要求信任项目的 MCP 服务器 | C) 除非在设置中选择启用，否则被忽略 | D) Claude 要求管理员批准
- **Correct**: B
- **Explanation**: 项目级 `.mcp.json` 会在每个团队成员首次使用时触发安全审批提示。这是有意为之——防止不受信任的 MCP 服务器。
- **Review**: MCP 作用域章节

### Q7
- **Category**: conceptual
- **Question**: `claude mcp serve` 的作用是什么？
- **Options**: A) 启动 MCP 服务器仪表板 | B) 让 Claude Code 本身作为 MCP 服务器供其他应用使用 | C) 提供 MCP 文档服务 | D) 测试 MCP 服务器连接
- **Correct**: B
- **Explanation**: `claude mcp serve` 将 Claude Code 变成 MCP 服务器，支持多代理编排，让一个 Claude 实例可以被另一个控制。
- **Review**: Claude 作为 MCP 服务器章节

### Q8
- **Category**: practical
- **Question**: MCP 工具的默认最大输出大小是多少？
- **Options**: A) 5,000 token | B) 10,000 token | C) 25,000 token | D) 50,000 token
- **Correct**: C
- **Explanation**: 默认最大值为 25,000 token（`MAX_MCP_OUTPUT_TOKENS`）。在 10k token 时会显示警告。磁盘持久化上限为 50k 字符。
- **Review**: MCP 输出限制章节

### Q9
- **Category**: conceptual
- **Question**: 在管理配置中，当 `allowedMcpServers` 和 `deniedMcpServers` 同时匹配一个服务器时，哪个优先？
- **Options**: A) 允许规则优先 | B) 拒绝规则优先 | C) 最后配置的优先 | D) 两者独立应用
- **Correct**: B
- **Explanation**: 在管理 MCP 配置中，拒绝规则始终优先于允许规则。
- **Review**: 管理 MCP 配置章节

### Q10
- **Category**: practical
- **Question**: 如何在对话中引用 MCP 资源？
- **Options**: A) 使用 `/mcp resource-name` | B) 使用 `@server-name:protocol://resource/path` 提及语法 | C) 使用 `mcp.get("resource")` | D) 资源自动加载
- **Correct**: B
- **Explanation**: MCP 资源通过对话中的 `@server-name:protocol://resource/path` 提及语法访问。
- **Review**: MCP 资源章节

---

## 课程 06：钩子

### Q1
- **Category**: conceptual
- **Question**: Claude Code 中的四种钩子（Hook）类型是什么？
- **Options**: A) Pre、Post、Error 和 Filter 钩子 | B) Command、HTTP、Prompt 和 Agent 钩子 | C) Before、After、Around 和 Through 钩子 | D) Input、Output、Filter 和 Transform 钩子
- **Correct**: B
- **Explanation**: Command 钩子运行 shell 脚本，HTTP 钩子调用 webhook 端点，Prompt 钩子使用单轮 LLM 评估，Agent 钩子使用基于子代理的验证。
- **Review**: 钩子类型章节

### Q2
- **Category**: practical
- **Question**: 钩子脚本以退出码 2 退出时会发生什么？
- **Options**: A) 显示非阻塞警告 | B) 阻塞性错误——stderr 内容作为错误显示给 Claude，工具使用被阻止 | C) 钩子被重试 | D) 会话结束
- **Correct**: B
- **Explanation**: 退出码 0 = 成功/继续，退出码 2 = 阻塞性错误（stderr 显示为错误），其他非零退出码 = 非阻塞（stderr 仅在详细模式中显示）。
- **Review**: 退出码章节

### Q3
- **Category**: conceptual
- **Question**: PreToolUse 钩子通过 stdin 接收哪些 JSON 字段？
- **Options**: A) `tool_name` 和 `tool_output` | B) `session_id`、`tool_name`、`tool_input`、`hook_event_name`、`cwd` 等 | C) 仅 `tool_name` | D) 完整对话历史
- **Correct**: B
- **Explanation**: 钩子通过 stdin 接收包含以下字段的 JSON 对象：session_id、transcript_path、hook_event_name、tool_name、tool_input、tool_use_id、cwd 和 permission_mode。
- **Review**: JSON 输入结构章节

### Q4
- **Category**: practical
- **Question**: PreToolUse 钩子如何在执行前修改工具的输入参数？
- **Options**: A) 在 stderr 上返回修改后的 JSON | B) 在 stdout 上返回带有 `updatedInput` 字段的 JSON（退出码 0） | C) 写入临时文件 | D) 钩子不能修改输入
- **Correct**: B
- **Explanation**: PreToolUse 钩子可以在 stdout 上输出带有 `"updatedInput": {...}` 的 JSON（退出码 0），在 Claude 使用前修改工具的参数。
- **Review**: PreToolUse 输出章节

### Q5
- **Category**: conceptual
- **Question**: 哪个钩子事件支持通过 `CLAUDE_ENV_FILE` 将环境变量持久化到会话中？
- **Options**: A) PreToolUse | B) UserPromptSubmit | C) SessionStart | D) 所有事件
- **Correct**: C
- **Explanation**: 只有 SessionStart 钩子可以使用 `CLAUDE_ENV_FILE` 将环境变量持久化到会话中。
- **Review**: SessionStart 章节

### Q6
- **Category**: practical
- **Question**: 你希望钩子仅在技能首次加载时运行一次，而不是每次工具调用都运行。应该添加什么字段？
- **Options**: A) `run-once: true` | B) 在组件钩子定义中设置 `once: true` | C) `single: true` | D) `max-runs: 1`
- **Correct**: B
- **Explanation**: 组件级钩子（在 SKILL.md 或代理 frontmatter 中定义）支持 `once: true`，仅在首次激活时运行。
- **Review**: 组件级钩子章节

### Q7
- **Category**: conceptual
- **Question**: 在子代理 frontmatter 中定义的 Stop 钩子会自动转换为什么？
- **Options**: A) PostToolUse 钩子 | B) SubagentStop 钩子 | C) SessionEnd 钩子 | D) 保持为 Stop 钩子
- **Correct**: B
- **Explanation**: 当 Stop 钩子放在子代理的 frontmatter 中时，会自动转换为 SubagentStop，在该特定子代理完成时运行。
- **Review**: 组件级钩子章节

### Q8
- **Category**: practical
- **Question**: 如何让钩子匹配特定服务器的所有 MCP 工具？
- **Options**: A) `matcher: "mcp_github"` | B) `matcher: "mcp__github__.*"`（正则表达式模式） | C) `matcher: "mcp:github:*"` | D) `matcher: "github-mcp"`
- **Correct**: B
- **Explanation**: 匹配器使用正则表达式模式。MCP 工具遵循 `mcp__server__tool` 命名约定，因此 `mcp__github__.*` 匹配所有 GitHub MCP 工具。
- **Review**: 匹配器模式章节

### Q9
- **Category**: conceptual
- **Question**: Claude Code 总共支持多少个钩子事件？
- **Options**: A) 10 | B) 16 | C) 25 | D) 30
- **Correct**: C
- **Explanation**: Claude Code 支持 25 个钩子事件：PreToolUse、PostToolUse、PostToolUseFailure、UserPromptSubmit、Stop、StopFailure、SubagentStop、SubagentStart、PermissionRequest、Notification、PreCompact、PostCompact、SessionStart、SessionEnd、WorktreeCreate、WorktreeRemove、ConfigChange、CwdChanged、FileChanged、TeammateIdle、TaskCompleted、TaskCreated、Elicitation、ElicitationResult、InstructionsLoaded。
- **Review**: 钩子事件表

### Q10
- **Category**: practical
- **Question**: 你想调试钩子为什么没有触发。最佳方法是什么？
- **Options**: A) 在钩子脚本中添加 print 语句 | B) 使用 `--debug` 标志和 `Ctrl+O` 进入详细模式 | C) 检查系统日志 | D) 钩子没有调试工具
- **Correct**: B
- **Explanation**: `--debug` 标志和 `Ctrl+O` 详细模式会显示钩子执行的详细信息，包括哪些钩子被触发、它们的输入和输出。
- **Review**: 调试章节

---

## 课程 07：插件

### Q1
- **Category**: conceptual
- **Question**: 插件（Plugin）的核心清单文件是什么？它位于哪里？
- **Options**: A) 根目录中的 `plugin.yaml` | B) `.claude-plugin/plugin.json` | C) `package.json` 中的 "claude" 键 | D) `.claude/plugin.md`
- **Correct**: B
- **Explanation**: 插件清单位于 `.claude-plugin/plugin.json`，必需字段包括：name、description、version、author。
- **Review**: 插件定义结构章节

### Q2
- **Category**: practical
- **Question**: 发布前如何在本地测试插件？
- **Options**: A) 使用 `/plugin test ./my-plugin` | B) 使用 `claude --plugin-dir ./my-plugin` | C) 使用 `claude plugin validate ./my-plugin` | D) 复制到 ~/.claude/plugins/
- **Correct**: B
- **Explanation**: `--plugin-dir` 标志从本地目录加载插件进行测试。可重复使用以加载多个插件。
- **Review**: 测试章节

### Q3
- **Category**: conceptual
- **Question**: 在插件钩子和 MCP 配置中，哪个环境变量可用于引用插件的安装目录？
- **Options**: A) `$PLUGIN_HOME` | B) `${CLAUDE_PLUGIN_ROOT}` | C) `$PLUGIN_DIR` | D) `${CLAUDE_PLUGIN_PATH}`
- **Correct**: B
- **Explanation**: `${CLAUDE_PLUGIN_ROOT}` 解析为插件的安装目录，使钩子和 MCP 配置中的路径引用具有可移植性。
- **Review**: 插件目录结构章节

### Q4
- **Category**: practical
- **Question**: "pr-review" 插件中有一个名为 "check-security" 的命令。用户如何调用它？
- **Options**: A) `/check-security` | B) `/pr-review:check-security` | C) `/plugin pr-review check-security` | D) `/pr-review/check-security`
- **Correct**: B
- **Explanation**: 插件命令使用 `plugin-name:command-name` 命名空间，以避免与用户命令和其他插件的冲突。
- **Review**: 插件命令章节

### Q5
- **Category**: conceptual
- **Question**: 插件可以捆绑哪些组件？
- **Options**: A) 仅命令和设置 | B) 命令、代理、技能、钩子、MCP 服务器、LSP 配置、设置、模板、脚本 | C) 仅命令、钩子和 MCP 服务器 | D) 仅技能和代理
- **Correct**: B
- **Explanation**: 插件可以捆绑：commands/、agents/、skills/、hooks/hooks.json、.mcp.json、.lsp.json、settings.json、templates/、scripts/、docs/、tests/。
- **Review**: 插件目录结构章节

### Q6
- **Category**: practical
- **Question**: 如何从 GitHub 安装插件？
- **Options**: A) `claude plugin add github:username/repo` | B) `/plugin install github:username/repo` | C) `npm install @claude/username-repo` | D) `git clone` 然后 `claude plugin register`
- **Correct**: B
- **Explanation**: 使用 `/plugin install github:username/repo` 直接从 GitHub 仓库安装。
- **Review**: 安装方法章节

### Q7
- **Category**: conceptual
- **Question**: 插件 `settings.json` 中的 `agent` 键有什么作用？
- **Options**: A) 指定认证凭据 | B) 设置插件的主线程代理 | C) 列出可用的子代理 | D) 配置代理权限
- **Correct**: B
- **Explanation**: 插件 settings.json 中的 `agent` 键指定插件激活时使用哪个代理定义作为主线程代理。
- **Review**: 插件设置章节

### Q8
- **Category**: practical
- **Question**: 如何管理插件的生命周期（启用/禁用/更新）？
- **Options**: A) 手动编辑配置文件 | B) 使用 `/plugin enable`、`/plugin disable`、`/plugin update plugin-name` | C) 使用 `claude plugin-manager` | D) 重新安装插件
- **Correct**: B
- **Explanation**: Claude Code 提供斜杠命令进行完整的生命周期管理：enable、disable、update、uninstall。
- **Review**: 安装方法章节

### Q9
- **Category**: conceptual
- **Question**: 插件相比独立的技能/钩子/MCP 有什么主要优势？
- **Options**: A) 插件更快 | B) 一键安装、版本管理、市场分发，将所有组件打包在一起 | C) 插件有更多权限 | D) 插件可离线工作
- **Correct**: B
- **Explanation**: 插件将多个组件打包为一个可安装单元，支持版本管理、市场分发和自动更新——相比独立组件的手动设置更方便。
- **Review**: 独立组件与插件对比章节

### Q10
- **Category**: practical
- **Question**: 插件目录中的钩子配置文件位于哪里？
- **Options**: A) `.claude-plugin/hooks.json` | B) `hooks/hooks.json` | C) `plugin.json` 的 hooks 部分 | D) `.claude/settings.json`
- **Correct**: B
- **Explanation**: 插件钩子配置在插件目录结构中的 `hooks/hooks.json` 文件中。
- **Review**: 插件钩子章节

---

## 课程 08：检查点

### Q1
- **Category**: conceptual
- **Question**: 检查点（Checkpoint）捕获哪四项内容？
- **Options**: A) Git 提交、分支、标签、暂存 | B) 消息、文件修改、工具使用历史、会话上下文 | C) 代码、测试、日志、配置 | D) 输入、输出、错误、时间
- **Correct**: B
- **Explanation**: 检查点捕获对话消息、Claude 工具所做的文件修改、工具使用历史和会话上下文。
- **Review**: 概述章节

### Q2
- **Category**: practical
- **Question**: 如何访问检查点浏览器？
- **Options**: A) 使用 `/checkpoints` 命令 | B) 按 `Esc + Esc`（双击 Escape）或使用 `/rewind` | C) 使用 `/history` 命令 | D) 按 `Ctrl+Z`
- **Correct**: B
- **Explanation**: 双击 Escape（Esc+Esc）或 `/rewind` 命令打开检查点浏览器以选择恢复点。
- **Review**: 访问检查点章节

### Q3
- **Category**: conceptual
- **Question**: 有多少种回退选项？分别是什么？
- **Options**: A) 3 种：撤销、重做、重置 | B) 5 种：恢复代码和对话、仅恢复对话、仅恢复代码、从此处总结、取消 | C) 2 种：完全恢复、部分恢复 | D) 4 种：代码、消息、两者都恢复、取消
- **Correct**: B
- **Explanation**: 5 种选项是：恢复代码和对话（完全回退）、仅恢复对话、仅恢复代码、从此处总结（压缩）、取消。
- **Review**: 回退选项章节

### Q4
- **Category**: practical
- **Question**: 你在 Claude Code 中通过 Bash 执行了 `rm -rf temp/`，然后想回退。检查点能恢复那些文件吗？
- **Options**: A) 能，检查点捕获所有内容 | B) 不能，Bash 文件系统操作（rm、mv、cp）不在检查点追踪范围内 | C) 仅当使用 Edit 工具时才能 | D) 仅当启用了 autoCheckpoint 时才能
- **Correct**: B
- **Explanation**: 检查点只追踪 Claude 工具（Write、Edit）所做的文件更改。Bash 命令（如 rm、mv、cp）在检查点追踪范围之外。
- **Review**: 限制章节

### Q5
- **Category**: conceptual
- **Question**: 检查点保留多长时间？
- **Options**: A) 直到会话结束 | B) 7 天 | C) 30 天 | D) 永久保留
- **Correct**: C
- **Explanation**: 检查点跨会话保留最多 30 天，之后自动清理。
- **Review**: 检查点持久化章节

### Q6
- **Category**: practical
- **Question**: 回退时"从此处总结"有什么作用？
- **Options**: A) 从该点删除对话 | B) 将对话压缩为 AI 生成的摘要，同时在转录文件中保留原文 | C) 创建更改的要点列表 | D) 将对话导出到文件
- **Correct**: B
- **Explanation**: 总结功能将对话压缩为更短的 AI 生成的摘要。完整原文保留在转录文件中。
- **Review**: 总结选项章节

### Q7
- **Category**: conceptual
- **Question**: 检查点何时自动创建？
- **Options**: A) 每 5 分钟 | B) 每次用户输入提示词时 | C) 仅在手动保存时 | D) 每次工具使用后
- **Correct**: B
- **Explanation**: 每次用户输入提示词时自动创建检查点，捕获 Claude 处理请求前的状态。
- **Review**: 自动检查点章节

### Q8
- **Category**: practical
- **Question**: 如何禁用自动创建检查点？
- **Options**: A) 使用 `--no-checkpoints` 标志 | B) 在设置中设置 `autoCheckpoint: false` | C) 删除 checkpoints 目录 | D) 检查点不能被禁用
- **Correct**: B
- **Explanation**: 在配置中设置 `autoCheckpoint: false` 可禁用自动创建检查点（默认为 true）。
- **Review**: 配置章节

### Q9
- **Category**: conceptual
- **Question**: 检查点能替代 git 提交吗？
- **Options**: A) 能，它们更强大 | B) 不能，它们是互补的——检查点是会话级的且会过期，git 是永久的且可共享 | C) 能，对于小型项目 | D) 仅在个人开发时
- **Correct**: B
- **Explanation**: 检查点是临时的（30 天保留期）、会话级的，且不能共享。Git 提交是永久的、可审计的、可共享的。两者配合使用最佳。
- **Review**: 与 git 集成章节

### Q10
- **Category**: practical
- **Question**: 你想比较两种不同的方案。推荐的检查点工作流是什么？
- **Options**: A) 创建两个独立会话 | B) 在方案 A 前创建检查点，尝试方案 A，回退到检查点，尝试方案 B，比较结果 | C) 改用 git 分支 | D) 没有好的方法来比较方案
- **Correct**: B
- **Explanation**: 分支策略：在干净状态创建检查点，尝试方案 A，记录结果，回退到同一检查点，尝试方案 B。比较两种结果。
- **Review**: 工作流模式章节

---

## 课程 09：高级功能

### Q1
- **Category**: conceptual
- **Question**: Claude Code 中的六种权限模式是什么？
- **Options**: A) read、write、execute、admin、root、sudo | B) default、acceptEdits、plan、auto、dontAsk、bypassPermissions | C) safe、normal、elevated、admin、unrestricted、god | D) view、edit、run、deploy、full、bypass
- **Correct**: B
- **Explanation**: 六种模式是：default（所有操作都提示确认）、acceptEdits（自动接受文件编辑）、plan（只读分析）、auto（后台分类器决定）、dontAsk（除预批准外自动拒绝）、bypassPermissions（跳过所有检查）。
- **Review**: 权限模式章节

### Q2
- **Category**: practical
- **Question**: 如何激活规划模式（Planning Mode）？
- **Options**: A) 仅通过 `/plan` 命令 | B) 通过 `/plan`、`Shift+Tab`/`Alt+M`、`--permission-mode plan` 标志或默认配置 | C) 仅通过 `--planning` 标志 | D) 规划模式始终开启
- **Correct**: B
- **Explanation**: 规划模式可通过多种方式激活：/plan 命令、Shift+Tab/Alt+M 快捷键、--permission-mode plan CLI 标志，或作为配置中的默认值。
- **Review**: 规划模式章节

### Q3
- **Category**: conceptual
- **Question**: `opusplan` 模型别名有什么作用？
- **Options**: A) 所有阶段都使用 Opus | B) 规划阶段使用 Opus，实现阶段使用 Sonnet | C) 使用专门优化的规划模型 | D) 自动启用规划模式
- **Correct**: B
- **Explanation**: `opusplan` 是一个模型别名，规划阶段使用 Opus（更高质量的分析），执行阶段使用 Sonnet（更快的实现）。
- **Review**: 规划模式章节

### Q4
- **Category**: practical
- **Question**: 如何在会话中切换扩展思考（Extended Thinking）？
- **Options**: A) 输入 `/think` | B) 按 `Option+T`（macOS）或 `Alt+T` | C) 使用 `--thinking` 标志 | D) 始终启用且不能切换
- **Correct**: B
- **Explanation**: Option+T（macOS）或 Alt+T 切换扩展思考。所有模型默认启用。Opus 4.6 支持自适应努力级别。
- **Review**: 扩展思考章节

### Q5
- **Category**: conceptual
- **Question**: "think" 或 "ultrathink" 是激活增强思考的特殊关键词吗？
- **Options**: A) 是的，它们激活更深层推理 | B) 不是，它们被视为普通提示词文本，没有特殊行为 | C) 只有 "ultrathink" 是特殊的 | D) 它们仅在 Opus 中有效
- **Correct**: B
- **Explanation**: 文档明确指出这些是普通的提示词指令，不是特殊激活关键词。扩展思考通过 Alt+T 切换和环境变量控制。
- **Review**: 扩展思考章节

### Q6
- **Category**: practical
- **Question**: 如何在 CI/CD 流水线中运行 Claude，获取结构化 JSON 输出并设置轮次限制？
- **Options**: A) `claude --ci --json --limit 3` | B) `claude -p --output-format json --max-turns 3 "review code"` | C) `claude --pipeline --format json` | D) `claude run --json --turns 3`
- **Correct**: B
- **Explanation**: 打印模式（`-p`）配合 `--output-format json` 和 `--max-turns` 是标准的 CI/CD 集成模式。
- **Review**: 无头/打印模式章节

### Q7
- **Category**: conceptual
- **Question**: 任务列表（Task List）功能（Ctrl+T）提供什么？
- **Options**: A) 运行中的后台进程列表 | B) 跨上下文压缩持久存在的待办列表，可通过 `CLAUDE_CODE_TASK_LIST_ID` 共享 | C) 过去会话的历史 | D) 待处理工具调用的队列
- **Correct**: B
- **Explanation**: 任务列表（Ctrl+T）跨上下文压缩持久存在，可通过 `CLAUDE_CODE_TASK_LIST_ID` 使用命名任务目录在会话间共享。
- **Review**: 任务列表章节

### Q8
- **Category**: practical
- **Question**: 规划模式中如何在外部编辑器中编辑计划？
- **Options**: A) 从终端复制粘贴 | B) 按 `Ctrl+G` 在外部编辑器中打开计划 | C) 使用 `/export-plan` 命令 | D) 计划不能在外部编辑
- **Correct**: B
- **Explanation**: Ctrl+G 在配置的外部编辑器中打开当前计划进行修改。
- **Review**: 规划模式章节

### Q9
- **Category**: conceptual
- **Question**: `dontAsk` 和 `bypassPermissions` 模式有什么区别？
- **Options**: A) 它们相同 | B) `dontAsk` 除预批准外自动拒绝；`bypassPermissions` 完全跳过所有检查 | C) `dontAsk` 用于文件；`bypassPermissions` 用于命令 | D) `bypassPermissions` 更安全
- **Correct**: B
- **Explanation**: dontAsk 除非匹配预批准的模式，否则自动拒绝权限请求。bypassPermissions 完全跳过所有安全检查——日常使用很危险。
- **Review**: 权限模式章节

### Q10
- **Category**: practical
- **Question**: 如何将 CLI 会话移交给桌面应用？
- **Options**: A) 使用 `/export` 命令 | B) 使用 `/desktop` 命令 | C) 复制会话 ID 并粘贴到应用中 | D) 会话不能在 CLI 和桌面间转移
- **Correct**: B
- **Explanation**: `/desktop` 命令将当前 CLI 会话移交给原生桌面应用，用于可视化差异查看和多会话管理。
- **Review**: 桌面应用章节

---

## 课程 10：CLI 参考

### Q1
- **Category**: conceptual
- **Question**: Claude CLI 的两种主要模式是什么？
- **Options**: A) 在线和离线模式 | B) 交互式 REPL（`claude`）和打印模式（`claude -p`） | C) GUI 和终端模式 | D) 单任务和批处理模式
- **Correct**: B
- **Explanation**: 交互式 REPL 是默认的对话模式。打印模式（-p）是非交互式的，可脚本化、可管道传输——响应后即退出。
- **Review**: CLI 架构章节

### Q2
- **Category**: practical
- **Question**: 如何将文件通过管道传入 Claude 并获取 JSON 输出？
- **Options**: A) `claude --file error.log --json` | B) `cat error.log | claude -p --output-format json "explain this"` | C) `claude < error.log --format json` | D) `claude -p --input error.log --json`
- **Correct**: B
- **Explanation**: 通过 stdin 将内容管道传入打印模式（-p），并使用 --output-format json 获取结构化输出。
- **Review**: 交互式与打印模式对比章节

### Q3
- **Category**: conceptual
- **Question**: `-c` 和 `-r` 标志有什么区别？
- **Options**: A) 两者相同 | B) `-c` 继续最近的会话；`-r` 按名称或 ID 恢复 | C) `-c` 创建新会话；`-r` 恢复会话 | D) `-c` 用于代码；`-r` 用于审查
- **Correct**: B
- **Explanation**: `-c/--continue` 恢复最近的对话。`-r/--resume "name"` 按名称或会话 ID 恢复特定会话。
- **Review**: 会话管理章节

### Q4
- **Category**: practical
- **Question**: 如何保证 Claude 的 JSON 输出符合特定 schema？
- **Options**: A) 只需使用 `--output-format json` | B) 使用 `--output-format json --json-schema '{"type":"object",...}'` | C) 使用 `--strict-json` 标志 | D) JSON 输出始终符合 schema
- **Correct**: B
- **Explanation**: 单独使用 `--output-format json` 只产出尽力而为的 JSON。添加 `--json-schema` 配合 JSON Schema 定义可保证输出匹配该 schema。
- **Review**: 输出与格式章节

### Q5
- **Category**: conceptual
- **Question**: 哪个标志只在打印模式（-p）中生效，在交互模式中无效？
- **Options**: A) `--model` | B) `--system-prompt-file` | C) `--verbose` | D) `--max-turns`
- **Correct**: B
- **Explanation**: `--system-prompt-file` 从文件加载系统提示词，但仅在打印模式中有效。交互会话中使用 `--system-prompt`（内联字符串）。
- **Review**: 系统提示词标志对比表

### Q6
- **Category**: practical
- **Question**: 如何将 Claude 限制为仅使用只读工具进行安全审计？
- **Options**: A) `claude --read-only "audit code"` | B) `claude --permission-mode plan --tools "Read,Grep,Glob" "audit code"` | C) `claude --safe-mode "audit code"` | D) `claude --no-write "audit code"`
- **Correct**: B
- **Explanation**: 组合使用 `--permission-mode plan`（只读分析）和 `--tools`（指定工具白名单）可将 Claude 限制为仅执行读操作。
- **Review**: 工具和权限管理章节

### Q7
- **Category**: conceptual
- **Question**: 代理定义的优先级顺序是什么？
- **Options**: A) 项目 > 用户 > CLI | B) CLI > 用户 > 项目 | C) 用户 > CLI > 项目 | D) 所有级别优先级相同
- **Correct**: B
- **Explanation**: CLI 定义的代理（--agents 标志）优先级最高，其次是用户级别（~/.claude/agents/），然后是项目级别（.claude/agents/）。
- **Review**: 代理配置章节

### Q8
- **Category**: practical
- **Question**: 如何分叉现有会话以尝试不同方案而不丢失原始内容？
- **Options**: A) 使用 `/fork` 命令 | B) 使用 `--resume session-name --fork-session "branch name"` | C) 使用 `--clone session-name` | D) 使用 `/branch session-name`
- **Correct**: B
- **Explanation**: `--resume` 配合 `--fork-session` 从恢复的会话创建一个新的独立分支，保留原始对话。
- **Review**: 会话管理章节

### Q9
- **Category**: conceptual
- **Question**: 用户已登录时，`claude auth status` 返回什么退出码？
- **Options**: A) 1 | B) 0 | C) 200 | D) 不返回退出码
- **Correct**: B
- **Explanation**: `claude auth status` 登录时退出码为 0，未登录时为 1。这使其可用于 CI/CD 认证检查的脚本中。
- **Review**: CLI 命令表

### Q10
- **Category**: practical
- **Question**: 如何用 Claude 批量处理多个文件？
- **Options**: A) `claude --batch *.md` | B) 使用 for 循环：`for file in *.md; do claude -p "summarize: $(cat $file)" > ${file%.md}.json; done` | C) `claude -p --files *.md "summarize all"` | D) 不支持批量处理
- **Correct**: B
- **Explanation**: 使用 shell for 循环配合打印模式逐个处理文件。每次调用是独立的，可以产出结构化输出。
- **Review**: 批量处理章节
