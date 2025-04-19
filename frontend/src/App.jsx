import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/user/home/Home';
import Freelancer from './components/user/freelancer/Freelancer';
import Employer from './components/employer/home/Employer';
import EmployerJobs from './components/employer/Jobs/EmployerJobs';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AdminLogin from './components/admin/login/AdminLogin';
import { AdminProvider } from "./context/admin/AdminProvider";
import AdminDash from './components/admin/dashboard/AdminDash';
import AdminProfile from './components/admin/dashboard/profile/AdminProfile';
import AdminJobs from './components/admin/dashboard/jobs/AdminJobs';
import AdminSub from './components/admin/dashboard/subscriptions/AdminSub';
import AdminSkills from './components/admin/dashboard/skills/AdminSkills';
import AdminWallet from './components/admin/dashboard/wallet/AdminWallet';

const App = () => {

  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/freelancer' element={<Freelancer />} />
          <Route path='/employer'>
            <Route index element={<Employer />} />
            <Route path='jobs' element={<EmployerJobs />} />
          </Route>
          <Route path='/admin'>
            <Route index element={<AdminRoute />} />
            <Route path='account' element={<AdminDashboard />}>
              <Route index element={<AdminDash />} />
              <Route path='profile' element={<AdminProfile />} />
              <Route path='jobs' element={<AdminJobs />} />
              <Route path='subscriptions' element={<AdminSub />} />
              <Route path='skills' element={<AdminSkills />} />
              <Route path='wallet' element={<AdminWallet />} />
            </Route>
            <Route path='login' element={<AdminLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}

const AdminRoute = () => {

  useEffect(() => {

    window.location.href = "/admin/account";
  }, []);

  return (
    <div></div>
  )
}

export default App;