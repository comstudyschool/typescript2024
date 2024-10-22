import * as _  from 'lodash';

export function shuffleArray(numbers: number[]): number[] {
    const newArr = _.shuffle(numbers);
    return newArr;
}