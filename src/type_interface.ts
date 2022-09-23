// type interface 类型推论
let str = "str";

// union types 联合类型
function getLength(input: number | string): number {
  // 类型断言 as
  const str = input as string;
  if (str.length) {
    return str.length;
  } else {
    const num = input as number;
    return num.toString().length;
  }
}

// type guard
function getLength2(input: number | string): number {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.toString().length;
  }
}
