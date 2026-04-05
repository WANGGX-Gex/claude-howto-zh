---
name: code-review-specialist
description: Comprehensive code review with security, performance, and quality analysis. Use when users ask to review code, analyze code quality, evaluate pull requests, or mention code review, security analysis, or performance optimization.
---

# 代码审查技能

本技能提供全面的代码审查能力，聚焦于：

1. **安全分析**
   - 认证/授权问题
   - 数据暴露风险
   - 注入漏洞
   - 加密弱点
   - 敏感数据日志记录

2. **性能审查**
   - 算法效率（Big O 分析）
   - 内存优化
   - 数据库查询优化
   - 缓存机会
   - 并发问题

3. **代码质量**
   - SOLID 原则
   - 设计模式
   - 命名约定
   - 文档
   - 测试覆盖率

4. **可维护性**
   - 代码可读性
   - 函数大小（应 < 50 行）
   - 圈复杂度
   - 依赖管理
   - 类型安全

## 审查模板

对每段审查的代码，提供：

### 摘要
- 整体质量评估（1-5）
- 关键发现数量
- 推荐的优先领域

### 严重问题（如有）
- **问题**：清晰描述
- **位置**：文件和行号
- **影响**：为什么重要
- **严重程度**：严重/高/中
- **修复**：代码示例

### 按类别分类的发现

#### 安全（如发现问题）
列出安全漏洞及示例

#### 性能（如发现问题）
列出性能问题及复杂度分析

#### 质量（如发现问题）
列出代码质量问题及重构建议

#### 可维护性（如发现问题）
列出可维护性问题及改进方案

## 版本历史

- v1.0.0 (2024-12-10)：初始版本，包含安全、性能、质量和可维护性分析
