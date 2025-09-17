import { Student, Teacher, Astronaut, Person } from "./Entity/Entity";
import { FileHandler } from "./services/FileHandler";

const people: Person[] = [
    new Student("Maxs", "Tarasov", 2, "кв№123456", "2006-03-04"),
    new Student("Annas", "Ivanova", 3, "кв№654321", "2005-07-15"),
    new Student("Oleg", "Petrov", 3, "кв№111222", "2005-12-01"),
    new Teacher("Vlad", "Sudorenko", "Math"),
    new Astronaut("Olga", "Serova", "Mars Mission")
];

async function main() {
    const handler = new FileHandler("./src/data/people.txt");

    await handler.save(people);

    const summerStudents = await handler.summerThirdCourseStudents();
    console.log("Students third courses, born in summer");
    for (const s of summerStudents) {
        console.log(s.toRecordLines().join("\n"));
    }

    const teacher = people.find(p => p instanceof Teacher) as Teacher;
    teacher.sing();
    teacher.teach();
    const astronaut = people.find(p => p instanceof Astronaut) as Astronaut;
    astronaut.sing();
}

main();
