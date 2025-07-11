import bcrypt from 'bcrypt';
import Company from '../models/Company.js';
import {v2 as cloudinary} from 'cloudinary';

// Registering a new company

import generateToken from '../utils/generateToken.js';
import Job from '../models/Job.js';

export const registerCompany = async (req ,res) => {

  const {name,email,password} = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({
      success : false,
      message : "Missing Details"
    })
  }

  try {
    const companyAlreadyExists = await Company.findOne({email});

    if (companyAlreadyExists) {
      return res.json({
        success : false,
        message : "Company already registered"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password : hashPassword,
      image : imageUpload.secure_url
    })

    res.json({
      success : true,
      company : {
        _id : company._id,
        name : company.name,
        email : company.email,
        image : company.image
      },
      token : generateToken(company._id)
    })

  } catch (error) {
    console.log(error.message);
    res.json({      
      success : false,
      message : error.message
    })
  }
}

// Company login
export const loginCompany = async (req ,res)=>{

  const {email,password} = req.body;

  try {
    const company = await Company.findOne({email});

    if(bcrypt.compare(password,company.password)){
      res.json({
        success : true,
        company : {
          _id : company._id,
          name : company.name,
          email : company.email,
          image : company.image
        },
        token : generateToken(company._id)
      })
    }else{
      res.json({
        success : false,
        message : 'Invalid email or password'
      })
    }
  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
}

// Get company data

export const getCompanyData = async (req ,res) => {

  try {

    const company = req.company;

    res.json({
      success : true,
      company
    })
  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
}

// Post a new job 

export const postJob = async (req ,res) => {

  const {title,description,location,salary,level,category} = req.body;

  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      level,
      companyId,
      category,
      date : Date.now()
    })

    await newJob.save();
    res.json({
      success : true,
      newJob
    })
  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }

}

// Get company job applicants

export const getCompanyJobApplicants = async (req ,res) => {

}

// Get company posted jobs 

export const getCompanyPostedJobs = async (req ,res) => {
  try {
    
    const companyId = req.company._id;

    const jobs = await Job.find({companyId});

    res.json({
      success : true,
      jobsData : jobs
    })

  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
}

// Change job application status

export const changeApplicationStatus = async (req ,res) => {

}

// Change job visibility

export const jobVisibility = async (req ,res) => {
  try {
    const {id} = req.body;
    const companyId = req.company._id;
    const job = await Job.findById(id);

    if(companyId.toString() === job.companyId.toString()){
      job.visible = !job.visible;
    }
    await job.save();
    res.json({
      success : true,
      job
    })
  } catch (error) {
    res.json({
      success: false,
      message : error.message
    })
  }
}