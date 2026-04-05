---
name: blog-draft
description: Draft a blog post from ideas and resources. Use when users want to write a blog post, create content from research, or draft articles. Guides through research, brainstorming, outlining, and iterative drafting with version control.
---

## 用户输入

```text
$ARGUMENTS
```

在继续之前，你**必须**考虑用户输入。用户应提供：
- **想法/主题**：博客文章的主要概念或主题
- **资源**：URL、文件或参考研究材料（可选但推荐）
- **目标受众**：博客文章面向谁（可选）
- **语气/风格**：正式、休闲、技术性等（可选）

**重要**：如果用户请求更新**现有博客文章**，跳过步骤 0-8，直接从**步骤 9** 开始。先阅读现有草稿文件，然后进行迭代流程。

## 执行流程

按顺序执行以下步骤。**不要跳过步骤或在需要用户批准的地方擅自继续。**

### 步骤 0：创建项目文件夹

1. 使用格式 `YYYY-MM-DD-short-topic-name` 生成文件夹名
   - 使用今天的日期
   - 从主题创建简短的 URL 友好型缩略名（小写、连字符、最多 5 个单词）

2. 创建文件夹结构：
   ```
   blog-posts/
   └── YYYY-MM-DD-short-topic-name/
       └── resources/
   ```

3. 在继续之前与用户确认文件夹创建。

### 步骤 1：研究与资源收集

1. 在博客文章目录中创建 `resources/` 子文件夹

2. 对每个提供的资源：
   - **URL**：获取并将关键信息保存为 `resources/` 中的 markdown 文件
   - **文件**：阅读并汇总到 `resources/`
   - **主题**：使用网络搜索收集最新信息

3. 为每个资源在 `resources/` 中创建汇总文件：
   - `resources/source-1-[short-name].md`
   - `resources/source-2-[short-name].md`
   - 等等

4. 每个汇总应包含：
   ```markdown
   # Source: [Title/URL]

   ## Key Points
   - Point 1
   - Point 2

   ## Relevant Quotes/Data
   - Quote or statistic 1
   - Quote or statistic 2

   ## How This Relates to Topic
   Brief explanation of relevance
   ```

5. 向用户展示研究汇总。

### 步骤 2：头脑风暴与澄清

1. 基于想法和研究资源，展示：
   - 从研究中识别的**主要主题**
   - 博客文章的**潜在角度**
   - 应涵盖的**关键要点**
   - 需要澄清的信息**空白**

2. 提出澄清问题：
   - 你希望读者获得的主要收获是什么？
   - 研究中有哪些特定要点你想强调？
   - 目标字数是多少？（短篇：500-800 字，中篇：1000-1500 字，长篇：2000+ 字）
   - 有什么要点你想排除？

3. **等待用户回复后再继续。**

### 步骤 3：提出大纲

1. 创建包含以下内容的结构化大纲：

   ```markdown
   # Blog Post Outline: [Title]

   ## Meta Information
   - **Target Audience**: [who]
   - **Tone**: [style]
   - **Target Length**: [word count]
   - **Main Takeaway**: [key message]

   ## Proposed Structure

   ### Hook/Introduction
   - Opening hook idea
   - Context setting
   - Thesis statement

   ### Section 1: [Title]
   - Key point A
   - Key point B
   - Supporting evidence from [source]

   ### Section 2: [Title]
   - Key point A
   - Key point B

   [Continue for all sections...]

   ### Conclusion
   - Summary of key points
   - Call to action or final thought

   ## Sources to Cite
   - Source 1
   - Source 2
   ```

2. 向用户展示大纲并**请求批准或修改意见**。

### 步骤 4：保存已批准的大纲

1. 用户批准大纲后，将其保存为博客文章文件夹中的 `OUTLINE.md`。

2. 确认大纲已保存。

### 步骤 5：提交大纲（如果在 git 仓库中）

1. 检查当前目录是否为 git 仓库。

2. 如果是：
   - 暂存新文件：博客文章文件夹、资源和 OUTLINE.md
   - 创建提交，信息为：`docs: Add outline for blog post - [topic-name]`
   - 推送到远程

3. 如果不是 git 仓库，跳过此步骤并通知用户。

### 步骤 6：撰写草稿

1. 基于已批准的大纲，撰写完整的博客文章草稿。

2. 严格遵循 OUTLINE.md 中的结构。

3. 包含：
   - 引人入胜的开篇引言
   - 清晰的小节标题
   - 来自研究的支持证据和示例
   - 各小节之间的流畅过渡
   - 有力的结论和要点总结
   - **引用**：所有比较、统计数据、数据点和事实声明必须引用原始来源

4. 将草稿保存为博客文章文件夹中的 `draft-v0.1.md`。

5. 格式：
   ```markdown
   # [Blog Post Title]

   *[Optional: subtitle or tagline]*

   [Full content with inline citations...]

   ---

   ## References
   - [1] Source 1 Title - URL or Citation
   - [2] Source 2 Title - URL or Citation
   - [3] Source 3 Title - URL or Citation
   ```

6. **引用要求**：
   - 每个数据点、统计数据或比较必须有行内引用
   - 使用编号引用 [1]、[2] 等，或命名引用 [Source Name]
   - 将引用链接到末尾的参考文献部分
   - 示例："Studies show that 65% of developers prefer TypeScript [1]"
   - 示例："React outperforms Vue in rendering speed by 20% [React Benchmarks 2024]"

### 步骤 7：提交草稿（如果在 git 仓库中）

1. 检查是否在 git 仓库中。

2. 如果是：
   - 暂存草稿文件
   - 创建提交，信息为：`docs: Add draft v0.1 for blog post - [topic-name]`
   - 推送到远程

3. 如果不是 git 仓库，跳过并通知用户。

### 步骤 8：展示草稿供审查

1. 向用户展示草稿内容。

2. 请求反馈：
   - 整体印象如何？
   - 哪些部分需要扩展或缩减？
   - 需要调整语气吗？
   - 缺少什么信息？
   - 有特定的编辑或重写需求？

3. **等待用户回复。**

### 步骤 9：迭代或定稿

**如果用户请求修改：**
1. 记录所有请求的修改
2. 返回步骤 6 并进行以下调整：
   - 递增版本号（v0.2、v0.3 等）
   - 纳入所有反馈
   - 保存为 `draft-v[X.Y].md`
   - 重复步骤 7-8

**如果用户批准：**
1. 确认最终草稿版本
2. 如用户要求，可选择重命名为 `final.md`
3. 汇总博客文章创建过程：
   - 创建的总版本数
   - 版本间的关键变更
   - 最终字数
   - 创建的文件列表

## 版本跟踪

所有草稿以递增版本号保留：
- `draft-v0.1.md` - 初始草稿
- `draft-v0.2.md` - 第一轮反馈后
- `draft-v0.3.md` - 第二轮反馈后
- 等等

这允许跟踪博客文章的演变并在需要时回退。

## 输出文件结构

```
blog-posts/
└── YYYY-MM-DD-topic-name/
    ├── resources/
    │   ├── source-1-name.md
    │   ├── source-2-name.md
    │   └── ...
    ├── OUTLINE.md
    ├── draft-v0.1.md
    ├── draft-v0.2.md (如有迭代)
    └── draft-v0.3.md (如有更多迭代)
```

## 质量技巧

- **引子**：以问题、惊人事实或贴近读者的场景开头
- **流畅性**：每段应与下一段自然衔接
- **证据**：用研究数据支持论点
- **引用**：始终引用来源用于：
  - 所有统计数据和数据点（如 "According to [Source], 75% of..."）
  - 产品、服务或方法之间的比较（如 "X performs 2x faster than Y [Source]"）
  - 关于市场趋势、研究发现或基准的事实声明
  - 使用行内引用格式：[Source Name] 或 [Author, Year]
- **语气**：全文保持一致的语气
- **字数**：尊重目标字数
- **可读性**：使用短段落，适当使用项目符号
- **行动号召**：以清晰的行动号召或发人深省的问题结尾

## 注意事项

- 在标注的检查点处始终等待用户批准
- 保留所有草稿版本以备查阅
- 提供 URL 时使用网络搜索获取最新信息
- 如果资源不足，请用户提供更多资源或建议额外研究
- 根据目标受众调整语气（技术性、通用、商业等）
