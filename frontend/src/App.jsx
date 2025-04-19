import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/user/home/Home';
import Freelancer from './components/user/freelancer/Freelancer';
import Employer from './components/employer/home/Employer';
import EmployerJobs from './components/employer/Jobs/EmployerJobs';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/freelancer' element={<Freelancer />} />
        <Route path='/employer'>
          <Route index element={<Employer />} />
          <Route path='jobs' element={<EmployerJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;