"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.InvalidPercentError = void 0;
class InvalidPercentError extends Error {
    constructor() {
        super("Відсоток не може бути від’ємним");
    }
}
exports.InvalidPercentError = InvalidPercentError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
