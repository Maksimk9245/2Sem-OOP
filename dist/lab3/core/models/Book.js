"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(serialNumber, title, year, price, count) {
        this.serialNumber = serialNumber;
        this.title = title;
        this.year = year;
        this.price = price;
        this.count = count;
    }
    increasePrice(percent) {
        if (percent < 0)
            throw new Error("Percent cannot be negative");
        this.price += (this.price * percent) / 100;
    }
    totalValue() {
        return this.price * this.count;
    }
    toDisplayString() {
        return `📘 ${this.title} (${this.year}) — ${this.count} шт. × ${this.price.toFixed(2)} грн = ${this.totalValue().toFixed(2)} грн`;
    }
}
exports.Book = Book;
