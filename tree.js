import Node from './node.js';
import deleteNode from './delete.js';

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
