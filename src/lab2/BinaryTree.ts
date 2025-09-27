import { Node } from "./Node";

export class BinaryTree<T> implements Iterable<T> {
    public root: Node<T> | null = null;

    constructor(private compareFn: (a: T, b: T) => number) {}

    insert(data: T): void {
        this.root = this.insertRecursive(this.root, data);
    }

    private insertRecursive(node: Node<T> | null, data: T): Node<T> {
        if (!node) return new Node(data);
        if (this.compareFn(data, node.data) < 0) {
            node.left = this.insertRecursive(node.left, data);
        } else {
            node.right = this.insertRecursive(node.right, data);
        }
        return node;
    }

    preorderTraversal(node: Node<T> | null = this.root): void {
        if (!node) return;
        console.log(node.data);
        this.preorderTraversal(node.left);
        this.preorderTraversal(node.right);
    }

    *inOrder(node: Node<T> | null = this.root): IterableIterator<T> {
        if (node) {
            yield* this.inOrder(node.left);
            yield node.data;
            yield* this.inOrder(node.right);
        }
    }

    [Symbol.iterator](): Iterator<T> {
        return this.inOrder();
    }
}
