"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(studentId, fullName, birthYear, groupNumber, course) {
        this.studentId = studentId;
        this.fullName = fullName;
        this.birthYear = birthYear;
        this.groupNumber = groupNumber;
        this.course = course;
    }
    nextCourse() {
        this.course++;
    }
    getAge() {
        return new Date().getFullYear() - this.birthYear;
    }
    printInfo() {
        console.log(`ID: ${this.studentId}, ПІБ: ${this.fullName}, Рік народження: ${this.birthYear}, Вік: ${this.getAge()}, Група: ${this.groupNumber}, Курс: ${this.course}`);
    }
    compareTo(other) {
        return this.studentId - other.studentId;
    }
}
exports.Student = Student;
