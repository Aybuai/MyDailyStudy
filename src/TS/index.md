### 1、TS 数据类型有哪些？

- 基本类型：
  - number
  - boolean
  - string
  - undefined
  - null
  - symbol
  - bigInt
  - array
  - object
  - tuple（元组）
  - enum（枚举）
  - any
  - void
  - never
  - unknown
- 高级类型：
  - union 组合类型
  - Nullable 可空类型
  - Literal 预定义类型

### 2、元组是什么？

元组是一种表示具有`固定数量`和`类型`的有序元素集合的数据类型。一个元组可以包含不同类型的数据，例如，一个元组可以包含字符串、数字和布尔值。<br>

元组在 TypeScript 中的用途包括：<br>

声明函数返回值的类型，特别是当函数返回多个值时，可以使用元组类型来指定返回值的类型。<br>

提供一种更具体的数据类型来确保数据的类型安全性。使用元组类型可以确保数组中的每个元素都是正确的类型。<br>

在处理异构数据时（即包含不同类型的数据），可以使用元组类型。<br>

例如：<br>

```typescript
let person: [string, number] = ["John", 25];
console.log(person[0]); // "John"
console.log(person[1]); // 25
```

### 3、union（联合类型）& Literal（字面量类型）?

**联合(Union) 类型**<br>

联合类型就是一个变量的值可以是多个类型。比如：<br>

```typescript
let union: number | string;
union = 10;
union = "hello";
```

变量 union 是一个联合类型，多个类型之间使用竖线 | 分割，变量既可以是 number 类型，也可以是 string 类型。<br>

再看一个例子，定义一个函数可以求两个数字的和，也可以做两个字符串的拼接：<br>

```typescript
function merge(a: number | string, b: number | string) {
  // 需要对参数类型做一个判断
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  } else {
    return a + b;
  }
}

merge(10, 20);
merge("hello", "world");
```

不仅类型，确定的值也可以联合使用：<br>

```typescript
let union: 0 | 1 | 2;
```

此时变量 union 不仅确定了属于 number 类型，值的取值范围也确定了。<br>

**字面量(Literal)类型**<br>

字面量类型，就是直接写出一个值，来赋值给变量。具体来讲，主要分为数字字面量类型，字符串字面量类型，真值字面量类型，对象字面量类型，枚举字面量类型等。比如：<br>

```typescript
const num = 3;
const str = "kw";
const flag = true;
```

这三个变量的类型分别为 2、kw、true ，类型等于值，就是字面量类型。<br>

上面联合类型中，将值作为联合类型使用，其实就是字面量类型的联合类型。<br>

字面量类型非常像是枚举类型，等学到的时候可以做一个比较。<br>

**类型断言**<br>

类型断言，也叫类型适配，主要用于类型的适配工作，将变量从一个类型断言为另一个类型。<br>

先看一段代码：<br>

```typescript
let message: any = "hello";
message.toUpperCase();
```

变量 message 声明为了 any 类型，但是其值是一个字符串类型，想要调用字符串类型的 toUpperCase 方法，但是编辑器并没有给出类型提示。<br>

这是因为编辑器将 message 识别为 any 类型，而 any 类型并没有 toUpperCase 方法。<br>

此时就可以使用类型断言了：<br>

```typescript
let message: any = "hello";

// 使用 as 关键字，将变量从 any 类型断言为 string 类型
// 编辑器就会将 message 识别为 string 类型，从而给出类型提示
(message as string).toUpperCase();
```

除了使用 as 关键字，还可以在变量前通过一对尖括号 <> 写明要断言的类型：<br>

```typescript
(<string>message).toUpperCase();
```

需要注意的是，类型断言并不是类型转换，变量的类型并不会发生转换，依然是原来的类型，只不过在断言的那一刻，能让 TS 编译器认为它是某个指定类型。<br>

### 4、any 和 unknown 的区别？

- **any 类型：** 表示任意类型，即可以赋值给任何类型的变量。使用 any 类型后，该变量可以进行任何操作而不会触发类型检查，相当于关闭了类型检查器的所有限制。
- **unknown 类型：** 表示未知类型，即不确定具体类型的变量。与 any 不同，使用 unknown 类型后，该变量在没有进行类型检查或类型断言之前，不能被赋值给其他变量或进行任何操作。

### 5、Object 对象类型？
