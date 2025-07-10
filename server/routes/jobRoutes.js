import express from 'express';
import { getAllJobs, getJobById } from '../controllers/jobController.js';

const router = express.Router();

// To get all job details

router.get('/',getAllJobs);

// To get a single job through ID

router.get('/:id',getJobById);

export default router;