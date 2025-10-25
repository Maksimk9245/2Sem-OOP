import { DataProvider } from "../providers/DataProvider";
import { BookEntity } from "../entities/BookEntity";

export class EntityContext {
    constructor(private provider: DataProvider) {}

    async saveBooks(filePath: string, books: BookEntity[]): Promise<void> {
        await this.provider.write(filePath, books);
    }

    async loadBooks(filePath: string): Promise<BookEntity[]> {
        return await this.provider.read<BookEntity[]>(filePath);
    }
}
