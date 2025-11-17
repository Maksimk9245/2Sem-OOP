"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCourse = isValidCourse;
exports.isValidPassport = isValidPassport;
function isValidCourse(c) {
    return Number.isInteger(c) && c >= 1 && c <= 6;
}
function isValidPassport(p) {
    return /^[A-Z]{2}$/.test(p.series.trim().toUpperCase()) && /^\d{6}$/.test(p.number.trim());
}
