import express from 'express';
import cors from 'cors';
import './config/instrument.js';
import * as Sentry from "@sentry/node";
import 'dotenv/config';
import connectDB from './config/db.js';
import { clerkWebhook } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();

// Connect to DB
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get('/',(req,res)=>{
  res.send('Hello Aman bhai');
})

app.post('/webhooks',clerkWebhook);
app.use('/api/company',companyRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 3000;

// but before any and other error-handling middlewares are defined
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,(req,res)=>{
  console.log(`Server running on http://localhost:${PORT}`)
})