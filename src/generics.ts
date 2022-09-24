// 泛型

// function echo(arg) {
//     return arg
// }

// 失去了类型规范
// const res = echo(123)

function echo<T>(arg: T): T {
  return arg;
}

// 这里res 就会获取值的属性
const res = echo(123);

// 这里拿一个元组 做示例
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

// 这里就把元组的属性给替换位置了，类型变更
const res2 = swap(["str", 123]);

// 泛型约束

// 获取数组的长度
function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

// 返回的是 数字类型的数组
const arrLength = echoWithArr([1, 2, 3]);

// 但是像上面那种写法可以获取 length 属性的类型有很多，例如 string， object等，这样写的话就有局限性
// 可以把函数的类型约束继承于一个 interface

interface IsWithLength {
  length: number;
}

// 让这个函数入参有了类型约束，通过 interface 约束类型，可以更加灵活，而不是单一种类型
function echoWithLength<T extends IsWithLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

const str = echoWithLength("str");
const obj = echoWithLength({ length: 1 });
const arr = echoWithLength([1, 2]);
