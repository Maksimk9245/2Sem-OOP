import { Person, Student, Teacher, Astronaut } from "./Entity";
import * as fs from 'fs/promises';

const people: Person[] = [
    new Student('Maxs', 'Tarasov', 2, 'кв№123456', '2006-03-04'),
    new Student('Annas', 'Ivanova', 3, 'кв№654321', '2005-07-15'),
    new Student('Oleg', 'Petrov', 3, 'кв№111222', '2005-12-01'),
    new Teacher('Vlad', 'Sudorenko', 'Math'),
    new Astronaut('Olga', 'Serova', 'Mars Mission')
];
class FileHandler {
    constructor(private filename: string) {}

    async save(people: Person[]) {
        await fs.writeFile(this.filename, '');
        for (const person of people) {
            const lines = person.toRecordLines().join('\n');
            await fs.appendFile(this.filename, lines + '\n');
        }
    }

    async read(): Promise<Person[]> {
        const data = await fs.readFile(this.filename, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const result: Person[] = [];

        for (let i = 0; i < lines.length; i += 2) {
            const header = lines[i];
            const body = lines[i + 1];
            const obj = JSON.parse(body);
            if (header.startsWith('Student')) {
                result.push(new Student(obj.firstname, obj.lastname, obj.course, obj.studentCard, obj.dob));
            } else if (header.startsWith('Teacher')) {
                result.push(new Teacher(obj.firstname, obj.lastname, obj.subject));
            } else if (header.startsWith('Astronaut')) {
                result.push(new Astronaut(obj.firstname, obj.lastname, obj.mission));
            }
        }
        return result;
    }

    async summerThirdCourseStudents() {
        const allPeople = await this.read();
        const filtered = allPeople.filter(p => {
            if (p instanceof Student) {
                const [year, month, day] = p.dob.split('-').map(Number);
                return p.course === 3 && [6,7,8].includes(month);
            }
            return false;
        });
        return filtered;
    }
}
async function main() {
    const handler = new FileHandler('people.txt');
    await handler.save(people);
    const summerStudents = await handler.summerThirdCourseStudents();
    console.log("Студенты 3-го курса, рожденные летом:");
    for (const s of summerStudents) {
        console.log(s.toRecordLines().join('\n'));
    }
    const teacher = people.find(p => p instanceof Teacher) as Teacher;
    teacher.sing();
    const astronaut = people.find(p => p instanceof Astronaut) as Astronaut;
    astronaut.sing();
}
main();
