import express from 'express';
import { changeApplicationStatus, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, jobVisibility, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { authCompany } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a company
router.post('/register',upload.single('image'),registerCompany);
// Company login
router.post('/login',loginCompany);
// Get company data
router.get('/company', authCompany, getCompanyData);
// Post a job
router.post('/post-job', authCompany, postJob);
// Get applicants data of company
router.get('/applicants', authCompany, getCompanyJobApplicants);
// Get company job list
router.get('/list-jobs', authCompany , getCompanyPostedJobs);
// Change application status
router.post('/change-status',authCompany, changeApplicationStatus);
// Job visibility
router.post('/change-visibility', authCompany , jobVisibility);

export default router;