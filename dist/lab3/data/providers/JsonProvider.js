"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonProvider = void 0;
const fs_1 = require("fs");
class JsonProvider {
    async write(path, data) {
        const json = JSON.stringify(data, null, 2);
        await fs_1.promises.writeFile(path, json, "utf8");
    }
    async read(path) {
        const content = await fs_1.promises.readFile(path, "utf8");
        return JSON.parse(content);
    }
}
exports.JsonProvider = JsonProvider;
