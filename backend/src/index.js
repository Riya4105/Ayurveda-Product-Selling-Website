import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

const start = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI not set');
    await mongoose.connect(uri);
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
