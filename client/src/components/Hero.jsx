import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

  const {setSearchFilter,setIsSearched} = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title : titleRef.current.value,
      location : locationRef.current.value
    })
    setIsSearched(true);
    console.log({
      title : titleRef.current.value,
      location : locationRef.current.value
    });
  }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-cyan-500 to-emerald-600 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Connecting Talent with Opportunity.</h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>We make job hunting easy and hassle-free by connecting you with the best opportunities tailored just for you.</p>
        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
          <div className='flex items-center'>
            <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
            <input type='text' placeholder='Search for jobs' className='max-sm:text-xs p-2 rounded outline-none w-full' ref={titleRef}/>
          </div>
          <div className='flex items-center'>
            <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
            <input type='text' placeholder='Location' className='max-sm:text-xs p-2 rounded outline-none w-full' ref = {locationRef} />
          </div>
          <button onClick={onSearch} className='bg-cyan-600 px-6 py-2 rounded text-white m-1 cursor-pointer'>Search</button>
        </div>
      </div>
      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md'>
        <p className='font-medium mb-2 text-center'>Trusted by</p>
        <marquee behavior="scroll" direction="left" scrollamount="5" className="w-full">
          <span style={{ display: 'inline-flex', gap: '4rem', alignItems: 'center' }}>
            <img className='h-6' src={assets.accenture_logo} alt="" />
            <img className='h-6' src={assets.walmart_logo} alt="" />
            <img className='h-6' src={assets.microsoft_logo} alt="" />
            <img className='h-6' src={assets.amazon_logo} alt="" />
            <img className='h-6' src={assets.samsung_logo} alt="" />
            <img className='h-6' src={assets.adobe_logo} alt="" />
            <img className='h-12' src={assets.apple_logo} alt="" />
            <img className='h-10' src={assets.swiggy_logo} alt="" />
            <img className='h-12' src={assets.zomato_logo} alt="" />
            <img className='h-12' src={assets.tcs_logo} alt="" />
            <img className='h-12' src={assets.infosys_logo} alt="" />
            <img className='h-12' src={assets.google_logo} alt="" />
          </span>
        </marquee>
      </div>
    </div>
  )
}

export default Hero
