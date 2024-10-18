# 12 형식 개발 전략

## **12.1 유지 보수가 쉬운 형식 구현하기**

- 복잡한 타입 대신, 재사용 가능한 **작은 타입 유닛**을 만드세요.
- **유틸리티 타입**(`Partial`, `Pick`)을 사용해 중복된 코드를 줄입니다.

### 예제:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, "name" | "email">;

```

---

## **12.2 단계별로 형식 다듬기**

- 코드를 처음부터 완벽하게 타이핑하기보다, **점진적 타이핑**(gradual typing)을 활용하세요.

```tsx
let user: any = { id: 1, name: "Alice" };
// 이후 점진적으로 구체화
user = { id: 1, name: "Alice", email: "alice@example.com" } as User;

```

---

## **12.3 `satisfies`로 계약 검사하기**

- **`satisfies` 키워드**는 타입에 대한 더 구체적인 계약 검사를 보장합니다.

```tsx
const user = {
  id: 1,
  name: "Alice",
} satisfies { id: number; name: string };

```

---

## **12.4 복합 형식 테스트하기**

- **테스트 도구**를 활용해 여러 형식을 테스트합니다.

```tsx
type Test<T extends true> = T;

type IsString = Test<"Hello" extends string ? true : false>;  // OK

```

---

## **12.5 런타임에서 `zod`로 데이터 형식 확인하기**

- **`zod` 라이브러리**를 사용해 런타임에서 타입 검사를 수행합니다.

```bash
npm install zod

```

```tsx
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});
const user = UserSchema.parse({ id: 1, name: "Alice" });

```

---

## **12.6 인덱스 접근 제한 작업하기**

- 인덱스 접근을 제한해 잘못된 접근을 방지합니다.

```tsx
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "Alice" };
// user["invalidKey"];  // 오류: 'invalidKey'는 존재하지 않음

```

---

## **12.7 함수 오버로드 또는 조건부 형식 사용 여부 결정하기**

- 여러 시그니처를 가진 함수가 필요하면 **오버로드**를 사용하고, 타입에 따라 변하는 경우 **조건부 형식**을 사용합니다.

```tsx
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}

```

---

## **12.8 제네릭 이름 정하기**

- 제네릭 매개변수는 **의미 있는 이름**을 사용합니다.

```tsx
class Stack<Element> {
  private items: Element[] = [];
  push(item: Element) {
    this.items.push(item);
  }
}

```

---

## **12.9 타입스크립트 플레이그라운드 활용하기**

- [TypeScript Playground](https://www.typescriptlang.org/play)에서 코드를 실험해보고 빠르게 피드백을 얻으세요.

---

## **12.10 여러 라이브러리 버전 제공하기**

- 타입스크립트는 **버전 관리**가 중요합니다. 여러 라이브러리 버전을 지원하려면 각 버전에 대한 타입 선언을 유지해야 합니다.

```tsx
"dependencies": {
  "react": "^17.0.0",
  "@types/react": "^17.0.0"
}

```

---

## **12.11 언제 멈춰야 할지 알기**

- 너무 복잡한 타입을 만들기보다는, 필요한 만큼만 구현하는 것이 중요합니다.

```tsx
type SimpleUser = { id: number; name: string };

```

---

이 예제들은 형식 개발 전략의 각 주제를 다루고 있으며, 유지보수성과 확장성을 고려한 타입 설계를 도와줍니다. **점진적 타이핑과 계약 검사**를 통해 코드의 안전성을 보장하고, 복잡도를 줄이는 것이 핵심입니다.