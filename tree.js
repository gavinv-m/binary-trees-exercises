import Node from './node.js';
import deleteNode from './delete.js';
import calculateHeight from './calculate-height.js';

export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  createTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const node = new Node(array[mid]);
    node.left = this.createTree(array, start, mid - 1);
    node.right = this.createTree(array, mid + 1, end);

    return node;
  }

  buildTree() {
    const sortedArray = Array.from(new Set(this.array)).sort((a, b) =>
      a > b ? 1 : -1
    );
    const end = sortedArray.length - 1;
    this.root = this.createTree(sortedArray, 0, end);
  }

  deleteItem(value, node = this.root) {
    if (node === null) {
      return;
    }

    if (value < node.data) {
      node =
        node.left.data === value
          ? deleteNode(node, 'left')
          : this.deleteItem(value, node.left);
      return node;
    }

    if (value > node.data) {
      node =
        node.right.data === value
          ? deleteNode(node, 'right')
          : this.deleteItem(value, node.right);
      return node;
    }

    return node;
  }

  insert(value, node = this.root) {
    if (node === null) {
      console.log(`Creating new node with value: ${value}`);
      return new Node(value);
    }
    if (value === node.data) return node;

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    }

    if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  findValue(value, node = this.root) {
    if (node === null) return null;

    if (node.data === value) return node;

    if (value < node.data) return this.findValue(value, node.left);

    if (value > node.data) return this.findValue(value, node.right);
  }

  levelOrderIteration(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    const queue = [this.root];
    while (queue.length >= 1) {
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);

      callback(queue[0]);
      queue.shift();
    }

    process.stdout.write('null\n');
  }

  levelOrderRecursion(callback, queue = [this.root]) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    if (queue.length === 0) {
      process.stdout.write('null\n');
      return;
    }

    if (queue[0].left !== null) queue.push(queue[0].left);
    if (queue[0].right !== null) queue.push(queue[0].right);

    callback(queue[0]);
    queue.shift();
    this.levelOrderRecursion(callback, queue);
    return;
  }

  inOrderTraversal(callback, node = this.root) {
    if (node === null) return;

    this.inOrderTraversal(callback, node.left);
    callback(node);
    this.inOrderTraversal(callback, node.right);

    if (node === this.root) process.stdout.write('null\n');
    return;
  }

  preOrderTraversal(callback, node = this.root) {
    if (node === null) return;

    callback(node);
    this.preOrderTraversal(callback, node.left);
    this.preOrderTraversal(callback, node.right);

    if (node === this.root) process.stdout.write('null\n');
    return;
  }

  postOrderTraversal(callback, node = this.root) {
    if (node === null) return;

    this.postOrderTraversal(callback, node.left);
    this.postOrderTraversal(callback, node.right);
    callback(node);

    if (node === this.root) process.stdout.write('null\n');
    return;
  }

  height(nodeValue, node = this.root) {
    if (node === null) return 'Node not found';

    if (nodeValue < node.data) {
      return this.height(nodeValue, node.left);
    } else if (nodeValue > node.data) {
      return this.height(nodeValue, node.right);
    } else {
      return `Height: ${calculateHeight(node, nodeValue)}`;
    }
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
