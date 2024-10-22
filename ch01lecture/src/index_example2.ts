import {add, greet} from './Example2';

// 타입 체크를 하기 때문에 문제가 있는 부분을 미리 알려 준다.
// 컴파일 하면 오류 발생
//console.log( add() );
//console.log( add(10) );
console.log( add(10, 20) );
//console.log( add(10, 20, 30) );
// console.log( add("Hello ", "world") );
// console.log( add("Hello ", 100) );

console.log( greet("이순신") );
//console.log( greet(1000) );
//console.log( greet(["이순신", 30]) );