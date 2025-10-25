export class Book {
    constructor(
        public serialNumber: string,
        public title: string,
        public year: number,
        public price: number,
        public count: number
    ) {}

    increasePrice(percent: number): void {
        if (percent < 0) throw new Error("Percent cannot be negative");
        this.price += (this.price * percent) / 100;
    }

    totalValue(): number {
        return this.price * this.count;
    }

    toDisplayString(): string {
        return `📘 ${this.title} (${this.year}) — ${this.count} шт. × ${this.price.toFixed(2)} грн = ${this.totalValue().toFixed(2)} грн`;
    }
}
