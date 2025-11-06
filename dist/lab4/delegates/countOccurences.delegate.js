"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countLambda = exports.countAnonymous = void 0;
const countAnonymous = function (text, ch) {
    let count = 0;
    for (const c of text)
        if (c === ch)
            count++;
    return count;
};
exports.countAnonymous = countAnonymous;
const countLambda = (text, ch) => [...text].filter(c => c === ch).length;
exports.countLambda = countLambda;
