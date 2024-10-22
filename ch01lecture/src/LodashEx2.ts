import * as _  from 'lodash';

const numbers: number[] = [1,2,3,4,5,6];

// 배열의 내용 요소를 섞어서 새 배열로 반환
const newArr = _.shuffle(numbers);

console.log(newArr);