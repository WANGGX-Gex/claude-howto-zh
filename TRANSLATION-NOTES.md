# 翻译说明 / Translation Notes

本文档是 claude-howto 中文翻译项目的术语表和翻译规范。

## 术语表 / Glossary

| English | 中文 | 行文格式（首次出现） |
|---|---|---|
| Slash Command | 斜杠命令 | 斜杠命令（Slash Command） |
| Skill | 技能 | 技能（Skill） |
| Hook | 钩子 | 钩子（Hook） |
| Subagent | 子代理 | 子代理（Subagent） |
| Plugin | 插件 | 插件（Plugin） |
| MCP (Model Context Protocol) | 模型上下文协议 | 模型上下文协议（MCP） |
| Memory | 记忆 | 记忆（Memory） |
| Checkpoint | 检查点 | 检查点（Checkpoint） |
| Context Window | 上下文窗口 | 上下文窗口（Context Window） |
| Worktree | 工作树 | 工作树（Worktree） |
| Frontmatter | 前置元数据 | 前置元数据（Frontmatter） |
| Prompt | 提示词 | 提示词（Prompt） |
| Agent | 代理 | 代理（Agent） |
| Token | 令牌 | 令牌（Token） |
| CLI | 命令行界面 | 命令行界面（CLI） |
| Sandbox | 沙盒 | 沙盒（Sandbox） |
| Matcher | 匹配器 | 匹配器（Matcher） |
| Progressive Disclosure | 渐进式展示 | 渐进式展示（Progressive Disclosure） |
| Context Compaction | 上下文压缩 | 上下文压缩（Context Compaction） |
| Permission Mode | 权限模式 | 权限模式（Permission Mode） |

## 翻译规则

1. **术语格式**：每个文件中首次出现的技术术语使用"中文（English）"格式，之后仅用中文。
2. **不翻译的内容**：
   - 代码块（` ``` ` 包围的内容）
   - 命令名、配置键名（如 `/optimize`、`settings.json`、`hooks`）
   - 文件路径（如 `CLAUDE.md`、`03-skills/`）
   - YAML frontmatter（`---` 之间的内容）
   - JSON/YAML 配置示例
3. **Mermaid 图表**：翻译节点标签中的人类可读文本，保留节点 ID、样式指令和 `<br/>` 标签。
4. **链接**：翻译显示文本，保留 URL/路径不变。如 `[Skills Guide](../03-skills/)` → `[技能（Skill）指南](../03-skills/)`。
5. **表格**：翻译列头和描述性文本，保留代码/配置值为英文。
6. **图片 alt 文本**：翻译。图片路径不变。
7. **CHANGELOG / RELEASE_NOTES**：保留英文原文，仅在顶部加中文说明。
8. **slides/*.pdf**：二进制文件无法翻译，在 README 中注明为英文。
