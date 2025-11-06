"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countOccurences_delegate_1 = require("../delegates/countOccurences.delegate");
const math_operations_1 = require("../components/math-operations");
console.log("Анонімний метод:", (0, countOccurences_delegate_1.countAnonymous)("hello world", "l"));
console.log("Лямбда:", (0, countOccurences_delegate_1.countLambda)("abracadabra", "a"));
function onDivide(sender, args) {
    console.log(`➡️ Целочисленное деление выполнено\nДелимое: ${args.dividend}, Делитель: ${args.divisor}\nРезультат: ${args.quotient}, Остаток: ${args.remainder}\nТочное деление: ${args.isExact}\nВремя: ${args.timestamp.toLocaleTimeString()}\n`);
}
const math = new math_operations_1.MathOperations();
math.onIntegerDivision(onDivide);
math.divideInt(10, 3);
math.divideInt(9, 3);
math.offIntegerDivision(onDivide);
math.divideInt(15, 4);
