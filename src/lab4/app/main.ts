import { countAnonymous, countLambda } from "../delegates/countOccurences.delegate";
import { MathOperations } from "../components/math-operations";
import { IntegerDivisionEventArgs } from "../events/integer-division.event-args";

console.log("Анонімний метод:", countAnonymous("hello world", "l"));
console.log("Лямбда:", countLambda("abracadabra", "a"));

function onDivide(sender: MathOperations, args: IntegerDivisionEventArgs): void {
    console.log(
        `➡️ Целочисленное деление выполнено\nДелимое: ${args.dividend}, Делитель: ${args.divisor}\nРезультат: ${args.quotient}, Остаток: ${args.remainder}\nТочное деление: ${args.isExact}\nВремя: ${args.timestamp.toLocaleTimeString()}\n`
    );
}

const math = new MathOperations();
math.onIntegerDivision(onDivide);
math.divideInt(10, 3);
math.divideInt(9, 3);
math.offIntegerDivision(onDivide);
math.divideInt(15, 4);
