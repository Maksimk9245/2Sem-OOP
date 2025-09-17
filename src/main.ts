import { Student, Teacher, Astronaut, Person } from "./Entity/Entity";
import { FileHandler } from "./services/FileHandler";
import * as readline from "readline";
const people: Person[] = [
    new Student("Maxs", "Tarasov", 2, "кв№123456", "2006-03-04"),
    new Student("Annas", "Ivanova", 3, "кв№654321", "2005-07-15"),
    new Student("Oleg", "Petrov", 3, "кв№111222", "2005-12-01"),
    new Teacher("Vlad", "Sudorenko", "Math"),
    new Astronaut("Olga", "Serova", "Mars Mission")
];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function ask(question: string): Promise<string> {
    return new Promise(resolve => rl.question(question, resolve));
}
function showMenu() {
    console.log(`
Select an action:
1. Show all people
2. Show third-year students born in summer
3. The teacher sings and teaches
4. The astronaut sings and launches a mission
5. Exit
`);
}
async function mainMenu(handler: FileHandler) {
    showMenu();
    const answer = await ask("Enter your choice: ");
    switch(answer.trim()) {
        case "1":
            people.forEach(p => {
                console.log(p.toRecordLines().join("\n"));
                console.log("---");
            });
            break;
        case "2":
            const summerStudents = await handler.summerThirdCourseStudents();
            if (summerStudents.length === 0) {
                console.log("No third-year students born in summer found.");
            } else {
                summerStudents.forEach(s => console.log(s.toRecordLines().join("\n")));
            }
            break;
        case "3":
            const teacher = people.find(p => p instanceof Teacher) as Teacher;
            if (teacher) {
                teacher.sing();
                teacher.teach();
            } else {
                console.log("No teacher found.");
            }
            break;
        case "4":
            const astronaut = people.find(p => p instanceof Astronaut) as Astronaut;
            if (astronaut) {
                astronaut.sing();
            } else {
                console.log("No astronaut found.");
            }
            break;
        case "5":
            console.log("Exiting...");
            rl.close();
            return;
        default:
            console.log("Invalid choice!");
    }
    await mainMenu(handler);
}
async function main() {
    const handler = new FileHandler("./src/data/people.txt");
    await handler.save(people);
    await mainMenu(handler);
}
main();
