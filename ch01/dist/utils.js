"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = shuffleArray;
// utils.ts: 유틸리티 함수 정의
const lodash_1 = __importDefault(require("lodash"));
// 숫자 배열을 무작위로 섞는 함수
function shuffleArray(arr) {
    return lodash_1.default.shuffle(arr);
}
