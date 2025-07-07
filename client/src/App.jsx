import { useContext, useState } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Application'
import Apply from './pages/Apply'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Manage from './pages/Manage'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css';

function App() {

  const {showRecruiterLogin} = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/apply-job/:id' element = {<Apply/>} />
        <Route path='/applications' element = {<Application/>} />
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='add-job' element={<AddJob/>}/>
          <Route path='manage-jobs' element={<Manage/>}/>
          <Route path='view-applications' element={<ViewApplications/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
