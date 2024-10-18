# 05 조건부

## **5.1 복잡한 함수 시그니처 관리하기**

조건부 형식으로 함수 시그니처를 유연하게 관리할 수 있습니다. 예를 들어, 매개변수 타입에 따라 반환 타입을 다르게 정의할 수 있습니다.

```tsx
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function func1(): string {
  return "hello";
}
type Func1Return = ReturnType<typeof func1>;  // string

```

- `infer` 키워드를 사용해 반환 타입을 추론합니다.

---

## **5.2 `never`로 거르기**

`never`는 발생할 수 없는 상태를 나타냅니다. 주로 유효하지 않은 조건을 걸러내는 데 사용합니다.

```tsx
type ExcludeType<T, U> = T extends U ? never : T;
type Result = ExcludeType<"a" | "b" | "c", "a">;  // "b" | "c"

```

- `"a"`는 제외되므로 결과는 `"b" | "c"`입니다.

---

## **5.3 `kind`로 요소 그룹화하기**

구별된 유니온과 `kind` 속성을 활용해 요소를 그룹화할 수 있습니다.

```tsx
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

const area = getArea({ kind: "circle", radius: 10 });
console.log(area);  // 314.159...

```

- `kind` 속성으로 타입을 구분하여 조건에 맞게 처리합니다.

---

## **5.4 특정 객체 프로퍼티 삭제하기**

`Omit` 유틸리티 타입을 사용하면 객체의 특정 속성을 제외한 타입을 만들 수 있습니다.

```tsx
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonWithoutAddress = Omit<Person, "address">;

const person: PersonWithoutAddress = {
  name: "Alice",
  age: 30,
};

```

- `"address"` 속성을 제외한 객체 타입이 생성됩니다.

---

## **5.5 조건식에서 형식 추론하기**

조건부 타입을 활용해 특정 조건에 따라 타입을 추론할 수 있습니다.

```tsx
type IsString<T> = T extends string ? "It's a string" : "It's not a string";

type Test1 = IsString<string>;  // "It's a string"
type Test2 = IsString<number>;  // "It's not a string"

```

- 매개변수 타입에 따라 반환되는 문자열 리터럴 타입이 다릅니다.

---

이 예제를 통해 조건부 형식의 사용법과 활용 사례를 익혀보세요. 조건부 타입은 복잡한 타입을 유연하게 처리할 수 있어, 특히 대규모 프로젝트에서 강력한 도구가 됩니다.