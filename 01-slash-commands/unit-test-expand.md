---
name: Expand Unit Tests
description: Increase test coverage by targeting untested branches and edge cases
tags: testing, coverage, unit-tests
---

# 扩展单元测试

根据项目的测试框架扩展现有单元测试：

1. **分析覆盖率**：运行覆盖率报告，识别未测试的分支、边界情况和低覆盖率区域
2. **识别缺口**：审查代码中的逻辑分支、错误路径、边界条件、空值/空输入
3. **编写测试**，使用项目的框架：
   - Jest/Vitest/Mocha（JavaScript/TypeScript）
   - pytest/unittest（Python）
   - Go testing/testify（Go）
   - Rust 测试框架（Rust）
4. **针对特定场景**：
   - 错误处理和异常
   - 边界值（最小/最大、空、null）
   - 边界情况和极端情况
   - 状态转换和副作用
5. **验证改进**：再次运行覆盖率，确认有可衡量的提升

仅呈现新的测试代码块。遵循现有的测试模式和命名约定。
