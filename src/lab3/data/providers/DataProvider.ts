export interface DataProvider {
    write<T>(path: string, data: T): Promise<void>;
    read<T>(path: string): Promise<T>;
}
