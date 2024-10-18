# 09 표준 라이브러리 및 외부 형식 정의

## **9.1 `Object.keys`로 객체 반복하기**

`Object.keys()`를 사용하면 객체의 키를 배열로 가져올 수 있습니다.

```tsx
const person = { name: "Alice", age: 30 };
Object.keys(person).forEach((key) => {
  console.log(`${key}: ${person[key as keyof typeof person]}`);
});

```

- **설명**: 키의 타입을 `keyof`를 사용해 안전하게 처리합니다.

---

## **9.2 형식 어서션과 `unknown`으로 안전하지 않은 동작을 명시적으로 표시하기**

`unknown` 타입은 안전하게 사용하기 위해 반드시 타입 검사가 필요합니다.

```tsx
function processValue(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.error("Invalid value");
  }
}

```

- **설명**: 어서션을 남용하는 대신, 타입 검사를 통해 안전하게 동작을 처리합니다.

---

## **9.3 `defineProperty` 사용하기**

`Object.defineProperty`로 객체에 속성을 정의할 수 있습니다.

```tsx
const obj: { [key: string]: any } = {};
Object.defineProperty(obj, "name", {
  value: "Alice",
  writable: false,
  enumerable: true,
});
console.log(obj.name);  // "Alice"

```

- **설명**: `defineProperty`는 속성의 가시성 및 변경 가능 여부를 제어합니다.

---

## **9.4 `Array.prototype.includes`의 형식 확장하기**

`includes()`는 배열에 특정 요소가 포함되어 있는지 검사합니다.

```tsx
const fruits = ["apple", "banana", "orange"];
const hasBanana: boolean = fruits.includes("banana");
console.log(hasBanana);  // true

```

- **설명**: 타입스크립트는 `includes` 메서드를 통해 값이 배열에 존재하는지를 검사할 때 타입 안전성을 제공합니다.

---

## **9.5 널 종류의 값 거르기**

널과 정의되지 않은 값을 걸러내는 유틸리티를 만들 수 있습니다.

```tsx
const values = [1, null, 2, undefined, 3];
const filteredValues = values.filter((v): v is number => v != null);
console.log(filteredValues);  // [1, 2, 3]

```

- **설명**: `v is number`를 통해 타입 가드를 정의합니다.

---

## **9.6 모듈 확장하기**

모듈을 확장하면 기존 모듈에 새 기능을 추가할 수 있습니다.

```tsx
// mathUtils.ts
export function square(x: number): number {
  return x * x;
}

// app.ts
import * as MathUtils from "./mathUtils";
console.log(MathUtils.square(3));  // 9

```

- **설명**: 확장된 모듈을 다른 파일에서 불러와 사용할 수 있습니다.

---

## **9.7 전역 네임스페이스에 추가하기**

전역 객체에 새로운 속성을 추가하려면 타입 선언을 확장합니다.

```tsx
declare global {
  interface Window {
    myCustomProperty: string;
  }
}
window.myCustomProperty = "Hello!";
console.log(window.myCustomProperty);  // "Hello!"

```

- **설명**: `declare global`로 전역 네임스페이스를 확장합니다.

---

## **9.8 자바스크립트가 아닌 모듈을 모듈 그래프로 추가하기**

타입스크립트에서는 CSS와 같은 비코드 모듈도 가져올 수 있도록 설정할 수 있습니다.

```tsx
// import-css.d.ts
declare module "*.css";

// app.ts
import styles from "./styles.css";
console.log(styles);

```

- **설명**: CSS와 같은 모듈을 가져오기 위해 타입 선언 파일을 작성합니다.

---

이 예제들을 따라 실습하면서 **객체 및 배열 조작, 전역 네임스페이스 확장, 그리고 외부 모듈 처리** 등을 익혀보세요. 이러한 기술들은 복잡한 애플리케이션을 개발할 때 유용하게 활용됩니다.