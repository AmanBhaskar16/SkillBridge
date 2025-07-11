import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecruiterLogin = () => {

  const [state,setState] = useState('Login');
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const {setShowRecruiterLogin} = useContext(AppContext);

  const [image,setImage] = useState(false);

  const[isSubmitted,setIsSubmitted] = useState(false);

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    if(state == 'Sign Up' && !isSubmitted){
      setIsSubmitted(true);
    }
  }
  // SCROLL EFFECT DISABLED FOR POPUP AND ENABLE WHEN UNMOUNTED
  useEffect(()=>{
    document.body.style.overflow = 'hidden';

    return () =>{
      document.body.style.overflow = 'unset';
    }
  },[]);

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        {
          state === 'Login' ? (
            <p className='text-sm'>Welcome back ! Please Log in to continue</p>
          ) :(
            <p className='text-sm text-center'> Please sign in to continue</p>
          )
        }
        {
          state === 'Sign Up' && isSubmitted ?
          <>
            <div className='flex items-center gap-4 my-10'>
              <label htmlFor="image">
                <img className='w-16 rounded-full' src={image ?URL.createObjectURL(image) : assets.upload_area} alt="" />
                <input onChange={e => setImage(e.target.files[0])} type='file' id='image' hidden />
              </label>
              <p>Upload Company <br />Logo</p>
            </div>
          </> :
          <>
        {state !== 'Login' && (
          <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.person_icon} alt="" />
            <input className='outline-none text-sm' onChange={e => setName(e.target.value)} type="text" placeholder='Company Name' required value={name} />
          </div>
        )}
        
        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.email_icon} alt="" />
          <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} type="email" placeholder='Email Id' required value={email} />
        </div>

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.lock_icon} alt="" />
          <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' required value={password} />
        </div>
        {
          state === 'Login' && <p className='text-sm text-cyan-600 my-4 cursor-pointer'>Forgot password ? </p>
        }

        </>
        }
        <button type='submit' className='bg-cyan-600 w-full text-white py-2 rounded-full cursor-pointer'>
          {state === 'Login' ? 'Login' : isSubmitted ? 'Create Account' : 'next'}
        </button>
        {
          state === 'Login' ? (
            <p className='mt-3 text-center'>Don't have an account? <span className='cursor-pointer text-cyan-600' onClick={()=>setState("Sign Up")}>Sign Up</span></p>
          ) : (
            <p className='mt-3 text-center'>Already have an account? <span className='cursor-pointer text-cyan-600' onClick={()=>setState('Login')}>Login</span></p>
          )
        }
        <img onClick={()=>setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />

      </form>
    </div>
  )
}

export default RecruiterLogin
