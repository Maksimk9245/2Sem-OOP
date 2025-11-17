import { promises as fs } from 'node:fs'
import { IStudentRepository } from './IStudentRepository'
import { Student } from '../domain/Student'
export class FileStudentRepository implements IStudentRepository {
    constructor(private readonly filePath: string) {}
    async getAll(): Promise<Student[]> {
        const raw = await fs.readFile(this.filePath, 'utf-8')
        return JSON.parse(raw) as Student[]
    }
    async saveAll(students: Student[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(students, null, 2), 'utf-8')
    }
}