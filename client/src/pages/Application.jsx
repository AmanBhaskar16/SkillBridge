import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';

const Application = () => {

  const [isEdit,setIsEdit] = useState(false);
  const [resume,setResume] = useState(null);

  return (
    <>
      <Navbar/>
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold mb-1.5 text-fuchsia-700'>Your Resume</h2>
        <div className='flex gap-3'>
          {
            isEdit ? <>
              <label className='flex items-center' htmlFor="resumeUpload">
                <p className='bg-fuchsia-100 text-fuchsia-600 px-4 py-2 rounded-lg mr-2'>Select Your Resume</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={e => setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
            </>: <div className='flex gap-3'>
              <a className='bg-cyan-100 text-cyan-600 px-4 py-2 rounded-lg' href="">
                Resume
              </a>
              <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'>Edit</button>
            </div>
          }
        </div>
        <h2 className='text-xl font-semibold mb-4 text-emerald-700 mt-3'>Applied Jobs</h2>
        <div className='border border-gray-600 rounded-lg overflow-hidden'>
          <table className='min-w-full bg-white '>
            <thead className='bg-gray-100'>
              <tr>
                <th className='py-3 px-4 border-b text-left'>Company</th>
                <th className='py-3 px-4 border-b text-left'>Job Title</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
                <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
                <th className='py-3 px-4 border-b text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job,index)=> jobsApplied ? (
                <tr>
                  <td className='py-6 px-4 flex items-center gap-2 border-b'>
                    <img className='w-8 h-8' src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td className='py-2 px-4 border-b'>{job.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='py-2 px-4 border-b'>
                    <span className={`${job.status === 'Accepted' ? 'bg-green-100 py-2 px-3 rounded-lg' : job.status === 'Pending' ? 'bg-amber-100 py-2 px-3 rounded-lg': 'bg-red-200 py-2 px-3 rounded-lg'}`}>{job.status}</span>
                    </td>
                </tr>
              ) : (
                null
              ))}
            </tbody>
          </table>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Application
