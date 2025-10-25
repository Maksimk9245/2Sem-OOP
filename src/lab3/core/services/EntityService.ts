import { EntityContext } from "../../data/context/EntityContext";
import { Book } from "../models/Book";
import { fromEntity, toEntity } from "../../shared/utils/mapping";
import { NotFoundError } from "../errors/DomainErrors";

export class EntityService {
    private books: Book[] = [];

    constructor(private context: EntityContext) {}

    add(book: Book): void {
        if (this.books.find((b) => b.serialNumber === book.serialNumber)) {
            throw new Error("Книга з таким серійним номером вже існує");
        }
        this.books.push(book);
    }

    list(): Book[] {
        return this.books;
    }

    findByTitle(title: string): Book[] {
        return this.books.filter((b) =>
            b.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    increasePrice(serialNumber: string, percent: number): void {
        const book = this.books.find((b) => b.serialNumber === serialNumber);
        if (!book) throw new NotFoundError("Книгу не знайдено");
        book.increasePrice(percent);
    }

    getTotalValue(): number {
        return this.books.reduce((sum, b) => sum + b.totalValue(), 0);
    }

    async save(path: string): Promise<void> {
        await this.context.saveBooks(path, this.books.map(toEntity));
    }

    async load(path: string): Promise<void> {
        const entities = await this.context.loadBooks(path);
        this.books = entities.map(fromEntity);
    }
}
