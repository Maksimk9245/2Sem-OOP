import { IStudentRepository } from '../dal/IStudentRepository'
import { Student, isValidCourse, isValidPassport } from '../domain/Student'
import { normCity } from '../utils/string'

export class StudentService {
    constructor(private readonly repo: IStudentRepository) {}

    private validateStudent(s: Student): void {
        if (!s.lastName?.trim() || !s.firstName?.trim()) throw new Error('Invalid name')
        if (!isValidCourse(s.course)) throw new Error('Invalid course')
        if (!s.studentId?.trim()) throw new Error('Invalid studentId')
        if (!s.arrivalCity?.trim()) throw new Error('Invalid arrivalCity')
        if (!isValidPassport(s.passport)) throw new Error('Invalid passport')
    }

    private async getAllValidated(): Promise<Student[]> {
        const students = await this.repo.getAll()
        for (const s of students) this.validateStudent(s)
        return students
    }

    async percentageOfFirstYearFromOtherCities(baseCity = 'Kyiv'): Promise<number> {
        const base = normCity(baseCity)
        const students = await this.getAllValidated()
        const firstYear = students.filter(s => s.course === 1)
        if (firstYear.length === 0) return 0
        const other = firstYear.filter(s => normCity(s.arrivalCity) !== base).length
        const percentage = (other / firstYear.length) * 100
        return Math.round(percentage * 100) / 100
    }

    async assignDormRoomsForNonLocal(baseCity = 'Kyiv'): Promise<void> {
        const base = normCity(baseCity)
        const students = await this.getAllValidated()
        let dorm = 1
        let room = 101
        const updated = students.map(s => {
            if (normCity(s.arrivalCity) !== base) {
                const assigned = `D${dorm}-${room}`
                room++
                if (room > 120) { room = 101; dorm++ }
                return { ...s, dormRoom: assigned } as Student
            }
            const { dormRoom, ...rest } = s
            return { ...rest } as Student
        })
        await this.repo.saveAll(updated)
    }
    canObtainDriverLicense(
        student: Student,
        opts: { age: number; passedTheory: boolean; passedPractice: boolean; medicalClearance: boolean; minAge?: number }
    ): boolean {
        this.validateStudent(student)
        const minAge = opts.minAge ?? 18
        return (
            Number.isFinite(opts.age) &&
            opts.age >= minAge &&
            !!opts.passedTheory &&
            !!opts.passedPractice &&
            !!opts.medicalClearance
        )
    }
    canDance(
        student: Student,
        opts?: { injured?: boolean; hasMusic?: boolean }
    ): boolean {
        this.validateStudent(student)
        if (opts?.injured) return false
        return opts?.hasMusic ?? true
    }
}
