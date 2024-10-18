# 04 제네릭

## **4.1 함수 시그니처 일반화하기**

제네릭을 사용하면 함수가 다양한 타입을 처리할 수 있습니다.

```tsx
function identity<T>(value: T): T {
  return value;
}
console.log(identity<string>("Hello"));  // "Hello"
console.log(identity<number>(42));       // 42

```

---

## **4.2 관련된 함수 인수 만들기**

여러 인수가 관련된 타입일 때 제네릭으로 연결합니다.

```tsx
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
const result = merge({ name: "Alice" }, { age: 25 });
console.log(result);  // { name: "Alice", age: 25 }

```

---

## **4.3 any와 unknown 제거하기**

제네릭을 사용해 타입 안전성을 유지합니다.

```tsx
function safeParse<T>(json: string): T | undefined {
  try {
    return JSON.parse(json) as T;
  } catch {
    return undefined;
  }
}
const data = safeParse<{ name: string }>('{"name": "Alice"}');
console.log(data?.name);  // "Alice"

```

---

## **4.4 제네릭 인스턴스화 이해하기**

제네릭 함수나 클래스에 타입을 명시적으로 전달해 인스턴스화합니다.

```tsx
class Box<T> {
  constructor(public value: T) {}
}
const numberBox = new Box<number>(123);
const stringBox = new Box<string>("TypeScript");
console.log(numberBox.value);  // 123
console.log(stringBox.value);  // "TypeScript"

```

---

## **4.5 새 객체 형식 생성하기**

타입 변환을 통해 새로운 객체 타입을 정의할 수 있습니다.

```tsx
type Nullable<T> = { [K in keyof T]: T[K] | null };
interface User {
  name: string;
  age: number;
}
const nullableUser: Nullable<User> = { name: null, age: 25 };

```

---

## **4.6 어서션 시그니처로 객체 변경하기**

타입 어서션을 사용해 객체 타입을 명시합니다.

```tsx
function processUser(user: unknown): User {
  return user as User;
}
interface User {
  name: string;
  age: number;
}
const user = processUser({ name: "Alice", age: 30 });
console.log(user.name);  // "Alice"

```

---

## **4.7 형식 맵을 이용한 매핑 형식 사용하기**

`keyof`와 `in`을 사용해 타입 내의 키를 변형합니다.

```tsx
type ReadOnly<T> = { readonly [K in keyof T]: T[K] };
interface Todo {
  title: string;
  completed: boolean;
}
const todo: ReadOnly<Todo> = { title: "Learn TypeScript", completed: false };
// todo.title = "New Title";  // 오류: ReadOnly 타입은 수정 불가

```

---

## **4.8 `ThisType`으로 객체의 `this` 정의하기**

`ThisType`으로 객체 메서드 내부에서 `this`의 타입을 정의합니다.

```tsx
interface App {
  title: string;
  init(this: App): void;
}
const app: App = {
  title: "My App",
  init() {
    console.log(`Initializing ${this.title}`);
  },
};
app.init();  // "Initializing My App"

```

---

## **4.9 제네릭 형식 매개변수에 const 컨텍스트 추가하기**

`as const`를 사용해 제네릭 타입을 고정합니다.

```tsx
function createPair<T extends readonly [unknown, unknown]>(pair: T) {
  return pair;
}
const fixedPair = createPair(["hello", 42] as const);
// fixedPair[0] = "world";  // 오류: const로 고정된 값은 수정 불가

```

---

이 예제를 직접 실행해보면서 제네릭의 사용법과 다양한 활용 방법을 익혀보세요. 제네릭은 타입스크립트의 강력한 도구이므로, 실무에서 다양한 상황에 적용해보는 것이 좋습니다.