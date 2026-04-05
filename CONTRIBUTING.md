<picture>
  <source media="(prefers-color-scheme: dark)" srcset="resources/logos/claude-howto-logo-dark.svg">
  <img alt="Claude How To" src="resources/logos/claude-howto-logo.svg">
</picture>

# 贡献指南

感谢你有兴趣为本项目做出贡献！本指南将帮助你了解如何有效地参与贡献。

## 关于本项目

本项目是 [claude-howto](https://github.com/luongnv89/claude-howto) 的中文翻译版本。我们提供：
- 使用 **Mermaid 图表**解释功能如何工作的可视化教程
- 可立即使用的**生产级模板**
- 包含上下文和最佳实践的**真实示例**
- 从初级到高级的**渐进式学习路径**

## 贡献类型

### 1. 翻译改进
改进现有翻译内容：
- 修正翻译不准确的地方
- 改善中文表达的流畅性
- 统一术语翻译
- 确保术语双语格式一致

### 2. 新示例或模板
为现有功能添加示例（斜杠命令（Slash Command）、技能（Skill）、钩子（Hook）等）：
- 可复制粘贴的代码
- 清晰的工作原理解释
- 用例和好处
- 故障排除提示

### 3. 文档改进
- 澄清令人困惑的章节
- 修复拼写和语法错误
- 添加缺失的信息
- 改进代码示例

### 4. 功能指南
为新的 Claude Code 功能创建指南：
- 分步教程
- 架构图
- 常见模式和反模式
- 真实工作流

### 5. Bug 报告
报告你遇到的问题：
- 描述你预期的行为
- 描述实际发生的情况
- 包含复现步骤
- 添加相关的 Claude Code 版本和操作系统信息

### 6. 反馈和建议
帮助改进指南：
- 建议更好的解释方式
- 指出覆盖范围的空白
- 推荐新章节或重新组织

## 开始贡献

### 1. Fork 和克隆
```bash
git clone https://github.com/WANGGX-Gex/claude-howto-zh.git
cd claude-howto-zh
```

### 2. 创建分支
使用描述性的分支名称：
```bash
git checkout -b add/feature-name
git checkout -b fix/issue-description
git checkout -b docs/improvement-area
git checkout -b translate/file-name
```

### 3. 设置环境

预提交钩子会在每次提交前在本地运行与 CI 相同的检查。所有检查必须通过才能接受 PR。

**必需的依赖：**

```bash
# Python 工具（uv 是本项目的包管理器）
pip install uv
uv venv
source .venv/bin/activate
uv pip install -r scripts/requirements-dev.txt

# Markdown 检查器（Node.js）
npm install -g markdownlint-cli

# Mermaid 图表验证器（Node.js）
npm install -g @mermaid-js/mermaid-cli

# 安装预提交钩子并激活
uv pip install pre-commit
pre-commit install
```

**验证你的设置：**

```bash
pre-commit run --all-files
```

每次提交时运行的钩子：

| 钩子 | 检查内容 |
|------|---------|
| `markdown-lint` | Markdown 格式和结构 |
| `cross-references` | 相对链接、锚点、代码围栏 |
| `mermaid-syntax` | 所有 ` ```mermaid ` 块正确解析 |
| `link-check` | 外部 URL 可访问 |
| `build-epub` | EPUB 生成无错误（针对 `.md` 更改） |

## 目录结构

```
├── 01-slash-commands/      # 用户调用的快捷方式
├── 02-memory/              # 持久化上下文示例
├── 03-skills/              # 可复用的能力
├── 04-subagents/           # 专业化的 AI 助手
├── 05-mcp/                 # 模型上下文协议示例
├── 06-hooks/               # 事件驱动自动化
├── 07-plugins/             # 功能集合包
├── 08-checkpoints/         # 会话快照
├── 09-advanced-features/   # 规划、思考、后台任务
├── 10-cli/                 # CLI 参考
├── scripts/                # 构建和实用脚本
└── README.md               # 主要指南
```

## 翻译规范

### 术语双语格式
每个文件中首次出现的技术术语使用"中文（English）"格式，后续仅用中文。请参考项目中已有的术语翻译保持一致。

### 不翻译的内容
- 代码块（```内容）
- 命令名（/optimize 等）
- 文件路径（CLAUDE.md 等）
- YAML/JSON 配置
- Badge URL

### Mermaid 图表
翻译节点标签中的人类可读文本，保留节点 ID 和样式。

### 链接
翻译显示文本，保留 URL 路径不变。

## 如何贡献示例

### 添加斜杠命令
1. 在 `01-slash-commands/` 中创建 `.md` 文件
2. 包含：
   - 功能的清晰描述
   - 用例
   - 安装说明
   - 使用示例
   - 自定义提示
3. 更新 `01-slash-commands/README.md`

### 添加技能
1. 在 `03-skills/` 中创建目录
2. 包含：
   - `SKILL.md` - 主要文档
   - `scripts/` - 辅助脚本（如需要）
   - `templates/` - 提示词（Prompt）模板
   - README 中的使用示例
3. 更新 `03-skills/README.md`

### 添加子代理（Subagent）
1. 在 `04-subagents/` 中创建 `.md` 文件
2. 包含：
   - 代理（Agent）目的和能力
   - 系统提示词结构
   - 示例用例
   - 集成示例
3. 更新 `04-subagents/README.md`

### 添加 MCP 配置
1. 在 `05-mcp/` 中创建 `.json` 文件
2. 包含：
   - 配置说明
   - 所需环境变量
   - 设置说明
   - 使用示例
3. 更新 `05-mcp/README.md`

### 添加钩子
1. 在 `06-hooks/` 中创建 `.sh` 文件
2. 包含：
   - Shebang 和描述
   - 解释逻辑的清晰注释
   - 错误处理
   - 安全注意事项
3. 更新 `06-hooks/README.md`

## 编写指南

### Markdown 风格
- 使用清晰的标题（H2 用于章节，H3 用于子章节）
- 保持段落简短且专注
- 使用项目符号列表
- 包含带有语言标记的代码块
- 在章节之间添加空行

### 代码示例
- 确保示例可以复制粘贴直接使用
- 对非显而易见的逻辑添加注释
- 包含简单和高级版本
- 展示真实用例
- 突出潜在问题

### 文档
- 解释"为什么"而非仅仅是"是什么"
- 包含前置条件
- 添加故障排除章节
- 链接到相关主题
- 保持对初学者友好

### JSON/YAML
- 使用适当的缩进（一致使用 2 或 4 个空格）
- 添加注释解释配置
- 包含验证示例

### 图表
- 尽可能使用 Mermaid
- 保持图表简单和可读
- 在图表下方添加描述
- 链接到相关章节

## 提交指南

遵循约定式提交格式：
```
type(scope): description

[optional body]
```

类型：
- `feat`: 新功能或示例
- `fix`: Bug 修复或更正
- `docs`: 文档更改
- `translate`: 翻译内容
- `refactor`: 代码重构
- `style`: 格式更改
- `test`: 测试添加或更改
- `chore`: 构建、依赖等

示例：
```
feat(slash-commands): Add API documentation generator
docs(memory): Improve personal preferences example
fix(README): Correct table of contents link
translate(skills): Translate skills README to Chinese
```

## 提交前

### 检查清单
- [ ] 代码遵循项目风格和规范
- [ ] 新示例包含清晰的文档
- [ ] README 文件已更新（本地和根目录）
- [ ] 没有敏感信息（API 密钥、凭据）
- [ ] 示例已测试并可工作
- [ ] 链接已验证且正确
- [ ] 文件有适当的权限（脚本可执行）
- [ ] 提交消息清晰且描述性强
- [ ] 翻译术语使用一致

### 本地测试
```bash
# 运行所有预提交检查（与 CI 相同的检查）
pre-commit run --all-files

# 审查你的更改
git diff
```

## Pull Request 流程

1. **创建包含清晰描述的 PR**:
   - 这添加/修复了什么？
   - 为什么需要这样做？
   - 相关 Issue（如有）

2. **包含相关细节**:
   - 新功能？包含用例
   - 文档？解释改进
   - 示例？展示前后对比

3. **链接到 Issue**:
   - 使用 `Closes #123` 自动关闭相关 Issue

4. **耐心等待审查**:
   - 维护者可能会建议改进
   - 根据反馈进行迭代
   - 最终决定权在维护者

## 代码审查流程

审查者将检查：
- **准确性**: 是否按描述工作？
- **质量**: 是否达到生产级质量？
- **一致性**: 是否遵循项目模式？
- **文档**: 是否清晰完整？
- **安全**: 是否有漏洞？
- **翻译质量**: 中文表达是否准确流畅？

## 报告问题

### Bug 报告
包含：
- Claude Code 版本
- 操作系统
- 复现步骤
- 预期行为
- 实际行为
- 截图（如适用）

### 功能请求
包含：
- 要解决的用例或问题
- 建议的解决方案
- 你考虑过的替代方案
- 额外上下文

### 文档问题
包含：
- 令人困惑或缺失的内容
- 建议的改进
- 示例或参考

## 项目政策

### 敏感信息
- 永远不要提交 API 密钥、令牌（Token）或凭据
- 在示例中使用占位符值
- 为配置文件包含 `.env.example`
- 记录所需的环境变量

### 代码质量
- 保持示例专注和可读
- 避免过度工程化
- 对非显而易见的逻辑添加注释
- 提交前充分测试

### 知识产权
- 原创内容版权归作者所有
- 项目使用 MIT 许可证
- 尊重现有版权
- 在需要时提供归属

## 获取帮助

- **问题**: 在 GitHub Issue 中发起讨论
- **一般帮助**: 查看现有文档
- **开发帮助**: 审查类似示例
- **代码审查**: 在 PR 中标记维护者

## 认可

贡献者将在以下位置获得认可：
- README.md 贡献者章节
- GitHub 贡献者页面
- 提交历史

## 安全

在贡献示例和文档时，请遵循安全编码实践：

- **永远不要硬编码密钥或 API 密钥** - 使用环境变量
- **警告安全影响** - 突出潜在风险
- **使用安全默认值** - 默认启用安全功能
- **验证输入** - 展示适当的输入验证和清理
- **包含安全说明** - 记录安全注意事项

如有安全问题，请参见 [SECURITY.md](SECURITY.md) 了解我们的漏洞报告流程。

## 行为准则

我们致力于提供一个友好和包容的社区。请阅读 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 了解完整的社区标准。

简而言之：
- 尊重和包容
- 优雅地接受反馈
- 帮助他人学习和成长
- 避免骚扰或歧视
- 向维护者报告问题

所有贡献者都应遵守本准则，以友善和尊重对待彼此。

## 许可证

通过为本项目做出贡献，你同意你的贡献将在 MIT 许可证下发布。详见 [LICENSE](LICENSE) 文件。

## 问题？

- 查看 [README](README.md)
- 审查 [LEARNING-ROADMAP.md](LEARNING-ROADMAP.md)
- 查看现有示例
- 创建 Issue 进行讨论

感谢你的贡献！
