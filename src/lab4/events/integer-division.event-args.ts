export interface IntegerDivisionEventArgs {
    dividend: number;
    divisor: number;
    quotient: number;
    remainder: number;
    isExact: boolean;
    timestamp: Date;
}
