// src/server.ts: Express 서버 설정
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());  // 모든 도메인 요청 허용

// 간단한 GET 엔드포인트 생성
app.get('/', (req, res) => {
  res.send('Hello TypeScript!');
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
