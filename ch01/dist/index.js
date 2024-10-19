"use strict";
// const { add, greet } = require('./example');
Object.defineProperty(exports, "__esModule", { value: true });
// example.ts에서 함수 불러오기
const example_1 = require("./example");
// 함수 호출 및 결과 출력
console.log((0, example_1.add)(2, 3)); // 5
console.log((0, example_1.greet)('Alice')); // Hello, Alice!
// console.log(add(1, "2"));  // 오류 발생: 타입 불일치
// utils 모듈에서 함수 가져오기
const utils_1 = require("./utils");
// 숫자 배열 정의
const numbers = [1, 2, 3, 4];
// 배열을 섞고 결과를 출력
console.log((0, utils_1.shuffleArray)(numbers)); // [무작위 배열]
