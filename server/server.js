import express from 'express';
import cors from 'cors';
import './config/instrument.js';
import * as Sentry from "@sentry/node";
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkWebhook } from './controllers/webhooks.js';

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

app.post('/webhooks',clerkWebhook);



const PORT = process.env.PORT || 3000;

// but before any and other error-handling middlewares are defined
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,(req,res)=>{
  console.log(`Server running on http://localhost:${PORT}`)
})