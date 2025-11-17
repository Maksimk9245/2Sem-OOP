import { StudentService } from '../../lab5/bll/StudentService'
import { IStudentRepository } from '../../lab5/dal/IStudentRepository'
import { Student } from '../../lab5/domain/Student'

class InMemoryRepo implements IStudentRepository {
    constructor(private data: Student[]) {}
    async getAll(): Promise<Student[]> { return this.data }
    async saveAll(students: Student[]): Promise<void> { this.data = students }
}

const baseStudent: Student = {
    lastName: 'A',
    firstName: 'A',
    course: 1,
    studentId: 'S1',
    arrivalCity: 'Kyiv',
    passport: { series: 'AB', number: '123456' }
}

describe('Variant 2 — extra skills (driver license & dance)', () => {
    test('canObtainDriverLicense: success (age ≥ 18, theory+practice, medical)', () => {
        const service = new StudentService(new InMemoryRepo([baseStudent]))
        const ok = service.canObtainDriverLicense(baseStudent, {
            age: 19,
            passedTheory: true,
            passedPractice: true,
            medicalClearance: true
        })
        expect(ok).toBe(true)
    })

    test('canObtainDriverLicense: boundary age 18 → success', () => {
        const service = new StudentService(new InMemoryRepo([baseStudent]))
        const ok = service.canObtainDriverLicense(baseStudent, {
            age: 18,
            passedTheory: true,
            passedPractice: true,
            medicalClearance: true
        })
        expect(ok).toBe(true)
    })

    test('canObtainDriverLicense: fails if age < minAge', () => {
        const service = new StudentService(new InMemoryRepo([baseStudent]))
        const ok = service.canObtainDriverLicense(baseStudent, {
            age: 17,
            passedTheory: true,
            passedPractice: true,
            medicalClearance: true
        })
        expect(ok).toBe(false)
    })

    test('canObtainDriverLicense: fails if theory/practice/medical missing', () => {
        const service = new StudentService(new InMemoryRepo([baseStudent]))
        expect(service.canObtainDriverLicense(baseStudent, {
            age: 20, passedTheory: false, passedPractice: true, medicalClearance: true
        })).toBe(false)
        expect(service.canObtainDriverLicense(baseStudent, {
            age: 20, passedTheory: true, passedPractice: false, medicalClearance: true
        })).toBe(false)
        expect(service.canObtainDriverLicense(baseStudent, {
            age: 20, passedTheory: true, passedPractice: true, medicalClearance: false
        })).toBe(false)
    })

    test('canDance: ok by default', () => {
        const service = new StudentService(new InMemoryRepo([baseStudent]))
        expect(service.canDance(baseStudent)).toBe(true)
    })

    test('canDance: injured -> false', () => {
        const service = new StudentService(new InMemoryRepo([baseStudent]))
        expect(service.canDance(baseStudent, { injured: true })).toBe(false)
    })

    test('canDance: hasMusic toggles but not required', () => {
        const service = new StudentService(new InMemoryRepo([baseStudent]))
        expect(service.canDance(baseStudent, { hasMusic: true })).toBe(true)
        expect(service.canDance(baseStudent, { hasMusic: false })).toBe(false)
    })
})
