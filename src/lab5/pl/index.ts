import { resolve } from 'path'
import { FileStudentRepository } from '../dal/FileStudentRepository'
import { StudentService } from '../bll/StudentService'

async function main() {
    const dataPath = resolve(__dirname, '../data/students.json')

    const repo = new FileStudentRepository(dataPath)
    const service = new StudentService(repo)

    const baseCity = 'Kyiv'

    const pct = await service.percentageOfFirstYearFromOtherCities(baseCity)
    console.log(`% 1-го курсу з інших міст (база=${baseCity}):`, pct)

    await service.assignDormRoomsForNonLocal(baseCity)
    console.log('Гуртожиток призначено для немісцевих.')
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
