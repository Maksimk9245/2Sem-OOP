"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStudentRepository = void 0;
const node_fs_1 = require("node:fs");
class FileStudentRepository {
    filePath;
    constructor(filePath) {
        this.filePath = filePath;
    }
    async getAll() {
        const raw = await node_fs_1.promises.readFile(this.filePath, 'utf-8');
        return JSON.parse(raw);
    }
    async saveAll(students) {
        await node_fs_1.promises.writeFile(this.filePath, JSON.stringify(students, null, 2), 'utf-8');
    }
}
exports.FileStudentRepository = FileStudentRepository;
