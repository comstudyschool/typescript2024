# 02 기본형

## **2.1 애너테이션 효과적으로 사용하기**

타입 애너테이션은 변수나 함수의 매개변수에 명시적으로 타입을 지정하는 방법입니다.

```tsx
let age: number = 30;
function greet(name: string): string {
  return `Hello, ${name}`;
}
console.log(greet("Alice"));

```

- 필요할 때만 애너테이션을 사용하고, 타입 추론을 최대한 활용하는 것이 좋습니다.

---

## **2.2 any와 unknown 활용하기**

- **`any`**: 어떤 타입이든 허용되며 타입 검사를 무시합니다.
- **`unknown`**: 타입을 알 수 없을 때 사용하며, 사용 전 타입 체크가 필요합니다.

```tsx
let data: any = "text";  // 자유롭게 사용 가능
let input: unknown;

input = 42;
if (typeof input === "number") {
  console.log(input + 10);  // 타입 체크 필요
}

```

---

## **2.3 올바른 객체 선택하기**

- 객체를 정의할 때는 **`object`**, **`{}`** 등을 구분해 사용합니다.

```tsx
let obj1: object = { name: "Alice" };  // 제한된 사용
let obj2: { name: string; age: number } = { name: "Bob", age: 25 };  // 세부 타입 정의

```

---

## **2.4 튜플 형식 사용하기**

튜플은 고정된 길이와 타입을 갖는 배열입니다.

```tsx
let tuple: [string, number];
tuple = ["Alice", 30];
console.log(tuple[0].toUpperCase());  // "ALICE"

```

---

## **2.5 인터페이스와 형식 별칭의 차이 이해하기**

- **인터페이스**는 객체의 구조를 정의하며, 확장이 가능합니다.
- *형식 별칭(type)**은 모든 타입을 정의할 수 있습니다.

```tsx
interface Person {
  name: string;
  age: number;
}

type Employee = Person & { role: string };
const emp: Employee = { name: "Alice", age: 30, role: "Developer" };

```

---

## **2.6 함수 오버로드 정의하기**

같은 함수 이름으로 여러 시그니처를 정의할 수 있습니다.

```tsx
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}
console.log(add(1, 2));  // 3
console.log(add("Hello, ", "World!"));  // "Hello, World!"

```

---

## **2.7 this 매개변수의 형식 정의하기**

`this`를 함수의 매개변수로 지정해 타입을 정의할 수 있습니다.

```tsx
interface User {
  name: string;
  greet(this: User): void;
}

const user: User = {
  name: "Alice",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

user.greet();  // "Hello, Alice"

```

---

## **2.8 심볼 사용하기**

`Symbol`은 고유한 식별자를 생성합니다. 주로 객체의 키로 사용됩니다.

```tsx
const uniqueKey = Symbol("key");
let obj = {
  [uniqueKey]: "value",
};
console.log(obj[uniqueKey]);  // "value"

```

---

## **2.9 값과 형식 네임스페이스 이해하기**

TypeScript에서는 값과 형식을 각각 네임스페이스로 구분합니다.

```tsx
interface User {
  name: string;
  age: number;
}

const User = {
  create(name: string, age: number): User {
    return { name, age };
  },
};

const newUser = User.create("Alice", 30);
console.log(newUser);  // { name: 'Alice', age: 30 }

```

---

이 자료를 따라하며 실습하면 타입스크립트의 기본 개념을 더 깊이 이해할 수 있습니다. 각각의 주제는 실무에서 자주 사용되므로 다양한 조합과 예제를 통해 익숙해지는 것이 중요합니다.