import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './Routes/health.router';


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const port = process.env.PORT || 4000;

app.use('/', router)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});