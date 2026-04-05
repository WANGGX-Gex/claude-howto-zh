# 测试指南

本文档描述了 Claude How To 的测试基础设施。

## 概览

项目使用 GitHub Actions 在每次推送和拉取请求时自动运行测试。测试涵盖：

- **单元测试**：使用 pytest 的 Python 测试
- **代码质量**：使用 Ruff 进行代码检查和格式化
- **安全**：使用 Bandit 进行漏洞扫描
- **类型检查**：使用 mypy 进行静态类型分析
- **构建验证**：EPUB 生成测试

## 本地运行测试

### 前置条件

```bash
# Install uv (fast Python package manager)
pip install uv

# Or on macOS with Homebrew
brew install uv
```

### 环境设置

```bash
# Clone the repository
git clone https://github.com/luongnv89/claude-howto.git
cd claude-howto

# Create virtual environment
uv venv

# Activate it
source .venv/bin/activate  # macOS/Linux
# or
.venv\Scripts\activate     # Windows

# Install development dependencies
uv pip install -r requirements-dev.txt
```

### 运行测试

```bash
# Run all unit tests
pytest scripts/tests/ -v

# Run tests with coverage
pytest scripts/tests/ -v --cov=scripts --cov-report=html

# Run specific test file
pytest scripts/tests/test_build_epub.py -v

# Run specific test function
pytest scripts/tests/test_build_epub.py::test_function_name -v

# Run tests in watch mode (requires pytest-watch)
ptw scripts/tests/
```

### 运行代码检查

```bash
# Check code formatting
ruff format --check scripts/

# Auto-fix formatting issues
ruff format scripts/

# Run linter
ruff check scripts/

# Auto-fix linter issues
ruff check --fix scripts/
```

### 运行安全扫描

```bash
# Run Bandit security scan
bandit -c pyproject.toml -r scripts/ --exclude scripts/tests/

# Generate JSON report
bandit -c pyproject.toml -r scripts/ --exclude scripts/tests/ -f json -o bandit-report.json
```

### 运行类型检查

```bash
# Check types with mypy
mypy scripts/ --ignore-missing-imports --no-implicit-optional
```

## GitHub Actions 工作流

### 触发条件

- **推送**到 `main` 或 `develop` 分支（当脚本变更时）
- **拉取请求**到 `main`（当脚本变更时）
- 手动工作流调度

### 任务

#### 1. 单元测试 (pytest)

- **运行环境**：Ubuntu latest
- **Python 版本**：3.10、3.11、3.12
- **执行内容**：
  - 从 `requirements-dev.txt` 安装依赖
  - 运行带覆盖率报告的 pytest
  - 上传覆盖率到 Codecov
  - 归档测试结果和覆盖率 HTML

**结果**：任何测试失败则工作流失败（关键）

#### 2. 代码质量 (Ruff)

- **运行环境**：Ubuntu latest
- **Python 版本**：3.11
- **执行内容**：
  - 使用 `ruff format` 检查代码格式
  - 使用 `ruff check` 运行代码检查
  - 报告问题但不使工作流失败

**结果**：非阻塞（仅警告）

#### 3. 安全扫描 (Bandit)

- **运行环境**：Ubuntu latest
- **Python 版本**：3.11
- **执行内容**：
  - 扫描安全漏洞
  - 生成 JSON 报告
  - 上传报告为制品

**结果**：非阻塞（仅警告）

#### 4. 类型检查 (mypy)

- **运行环境**：Ubuntu latest
- **Python 版本**：3.11
- **执行内容**：
  - 执行静态类型分析
  - 报告类型不匹配
  - 帮助尽早发现缺陷

**结果**：非阻塞（仅警告）

#### 5. 构建 EPUB

- **运行环境**：Ubuntu latest
- **依赖**：pytest、lint、security（全部须通过）
- **执行内容**：
  - 使用 `scripts/build_epub.py` 构建 EPUB 文件
  - 验证 EPUB 创建成功
  - 上传 EPUB 为制品

**结果**：构建失败则工作流失败（关键）

#### 6. 汇总

- **运行环境**：Ubuntu latest
- **依赖**：所有其他任务
- **执行内容**：
  - 生成工作流汇总
  - 列出所有制品
  - 报告总体状态

## 编写测试

### 测试结构

测试应放在 `scripts/tests/` 目录下，文件名格式为 `test_*.py`：

```python
# scripts/tests/test_example.py
import pytest
from scripts.example_module import some_function

def test_basic_functionality():
    """Test that some_function works correctly."""
    result = some_function("input")
    assert result == "expected_output"

def test_error_handling():
    """Test that some_function handles errors gracefully."""
    with pytest.raises(ValueError):
        some_function("invalid_input")

@pytest.mark.asyncio
async def test_async_function():
    """Test async functions."""
    result = await async_function()
    assert result is not None
```

### 测试最佳实践

- **使用描述性名称**：`test_function_returns_correct_value()`
- **每个测试一个断言**（尽可能）：更容易调试失败
- **使用 fixtures** 进行可复用设置：参见 `scripts/tests/conftest.py`
- **模拟外部服务**：使用 `unittest.mock` 或 `pytest-mock`
- **测试边界情况**：空输入、None 值、错误
- **保持测试快速**：避免 sleep() 和外部 I/O
- **使用 pytest 标记**：`@pytest.mark.slow` 用于慢测试

### Fixtures

通用 fixtures 定义在 `scripts/tests/conftest.py` 中：

```python
# Use fixtures in your tests
def test_something(tmp_path):
    """tmp_path fixture provides temporary directory."""
    test_file = tmp_path / "test.txt"
    test_file.write_text("content")
    assert test_file.read_text() == "content"
```

## 覆盖率报告

### 本地覆盖率

```bash
# Generate coverage report
pytest scripts/tests/ --cov=scripts --cov-report=html

# Open the coverage report in your browser
open htmlcov/index.html
```

### 覆盖率目标

- **最低覆盖率**：80%
- **分支覆盖**：已启用
- **重点领域**：核心功能和错误路径

## Pre-commit 钩子（Hook）

项目使用 pre-commit 钩子在提交前自动运行检查：

```bash
# Install pre-commit hooks
pre-commit install

# Run hooks manually
pre-commit run --all-files

# Skip hooks for a commit (not recommended)
git commit --no-verify
```

在 `.pre-commit-config.yaml` 中配置的钩子：
- Ruff 格式化器
- Ruff 代码检查器
- Bandit 安全扫描器
- YAML 验证
- 文件大小检查
- 合并冲突检测

## 故障排除

### 测试本地通过但 CI 中失败

常见原因：
1. **Python 版本差异**：CI 使用 3.10、3.11、3.12
2. **缺少依赖**：更新 `requirements-dev.txt`
3. **平台差异**：路径分隔符、环境变量
4. **不稳定测试**：依赖时间或顺序的测试

解决方案：
```bash
# Test with the same Python versions
uv python install 3.10 3.11 3.12

# Test with clean environment
rm -rf .venv
uv venv
uv pip install -r requirements-dev.txt
pytest scripts/tests/
```

### Bandit 报告误报

某些安全警告可能是误报。在 `pyproject.toml` 中配置：

```toml
[tool.bandit]
exclude_dirs = ["scripts/tests"]
skips = ["B101"]  # Skip assert_used warning
```

### 类型检查过于严格

对特定文件放宽类型检查：

```python
# Add at the top of file
# type: ignore

# Or for specific lines
some_dynamic_code()  # type: ignore
```

## 持续集成最佳实践

1. **保持测试快速**：每个测试应在 <1 秒内完成
2. **不要测试外部 API**：模拟外部服务
3. **隔离测试**：每个测试应独立运行
4. **使用清晰的断言**：`assert x == 5` 而不是 `assert x`
5. **处理异步测试**：使用 `@pytest.mark.asyncio`
6. **生成报告**：覆盖率、安全、类型检查

## 资源

- [pytest 文档](https://docs.pytest.org/)
- [Ruff 文档](https://docs.astral.sh/ruff/)
- [Bandit 文档](https://bandit.readthedocs.io/)
- [mypy 文档](https://mypy.readthedocs.io/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 贡献测试

提交 PR 时：

1. **编写测试**以覆盖新功能
2. **本地运行测试**：`pytest scripts/tests/ -v`
3. **检查覆盖率**：`pytest scripts/tests/ --cov=scripts`
4. **运行代码检查**：`ruff check scripts/`
5. **安全扫描**：`bandit -r scripts/ --exclude scripts/tests/`
6. **更新文档**（如测试有变更）

所有 PR 都需要测试！

---

如有测试相关问题，请开启 GitHub issue 或讨论。
