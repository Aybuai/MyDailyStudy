## 1、什么是原型、原型链？（经典 js 原型相关题目看掘金）

**原型：**<br>

- ① 所有引用类型都有一个 `__proto__` (隐式原型)属性，属性值是一个普通的对象
- ② 所有函数都有一个 `prototype`(原型)属性，属性值是一个普通的对象
- ③ 所有引用类型的 `__proto__` 属性指向它构造函数的 `prototype`

**原型链：**<br>
当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会去它的 `__proto__` 隐式原型上查找，即它的构造函数的 `prototype`，如果还没有找到就会再在构造函数的 `prototype` 的 `__proto__` 中查找，这样一层一层向上查找就会形成一个链式结构，我们称为原型链。<br>
原型链判断：<br>

```javascript
Object.prototype.__proto__; //null
Function.prototype.__proto__; //Object.prototype
Object.__proto__; //Function.prototype
Object instanceof Function; //true
Function instanceof Object; //true
Function.prototype === Function.__proto__; //true
```

## 2、什么是继承？说一说有哪些？继承组合的原理及优点？

[参考文档](https://juejin.cn/post/6844903696111763470)<br>

继承（inheritance）是面向对象软件技术当中的一个概念。如果一个类别 `B`“继承自”另一个类别 `A`，就把这个 `B` 称为“`A` 的子类”，而把 `A` 称为“`B` 的父类别”也可以称“`A` 是 `B` 的超类”<br>

**组合继承：** 原型链继承和借用构造函数方法组合就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。<br>
**寄生组合式继承：** 结合借用构造函数传递参数和寄生模式实现继承。这是最成熟的方法，也是现在库实现的方法<br>

**优点：**<br>
继承可以使得子类具有父类别的各种属性和方法，在子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能

## 3、new 操作符具体干了什么？

- 新建一个空对象 `obj`
- 把 `obj` 的隐式原型和构造函数通过原型链连接起来
- 将构造函数的 `this` 指向 `obj`
- 如果该函数没有返回对象，则返回 `this`<br>

[参考文档](https://juejin.cn/post/6991483397495324703)

## 4、js 有哪些方法改变 this 指向？

`call`，`apply`，`bind`。三者的第一个参数都是 `this` 需要指向的对象，但在后续的参数上只有 `apply` 是接收一个数组，`call` 和 `bind` 用逗号分开；`call` 和 `apply` 直接调用，返回的是一个值，而 `bind` 不直接调用，返回的是一个函数形式，执行：foo.bind(obj)()

## 5、bind 有哪些实现的注意点？（可以实现参数的柯里化）

- 1、可以指定 this
- 2、返回一个函数
- 3、可以传入参数
- 4、柯里化

[参考文档](https://juejin.cn/post/6844903733013250056)

## 6、对一个函数链式调用 bind，this 指向的是谁？为什么？

第一个 `bind`，因为被改变 `this` 指向之后就不可以更改了。

## 7、es6 有哪些新特性？let、const、var 有什么区别？

- 新增了块级作用域（`let`、`const`）
- 提供了定义类的语法糖（`class`）
- 解构
- 扩展运算符
- 字符串模版
- 模块化（`import` / `export`）
- `Set` 和 `Map` 数据结构。
- `ES6` 原生提供 `Proxy` 构造函数，用来生成 `Proxy` 实例
- `promise`
- 箭头函数

let，const 块级作用域，var 全局作用域<br>
let，const 不允许重复声明，var 可以<br>
let，const 不存在变量提升（暂时性死区），var 可以<br>
const 不能修改且要有初始值，let，var 值可以修改

## 8、es5 怎样实现 let 属性？

使用自执行匿名函数（`IIFE`）实现；闭包

```javascript
(function () {
  var a = 1;
  console.log(a); // 1
})();
console.log(a); // 会报错
```

## 9、闭包是什么？使用场景有哪些？怎样实现？

闭包是指有权访问另一个函数作用域中变量的函数。

- `return` 回一个函数（高阶函数）
- 函数作为参数
- `v-for` 中使用 `var` 声明循环变量，输出每个变量
- `IIFE`（自执行匿名函数）
- 防抖节流

## 10、垃圾回收机制原理？

`GC` 即 **Garbage Collection** ，程序工作过程中会产生很多垃圾，这些垃圾是程序不用的内存或者是之前用过了，以后不会再用的内存空间，而 `GC` 就是负责回收垃圾的，因为他工作在引擎内部，所以对于我们前端来说，`GC` 过程是相对比较无感的，这一套引擎执行而对我们又相对无感的操作也就是常说的垃圾回收机制。
垃圾回收策略：

- **标记清除法：** 目前为止大多数浏览器都在采用该垃圾回收策略。就像它的名字一样，此算法分为标记和清除两个阶段，标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁
- **引用计数法：** 这其实是早先的一种垃圾回收算法，它把对象是否不再需要简化定义为对象有没有其他对象引用到它，如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收，目前很少使用这种算法了，因为它的问题很多。

标记清除法大致过程就像下面这样（会引申一个整理策略知识点）

- a、垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为 0
- b、然后从各个根对象开始遍历，把不是垃圾的节点改成 1
- c、清理所有标记为 0 的垃圾，销毁并回收它们所占用的内存空间
- d、最后，把所有内存中对象标记修改为 0，等待下一轮垃圾回收

引用计数法是跟踪记录每个变量值被使用的次数

- a、当声明了一个变量并且将一个引用类型赋值给该变量的时候这个值的引用次数就为 1
- b、如果同一个值又被赋给另一个变量，那么引用数加 1
- c、如果该变量的值被其他的值覆盖了，则引用次数减 1
- d、当这个值的引用次数变为 0 的时候，说明没有变量在使用，这个值没法被访问了，回收空间，垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的内存

**如果对象 `A` 和对象 `B` 互相引用，他们的引用数量都是 2，导致无法被回收。**

## 11、节流和防抖原理？使用场景？

```javascript
// 节流 就像fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹
function throttle(fn, timeout) {
  let timer = null;
  return function (...arg) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arg);
      timer = null;
    }, timeout);
  };
}

// 防抖 就像坐电梯，十秒自动关门，一旦有人进来再重新倒计时
function debounce(fn, timeout) {
  let timer = null;
  return function (...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, timeout);
  };
}
```

**使用场景：**

- debounce
  - search 搜索联想，用户在不断输入值时，用防抖来节约请求资源。
  - window 触发 resize 的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
- throttle
  - 鼠标不断点击触发，mousedown(单位时间内只触发一次)
  - 监听滚动事件，比如是否滑到底部自动加载更多，用 throttle 来判断

## 12、箭头函数和普通函数的区别？箭头函数调用 call、apply、bind 会发生什么？

- 箭头函数没有自己的 `this`，引用的上层作用域中 `this`
- 没有原型 `prototype`
- 不能作为构造函数
- 不能使用 `new` 操作符
- 没有 `arguments`，可以使用 `rest` 参数代替，形式为 ...变量名
- 箭头函数的 `this` 永远不会变，`call`、`apply`、`bind` 也无法改变
  (箭头函数调用 `call`、`apply`、`bind` 不会改变 `this` 指向)

## 13、0.1 + 0.2 === 0.3 吗？为什么？整数之间运算怎么保证准确？

计算机是通过二进制的方式存储数据的，所以计算机计算 0.1+0.2 的时候，实际上是计算的两个数的二进制的和。这两个小数都是无限循环小数，所以相加不等于 0.3。

- 在 ES6 中，提供了 Number.EPSILON 属性，通常称为“机器精度”，而它的值就是 2^-52，只要判断 0.1+0.2-0.3 是否小于 Number.EPSILON，如果小于，就可以判断为 0.1+0.2 === 0.3
- 把等式左边小数都乘以 100 或者 1000 转换成整数，然后再除以 100 或者 1000

## 14、如何判断数组类型？

- 通过 Object.prototype.toString.call() 做判断

```javascript
Object.prototype.toString.call(obj).slice(8, -1) === "Array";
```

- 通过 ES6 的 Array.isArray()做判断

```javascript
Array.isArray(obj);
```

- 通过原型链判断

```javascript
obj.__proto__ === Array.prototype;
```

- 通过 instanceof 做判断

```javascript
obj instanceof Array;
```

## 15、promise 是什么？promise.all 和 promise.race 有什么区别？

`Promise` 是异步编程的一种解决方案，比传统的解决方案回调函数和事件更合理和更强大。一个 `Promise` 的当前状态必须为以下三种状态中的一种：等待态（`Pending`）、执行态（`Fulfilled`）和拒绝态（`Rejected`），状态的改变只能是单向的，且变化后不可在改变。<br>
promise.all() 和 promise.race() 方法都是将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。区别在于 `all` 是都调用成功一起返回，`race` 返回调用最快的那个。

## 16、请你实现一个 promise 调度器。（并行限制的 promise 调度器）

[参考文档](https://juejin.cn/post/6968713283884974088#heading-7)

```javascript
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
的输出顺序是：2 3 1 4
整个的完整执行流程：
一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4

class Scheduler {
    constructor(limit) {
        this.queue = [];
        this.maxCount = limit;
        this.runCounts = 0;
    }
    add(time, order) {
        const promiseCreator = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(order);
                    resolve();
                }, time);
            });
        };
        this.queue.push(promiseCreator);
    }
    taskStart() {
        for (let i = 0; i < this.maxCount; i++) {
            this.request();
        }
    }
    request() {
        if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
             return;
         }
         this.runCounts++;
         this.queue
             .shift()()
             .then(() => {
                 this.runCounts--;
                 this.request();
             });
         }
     }
 const scheduler = new Scheduler(2);
 const addTask = (time, order) => {
     scheduler.add(time, order);
 };
 addTask(1000, "1");
 addTask(500, "2");
 addTask(300, "3");
 addTask(400, "4");
 scheduler.taskStart();
```

## 17、RAF 和 RIC 是什么？

[参考文档](https://juejin.cn/post/6844903848981577735)<br>

- **requestAnimationFrame（RAF）：** 告诉浏览器在下次重绘之前执行传入的回调函数(通常是操纵 `dom`，更新动画的函数)；由于是每帧执行一次，那结果就是每秒的执行次数与浏览器屏幕刷新次数一样，通常是每秒 60 次。
- **requestIdleCallback（RIC）：** 会在浏览器空闲时间执行回调，也就是允许开发人员在主事件循环中执行低优先级任务，而不影响一些延迟关键事件。如果有多个回调，会按照先进先出原则执行，但是当传入了 `timeout`，为了避免超时，有可能会打乱这个顺序。

## 18、js 异步加载脚本方法？有什么区别？

![JS脚本懒加载](../assets/JS脚本懒加载.jpg)
其中蓝色代表 js 脚本网络加载时间，红色代表 js 脚本执行时间，绿色代表 html 解析。<br>
**`defer` 和 `async` 属性都是异步去加载外部的 JS 脚本文件，它们都不会阻塞页面的解析**，其区别如下：

- 执行顺序: 多个带 `async` 属性的标签，不能保证加载的顺序；多个带 `defer` 属性的标签，按照加载顺序执行；
- 脚本是否并行执行：`async` 属性，表示后续文档的加载和执行与 js 脚本的加载和执行是并行进行的，即异步执行；`defer` 属性，加载后续文档的过程和 js 脚本的加载(此时仅加载不执行)是并行进行的(异步)，js 脚本需要等到文档所有元素解析完成之后才执行，`DOMContentLoaded` 事件触发执行之前。

## 19、html 文档生命周期有哪些？

[参考文档](https://juejin.cn/post/7157995514460373023)<br>

**生命周期：**

- **DOMContentLoaded：** 浏览器已完全加载 HTML，并构建了 DOM 树，但样式表之类的外部资源可能尚未加载完成。
- **load：** 浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。
- **beforeunload：** 当用户正在离开页面时。
- **unload：** 用户几乎已经离开了<br>

**作用：**

- **DOMContentLoaded 事件：** DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口。
- **load 事件：** 外部资源已加载完成，样式已被应用，图片大小也已知了。
- **beforeunload 事件:** 用户正在离开：我们可以检查用户是否保存了更改，并询问他是否真的要离开。
- **unload 事件:** 用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据。

## 20、foreach 和 map 可以跳出循环吗？为什么？怎样跳出循环体？（函数中跳出循环体也是跳出函数本身）

不可以跳出循环，可以抛出错误跳出循环。

## 21、sort 排序的本质是什么？（sort 排序原理）

[参考文档](https://blog.csdn.net/weixin_45189427/article/details/120836701)
