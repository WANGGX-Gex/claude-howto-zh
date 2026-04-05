# Claude Code 项目说明

本项目是 [claude-howto](https://github.com/luongnv89/claude-howto) 的中文翻译版本。
仓库地址：https://github.com/WANGGX-Gex/claude-howto-zh

## 项目状态

- **初始翻译**：已完成（2026-04-05），101 个文件已翻译
- **质量检查**：已通过（2026-04-05），5 个并行 agent 全量检查，修复了 6 个断裂锚点
- **CI 检查**：全部通过（cross_references 105 文件、links 112 URL、mermaid 跳过无 mmdc）
- **上游同步**：GitHub Actions 每周一自动检测（`.github/workflows/upstream-sync.yml`）
- **学习网站**：已完成初版（`website/` 目录），Next.js 16 + TypeScript + Tailwind CSS

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

## 上游同步翻译流程

当 GitHub Actions 检测到上游 `luongnv89/claude-howto` 有新提交并创建 PR 时，按以下步骤操作：

### 1. 检测变更范围

```bash
# 查看上游变更了哪些文件
git fetch upstream main
git diff <old-sha>..<new-sha> --name-only -- '*.md'

# 查看具体变更内容
git diff <old-sha>..<new-sha> -- '*.md'
```

### 2. 分类处理变更

| 变更类型 | 处理方式 |
|---------|---------|
| 新增 .md 文件 | 按翻译规则全文翻译 |
| 修改已翻译的 .md | 对比差异，仅翻译变更部分 |
| 新增/修改脚本、配置 | 直接合并，不翻译 |
| 修改 check_cross_references.py | **注意合并冲突**——我们修改了锚点生成逻辑 |
| 新增 Mermaid 图表 | 翻译标签文本，保留节点 ID 和样式 |
| 删除文件 | 同步删除对应的中文文件 |

### 3. 翻译质量检查清单

翻译完成后，必须通过以下检查：

- [ ] 运行 `python3 scripts/check_cross_references.py` — 锚点和交叉引用
- [ ] 运行 `python3 scripts/check_links.py` — 外部链接有效性
- [ ] 运行 `python3 scripts/check_mermaid.py` — Mermaid 图表语法
- [ ] 检查新术语是否已添加到 `TRANSLATION-NOTES.md` 术语表
- [ ] 检查所有新标题的锚点链接正确（注意 emoji 前导连字符、全角字符去除）
- [ ] 确认代码块、frontmatter、配置未被翻译

### 4. 锚点生成规则速查

翻译标题时，锚点按以下规则生成（与 `check_cross_references.py` 一致）：
- 小写化（中文不受影响）
- 去除标点符号（保留 CJK 字符、`\w`、空格、连字符）
- 空格替换为 `-`
- 去除尾部 `-`
- **不去除头部 `-`**（emoji 被删除后留下的空格会变成前导 `-`）

示例：`## 🧭 找到你的级别` → 锚点 `#-找到你的级别`

### 5. 自动化辅助

- `scripts/check_cross_references.py` — 验证锚点和引用（已支持中文）
- `scripts/check_links.py` — 验证外部 URL
- `scripts/check_mermaid.py` — 验证 Mermaid 图表语法
- `.github/workflows/docs-check.yml` — CI 自动运行以上检查
- `.github/workflows/upstream-sync.yml` — 每周一自动检测上游变更

## 学习网站（`website/`）

### 技术栈
- Next.js 16 + TypeScript + Tailwind CSS v4
- react-markdown + remark-gfm + rehype-raw + rehype-slug（Markdown 渲染）
- mermaid（图表渲染，客户端动态加载）
- 静态导出（`output: 'export'`），29 个页面

### 开发与构建
```bash
cd website
npm run dev     # 开发模式，端口 3001
npm run build   # 静态构建到 out/
```

### 项目结构
```
website/src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页（Hero + 模块网格 + 进度）
│   ├── HomeClient.tsx      # 首页客户端组件（进度显示）
│   ├── modules/page.tsx    # 模块列表（按级别分组）
│   ├── modules/[slug]/     # 模块详情（Markdown 渲染 + 子页面标签 + 进度）
│   ├── quiz/[lesson]/      # 交互式测验（10 课，每课 10 题）
│   ├── roadmap/            # 学习路径（渲染 LEARNING-ROADMAP.md）
│   ├── search/             # 全文搜索
│   └── auth/               # 登录（邮箱/手机+验证码）和个人资料
├── components/             # 可复用组件
│   ├── MarkdownRenderer.tsx  # Markdown 渲染（含 Mermaid、代码高亮）
│   ├── CodeBlock.tsx         # 代码块 + 一键复制
│   ├── MermaidDiagram.tsx    # Mermaid 图表（暗色主题适配）
│   ├── Quiz.tsx              # 测验组件（评分、回顾、进度保存）
│   ├── ThemeProvider.tsx     # 暗色/亮色主题
│   ├── Header.tsx            # 顶部导航（响应式 + 移动端菜单）
│   ├── Sidebar.tsx           # 侧边栏模块导航
│   ├── Breadcrumb.tsx        # 面包屑
│   └── ProgressTracker.tsx   # 学习进度追踪
├── lib/                    # 工具函数
│   ├── modules.ts          # 从项目根目录读取 Markdown 内容
│   ├── quiz.ts             # 解析 question-bank.md 题库
│   ├── progress.ts         # localStorage 进度管理
│   ├── auth.ts             # 用户认证（演示模式，验证码显示在页面）
│   └── search.ts           # 全文搜索
└── types/index.ts          # TypeScript 类型定义
```

### 功能清单
- [x] 10 个学习模块渲染（从项目 Markdown 文件读取）
- [x] Mermaid 图表渲染（暗色主题适配）
- [x] 交互式测验（100 题，评分 + 答题回顾）
- [x] 学习进度追踪（localStorage）
- [x] 全文搜索
- [x] 暗色/亮色主题切换
- [x] 代码块一键复制
- [x] 用户登录（邮箱/手机号 + 验证码演示）
- [x] 响应式设计（移动端菜单、侧边栏隐藏）
- [x] 模块间导航（前/后 + 侧边栏 + 面包屑）
- [x] 静态导出（可部署到 GitHub Pages / Vercel / Netlify）

### 已知限制
- 用户认证为**演示模式**（验证码直接显示在页面上），生产环境需接入真实 SMS/Email API
- Markdown 中的相对图片路径（如 `memory-ask-claude.png`）在网站中不显示，需将图片复制到 `public/` 或使用绝对 URL
- `<picture>` 标签和 logo SVG 引用已在渲染时过滤掉

## 关键文件

- `TRANSLATION-NOTES.md` — 术语表和翻译规范
- `.github/workflows/upstream-sync.yml` — 上游同步检测工作流
- `.github/workflows/docs-check.yml` — 文档质量 CI 检查
- `.upstream-sync-sha` — 上游同步 SHA 追踪
- `scripts/check_cross_references.py` — 已修改支持中文锚点
- `website/` — 交互式学习网站（Next.js）
