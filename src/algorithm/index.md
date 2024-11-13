# 数据结构 和 算法

- 线性结构
  - 数组
  - 栈
  - 队列
  - 链表
- 哈希表
- 树结构
  - 二叉树
- 图结构
- 排序 & 搜索

## 数据结构

### 数组 => JS 原生支持，不多赘述

### 栈（Stack） => 一种受限的线性结构，后进先出（LIFO => last in first out）

举个 🌰：面试题

> 有六个元素 6,5,4,3,2,1 的顺序进栈，问下列哪一个不是合法的出栈序列？<br>
> A. 5 4 3 6 1 2 <br>
> B. 4 5 3 2 1 6 <br>
> C. 3 4 6 5 2 1 <br>
> D. 2 3 4 1 5 6

正确答案： C

> 解析： <br>
> A. 6 5 进栈，5 出栈，4 进栈出栈，3 进栈出栈，6 出栈，2 1 进栈，1 出栈 2 出栈 <br>
> B. 6 5 4 进栈，4 出栈，5 出栈，3 进栈出栈， 2 进栈出栈，1 进栈出栈，6 出栈 <br>
> D. 6 5 4 3 2 进栈，2 出栈，3 出栈，4 出栈，1 进栈出栈，5 出栈，6 出栈

#### 栈的操作

- push(element) 添加新元素到栈顶
- pop() 移除栈顶元素
- peek() 返回栈顶元素，不对栈做任何操作
- isEmpty() 空栈返回 true，否则反之
- size() 返回栈的元素个数
- toString() 将栈结构内容以字符串形式返回

```javascript
class Stack {
  items = [];

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += `${this.items[i]} `;
    }
    return str;
  }
}

const s = new Stack();
s.push(1);
s.push(23);
s.push(89);
s.push(66);

console.log(s); // 1, 23, 89, 66

s.pop();
s.pop();

console.log(s); // 1, 23
console.log(s.size()); // 2
console.log(s.peek()); // 23
console.log(s.isEmpty()); // false
console.log(s.toString()); // 1 23
```

十进制转换二进制（利用栈的特性）

```js
// 十进制转换二进制，就是用被除数不断的取2的余数，然后压栈，再用整数继续取2的余数，然后出栈即是二进制的值。

const dec2bin = (decNumber) => {
  if (typeof decNumber !== "number") return;
  // 1、定义一个栈
  const stack = new Stack();

  // 2、循环操作
  while (decNumber > 0) {
    // 2.1、取余压栈
    stack.push(decNumber % 2);
    // 2.2、向下取整
    decNumber = Math.floor(decNumber / 2);
  }

  // 3、从栈中取出 0 or 1
  let binaryString = "";
  while (!stack.isEmpty()) {
    binaryString += stack.pop();
  }
  return binaryString;
};
```

### 队列（Queue）=> 一种受限的线性表，先进先出（FIFO => first in first out）

#### 队列的操作

- enqueue(element) 添加新元素到队列
- dequeue() 移除首个元素
- front() 返回队列第一个元素，但不删除该元素
- isEmpty() 空队列返回 true，否则反之
- size() 返回队列的元素个数
- toString() 将队列结构内容以字符串形式返回

```js
// 可以使用数组 or 链表实现，链表实现性能更高。
class Queue {
  items = [];

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length !== 0;
  }

  size() {
    return this.items.length;
  }

  toString() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += `${this.items[i]} `;
    }
    return str;
  }
}

const queue = new Queue();

queue.enqueue("abc");
queue.enqueue("cba");
queue.enqueue("nba");

console.log(queue); // abc cba nba

queue.dequeue();
console.log(queue); // cba nba

console.log(queue.front()); // cba
console.log(queue.size()); // 2
console.log(queue.isEmpty()); // false
```

击鼓传花

```js
const passGame = (nameList, num) => {
  // 1、声明队列
  const queue = new Queue();

  // 2、存放
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  // 3、遍历最后一个
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    queue.dequeue();
  }
  const endName = queue.front();

  return nameList.indexOf(endName);
};

const names = ["Lucy", "Tom", "Lily", "Xiaoming", "Xiaohong"];
const index = passGame(names, 3); // 3  =>  Xiaoming
```
