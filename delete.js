import Node from './node.js';

const traverse = function traverseTree(node) {
  if (node.left.left === null) {
    const successorData = node.left.data;
    node.left = node.left.right;
    return successorData;
  }

  return traverse(node.left);
};

export default function deleteNode(parentNode, side) {
  const targetNode = parentNode[side];

  // Target node is a leaf
  if (targetNode.left === null && targetNode.right === null) {
    parentNode[side] = null;
    return parentNode;
  }

  // Target node has a left and right child
  if (targetNode.left !== null && targetNode.right !== null) {
    /**
     * Check if target node's right child has no left children
     * If true that will be the successor node, it will be the next biggest after target node
     */
    if (targetNode.right.left === null) {
      targetNode.right.left = targetNode.left;
      parentNode[side] = targetNode.right;
      return parentNode;
    }

    // Target node's right child has a left child
    const successorData = traverse(targetNode.right);
    const successorNode = new Node(
      successorData,
      targetNode.left,
      targetNode.right
    );
    parentNode[side] = successorNode;
    return parentNode;
  }

  // Target node has one child
  parentNode[side] =
    targetNode.left === null ? targetNode.right : targetNode.left;
  return parentNode;
}
