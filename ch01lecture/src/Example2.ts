// Example2.ts
// typescript에서는 모듈 선언 시 export 사용해서 모듈 선언.
// 사용하는 페이지에서는 import로 사용.
export function add(a:number, b:number) {
    return a + b;
}

export function greet(name:string) {
    return `Hello, ${name}`;
}
