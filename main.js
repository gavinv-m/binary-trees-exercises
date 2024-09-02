import Tree from './tree.js';

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

tree.buildTree();
tree.insert(5);
// tree.deleteItem(67);
tree.prettyPrint(tree.root);
// console.log(tree.findValue(67));
