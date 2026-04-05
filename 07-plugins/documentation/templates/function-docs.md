# 函数：`functionName`

## 描述
简要描述函数的功能。

## 签名
```typescript
function functionName(param1: Type1, param2: Type2): ReturnType
```

## 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| param1 | Type1 | 是 | param1 的描述 |
| param2 | Type2 | 否 | param2 的描述 |

## 返回值
**类型**：`ReturnType`

返回内容的描述。

## 异常
- `Error`：当提供无效输入时抛出
- `TypeError`：当传入错误类型时抛出

## 示例

### 基本用法
```typescript
const result = functionName('value1', 'value2');
console.log(result);
```

### 高级用法
```typescript
const result = functionName(
  complexParam1,
  { option: true }
);
```

## 备注
- 附加说明或警告
- 性能注意事项
- 最佳实践

## 另请参阅
- [相关函数](#)
- [API 文档](#)
