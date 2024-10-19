// example.js
// function add(a, b) {
//     return a + b;
// }
// function greet(name) {
//     return `Hello, ${name}!`;
// }
// 모듈로 내보내기
// module.exports = { add, greet };


// example.ts: 함수 정의 파일
export function add(a: number, b: number): number {
    return a + b;
  }
  
  export function greet(name: string): string {
    return `Hello, ${name}!`;
  }
  