# 01 프로젝트 설정

이 자료는 `Visual Studio Code`와 `Node.js`를 기반으로 진행하는 것을 권장합니다.

---

## **1.1 자바스크립트 형식 검사하기**

TypeScript는 `.js` 파일에서도 타입 검사를 수행할 수 있습니다. 이를 위해 `checkJs` 옵션을 활성화합니다.

### **설정 및 코드 예제**

1. `tsconfig.json` 생성:
    
    ```json
    {
      "compilerOptions": {
        "checkJs": true,
        "allowJs": true
      }
    }
    
    ```
    
2. `example.js` 파일:
    
    ```jsx
    function add(a, b) {
      return a + b;
    }
    console.log(add(1, "2"));  // 오류 발생: 타입 불일치
    
    ```
    
    - `tsc`를 실행하면 타입 오류를 감지합니다.

---

## **1.2 타입스크립트 설치하기**

### **설치 명령어**

```bash
npm install -g typescript
tsc --version  # 설치 확인

```

- **로컬 프로젝트에 설치**:
    
    ```bash
    npm init -y
    npm install typescript --save-dev
    npx tsc --init  # tsconfig.json 생성
    
    ```
    

---

## **1.3 형식을 나란히 유지하기**

타입스크립트와 자바스크립트 파일을 함께 사용하려면 `allowJs` 옵션을 활성화합니다.

### **설정**:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts", "src/**/*.js"]
}

```

---

## **1.4 프로젝트를 타입스크립트로 바꾸기**

1. 기존 프로젝트의 `.js` 파일을 `.ts`로 확장자 변경.
2. `any` 타입으로 빠르게 마이그레이션.
3. 점진적 변환:
    
    ```tsx
    let user: any = { name: "Alice" };
    user.age = 25;
    
    ```
    

---

## **1.5 Definitely Typed에서 형식 불러오기**

DefinitelyTyped는 자바스크립트 라이브러리의 타입 정의를 제공합니다.

### **예제: Lodash 라이브러리 사용하기**

```bash
npm install lodash @types/lodash

```

```tsx
import _ from 'lodash';
const nums = _.compact([0, 1, false, 2, '', 3]);
console.log(nums);  // [1, 2, 3]

```

---

## **1.6 풀스택 프로젝트 설정하기**

TypeScript로 풀스택 프로젝트를 구성합니다. 예제에서는 Express와 React를 함께 사용합니다.

### **서버 설정**:

```bash
npm install express @types/express

```

```tsx
// src/server.ts
import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('Hello TypeScript!'));
app.listen(3000, () => console.log('Server running'));

```

---

## **1.7 테스트 설정하기**

Jest를 사용해 타입스크립트 프로젝트를 테스트합니다.

### **설정 및 테스트 코드**:

```bash
npm install --save-dev jest @types/jest ts-jest
npx ts-jest config:init

```

```tsx
// src/sum.ts
export function sum(a: number, b: number): number {
  return a + b;
}

```

```tsx
// __tests__/sum.test.ts
import { sum } from '../src/sum';
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

```

---

## **1.8 URL로 ECMAScript 모듈 형식화하기**

Deno를 사용하면 외부 모듈을 URL로 직접 가져올 수 있습니다.

```tsx
import { serve } from "<https://deno.land/std@0.119.0/http/server.ts>";
serve(() => new Response("Hello from Deno!"), { port: 8000 });

```

---

## **1.9 노드에서 다른 모듈 형식 불러오기**

Node.js는 `.mjs` 확장자나 `package.json`에서 `"type": "module"`을 설정해 ES 모듈을 지원합니다.

```jsx
// utils.mjs
export function greet(name) {
  return `Hello, ${name}!`;
}

```

```jsx
// index.mjs
import { greet } from './utils.mjs';
console.log(greet('TypeScript'));

```

---

## **1.10 디노와 의존성 이용하기**

Deno는 패키지 매니저가 필요 없이 URL로 의존성을 가져옵니다.

```tsx
import { serve } from "<https://deno.land/std@0.119.0/http/server.ts>";
serve(() => new Response("Hello from Deno!"), { port: 8080 });

```

---

## **1.11 미리 정의된 설정 사용하기**

TypeScript에서 미리 정의된 설정을 사용해 빠르게 시작할 수 있습니다.

```bash
npx tsc --init --rootDir src --outDir dist --esModuleInterop

```