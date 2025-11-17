import { Course } from './types'
export interface Passport { series: string; number: string }
export interface Student {
    lastName: string
    firstName: string
    course: Course
    studentId: string
    arrivalCity: string
    passport: Passport
    dormRoom?: string
}
export function isValidCourse(c: number): c is Course {
    return Number.isInteger(c) && c >= 1 && c <= 6
}
export function isValidPassport(p: Passport): boolean {
    return /^[A-Z]{2}$/.test(p.series.trim().toUpperCase()) && /^\d{6}$/.test(p.number.trim())
}