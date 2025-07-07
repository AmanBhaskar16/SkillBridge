import React from 'react';
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'

const Card = ({ job }) => {

  const navigate = useNavigate();

  return (
    <div className="p-4 shadow rounded-lg bg-white flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <img src={assets.company_icon} alt="Company" className="w-10 h-10" />
        <h4 className="text-lg font-semibold text-emerald-700">{job.title}</h4>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span className='inline-flex items-center gap-2.5 bg-cyan-50 border border-cyan-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='inline-flex items-center gap-2.5 bg-pink-50 border border-pink-200 px-4 py-1.5 rounded'>{job.level}</span>
      </div>
      <p
        className="text-sm text-gray-700"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 150) + '...',
        }}
      ></p>
      <div onClick ={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className="flex gap-2 mt-auto">
        <button className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800 transition cursor-pointer">
          Apply Now
        </button>
        <button onClick ={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}}  className="border border-fuchsia-700 text-fuchsia-700 px-4 py-2 rounded hover:bg-fuchsia-50 transition cursor-pointer">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Card;
