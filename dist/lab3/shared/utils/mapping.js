"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEntity = exports.toEntity = void 0;
const Book_1 = require("../../core/models/Book");
const toEntity = (book) => ({
    serialNumber: book.serialNumber,
    title: book.title,
    year: book.year,
    price: book.price,
    count: book.count,
});
exports.toEntity = toEntity;
const fromEntity = (entity) => new Book_1.Book(entity.serialNumber, entity.title, entity.year, entity.price, entity.count);
exports.fromEntity = fromEntity;
