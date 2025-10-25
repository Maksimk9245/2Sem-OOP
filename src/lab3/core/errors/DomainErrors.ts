export class InvalidPercentError extends Error {
    constructor() {
        super("Відсоток не може бути від’ємним");
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}
