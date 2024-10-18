# 08 헬퍼 형식

## **8.1 특정 프로퍼티를 선택형으로 설정하기**

`Partial<T>` 헬퍼 타입을 사용해 객체의 모든 속성을 선택적으로 만듭니다.

```tsx
interface Person {
  name: string;
  age: number;
}
const optionalPerson: Partial<Person> = { name: "Alice" };

```

- **설명**: `Partial<T>`는 모든 프로퍼티를 선택형(`?`)으로 설정합니다.

---

## **8.2 중첩된 객체 바꾸기**

중첩된 객체에 대해 재귀적으로 `Partial`을 적용하려면 사용자 정의 헬퍼가 필요합니다.

```tsx
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
interface NestedPerson {
  name: string;
  address: {
    street: string;
    city: string;
  };
}
const nestedPerson: DeepPartial<NestedPerson> = { address: { city: "Seoul" } };

```

- **설명**: `DeepPartial`은 객체 내부의 중첩된 객체까지 선택형으로 처리합니다.

---

## **8.3 형식 재매핑하기**

`Mapped Types`를 사용하면 기존 객체 타입을 변형할 수 있습니다.

```tsx
type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};
interface Person {
  name: string;
  age: number;
}
const person: UpperCaseKeys<Person> = { NAME: "Alice", AGE: 25 };

```

- **설명**: 키를 대문자로 변경하는 형식을 정의했습니다.

---

## **8.4 모든 필수 키 얻기**

`Required<T>`를 사용해 선택형 프로퍼티를 필수로 변경합니다.

```tsx
interface Person {
  name?: string;
  age?: number;
}
const requiredPerson: Required<Person> = { name: "Alice", age: 30 };

```

- **설명**: 모든 프로퍼티가 필수로 바뀝니다.

---

## **8.5 최소한 한 개의 프로퍼티 허용하기**

`Partial`로 모든 프로퍼티가 선택적일 때 최소 한 개의 프로퍼티를 강제합니다.

```tsx
type AtLeastOne<T> = {
  [K in keyof T]: Pick<T, K>;
}[keyof T];
type Person = AtLeastOne<{ name: string; age: number }>;
const person: Person = { name: "Alice" };  // 최소 하나의 필드 필요

```

---

## **8.6 정확히 한 개 허용, 모두 허용, 아무것도 허용하지 않기**

`XOR` 타입을 구현하여 두 집합에서 하나만 선택할 수 있도록 만듭니다.

```tsx
type XOR<T, U> = (T | U) extends object
  ? (T & { [K in keyof U]?: never }) | (U & { [K in keyof T]?: never })
  : T | U;
type A = { a: string };
type B = { b: string };
const validXor: XOR<A, B> = { a: "only A" };  // 둘 중 하나만 허용

```

---

## **8.7 유니온을 인터섹션 형식으로 변환하기**

유니온 타입을 인터섹션으로 변환하기 위해 조건부 타입을 사용합니다.

```tsx
type UnionToIntersection<U> =
  (U extends any ? (arg: U) => void : never) extends (arg: infer I) => void
    ? I
    : never;

type A = { a: string };
type B = { b: number };
type Intersection = UnionToIntersection<A | B>;  // { a: string } & { b: number }

```

---

## **8.8 `type-fest` 사용하기**

`type-fest`는 자주 쓰이는 헬퍼 타입들을 모아둔 라이브러리입니다.

```bash
npm install type-fest

```

```tsx
import { Except } from "type-fest";

type Person = { name: string; age: number; location: string };
type WithoutLocation = Except<Person, "location">;

const person: WithoutLocation = { name: "Alice", age: 25 };

```

- **설명**: `Except<T, K>`는 `T`에서 특정 키 `K`를 제거한 타입을 반환합니다.

---

이 예제들을 통해 다양한 헬퍼 타입의 사용법과 실무 적용 방식을 익힐 수 있습니다. **헬퍼 타입**은 코드의 재사용성과 유지보수를 향상시켜 대규모 프로젝트에서 매우 유용합니다.