import readline from "readline";
import { Book } from "../../core/models/Book";
import { EntityService } from "../../core/services/EntityService";
import { EntityContext } from "../../data/context/EntityContext";
import { JsonProvider } from "../../data/providers/JsonProvider";

export class Menu {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    private service: EntityService;

    constructor() {
        const context = new EntityContext(new JsonProvider());
        this.service = new EntityService(context);
    }

    private ask(question: string): Promise<string> {
        return new Promise((res) => this.rl.question(question, res));
    }

    async mainMenu(): Promise<void> {
        while (true) {
            console.log(`
====== 📚 МЕНЮ ======
1. Додати 4 книги
2. Показати всі книги
3. Підвищити ціну на %
4. Порахувати загальну вартість тиражу
5. Зберегти у файл (JSON)
6. Завантажити з файлу (JSON)
0. Вихід
=====================
      `);

            const choice = await this.ask("Виберіть пункт: ");

            switch (choice.trim()) {
                case "1":
                    await this.addBooks();
                    break;
                case "2":
                    this.showBooks();
                    break;
                case "3":
                    await this.raisePrice();
                    break;
                case "4":
                    console.log(`Загальна вартість: ${this.service.getTotalValue().toFixed(2)} грн`);
                    break;
                case "5":
                    await this.service.save("books.json");
                    console.log("✅ Дані збережено у books.json");
                    break;
                case "6":
                    await this.service.load("books.json");
                    console.log("📂 Дані завантажено з books.json");
                    break;
                case "0":
                    this.rl.close();
                    return;
                default:
                    console.log("Невірний вибір");
            }
        }
    }

    private async addBooks() {
        for (let i = 0; i < 4; i++) {
            const serial = await this.ask(`Серійний номер [${i + 1}]: `);
            const title = await this.ask("Назва книги: ");
            const year = parseInt(await this.ask("Рік видання: "));
            const price = parseFloat(await this.ask("Ціна: "));
            const count = parseInt(await this.ask("Кількість примірників: "));

            this.service.add(new Book(serial, title, year, price, count));
        }
        console.log("✅ 4 книги додано.");
    }

    private showBooks() {
        const books = this.service.list();
        if (books.length === 0) console.log("Список порожній.");
        else books.forEach((b: Book) => console.log(b.toDisplayString()));
    }

    private async raisePrice() {
        const serial = await this.ask("Введіть серійний номер: ");
        const percent = parseFloat(await this.ask("На скільки % підвищити ціну: "));
        try {
            this.service.increasePrice(serial, percent);
            console.log("✅ Ціну оновлено.");
        } catch (e: any) {
            console.log("❌ Помилка:", e.message);
        }
    }
}

