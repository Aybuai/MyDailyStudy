// interface
interface Person {
  name: string;
  age: number;
  id?: number;
}

let person: Person = {
  name: "Aybuai",
  age: 23,
};

// function
const add = (x: number, y: number, z?: number): number => {
  if (typeof z === "number") {
    return x + y + z;
  }
  return x + y;
};

add(1, 2);

interface ISum {
  (x: number, y: number, z?: number): number;
}

// (x: number, y: number, z?: number) => number
// 这里的箭头表示函数返回值类型，而不是箭头函数
// const fn: (x: number, y: number, z?: number) => number = add;

// 用interface描述函数类型
const add2: ISum = add;

console.log(add2(2, 3, 3));
