import Tree from './tree.js';
import print from './print.js';

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

tree.buildTree();
tree.insert(5);
// tree.deleteItem(67);
tree.prettyPrint(tree.root);
// console.log(tree.findValue(67));
// tree.levelOrderIteration(print);
// tree.levelOrderRecursion(print);
// tree.inOrderTraversal(print);
// tree.preOrderTraversal(print);
// tree.postOrderTraversal(print);
console.log(tree.height(9));
