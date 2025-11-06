import { IntegerDivisionEventArgs } from "../events/integer-division.event-args";
import type { IntegerDivisionHandler } from "../events/integer-division.handler";

export class MathOperations {
    private integerDivisionHandlers: IntegerDivisionHandler[] = [];

    add(a: number, b: number): number { return a + b; }
    subtract(a: number, b: number): number { return a - b; }
    multiply(a: number, b: number): number { return a * b; }

    divideInt(a: number, b: number): number {
        if (b === 0) throw new Error("На 0 неможливо!");
        const quotient = Math.trunc(a / b);
        const remainder = a % b;
        const isExact = remainder === 0;
        const args: IntegerDivisionEventArgs = {
            dividend: a, divisor: b, quotient, remainder, isExact, timestamp: new Date()
        };
        this.emitIntegerDivision(args);
        return quotient;
    }

    onIntegerDivision(handler: IntegerDivisionHandler): void {
        this.integerDivisionHandlers.push(handler);
    }

    offIntegerDivision(handler: IntegerDivisionHandler): void {
        this.integerDivisionHandlers = this.integerDivisionHandlers.filter(h => h !== handler);
    }

    private emitIntegerDivision(args: IntegerDivisionEventArgs): void {
        for (const handler of this.integerDivisionHandlers) {
            handler(this, args);
        }
    }
}
