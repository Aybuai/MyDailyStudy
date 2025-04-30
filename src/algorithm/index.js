// 手写代码。

// 数组转树

const data = [
  {
    id: 1,
    pid: null,
  },
  {
    id: 2,
    pid: 1,
  },
  {
    id: 3,
    pid: 1,
  },
  {
    id: 4,
    pid: 2,
  },
  {
    id: 5,
    pid: 4,
  },
  {
    id: 6,
    pid: 5,
  },
  {
    id: 7,
    pid: 3,
  },
];

function arrayToTree(items) {
  const rootItems = [];
  const lookup = {};

  // 创建一个查找表
  for (const item of items) {
    const itemId = item.id;
    const pid = item.pid;

    if (!lookup[itemId]) {
      lookup[itemId] = { ...item, children: [] };
    } else {
      lookup[itemId] = { ...lookup[itemId], ...item };
    }

    const TreeItem = lookup[itemId];

    if (pid === null) {
      rootItems.push(TreeItem);
    } else {
      if (!lookup[pid]) {
        lookup[pid] = { children: [] };
      }
      lookup[pid].children.push(TreeItem);
    }
  }

  return rootItems;
}

// 树转数组

// const tree = [
//   {
//     id: 1,
//     pid: null,
//     children: [
//       {
//         id: 2,
//         pid: 1,
//         children: [
//           {
//             id: 4,
//             pid: 2,
//             children: [
//               { id: 5, pid: 4, children: [{ id: 6, pid: 5, children: [] }] },
//             ],
//           },
//         ],
//       },
//       { id: 3, pid: 1, children: [{ id: 7, pid: 3, children: [] }] },
//     ],
//   },
// ];

function treeToArray(tree) {
  const result = [];

  function traverse(node, parentId = null) {
    result.push({ id: node.id, parentId: parentId, name: node.name });

    if (node.children) {
      node.children.forEach((child) => traverse(child, node.id));
    }
  }

  tree.forEach((rootNode) => traverse(rootNode));
  return result;
}

console.log(JSON.stringify(arrayToTree(data)));

// 拿到一个url，解析出其中的参数
let url =
  "http://www.baidu.com/?user=leaf&age=10&id=123&city=%E5%8C%97%E4%BA%AC&city=%E4%B8%8A%E6%B5%B7&student";
let getQueryString = (url) => {
  if (typeof url !== "string") return {};

  const res = {},
    str = url.substring(url.indexOf("?") + 1);

  let tmp, key, value, arrValue;

  const arr = decodeURI(str).split("&");

  for (let i = 0; i < arr.length; i++) {
    tmp = arr[i].split("=");

    key = tmp[0];
    value = tmp[1] || true;

    if (key && !res[key]) {
      res[key] = value;
    } else {
      arrValue = res[key];
      arrValue = Array.isArray(arrValue) ? arrValue : [arrValue];
      arrValue.push(value);
      res[key] = arrValue;
    }
  }
  return res;
};
console.log(getQueryString(url));

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === Math.floor(arr.length / 2)) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}
const arr = [1, 3, 2, 5, 4, 7, 6];
console.log(quickSort(arr));

// 实现一个拼手气抢红包算法
// 提供了一个RedPackage的类，初始化时传入红包金额和个数，需要实现一个openRedPackage方法，每调一次都进行一次“抢红包”，并以console.log的形式输出抢到的红包金额。
