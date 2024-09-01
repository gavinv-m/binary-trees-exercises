import Tree from './tree.js';

// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const tree = new Tree(array);

// tree.buildTree();
// tree.insert(5);
// tree.prettyPrint(tree.root);
// tree.deleteItem(67);
// tree.prettyPrint(tree.root);

const array = [
  50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85, 5, 15, 33, 48, 52,
  58, 62, 68,
];

const tree = new Tree(array);
tree.buildTree();
tree.prettyPrint(tree.root);
tree.deleteItem(65);
tree.prettyPrint(tree.root);
