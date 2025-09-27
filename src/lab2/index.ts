import { Student } from "./Student";
import { BinaryTree } from "./BinaryTree";
const students: Student[] = [
    new Student(1, "Грицак Наталія Василівна", 2006, "Б-121-24-1-ПІ", 1),
    new Student(2, "Іваненко Петро Іванович", 2005, "Б-121-24-1-ПІ", 2),
    new Student(3, "Сидоренко Олег Михайлович", 2004, "Б-121-24-1-ПІ", 3),
];
const array = [...students];
const list: Student[] = [...students];
const arrayList: any[] = [...students];
array.push(new Student(4, "Новий Студент", 2007, "Б-121-24-1-ПІ", 1));
list.push(new Student(5, "Ще Один", 2006, "Б-121-24-1-ПІ", 2));
arrayList.push(new Student(6, "Random Student", 2005, "Б-121-24-1-ПІ", 3));
array.splice(0, 1);
list.splice(0, 1);
arrayList.splice(0, 1);
array[0].course = 10;
list[0].course = 9;
(arrayList[0] as Student).course = 8;
const found = list.find(s => s.fullName.includes("Петро"));
console.log("Found:", found?.fullName);
console.log("Array traversal:");
array.forEach(s => s.printInfo());
const tree = new BinaryTree<Student>((a, b) => a.compareTo(b));
students.forEach(s => tree.insert(s));
console.log("Preorder traversal of tree:");
tree.preorderTraversal();
console.log("In-order traversal via iterator:");
for (const s of tree) {
    s.printInfo();
}
