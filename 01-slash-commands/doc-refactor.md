---
name: Documentation Refactor
description: Restructure project documentation for clarity and accessibility
tags: documentation, refactoring, organization
---

# 文档重构

根据项目类型重构项目文档结构：

1. **分析项目**：识别项目类型（库/API/Web 应用/CLI/微服务）、架构和用户角色
2. **集中文档**：将技术文档迁移到 `docs/` 目录，并建立适当的交叉引用
3. **根目录 README.md**：精简为入口页面，包含概览、快速入门、模块/组件摘要、许可证和联系方式
4. **组件文档**：为模块/包/服务级别添加 README 文件，包含设置和测试说明
5. **组织 `docs/`** 目录，按相关类别分类：
   - 架构、API 参考、数据库、设计、故障排查、部署、贡献指南（根据项目需求调整）
6. **创建指南**（选择适用项）：
   - 用户指南：面向应用程序最终用户的文档
   - API 文档：端点、认证、示例
   - 开发指南：环境配置、测试、贡献流程
   - 部署指南：服务/应用的生产部署
7. **使用 Mermaid** 绘制所有图表（架构图、流程图、模式图）

保持文档简洁、易于浏览，并与项目类型紧密相关。
