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
app.get('/items', (req:any, res:any) => {
  res.json(items);
});

// POST /items - 새로운 아이템 추가
app.post('/items', (req:any, res:any) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
