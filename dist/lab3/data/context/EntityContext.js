"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityContext = void 0;
class EntityContext {
    constructor(provider) {
        this.provider = provider;
    }
    async saveBooks(filePath, books) {
        await this.provider.write(filePath, books);
    }
    async loadBooks(filePath) {
        return await this.provider.read(filePath);
    }
}
exports.EntityContext = EntityContext;
