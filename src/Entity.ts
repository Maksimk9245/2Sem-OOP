export abstract class Person {
    constructor(public firstname: string, public lastname: string) {}

    get name(): string {
        return (this.firstname + this.lastname).replace(/\s+/g, "");
    }

    abstract toRecordLines(): string[];
}

export class Student extends Person {
    typeName = 'Student';

    constructor(
        firstname: string,
        lastname: string,
        public course: number,
        public studentCard: string,
        public dob: string // формат: ХХ-ХХ-ХХХХ
    ) {
        super(firstname, lastname);
    }

    toRecordLines(): string[] {
        const header = `${this.typeName} ${this.name}`;
        const body = `{"firstname":"${this.firstname}","lastname":"${this.lastname}","course":${this.course},"studentCard":"${this.studentCard}","dob":"${this.dob}"}`;
        return [header, body];
    }
}

export class Teacher extends Person {
    typeName = "Teacher";

    constructor(firstname: string, lastname: string, public subject: string) {
        super(firstname, lastname);
    }

    teach() {
        console.log(`${this.firstname} ${this.lastname} преподает ${this.subject}`);
    }

    sing() {
        console.log(`${this.firstname} поёт 🎵`);
    }

    toRecordLines(): string[] {
        const header = `${this.typeName} ${this.name}`;
        const body = `{"firstname":"${this.firstname}","lastname":"${this.lastname}","subject":"${this.subject}"}`;
        return [header, body];
    }
}

export class Astronaut extends Person {
    typeName = "Astronaut";

    constructor(firstname: string, lastname: string, public mission: string) {
        super(firstname, lastname);
    }

    sing() {
        console.log(`${this.firstname} поёт 🎵`);
    }

    toRecordLines(): string[] {
        const header = `${this.typeName} ${this.name}`;
        const body = `{"firstname":"${this.firstname}","lastname":"${this.lastname}","mission":"${this.mission}"}`;
        return [header, body];
    }
}
