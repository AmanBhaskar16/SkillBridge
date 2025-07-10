import User from "../models/User.js";

// Get user data

export const getUserData = async (req ,res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.json({
        success : false,
        message : 'User not found'
      })
    }
    res.json({
      success : true,
      user
    })
  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
}

// Apply for a job

export const applyforJob = async (req ,res) => {
  
}

// Get applied user application

export const getUserJobApplications = async (req ,res) => {

}

// Update user profile (i.e resume)

export const updateUserResume = async (req ,res) => {

}