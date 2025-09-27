export class Student {
    constructor(
        public studentId: number,
        public fullName: string,
        public birthYear: number,
        public groupNumber: string,
        public course: number
    ) {}


    getAge(): number {
        return new Date().getFullYear() - this.birthYear;
    }

    printInfo(): void {
        console.log(
            `ID: ${this.studentId}, ПІБ: ${this.fullName}, Рік народження: ${this.birthYear}, Вік: ${this.getAge()}, Група: ${this.groupNumber}, Курс: ${this.course}`
        );
    }

    compareTo(other: Student): number {
        return this.studentId - other.studentId;
    }
}
