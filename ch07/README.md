# 07 가변 튜플 형식

## **7.1 `concat` 함수 형식화하기**

튜플의 두 배열을 결합할 때 타입 안전성을 보장하는 `concat` 함수를 정의합니다.

```tsx
function concat<T extends any[], U extends any[]>(arr1: T, arr2: U): [...T, ...U] {
  return [...arr1, ...arr2];
}

const result = concat([1, 2], ["a", "b"]);
console.log(result);  // [1, 2, "a", "b"]

```

- **설명**: `T`와 `U`는 배열 형식이며, 결합된 결과는 `[...T, ...U]` 형식으로 처리됩니다.

---

## **7.2 `promisify` 함수 형식화하기**

비동기 작업을 처리하기 위해 콜백 기반 함수를 `Promise` 기반으로 변환합니다.

```tsx
type Callback<T> = (error: Error | null, result: T) => void;

function promisify<T>(fn: (cb: Callback<T>) => void): () => Promise<T> {
  return () =>
    new Promise((resolve, reject) => {
      fn((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
}

// 사용 예제
const asyncFunction = promisify((cb) => cb(null, "Success"));
asyncFunction().then(console.log);  // "Success"

```

---

## **7.3 `curry` 함수 형식화하기**

`curry` 함수는 다중 인수 함수를 부분 적용합니다.

```tsx
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a) => (b) => fn(a, b);
}

const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2));  // 3

```

---

## **7.4 유연한 `curry` 함수 형식화하기**

가변 인수를 처리할 수 있는 유연한 `curry` 함수입니다.

```tsx
function flexibleCurry<T extends any[], R>(fn: (...args: T) => R) {
  return function curried(...args: Partial<T>) {
    if (args.length >= fn.length) {
      return fn(...(args as T));
    }
    return (...next: Partial<T>) => curried(...args, ...next);
  };
}

const addThree = (a: number, b: number, c: number) => a + b + c;
const curriedAddThree = flexibleCurry(addThree);
console.log(curriedAddThree(1)(2)(3));  // 6

```

---

## **7.5 가장 단순한 `curry` 함수 형식화하기**

```tsx
function simpleCurry<T, U>(fn: (arg: T) => U) {
  return (arg: T) => fn(arg);
}

const greet = (name: string) => `Hello, ${name}!`;
const curriedGreet = simpleCurry(greet);

console.log(curriedGreet("Alice"));  // "Hello, Alice!"

```

- **설명**: 가장 기본적인 형태의 `curry` 함수로 하나의 인수를 받습니다.

---

## **7.6 튜플로 열거형 만들기**

튜플에서 가능한 값을 사용해 열거형 타입을 정의합니다.

```tsx
const fruits = ["apple", "banana", "orange"] as const;
type Fruit = (typeof fruits)[number];

const myFruit: Fruit = "apple";  // 올바른 값
// const wrongFruit: Fruit = "pear";  // 오류 발생

```

---

## **7.7 함수 시그니처의 모든 요소 분할하기**

튜플을 이용해 함수 인수의 시그니처를 분리합니다.

```tsx
type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never;

function exampleFunction(a: number, b: string): void {}
type Args = ArgumentsType<typeof exampleFunction>;  // [number, string]

```

---

이 예제를 통해 **가변 튜플**을 사용하는 다양한 방법을 실습할 수 있습니다. 가변 튜플을 통해 복잡한 함수 인수를 처리하거나, 가변 인수 함수를 구현하는 법을 익히는 것은 실무에서 매우 유용합니다.