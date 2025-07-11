import Job from "../models/Job.js"


// Get all jobs

export const getAllJobs = async (req ,res) => {
  try {
    const jobs = await Job.find({visible:true}).populate({path:'companyId',select:'-password'});

    res.json({
      success : true,
      jobs
    })
  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
}

// Get single job by id

export const getJobById = async (req ,res) => {
  try {
    const {id} = req.params;
    const job = await Job.findById(id).populate({
      path : 'companyId',
      select : '-password'
    })

    if(!job){
      res.json({
        success : false,
        message : "Job not available."
      })
    }

    res.json({
      success : true,
      job
    })
  } catch (error) {
    res.json({
      success : false,
      message : error.message
    })
  }
}