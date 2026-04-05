---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*)
argument-hint: [message]
description: Create a git commit with context
---

## 上下文

- 当前 git 状态：!`git status`
- 当前 git 差异：!`git diff HEAD`
- 当前分支：!`git branch --show-current`
- 最近提交：!`git log --oneline -10`

## 你的任务

基于上述变更，创建一个 git 提交。

如果通过参数提供了提交信息，请使用它：$ARGUMENTS

否则，分析变更内容并按照约定式提交格式创建合适的提交信息：
- `feat:` 新功能
- `fix:` 修复缺陷
- `docs:` 文档变更
- `refactor:` 代码重构
- `test:` 添加测试
- `chore:` 维护任务
