---
description: Stage all changes, create commit, and push to remote (use with caution)
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git push:*), Bash(git diff:*), Bash(git log:*), Bash(git pull:*)
---

# 提交并推送所有变更

**注意**：暂存所有变更、提交并推送到远程仓库。仅在确信所有变更属于同一批次时使用。

## 工作流程

### 1. 分析变更
并行运行：
- `git status` - 显示已修改/已添加/已删除/未跟踪的文件
- `git diff --stat` - 显示变更统计
- `git log -1 --oneline` - 显示最近提交以参考信息风格

### 2. 安全检查

**发现以下内容时停止并警告：**
- 敏感文件：`.env*`、`*.key`、`*.pem`、`credentials.json`、`secrets.yaml`、`id_rsa`、`*.p12`、`*.pfx`、`*.cer`
- API 密钥：任何包含真实值（非占位符如 `your-api-key`、`xxx`、`placeholder`）的 `*_API_KEY`、`*_SECRET`、`*_TOKEN` 变量
- 大文件：未使用 Git LFS 的 `>10MB` 文件
- 构建产物：`node_modules/`、`dist/`、`build/`、`__pycache__/`、`*.pyc`、`.venv/`
- 临时文件：`.DS_Store`、`thumbs.db`、`*.swp`、`*.tmp`

**API 密钥验证：**
检查修改文件中的模式，如：
```bash
OPENAI_API_KEY=sk-proj-xxxxx  # ❌ 检测到真实密钥！
AWS_SECRET_KEY=AKIA...         # ❌ 检测到真实密钥！
STRIPE_API_KEY=sk_live_...    # ❌ 检测到真实密钥！

# ✅ 可接受的占位符：
API_KEY=your-api-key-here
SECRET_KEY=placeholder
TOKEN=xxx
API_KEY=<your-key>
SECRET=${YOUR_SECRET}
```

**验证：**
- `.gitignore` 配置正确
- 无合并冲突
- 分支正确（如果是 main/master 则警告）
- API 密钥仅为占位符

### 3. 请求确认

展示摘要：
```
📊 变更摘要：
- X 个文件已修改，Y 个已添加，Z 个已删除
- 总计：+AAA 行插入，-BBB 行删除

🔒 安全检查：✅ 无敏感信息 | ✅ 无大文件 | ⚠️ [警告]
🌿 分支：[名称] → origin/[名称]

我将执行：git add . → commit → push

输入 'yes' 继续，输入 'no' 取消。
```

**在用户明确回复 "yes" 之前等待。**

### 4. 执行（确认后）

按顺序运行：
```bash
git add .
git status  # 验证暂存
```

### 5. 生成提交信息

分析变更并创建约定式提交：

**格式：**
```
[类型]: 简要摘要（最多 72 个字符）

- 关键变更 1
- 关键变更 2
- 关键变更 3
```

**类型：** `feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore`、`perf`、`build`、`ci`

**示例：**
```
docs: Update concept README files with comprehensive documentation

- Add architecture diagrams and tables
- Include practical examples
- Expand best practices sections
```

### 6. 提交并推送

```bash
git commit -m "$(cat <<'EOF'
[生成的提交信息]
EOF
)"
git push  # 如果失败：git pull --rebase && git push
git log -1 --oneline --decorate  # 验证
```

### 7. 确认成功

```
✅ 已成功推送到远程仓库！

提交：[哈希] [信息]
分支：[分支] → origin/[分支]
变更文件数：X（+插入行数，-删除行数）
```

## 错误处理

- **git add 失败**：检查权限、锁定文件，验证仓库已初始化
- **git commit 失败**：修复 pre-commit 钩子，检查 git 配置（user.name/email）
- **git push 失败**：
  - 非快进推送：`git pull --rebase && git push`
  - 无远程分支：`git push -u origin [分支]`
  - 受保护分支：改用 PR 工作流

## 使用场景

✅ **适合：**
- 多文件文档更新
- 包含测试和文档的功能
- 跨文件的缺陷修复
- 项目范围的格式化/重构
- 配置变更

❌ **避免：**
- 不确定要提交的内容
- 包含敏感数据/密钥
- 未经审查的受保护分支
- 存在合并冲突
- 需要细粒度的提交历史
- pre-commit 钩子失败

## 替代方案

如果用户需要更多控制，建议：
1. **选择性暂存**：审查/暂存特定文件
2. **交互式暂存**：`git add -p` 按补丁选择
3. **PR 工作流**：创建分支 → 推送 → PR（使用 `/pr` 命令）

**请记住**：推送前务必审查变更。如有疑问，使用单独的 git 命令以获得更多控制。
