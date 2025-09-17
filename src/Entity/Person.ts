export abstract class Person {
    constructor(public firstname: string, public lastname: string) {}

    get name(): string {
        return (this.firstname + this.lastname).replace(/\s+/g, "");
    }

    abstract toRecordLines(): string[];
}
