/**
 * 二叉树
 */
const rootTree = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
    },
    right: {
      val: "E",
    },
  },
  right: {
    val: "C",
    right: {
      val: "F",
    },
  },
};

/**
 * 二叉树遍历
 * 1、递归遍历（先、中、后序遍历）
 * 2、迭代遍历（层次遍历）
 *
 * 先序遍历：根节点 -> 左子树 -> 右子树
 * 中序遍历：左子树 -> 跟节点 -> 右子树
 * 后序遍历：左子树 -> 右子树 -> 跟节点
 * 层次遍历
 */

/**
 * 递归函数要点：
 * 1、递归式
 * 2、递归边界
 */

// 先序遍历
const preOrder = (root) => {
  // 递归边界，root为空
  if (!root) return;
  // 输出当前遍历的结点值
  console.log(`当前遍历节点：${root.val}`);
  // 递归遍历左子树
  preOrder(root.left);
  // 递归遍历右子树
  preOrder(root.right);
};

// preOrder(rootTree);

// 中序遍历
const inOrder = (root) => {
  if (!root) return;
  inOrder(root.left);
  console.log(`当前遍历节点：${root.val}`);
  inOrder(root.right);
};

// inOrder(rootTree);

// 后序遍历
const postOrder = (root) => {
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(`当前遍历节点：${root.val}`);
};

postOrder(rootTree);
