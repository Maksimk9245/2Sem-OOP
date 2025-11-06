"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = void 0;
const Node_1 = require("./Node");
class BinaryTree {
    constructor(compareFn) {
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(data) {
        this.root = this.insertRecursive(this.root, data);
    }
    insertRecursive(node, data) {
        if (!node)
            return new Node_1.Node(data);
        if (this.compareFn(data, node.data) < 0) {
            node.left = this.insertRecursive(node.left, data);
        }
        else {
            node.right = this.insertRecursive(node.right, data);
        }
        return node;
    }
    preorderTraversal(node = this.root) {
        if (!node)
            return;
        console.log(node.data);
        this.preorderTraversal(node.left);
        this.preorderTraversal(node.right);
    }
    *inOrder(node = this.root) {
        if (node) {
            yield* this.inOrder(node.left);
            yield node.data;
            yield* this.inOrder(node.right);
        }
    }
    [Symbol.iterator]() {
        return this.inOrder();
    }
}
exports.BinaryTree = BinaryTree;
