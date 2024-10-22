// __tests__/sum.test.ts
import { sum } from '../src/sum';

// '1 + 2 = 3'이 되는지 테스트합니다.
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);  // 예상 결과와 일치하는지 확인합니다.
});
