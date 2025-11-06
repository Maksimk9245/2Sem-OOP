"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityService = void 0;
const mapping_1 = require("../../shared/utils/mapping");
const DomainErrors_1 = require("../errors/DomainErrors");
class EntityService {
    constructor(context) {
        this.context = context;
        this.books = [];
    }
    add(book) {
        if (this.books.find((b) => b.serialNumber === book.serialNumber)) {
            throw new Error("Книга з таким серійним номером вже існує");
        }
        this.books.push(book);
    }
    list() {
        return this.books;
    }
    findByTitle(title) {
        return this.books.filter((b) => b.title.toLowerCase().includes(title.toLowerCase()));
    }
    increasePrice(serialNumber, percent) {
        const book = this.books.find((b) => b.serialNumber === serialNumber);
        if (!book)
            throw new DomainErrors_1.NotFoundError("Книгу не знайдено");
        book.increasePrice(percent);
    }
    getTotalValue() {
        return this.books.reduce((sum, b) => sum + b.totalValue(), 0);
    }
    async save(path) {
        await this.context.saveBooks(path, this.books.map(mapping_1.toEntity));
    }
    async load(path) {
        const entities = await this.context.loadBooks(path);
        this.books = entities.map(mapping_1.fromEntity);
    }
}
exports.EntityService = EntityService;
