# 실습 문제

### **TypeScript 풀스택 프로젝트 실습 예제**

아래 예제는 **TypeScript를 사용한 간단한 풀스택 애플리케이션**입니다. 이 프로젝트에서는 **Express 서버**를 백엔드로, **HTML/JavaScript**를 프론트엔드로 구성하여 **RESTful API**를 통해 서버와 클라이언트 간의 통신을 구현합니다.

---

## **프로젝트 목표**

- **백엔드**: TypeScript로 Express 서버를 구성하고, 간단한 CRUD API를 제공합니다.
- **프론트엔드**: JavaScript로 API에 요청을 보내고 데이터를 표시합니다.
- **설정 및 컴파일**: TypeScript 프로젝트를 설정하고, 컴파일 후 실행합니다.

---

## **프로젝트 구조**

```powershell
ch01proj/
├── src/
│   ├── server.ts        # 서버 코드 (Express API)
│   └── public/
│       └── index.html   # 클라이언트 HTML 파일
├── dist/                # 컴파일된 JS 파일
├── tsconfig.json        # TypeScript 설정 파일
├── package.json         # 프로젝트 설정 파일
└── README.md            # 프로젝트 설명
```

---

## **1. 프로젝트 초기 설정**

1. **프로젝트 생성 및 필요한 패키지 설치**
    
    ```bash
    mkdir ch01proj
    cd ch01proj
    
    # TypeScript 및 Express 설치
    npm init -y
    npm install express @types/express typescript ts-node-dev --save-dev
    
    ```
    
2. **TypeScript 설정 파일 생성**
    
    ```bash
    npx tsc --init --rootDir src --outDir dist --esModuleInterop
    
    ```
    
3. **tsconfig.json 파일 주요 설정**
    
    ```json
    {
      "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true
      }
    }
    ```
    

---

## **2. 백엔드: 서버 코드 작성**

1. **Express 서버 파일 작성 (`src/server.ts`)**:
    
    ```tsx
    import express from 'express';
    import path from 'path';
    
    const app = express();
    const PORT = 3000;
    
    // 정적 파일 제공
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    
    // 메모리 데이터 저장소 (간단한 배열 사용)
    let items: { id: number; name: string }[] = [{ id: 1, name: 'Sample Item' }];
    
    // GET /items - 모든 아이템 조회
    app.get('/items', (req, res) => {
      res.json(items);
    });
    
    // POST /items - 새로운 아이템 추가
    app.post('/items', (req, res) => {
      const newItem = { id: items.length + 1, ...req.body };
      items.push(newItem);
      res.status(201).json(newItem);
    });
    
    // 서버 실행
    app.listen(PORT, () => {
      console.log(`Server is running at <http://localhost>:${PORT}`);
    });
    
    ```
    
2. **컴파일 및 서버 실행**
    
    ```bash
    npx tsc
    node dist/server.js
    
    ```
    

---

## **3. 프론트엔드: 클라이언트 코드 작성**

1. **HTML 파일 생성 (`src/public/index.html`)**
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TypeScript Fullstack Example</title>
    </head>
    <body>
      <h1>Item List</h1>
      <ul id="item-list"></ul>
    
      <h2>Add New Item</h2>
      <input type="text" id="item-name" placeholder="Item name" />
      <button onclick="addItem()">Add Item</button>
    
      <script>
        async function fetchItems() {
          const response = await fetch('/items');
          const items = await response.json();
          const itemList = document.getElementById('item-list');
          itemList.innerHTML = '';
          items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.id}: ${item.name}`;
            itemList.appendChild(li);
          });
        }
    
        async function addItem() {
          const itemName = document.getElementById('item-name').value;
          await fetch('/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: itemName })
          });
          fetchItems();  // 아이템 목록 갱신
        }
    
        // 페이지 로드 시 아이템 목록 불러오기
        fetchItems();
      </script>
    </body>
    </html>
    
    ```
    

---

## **4. 프로젝트 실행 및 테스트**

1. **TypeScript 파일 컴파일**
    
    ```bash
    npx tsc
    ```
    
2. **서버 실행**
    
    ```bash
    node dist/server.js
    ```
    
3. **결과 확인**
    - 브라우저에서 [http://localhost:3000](http://localhost:3000/)에 접속합니다.
    - 기존 아이템 목록을 조회하고, 새 아이템을 추가할 수 있습니다.

---

## **5. 실습 결과**

이 프로젝트를 통해 다음을 익힐 수 있습니다.

1. **TypeScript 프로젝트 설정 및 컴파일** 방법.
2. **Express로 서버 구축** 및 **API 엔드포인트 구현**.
3. **HTML/JavaScript 클라이언트와 서버 통신** 구현.

---

### **6. 확장 아이디어**

1. **PUT / DELETE API 추가**: 아이템을 수정하고 삭제하는 기능을 추가해보세요.
2. **프론트엔드 개선**: 입력값 검증과 에러 메시지를 표시하도록 개선합니다.
3. **데이터베이스 연동**: MongoDB 또는 MySQL을 연동해 데이터를 영구 저장해보세요.

이 예제를 통해 TypeScript와 Express를 사용한 **풀스택 개발의 기본적인 구조**를 경험할 수 있습니다.