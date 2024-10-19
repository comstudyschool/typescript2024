"use strict";
// example.js
// function add(a, b) {
//     return a + b;
// }
// function greet(name) {
//     return `Hello, ${name}!`;
// }
// 모듈로 내보내기
// module.exports = { add, greet };
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
exports.greet = greet;
// example.ts: 함수 정의 파일
function add(a, b) {
    return a + b;
}
function greet(name) {
    return `Hello, ${name}!`;
}
