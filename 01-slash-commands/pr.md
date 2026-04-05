---
description: Clean up code, stage changes, and prepare a pull request
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(npm test:*), Bash(npm run lint:*)
---

# Pull Request 准备清单

创建 PR 之前，执行以下步骤：

1. 运行代码格式化：`prettier --write .`
2. 运行测试：`npm test`
3. 查看 git 差异：`git diff HEAD`
4. 暂存变更：`git add .`
5. 按照约定式提交创建提交信息：
   - `fix:` 修复缺陷
   - `feat:` 新功能
   - `docs:` 文档
   - `refactor:` 代码重构
   - `test:` 添加测试
   - `chore:` 维护任务

6. 生成 PR 摘要，包括：
   - 变更了什么
   - 为什么变更
   - 执行了哪些测试
   - 潜在影响
