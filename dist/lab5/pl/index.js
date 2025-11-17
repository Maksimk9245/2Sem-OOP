"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const FileStudentRepository_1 = require("../dal/FileStudentRepository");
const StudentService_1 = require("../bll/StudentService");
async function main() {
    const dataPath = (0, path_1.resolve)(__dirname, '../data/students.json');
    const repo = new FileStudentRepository_1.FileStudentRepository(dataPath);
    const service = new StudentService_1.StudentService(repo);
    const baseCity = 'Kyiv';
    const pct = await service.percentageOfFirstYearFromOtherCities(baseCity);
    console.log(`% 1-го курсу з інших міст (база=${baseCity}):`, pct);
    await service.assignDormRoomsForNonLocal(baseCity);
    console.log('Гуртожиток призначено для немісцевих.');
}
main().catch(err => {
    console.error(err);
    process.exit(1);
});
