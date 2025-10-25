import { Book } from "../../core/models/Book";
import { BookEntity } from "../../data/entities/BookEntity";

export const toEntity = (book: Book): BookEntity => ({
    serialNumber: book.serialNumber,
    title: book.title,
    year: book.year,
    price: book.price,
    count: book.count,
});

export const fromEntity = (entity: BookEntity): Book =>
    new Book(entity.serialNumber, entity.title, entity.year, entity.price, entity.count);
