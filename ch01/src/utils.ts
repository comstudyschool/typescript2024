// utils.ts: 유틸리티 함수 정의
import _ from 'lodash';

// 숫자 배열을 무작위로 섞는 함수
export function shuffleArray(arr: number[]): number[] {
  return _.shuffle(arr);
}