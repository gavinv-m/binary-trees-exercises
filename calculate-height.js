export default function calculateHeight(node, nodeValue) {
  if (node === null) return -1;

  const leftHeight = calculateHeight(node.left, nodeValue);
  const rightHeight = calculateHeight(node.right, nodeValue);

  return Math.max(leftHeight, rightHeight) + 1;
}
