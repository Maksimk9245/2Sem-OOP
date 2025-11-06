import { MathOperations } from "../components/math-operations";
import { IntegerDivisionEventArgs } from "./integer-division.event-args";

export type IntegerDivisionHandler = (sender: MathOperations, args: IntegerDivisionEventArgs) => void;
