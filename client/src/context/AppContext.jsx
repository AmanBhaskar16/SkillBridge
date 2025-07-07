import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets.js";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const [searchFilter,setSearchFilter] = useState({
    title : '',
    location : ''
  });

  const [isSearched,setIsSearched] = useState(false);
  const [jobs,setJobs] = useState([]);
  const [showRecruiterLogin,setShowRecruiterLogin] = useState(false);

  const fetchJobs = async () => {
    setJobs(jobsData);
  }

  useEffect(()=>{
    fetchJobs();
  },[])

  
  const value = {
    setIsSearched,
    setSearchFilter,
    isSearched,
    searchFilter,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin
  }

  return (
    <AppContext.Provider value = {value}>
      {props.children}
    </AppContext.Provider>
  )
}