import express, { Request, Response } from 'express';
import cors from 'cors';
import healthRoutes from './Routes/health.routes';
import userRoutes from './Routes/user.routes';
import roundRoutes from './Routes/round.routes';
import dotenv from 'dotenv';
import { connectToDb } from './db';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
}));

app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rounds', roundRoutes);

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();