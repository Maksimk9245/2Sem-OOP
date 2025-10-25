import { promises as fs } from "fs";
import { DataProvider } from "./DataProvider";

export class JsonProvider implements DataProvider {
    async write<T>(path: string, data: T): Promise<void> {
        const json = JSON.stringify(data, null, 2);
        await fs.writeFile(path, json, "utf8");
    }

    async read<T>(path: string): Promise<T> {
        const content = await fs.readFile(path, "utf8");
        return JSON.parse(content) as T;
    }
}
