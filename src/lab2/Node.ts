
export class Node<T> {
    public left: Node<T> | null = null;
    public right: Node<T> | null = null;

    constructor(public data: T) {
        this.data = data;
    }
}
//node dist/index.js