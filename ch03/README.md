# 03 형식 시스템

## **3.1 유니온 형식과 인터섹션 형식으로 데이터 모델링하기**

- **유니온 형식**: 여러 타입 중 하나를 허용합니다.
- **인터섹션 형식**: 여러 타입을 모두 만족해야 합니다.

```tsx
type Admin = { role: string };
type User = { name: string; age: number };

// 유니온: Admin 또는 User 중 하나
type Person = Admin | User;
const person1: Person = { name: "Alice", age: 25 };

// 인터섹션: Admin과 User 모두 만족
type SuperUser = Admin & User;
const person2: SuperUser = { role: "Admin", name: "Alice", age: 25 };

```

---

## **3.2 구별된 유니온 형식을 활용해 명시적으로 모델 정의하기**

구별된 유니온은 공통 속성을 통해 타입을 구별합니다.

```tsx
type Cat = { kind: "cat"; meow: () => void };
type Dog = { kind: "dog"; bark: () => void };

function makeSound(animal: Cat | Dog) {
  if (animal.kind === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }
}

```

---

## **3.3 `assertNever` 함수를 이용해 완전 검사하기**

`assertNever`는 타입이 예상치 못한 값일 때 오류를 발생시킵니다.

```tsx
type Animal = Cat | Dog | { kind: "bird" };

function handleAnimal(animal: Animal): void {
  switch (animal.kind) {
    case "cat":
      animal.meow();
      break;
    case "dog":
      animal.bark();
      break;
    default:
      assertNever(animal);  // 모든 케이스가 처리되지 않으면 오류 발생
  }
}

function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}

```

---

## **3.4 `const` 컨텍스트로 형식 고정하기**

`as const`는 상수 값을 고정합니다.

```tsx
const point = { x: 10, y: 20 } as const;
// point.x = 15;  // 오류: 수정 불가

```

---

## **3.5 형식 찬반형으로 형식 좁히기**

조건문을 이용해 타입을 좁힙니다.

```tsx
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(`String: ${value}`);
  } else {
    console.log(`Number: ${value}`);
  }
}

```

---

## **3.6 `void` 이해하기**

`void`는 함수가 값을 반환하지 않을 때 사용됩니다.

```tsx
function logMessage(message: string): void {
  console.log(message);
}

```

---

## **3.7 `catch` 구문으로 오류 형식 처리하기**

`catch` 구문에서 오류의 타입을 명시합니다.

```tsx
try {
  throw new Error("Something went wrong");
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

```

---

## **3.8 선택형 `never`로 배타적 논리합 모델 만들기**

```tsx
type XOR<T, U> = (T | U) extends object
  ? (T & { [K in keyof U]?: never }) | (U & { [K in keyof T]?: never })
  : T | U;

type A = { a: string };
type B = { b: string };
const value: XOR<A, B> = { a: "only A" };  // A 또는 B만 허용

```

---

## **3.9 형식 어서션 효과적으로 사용하기**

형식 어서션으로 컴파일러에게 타입을 알려줍니다.

```tsx
const someValue: unknown = "hello";
const strLength: number = (someValue as string).length;

```

---

## **3.10 인덱스 시그니처 사용하기**

동적으로 키를 갖는 객체를 정의합니다.

```tsx
interface StringMap {
  [key: string]: string;
}
const obj: StringMap = { key1: "value1", key2: "value2" };

```

---

## **3.11 빠진 프로퍼티와 `undefined` 값 구별하기**

선택적 프로퍼티는 정의되지 않을 수 있습니다.

```tsx
interface Person {
  name: string;
  age?: number;
}

const person: Person = { name: "Alice" };
console.log(person.age);  // undefined

```

---

## **3.12 열거형 사용하기**

열거형(Enum)을 사용해 상수 집합을 정의합니다.

```tsx
enum Direction {
  Up = "UP",
  Down = "DOWN",
}
const dir: Direction = Direction.Up;

```

---

## **3.13 구조적 형식 시스템에 명목상 형식 정의하기**

명목적 형식은 값보다 타입을 엄격히 구분합니다.

```tsx
type Brand<K, T> = K & { __brand: T };
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

const amount1: USD = 10 as USD;
const amount2: EUR = 10 as EUR;
// amount1 = amount2;  // 오류: 서로 다른 명목상 타입

```

---

## **3.14 문자열 하위 집합의 느슨한 자동 완성 활성화하기**

리터럴 타입을 통해 문자열 집합을 제한합니다.

```tsx
type Fruit = "apple" | "banana" | "orange";
let myFruit: Fruit = "apple";  // 자동 완성 제공됨

```

---

이 예제들을 직접 실행해보면서 타입스크립트의 다양한 형식 시스템을 익혀보세요. 실무에서 자주 사용되는 기법들이므로 각 주제를 꼼꼼히 이해해두면 좋습니다.