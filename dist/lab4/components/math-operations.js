"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathOperations = void 0;
class MathOperations {
    constructor() {
        this.integerDivisionHandlers = [];
    }
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divideInt(a, b) {
        if (b === 0)
            throw new Error("На 0 неможливо!");
        const quotient = Math.trunc(a / b);
        const remainder = a % b;
        const isExact = remainder === 0;
        const args = {
            dividend: a, divisor: b, quotient, remainder, isExact, timestamp: new Date()
        };
        this.emitIntegerDivision(args);
        return quotient;
    }
    onIntegerDivision(handler) {
        this.integerDivisionHandlers.push(handler);
    }
    offIntegerDivision(handler) {
        this.integerDivisionHandlers = this.integerDivisionHandlers.filter(h => h !== handler);
    }
    emitIntegerDivision(args) {
        for (const handler of this.integerDivisionHandlers) {
            handler(this, args);
        }
    }
}
exports.MathOperations = MathOperations;
