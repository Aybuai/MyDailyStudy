var person = {
    name: "Aybuai",
    age: 23
};
// function
var add = function (x, y, z) {
    if (typeof z === "number") {
        return x + y + z;
    }
    return x + y;
};
add(1, 2);
// (x: number, y: number, z?: number) => number
// 这里的箭头表示函数返回值类型，而不是箭头函数
// const fn: (x: number, y: number, z?: number) => number = add;
// 用interface描述函数类型
var add2 = add;
console.log(add2(2, 3, 3));
