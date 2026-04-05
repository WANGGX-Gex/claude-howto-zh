# Claude Code 项目说明

本项目是 [claude-howto](https://github.com/luongnv89/claude-howto) 的中文翻译版本。
仓库地址：https://github.com/WANGGX-Gex/claude-howto-zh

## 项目状态

- **初始翻译**：已完成（2026-04-05），101 个文件已翻译
- **CI 检查**：已通过（修复了中文锚点兼容性问题）
- **上游同步**：GitHub Actions 每周一自动检测（`.github/workflows/upstream-sync.yml`）

## 翻译规则（所有 agent 必须遵循）

1. **术语双语格式**：每个文件中首次出现的技术术语用"中文（English）"格式，后续仅用中文。术语表见 `TRANSLATION-NOTES.md`。
2. **不翻译**：代码块、命令、配置片段、文件路径、YAML frontmatter、JSON/YAML 配置。
3. **Mermaid 图表**：翻译人类可读标签文本，保留节点 ID 和样式。
4. **链接**：翻译显示文本，保留 URL 路径不变。
5. **保持原文件结构和格式**：不改变标题层级、列表结构、代码块语言标记。
6. **翻译风格**：专业但易读，使用主动语态，避免过于生硬的翻译腔。

## 已知问题与注意事项

### 中文锚点问题（已修复）
原项目的 `scripts/check_cross_references.py` 使用 `heading.encode("ascii", "ignore")` 生成锚点，会丢弃所有中文字符。已修改为支持 CJK Unicode 范围。**未来上游更新此脚本时需注意合并冲突。**

### 翻译标题时的锚点一致性
翻译标题后，目录中的锚点链接必须与标题生成的锚点完全匹配。特别注意：
- 全角字符（`：`、`（`、`）`）会被去除
- `+` 号会被去除
- 多个连续空格会产生多个 `-`
- **最佳做法**：翻译标题时避免使用全角括号包裹内容，用简洁的中文表述代替

### 不翻译的文件
- 所有 `.py/.sh/.js` 脚本
- 所有 `.json/.yml/.yaml` 配置
- 所有 `.svg/.png/.pdf` 资源
- `LICENSE` 文件
- `.claude/skills/*/SKILL.md` 的 YAML frontmatter
- `CHANGELOG.md` 和 `RELEASE_NOTES.md`（仅加中文头部说明）

## 关键文件

- `TRANSLATION-NOTES.md` — 术语表和翻译规范
- `.github/workflows/upstream-sync.yml` — 上游同步检测工作流
- `.upstream-sync-sha` — 上游同步 SHA 追踪
- `scripts/check_cross_references.py` — 已修改支持中文锚点
