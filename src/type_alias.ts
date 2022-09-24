// 别名 alias
type PlusType = (x: number, y: number) => number;

let addSum: PlusType = (x, y) => {
  return x + y;
};

const result = addSum(1, 2);
console.log(result);

// 字面量
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
let dir: Direction = "UP";

// 交叉类型
interface Person {
  name: string;
}

type Person1 = Person & { age: number };

let xiaoming: Person1 = {
  age: 12,
  name: "xiaoming",
};

/**
 * 总结
 */

// 1. 可以理解成创建一个繁琐类型的快捷键 type 关键字
// 2. | 可以创建出字面量，集合数据的汇总
// 3. & 可以对一个interface等进行补充，可以理解成是下一代继承上一代的属性并且有自己独立的属性
