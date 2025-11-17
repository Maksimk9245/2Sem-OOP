"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const Student_1 = require("../domain/Student");
const string_1 = require("../utils/string");
class StudentService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    validateStudent(s) {
        if (!s.lastName?.trim() || !s.firstName?.trim())
            throw new Error('Invalid name');
        if (!(0, Student_1.isValidCourse)(s.course))
            throw new Error('Invalid course');
        if (!s.studentId?.trim())
            throw new Error('Invalid studentId');
        if (!s.arrivalCity?.trim())
            throw new Error('Invalid arrivalCity');
        if (!(0, Student_1.isValidPassport)(s.passport))
            throw new Error('Invalid passport');
    }
    async getAllValidated() {
        const students = await this.repo.getAll();
        for (const s of students)
            this.validateStudent(s);
        return students;
    }
    async percentageOfFirstYearFromOtherCities(baseCity = 'Kyiv') {
        const base = (0, string_1.normCity)(baseCity);
        const students = await this.getAllValidated();
        const firstYear = students.filter(s => s.course === 1);
        if (firstYear.length === 0)
            return 0;
        const other = firstYear.filter(s => (0, string_1.normCity)(s.arrivalCity) !== base).length;
        const percentage = (other / firstYear.length) * 100;
        return Math.round(percentage * 100) / 100;
    }
    async assignDormRoomsForNonLocal(baseCity = 'Kyiv') {
        const base = (0, string_1.normCity)(baseCity);
        const students = await this.getAllValidated();
        let dorm = 1;
        let room = 101;
        const updated = students.map(s => {
            if ((0, string_1.normCity)(s.arrivalCity) !== base) {
                const assigned = `D${dorm}-${room}`;
                room++;
                if (room > 120) {
                    room = 101;
                    dorm++;
                }
                return { ...s, dormRoom: assigned };
            }
            const { dormRoom, ...rest } = s;
            return { ...rest };
        });
        await this.repo.saveAll(updated);
    }
    canObtainDriverLicense(student, opts) {
        this.validateStudent(student);
        const minAge = opts.minAge ?? 18;
        return (Number.isFinite(opts.age) &&
            opts.age >= minAge &&
            !!opts.passedTheory &&
            !!opts.passedPractice &&
            !!opts.medicalClearance);
    }
    canDance(student, opts) {
        this.validateStudent(student);
        if (opts?.injured)
            return false;
        return opts?.hasMusic ?? true;
    }
}
exports.StudentService = StudentService;
