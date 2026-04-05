# 安全漏洞报告

本文件说明如何向 Claude How To 项目报告安全漏洞。

## 快速链接

- **私密报告**：https://github.com/luongnv89/claude-howto/security/advisories
- **安全政策**：[SECURITY.md](../SECURITY.md)
- **报告模板**：见下文

## 报告漏洞

### 方式一：GitHub 私密漏洞报告（推荐）

这是报告安全漏洞的首选方式。

**步骤：**
1. 前往：https://github.com/luongnv89/claude-howto/security/advisories
2. 点击"Report a vulnerability"
3. 填写详细信息（使用下方模板）
4. 提交

**优势：**
- 在修复发布前保持漏洞私密
- 自动通知维护者
- 内置协作功能
- 与 GitHub 安全工具集成

### 方式二：GitHub 安全警报（针对依赖项）

如果你发现依赖项中的漏洞：

1. 前往：https://github.com/luongnv89/claude-howto/security/advisories
2. 查看警报
3. 创建包含修复的拉取请求
4. 添加 `security` 标签

### 方式三：私密邮件（GitHub 不可用时）

如果你无法使用 GitHub 的报告系统：

**即将推出**：安全联系邮箱将在此处添加

目前请使用上述 GitHub 私密漏洞报告方式。

## 漏洞报告模板

报告漏洞时请使用此模板：

```
**Title**: [Brief description of vulnerability]

**Severity**: [Critical/High/Medium/Low]
Estimated CVSS Score: [0-10]

**Type**: [Code/Documentation/Dependency/Configuration]

**Affected Component**:
- File: [path/to/file.py]
- Section: [Section name if documentation]
- Version: [latest/specific version]

**Description**:
[Clear explanation of what the vulnerability is]

**Potential Impact**:
[What could an attacker do with this vulnerability?]
[Who could be affected?]

**Steps to Reproduce**:
1. [First step]
2. [Second step]
3. [Third step]
[Expected result vs actual result]

**Proof of Concept** (if available):
[Code or steps to demonstrate the vulnerability]

**Suggested Fix**:
[Your recommended solution, if you have one]

**Additional Context**:
[Any other relevant information]

**Your Information**:
- Name: [Your name or anonymous]
- Email: [Your email]
- Credit: [How you'd like to be credited, if at all]
```

## 报告后的处理流程

### 时间线

1. **即时（< 1 小时）**
   - 自动通知发送给项目维护者

2. **24 小时内**
   - 对报告进行初步评估
   - 确认收到
   - 初步严重性评估

3. **48 小时内**
   - 安全团队的详细回复
   - 需要澄清的问题（如需）
   - 修复时间线（如漏洞确认）

4. **1-7 天内**（取决于严重性）
   - 修复开发和测试
   - 安全公告准备
   - 修复发布和公开公告发布

### 沟通

我们将通过以下方式保持你知情：
- GitHub 私密漏洞讨论
- 电子邮件（如提供）
- 讨论帖更新

你可以：
- 提出澄清问题
- 提供额外信息
- 建议改进修复方案
- 请求调整时间线

### 披露时间线

**关键问题（CVSS 9.0-10.0）**
- 修复：立即发布（24 小时内）
- 披露：同日发布公开公告
- 通知：提前 24 小时通知报告者

**高危问题（CVSS 7.0-8.9）**
- 修复：48-72 小时内发布
- 披露：发布时公开公告
- 通知：提前 5 天通知报告者

**中危问题（CVSS 4.0-6.9）**
- 修复：包含在下次常规更新中
- 披露：发布时公开公告
- 通知：协调时间

**低危问题（CVSS 0.1-3.9）**
- 修复：包含在下次常规更新中
- 披露：发布时公告
- 通知：与发布同日

## 安全漏洞标准

### 范围内

我们接受以下方面的报告：

- **代码漏洞**
  - 注入攻击（命令注入、SQL 注入等）
  - 示例中的跨站脚本（XSS）
  - 认证/授权缺陷
  - 路径遍历漏洞
  - 密码学问题

- **文档安全**
  - 暴露的密钥或凭证
  - 不安全的代码模式
  - 安全反模式
  - 误导性安全声明

- **依赖项漏洞**
  - 依赖项中的已知 CVE
  - 供应链攻击
  - 恶意依赖项

- **配置问题**
  - 不安全的默认值
  - 缺失的安全头
  - 示例中的凭证暴露

### 范围外

我们不接受以下方面的报告：

- Claude Code 本身的漏洞（请联系 Anthropic）
- 外部服务的漏洞
- 没有证明的理论性漏洞
- 已向上游项目报告的问题
- 社会工程或钓鱼
- 用户教育/培训问题

## 负责任披露准则

### 应当做的

- **私密报告**，在公开披露之前
- **具体说明**文件路径和行号
- **提供证明**漏洞的证据
- **给我们时间**修复（协调披露）
- **更新**如果你发现更多细节
- **专业**地进行所有沟通
- **保密**直到我们发布

### 不应做的

- **不要公开披露**在我们修复之前
- **不要利用**漏洞超出测试范围
- **不要修改**其他用户的数据
- **不要要求**付款或好处
- **不要分享**漏洞给其他人
- **不要使用**漏洞进行任何有害行为
- **不要发送**与安全无关的问题

## 协调披露

我们实践负责任披露：

1. **私密报告**：你向我们私密报告
2. **我们的评估**：我们评估和判断严重性
3. **修复开发**：我们开发和测试修复
4. **提前通知**：我们在公开披露前提前通知你
5. **公开发布**：我们同时发布修复和公告
6. **你的致谢**：我们致谢你的贡献（如需要）

**时间线因严重性而异**（见上方章节）

## 修复发布后

### 公开公告

公开安全公告将包含：
- 漏洞描述
- 受影响版本
- 严重性（CVSS 评分）
- 修复步骤
- 修复链接
- 报告者致谢（经许可）

### 你的认可

如果你希望被致谢：
- 公告中的你的姓名/昵称
- 你的个人资料/网站链接
- 发布说明中的提及
- 加入荣誉墙（如已创建）

### 无报酬

请注意：
- 这是一个志愿者运营的开源项目
- 我们无法提供经济奖励
- 我们提供认可和致谢
- 你的贡献帮助了社区

## 安全研究

如果你正在进行安全研究：

1. **获取许可**：先联系维护者
2. **确定范围**：约定你将测试的内容
3. **报告发现**：使用本流程
4. **遵守时间线**：留出修复时间
5. **负责任地发布**：与我们协调

## 有疑问？

关于此流程的问题：

1. 查看 [SECURITY.md](../SECURITY.md) 了解详细政策
2. 查看下方 [常见问题](#常见问题) 章节
3. 使用 `[SECURITY]` 标签开启讨论
4. 敏感问题请使用私密漏洞报告

## 常见问题

**问：我的报告会保密吗？**
答：是的，直到修复发布。我们只与参与修复的人员分享详情。

**问：公开披露前我需要等多久？**
答：我们根据严重性遵循负责任披露时间线（24 小时到 7 天）。如需可协商延长。

**问：我会获得致谢吗？**
答：是的，在安全公告和发布说明中（除非你希望匿名）。

**问：如果漏洞较小怎么办？**
答：所有合理的安全问题都会被认真对待。即使是小修复也会被致谢。

**问：我可以只报告文档中的漏洞吗？**
答：可以！文档安全同样重要。包含不安全模式的示例在范围内。

**问：如果我不确定某个问题是否是安全问题怎么办？**
答：请照样报告！如果不是安全问题，我们会告知你。误报是可以接受的。

**问：报告后我可以公开讨论漏洞吗？**
答：不可以，请在我们发布公告前保密。过早披露可能让用户面临风险。

**问：我怎么知道你们收到了我的报告？**
答：GitHub 会发送自动通知，我们会在 24 小时内跟进。

**问：如果没有收到回复怎么办？**
答：查看 GitHub 安全公告页面。如果仍未看到回复，你可以在私密报告中追加评论。

## 资源

- [SECURITY.md](../SECURITY.md) - 完整安全政策
- [CONTRIBUTING.md](../CONTRIBUTING.md) - 贡献指南
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) - 社区规范
- [OWASP 漏洞披露](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html) - 负责任披露最佳实践
- [协调漏洞披露](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html)

---

感谢你帮助保护此项目的安全！
