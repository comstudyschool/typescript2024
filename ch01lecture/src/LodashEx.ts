// SuffleEx.js

// 타입추론 : 들어오는 데이터의 타입에 의해 변수의 타입이 결정 된다.
// const numbers =  [1,2,30,40,500];
// console.log(typeof numbers);
// console.log(numbers instanceof Array);

// 타입스크립트는 후위 콜론 방식으로 타입 지정.
// 후위콜론 방식의 타입 선언은 ECMAScript 계통의 특징.

// JS에서 권장하는 방식은 []
const numbers: number[] = [1,2,30,40,500]; // 리터럴
// const numbers2: Array<number> = [1,2,30,40,500]; // 리터럴

// 배열의 순서를 무작위로 섞어주기
// 랜덤을 이용해서 배열 요소의 위치를 랜덤하게 섞어준다.
function shuffle (numbers) {
    for(let i=0; i<500; i++) {
        let index1 = Math.floor(Math.random()*numbers.length);
        let index2 = Math.floor(Math.random()*numbers.length);
        let temp = numbers[index1];
        numbers[index1] = numbers[index2];
        numbers[index2] = temp;
    }
    return numbers;
}

console.log( shuffle(numbers) );