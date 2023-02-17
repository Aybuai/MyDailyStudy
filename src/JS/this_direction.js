// this指向谁？

/**
 * 全局环境中的this
 * 函数中的this指向最后调用它的对象。如果函数中的this是被上一级对象调用，那么this指向的就是上一级对象，否则指向全局环境
 */

const foo = {
  bar: 10,
  fn: function () {
    console.log(this);
    console.log(this.bar);
  },
};

const fn1 = foo.fn;
fn1(); // 最后调用它的是全局环境window，即this指向window，bar为undefined
foo.fn(); // 最后调用它的是foo对象，所以this指向了foo，bar为10

/**
 * 上下文对象调用中的this
 * 函数中的this指向最后调用它的对象。如果函数中的this是被上一级对象调用，那么this指向的就是上一级对象，否则指向全局环境
 */

const o1 = {
  text: "1",
  fn: function () {
    return this.text;
  },
};

const o2 = {
  text: "2",
  fn: function () {
    return o1.fn();
  },
};

const o3 = {
  text: "3",
  fn: function () {
    const fn = o1.fn;
    return fn();
  },
};

console.log(o1.fn()); // 1，this指向最后调用它的对象，即o1
console.log(o2.fn()); // 1，实际还是o1的fn，所以this指向的还是o1
console.log(o3.fn()); // undefined，因为 const fn = o1.fn 进行了重新赋值，所以这时指针就指向了window，所以输出undefined

// 如何使 console.log(o2.fn()) 输出2

// 提前把o1.fn赋值到 o2的fn上，然后最后调用this即是指向o2
// const o2 = {
//   text: '2',
//   fn: o1.fn
// }

// 可以使用call、apply、bind改变this指向
// const o2 = {
//   text: '2',
//   fn: function() {
//     return o1.fn.call(this)
//   }
// }

/**
 * 构造函数和this
 */

function Foo() {
  this.user = "Lucas";
  // 显式返回一个对象，则指向这个对象
  const o = {};
  return o;
}

const instance = new Foo();
console.log(instance.user, "11");

function Foo2() {
  this.user = "Lucas";
  // 显式返回一个基本类型，则仍然指向实例。
  return 1;
}

const instance2 = new Foo2();
console.log(instance2.user, "22");

/**
 * 箭头函数中的this
 * 指向最近的外层函数作用域
 */
