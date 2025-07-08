import express from 'express';
import cors from 'cors';
import './config/instrument.js';
import 'dotenv/config';
import connectDB from './config/db.js';

const app = express();

// Connect to DB
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());





// Routes
app.get('/',(req,res)=>{
  res.send('Hello Aman bhai');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,(req,res)=>{
  console.log(`Server running on http://localhost:${PORT}`)
})