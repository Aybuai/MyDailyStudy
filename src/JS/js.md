### 1、什么是原型、原型链？（经典 js 原型相关题目看掘金）

**原型：**<br>

- ① 所有引用类型都有一个 `__proto__` (隐式原型)属性，属性值是一个普通的对象
- ② 所有函数都有一个 prototype(原型)属性，属性值是一个普通的对象
- ③ 所有引用类型的 `__proto__` 属性指向它构造函数的 prototype

**原型链：**<br>
当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会去它的 `__proto__` 隐式原型上查找，即它的构造函数的 prototype，如果还没有找到就会再在构造函数的 prototype 的 `__proto__` 中查找，这样一层一层向上查找就会形成一个链式结构，我们称为原型链。<br>
原型链判断：<br>

```javascript
Object.prototype.__proto__; //null
Function.prototype.__proto__; //Object.prototype
Object.__proto__; //Function.prototype
Object instanceof Function; //true
Function instanceof Object; //true
Function.prototype === Function.__proto__; //true
```

### 2、什么是继承？说一说有哪些？继承组合的原理及优点？

[参考文档](https://juejin.cn/post/6844903696111763470)<br>

继承（inheritance）是面向对象软件技术当中的一个概念。如果一个类别B“继承自”另一个类别A，就把这个B称为“A的子类”，而把A称为“B的父类别”也可以称“A是B的超类”<br>

**组合继承：** 原型链继承和借用构造函数方法组合就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。<br>
**寄生组合式继承：** 结合借用构造函数传递参数和寄生模式实现继承。这是最成熟的方法，也是现在库实现的方法<br>

**优点：**<br>
继承可以使得子类具有父类别的各种属性和方法，在子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能
