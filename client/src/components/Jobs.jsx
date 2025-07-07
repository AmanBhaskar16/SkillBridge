import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations} from '../assets/assets';
import Card from './Card';

const Jobs = () => {

  const {isSearched,searchFilter,setSearchFilter,jobs} = useContext(AppContext);

  const [showFilter,setShowFilter] = useState(false);

  const [curPage,setCurPage] = useState(1);

  const [categories,setCategories] = useState([]);
  const [locations,setLocations] = useState([]);

  const [filteredJobs,setFilteredJobs] = useState(jobs);

  const categoryChange = (category) => {
    setCategories(
      prev => prev.includes(category) ? prev.filter(c => c!== category) : [...prev,category]
    )
  }

  const locationChange = (location) => {
    setLocations(
      prev => prev.includes(location) ? prev.filter(c => c!== location) : [...prev,location]
    )
  }

  useEffect(()=>{

    const matchedCategory = job => categories.length === 0 || categories.includes(job.category);

    const matchedLocation = job => locations.length === 0 || locations.includes(job.location);

    const matchedTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = job =>searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchedCategory(job) && matchedLocation(job) && matchedTitle(job) && matchesSearchLocation(job)
    )

    setFilteredJobs(newFilteredJobs);
    setCurPage(1);
  },[jobs,categories,locations,searchFilter])

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {/* Filtered search  */}
        {
          isSearched && (searchFilter.title !== "" || searchFilter.location!=="")&&(
            <>
              <h3 className='font-medium text-lg mb-4'>Current Search</h3>
              <div className='mb-4 text-gray-600'>
                {
                searchFilter.title && (
                  <span className='inline-flex items-center gap-2.5 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded'>
                    {searchFilter.title}
                    <img onClick={ e => setSearchFilter(prev => ({...prev,title:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                  </span>
                )}
                {
                searchFilter.location && (
                  <span className='inline-flex items-center gap-2.5 bg-green-50 border border-green-200 px-4 py-1.5 rounded ml-2'>
                    {searchFilter.location}
                    <img onClick={e => setSearchFilter(prev => ({...prev,location : ""}))} className='cursor-pointer'  src={assets.cross_icon} alt="" />
                  </span> 
                )}
              </div>
            </>
          )
        }

        <button onClick={e => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden cursor-pointer'>
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category wise filter */}
        <div className={showFilter ? "":"max-lg:hidden"}>
          <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobCategories.map((category,index)=>(
                <li className='flex gap-3 items-center' key={index}>
                  <input className='scale-125' type="checkbox" onChange={()=>categoryChange(category)} checked={categories.includes(category)}/>
                  {category}
                </li>
              ))
            }
          </ul>
        </div>
        {/* Location wise filter */}
        <div className={showFilter ? "":"max-lg:hidden"}>
          <h4 className='font-medium text-lg py-4 pt-8'>Search by Location</h4>
          <ul className='space-y-4 text-gray-600'>
            {
              JobLocations.map((location,index)=>(
                <li className='flex gap-3 items-center' key={index}>
                  <input className='scale-125' type="checkbox" onChange={()=>locationChange(location)} checked={locations.includes(location)}/>
                  {location}
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      {/* Available jobs */}

      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Available jobs</h3>
        <p className='mb-8 '>Your Dream Job, One Click Away.</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
            {
              filteredJobs.slice((curPage-1)*6,curPage*6).map((job,index)=>(
                <Card key={index} job = {job}/>
              ))  
            }
        </div>

        {/* Pagination Logic */}

        {filteredJobs.length > 0 &&(
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <a href="#job-list">
              <img onClick={()=>setCurPage(Math.max(curPage-1,1))} src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>(
              <button onClick={()=>setCurPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray border-gray-300 rounded cursor-pointer ${curPage === index + 1 ? 'bg-blue-100 text-blue-500':'text-gray-500'}`} key={index}>{index + 1}</button>
            ))}
            <a href="#job-list">
              <img onClick={()=>setCurPage(Math.min(curPage+1,Math.ceil(filteredJobs.length/6)))} src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}

      </section>

    </div>
  )
}

export default Jobs
