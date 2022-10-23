/**
 * this指向谁？
 * 1、函数中的this指向最后调用它的对象。如果函数中的this是被上一级对象调用，那么this指向的就是上一级对象，否则指向全局环境
 */

const foo = {
  bar: 10,
  fn: function () {
    console.log(this);
    console.log(this.bar);
  },
};

const fn1 = foo.fn
fn1() // 最后调用它的是全局环境window，即this指向window，bar为undefined
foo.fn() // 最后调用它的是foo对象，所以this指向了foo，bar为10