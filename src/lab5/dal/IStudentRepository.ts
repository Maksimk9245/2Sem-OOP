import { Student } from '../domain/Student'
export interface IStudentRepository {
    getAll(): Promise<Student[]>
    saveAll(students: Student[]): Promise<void>
}