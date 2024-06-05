// src/index.ts
import express, { Request, Response } from 'express';

const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
