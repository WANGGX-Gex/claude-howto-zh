# 代码异味目录

基于 Martin Fowler 的《重构》（第 2 版）的代码异味综合参考。代码异味是更深层问题的症状——它们表明你的代码设计可能存在问题。

> "代码异味是一种表面指示，通常对应着系统中更深层的问题。" —— Martin Fowler

---

## 膨胀器

代表已经增长到无法有效处理的代码异味。

### 过长方法

**征兆：**
- 方法超过 30-50 行
- 需要滚动才能看到整个方法
- 多层嵌套
- 注释解释各段做什么

**为什么有害：**
- 难以理解
- 难以单独测试
- 变更会产生意外后果
- 重复逻辑隐藏其中

**重构技术：**
- 提取方法
- 以查询替代临时变量
- 引入参数对象
- 以方法对象替代方法
- 分解条件表达式

**示例（重构前）：**
```javascript
function processOrder(order) {
  // Validate order (20 lines)
  if (!order.items) throw new Error('No items');
  if (order.items.length === 0) throw new Error('Empty order');
  // ... more validation

  // Calculate totals (30 lines)
  let subtotal = 0;
  for (const item of order.items) {
    subtotal += item.price * item.quantity;
  }
  // ... tax, shipping, discounts

  // Send notifications (20 lines)
  // ... email logic
}
```

**示例（重构后）：**
```javascript
function processOrder(order) {
  validateOrder(order);
  const totals = calculateOrderTotals(order);
  sendOrderNotifications(order, totals);
  return { order, totals };
}
```

---

### 过大的类

**征兆：**
- 类有太多实例变量（>7-10）
- 类有太多方法（>15-20）
- 类名模糊（Manager、Handler、Processor）
- 方法未使用所有实例变量

**为什么有害：**
- 违反单一职责原则
- 难以测试
- 变更波及不相关功能
- 难以重用部分

**重构技术：**
- 提取类
- 提取子类
- 提取接口

**检测：**
```
Lines of code > 300
Number of methods > 15
Number of fields > 10
```

---

### 基本类型偏执

**征兆：**
- 用基本类型表示领域概念（字符串表示邮箱，整数表示金额）
- 使用基本类型数组而非对象
- 字符串常量作为类型码
- 魔法数字/字符串

**为什么有害：**
- 类型层面无验证
- 逻辑散布在代码库中
- 容易传入错误值
- 缺少领域概念

**重构技术：**
- 以对象替代基本类型
- 以类替代类型码
- 以子类替代类型码
- 以状态/策略替代类型码

**示例（重构前）：**
```javascript
const user = {
  email: 'john@example.com',     // Just a string
  phone: '1234567890',           // Just a string
  status: 'active',              // Magic string
  balance: 10050                 // Cents as integer
};
```

**示例（重构后）：**
```javascript
const user = {
  email: new Email('john@example.com'),
  phone: new PhoneNumber('1234567890'),
  status: UserStatus.ACTIVE,
  balance: Money.cents(10050)
};
```

---

### 过长参数列表

**征兆：**
- 方法有 4+ 个参数
- 总是一起出现的参数
- 改变方法行为的布尔标志
- 频繁传入 null/undefined

**为什么有害：**
- 难以正确调用
- 参数顺序混淆
- 表明方法做了太多事
- 难以添加新参数

**重构技术：**
- 引入参数对象
- 保持对象完整
- 以方法调用替代参数
- 移除标志参数

**示例（重构前）：**
```javascript
function createUser(firstName, lastName, email, phone,
                    street, city, state, zip,
                    isAdmin, isActive, createdBy) {
  // ...
}
```

**示例（重构后）：**
```javascript
function createUser(personalInfo, address, options) {
  // personalInfo: { firstName, lastName, email, phone }
  // address: { street, city, state, zip }
  // options: { isAdmin, isActive, createdBy }
}
```

---

### 数据泥团

**征兆：**
- 相同的 3+ 个字段反复一起出现
- 总是一起传递的参数
- 类中的字段子集属于一起

**为什么有害：**
- 重复的处理逻辑
- 缺少抽象
- 更难扩展
- 暗示隐藏的类

**重构技术：**
- 提取类
- 引入参数对象
- 保持对象完整

**示例：**
```javascript
// Data clump: (x, y, z) coordinates
function movePoint(x, y, z, dx, dy, dz) { }
function scalePoint(x, y, z, factor) { }
function distanceBetween(x1, y1, z1, x2, y2, z2) { }

// Extract Point3D class
class Point3D {
  constructor(x, y, z) { }
  move(delta) { }
  scale(factor) { }
  distanceTo(other) { }
}
```

---

## 面向对象滥用

表明不完整或不正确使用 OOP 原则的异味。

### Switch 语句

**征兆：**
- 长长的 switch/case 或 if/else 链
- 相同的 switch 出现在多处
- 对类型码进行 switch
- 添加新分支需要到处修改

**为什么有害：**
- 违反开闭原则
- 变更波及所有 switch 位置
- 难以扩展
- 通常表明缺少多态

**重构技术：**
- 以多态替代条件表达式
- 以子类替代类型码
- 以状态/策略替代类型码

**示例（重构前）：**
```javascript
function calculatePay(employee) {
  switch (employee.type) {
    case 'hourly':
      return employee.hours * employee.rate;
    case 'salaried':
      return employee.salary / 12;
    case 'commissioned':
      return employee.sales * employee.commission;
  }
}
```

**示例（重构后）：**
```javascript
class HourlyEmployee {
  calculatePay() {
    return this.hours * this.rate;
  }
}

class SalariedEmployee {
  calculatePay() {
    return this.salary / 12;
  }
}
```

---

### 临时字段

**征兆：**
- 实例变量仅在某些方法中使用
- 字段有条件地设置
- 某些情况需要复杂的初始化

**为什么有害：**
- 令人困惑——字段存在但可能为 null
- 难以理解对象状态
- 表明隐藏的条件逻辑

**重构技术：**
- 提取类
- 引入空对象
- 以局部变量替代临时字段

---

### 拒绝的遗产

**征兆：**
- 子类不使用继承的方法/数据
- 子类覆盖后什么都不做
- 继承用于代码重用而非 IS-A 关系

**为什么有害：**
- 错误的抽象
- 违反里氏替换原则
- 误导性的继承层次

**重构技术：**
- 下移方法/字段
- 以委托替代子类
- 以委托替代继承

---

### 接口不同的替代类

**征兆：**
- 两个类做类似的事情
- 相同概念使用不同方法名
- 可以互换使用

**为什么有害：**
- 重复实现
- 无共同接口
- 难以在它们之间切换

**重构技术：**
- 重命名方法
- 移动方法
- 提取超类
- 提取接口

---

## 变更阻碍者

使变更困难的异味——改变一件事需要改变很多其他东西。

### 发散变化

**征兆：**
- 一个类因多种不同原因被修改
- 不同领域的变更触发同一个类的编辑
- 类是"上帝类"

**为什么有害：**
- 违反单一职责
- 高变更频率
- 合并冲突

**重构技术：**
- 提取类
- 提取超类
- 提取子类

**示例：**
一个 `User` 类因以下原因被修改：
- 认证变更
- 资料变更
- 计费变更
- 通知变更

→ 提取：`AuthService`、`ProfileService`、`BillingService`、`NotificationService`

---

### 散弹式修改

**征兆：**
- 一个变更需要编辑多个类
- 小功能需要修改 10+ 个文件
- 变更分散，难以找到所有

**为什么有害：**
- 容易遗漏
- 高耦合
- 变更容易出错

**重构技术：**
- 移动方法
- 移动字段
- 内联类

**检测：**
注意：添加一个字段需要修改 >5 个文件。

---

### 平行继承体系

**征兆：**
- 在一个继承体系中创建子类需要在另一个体系中也创建子类
- 类前缀匹配（如 `DatabaseOrder`、`DatabaseProduct`）

**为什么有害：**
- 双倍的维护量
- 继承体系间的耦合
- 容易忘记一侧

**重构技术：**
- 移动方法
- 移动字段
- 消除一个继承体系

---

## 可省略项

不必要的东西，应该被移除。

### 注释（过多的）

**征兆：**
- 注释解释代码做什么
- 被注释掉的代码
- 永远存在的 TODO/FIXME
- 注释中的道歉

**为什么有害：**
- 注释会说谎（与代码不同步）
- 代码应该具有自文档性
- 死代码造成混乱

**重构技术：**
- 提取方法（名称解释做什么）
- 重命名（无需注释即清晰）
- 移除被注释的代码
- 引入断言

**好注释 vs 坏注释：**
```javascript
// BAD: Explaining what
// Loop through users and check if active
for (const user of users) {
  if (user.status === 'active') { }
}

// GOOD: Explaining why
// Active users only - inactive are handled by cleanup job
const activeUsers = users.filter(u => u.isActive);
```

---

### 重复代码

**征兆：**
- 相同代码出现在多处
- 类似代码有小差异
- 复制粘贴模式

**为什么有害：**
- 缺陷修复需要在多处进行
- 不一致风险
- 代码库膨胀

**重构技术：**
- 提取方法
- 提取类
- 上移方法（在继承体系中）
- 形成模板方法

**检测规则：**
任何重复 3+ 次的代码都应被提取。

---

### 冗余类

**征兆：**
- 类做的事情不足以证明其存在
- 无附加价值的包装器
- 过度工程的结果

**为什么有害：**
- 维护开销
- 不必要的间接层
- 无益处的复杂性

**重构技术：**
- 内联类
- 折叠继承体系

---

### 死代码

**征兆：**
- 不可达代码
- 未使用的变量/方法/类
- 被注释掉的代码
- 不可能条件后的代码

**为什么有害：**
- 混乱
- 维护负担
- 减慢理解速度

**重构技术：**
- 移除死代码
- 安全删除

**检测：**
```bash
# Look for unused exports
# Look for unreferenced functions
# IDE "unused" warnings
```

---

### 过度预测

**征兆：**
- 只有一个子类的抽象类
- "为将来预留"的未使用参数
- 仅做委托的方法
- 只有一个用例的"框架"

**为什么有害：**
- 无益处的复杂性
- YAGNI（你不会需要它）
- 更难理解

**重构技术：**
- 折叠继承体系
- 内联类
- 移除参数
- 重命名方法

---

## 耦合器

代表类之间过度耦合的异味。

### 特性嫉妒

**征兆：**
- 方法使用另一个类的数据多于自己的
- 大量对另一个对象的 getter 调用
- 数据和行为分离

**为什么有害：**
- 行为放错了位置
- 封装性差
- 难以维护

**重构技术：**
- 移动方法
- 移动字段
- 提取方法（然后移动）

**示例（重构前）：**
```javascript
class Order {
  getDiscountedPrice(customer) {
    // Uses customer data heavily
    if (customer.loyaltyYears > 5) {
      return this.price * customer.discountRate;
    }
    return this.price;
  }
}
```

**示例（重构后）：**
```javascript
class Customer {
  getDiscountedPriceFor(price) {
    if (this.loyaltyYears > 5) {
      return price * this.discountRate;
    }
    return price;
  }
}
```

---

### 不当亲密

**征兆：**
- 类访问彼此的私有部分
- 双向引用
- 子类对父类了解太多

**为什么有害：**
- 高耦合
- 变更级联
- 难以修改一个而不影响另一个

**重构技术：**
- 移动方法
- 移动字段
- 将双向改为单向
- 提取类
- 隐藏委托

---

### 消息链

**征兆：**
- 长链的方法调用：`a.getB().getC().getD().getValue()`
- 客户端依赖导航结构
- "火车残骸"式代码

**为什么有害：**
- 脆弱——任何变更都会打断链
- 违反迪米特法则
- 耦合于结构

**重构技术：**
- 隐藏委托
- 提取方法
- 移动方法

**示例：**
```javascript
// Bad: Message chain
const managerName = employee.getDepartment().getManager().getName();

// Better: Hide delegation
const managerName = employee.getManagerName();
```

---

### 中间人

**征兆：**
- 类只做委托
- 一半的方法是委托
- 无附加价值

**为什么有害：**
- 不必要的间接层
- 维护开销
- 令人困惑的架构

**重构技术：**
- 移除中间人
- 内联方法

---

## 异味严重程度指南

| 严重程度 | 描述 | 行动 |
|----------|-------------|--------|
| **严重** | 阻塞开发，导致缺陷 | 立即修复 |
| **高** | 显著的维护负担 | 在当前迭代中修复 |
| **中** | 明显但可管理 | 计划在近期修复 |
| **低** | 小不便 | 有机会时修复 |

---

## 快速检测清单

扫描代码时使用此清单：

- [ ] 有方法超过 30 行吗？
- [ ] 有类超过 300 行吗？
- [ ] 有方法超过 4 个参数吗？
- [ ] 有重复的代码块吗？
- [ ] 有对类型码的 switch/case 吗？
- [ ] 有未使用的代码吗？
- [ ] 有方法大量使用另一个类的数据吗？
- [ ] 有长链的方法调用吗？
- [ ] 有注释解释"做了什么"而非"为什么"吗？
- [ ] 有应该是对象的基本类型吗？

---

## 延伸阅读

- Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code* (2nd ed.)
- Kerievsky, J. (2004). *Refactoring to Patterns*
- Feathers, M. (2004). *Working Effectively with Legacy Code*
