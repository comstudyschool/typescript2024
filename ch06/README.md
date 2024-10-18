# 06 문자열 템플릿 리터럴 형식

## **6.1 사용자 정의 이벤트 시스템 정의하기**

템플릿 리터럴을 활용해 사용자 정의 이벤트 시스템을 구현할 수 있습니다.

```tsx
type EventNames = "click" | "hover" | "focus";

type EventHandler<E extends EventNames> = (event: E) => void;

function handleEvent<E extends EventNames>(eventName: E, handler: EventHandler<E>) {
  console.log(`Handling ${eventName} event`);
  handler(eventName);
}

handleEvent("click", (e) => console.log(`${e} event triggered`));

```

- **설명**: 이벤트 이름을 제한된 문자열 집합으로 정의해 특정 이벤트만 처리할 수 있습니다.

---

## **6.2 문자열 조작 형식과 키 매핑으로 이벤트 콜백 만들기**

템플릿 리터럴로 문자열 조작을 활용하여 키를 매핑합니다.

```tsx
type Prefix<T extends string> = `on${Capitalize<T>}`;

type Events = "click" | "hover";
type PrefixedEvents = Prefix<Events>;  // "onClick" | "onHover"

```

- **설명**: 이와 같은 매핑은 코드의 일관성을 높이고 실수를 방지합니다.

---

## **6.3 포맷 함수 구현하기**

템플릿 리터럴을 사용해 문자열 포맷 함수를 구현할 수 있습니다.

```tsx
function formatString(template: string, ...args: string[]): string {
  return template.replace(/{(\\d+)}/g, (_, index) => args[+index] || "");
}

const result = formatString("Hello, {0}! You have {1} new messages.", "Alice", "5");
console.log(result);  // "Hello, Alice! You have 5 new messages."

```

---

## **6.4 포맷 매개변수 형식 추출하기**

포맷 문자열의 매개변수를 타입으로 추출할 수 있습니다.

```tsx
type ExtractPlaceholder<S extends string> = S extends `${infer _Start}{${infer Param}}${infer _End}`
  ? Param
  : never;

type Param = ExtractPlaceholder<"Hello, {name}">;  // "name"

```

---

## **6.5 재귀 한계 처리하기**

재귀 타입은 복잡한 형식을 처리할 수 있지만 타입스크립트는 최대 재귀 한계를 설정합니다.

```tsx
type NestedArray<T> = T | NestedArray<T>[];
const array: NestedArray<number> = [1, [2, [3]]];

```

- **설명**: 너무 깊은 재귀는 `TS2589` 오류를 발생시킬 수 있으므로, 적절한 깊이로 제한해야 합니다.

---

## **6.6 템플릿 리터럴을 구별자로 사용하기**

템플릿 리터럴을 구분자로 사용해 문자열을 처리할 수 있습니다.

```tsx
type Split<S extends string, Delimiter extends string> =
  S extends `${infer Part}${Delimiter}${infer Rest}`
    ? [Part, ...Split<Rest, Delimiter>]
    : [S];

type Result = Split<"a,b,c", ",">;  // ["a", "b", "c"]

```

---

이 예제를 실습하면 **타입스크립트의 문자열 템플릿 리터럴 형식**을 활용해 더 강력한 타입 안전성을 구현할 수 있습니다. 특히 **매핑된 키**와 **재귀 템플릿**을 통해 복잡한 데이터 구조를 효과적으로 처리할 수 있습니다.