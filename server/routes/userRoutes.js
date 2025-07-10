import express, { Router } from 'express';
import { applyforJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';

const router = express.Router();

// To get user data
router.get('/user',getUserData);

// Apply for a job
router.post('/apply',applyforJob);

// To get applied jobs
router.get('/applications',getUserJobApplications);

// Update user resume
router.post('/update-resume',upload.single('resume'), updateUserResume);

export default router;