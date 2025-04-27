import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/admin/AdminProvider";
import { EmployerProvider } from './context/employer/EmployerProvider';
import { UserProvider } from './context/user/UserProvider';
import { JobProvider } from './context/employer/JobProvider';
import { JobsProvider } from './context/user/JobsProvider';
import Home from './components/user/home/Home';
import Employer from './components/employer/home/Employer';
import EmployerJobs from './components/employer/Jobs/EmployerJobs';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AdminLogin from './components/admin/login/AdminLogin';
import AdminDash from './components/admin/dashboard/AdminDash';
import AdminProfile from './components/admin/dashboard/profile/AdminProfile';
import AdminJobs from './components/admin/dashboard/jobs/AdminJobs';
import AdminSub from './components/admin/dashboard/subscriptions/AdminSub';
import AdminWallet from './components/admin/dashboard/wallet/AdminWallet';
import EmployerLogin from './components/employer/account/EmployerLogin';
import EmployerRegistration from './components/employer/account/EmployerRegistration';
import EmployerCommon from './components/employer/EmployerCommon';
import EmployerPayments from './components/employer/payment/EmployerPayments';
import UserCommon from './components/user/UserCommon';
import UserProfile from './components/user/profile/UserProfile';
import SearchJobs from './components/user/home/SearchJobs';
import JobDetails from './components/user/home/JobDetails';
import JobApply from './components/user/home/JobApply';
import JobDetail from './components/employer/Jobs/JobDetails';
import JobApplications from './components/employer/Jobs/JobApplications';

const App = () => {

  return (
    <AdminProvider>
      <EmployerProvider>
        <UserProvider>
          <JobProvider>
            <JobsProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<UserCommon />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="search-jobs" element={<SearchJobs />} />
                    <Route path="search-jobs/:id" element={<JobDetails />} />
                    <Route path="apply-for-job/:id" element={<JobApply />} />
                  </Route>
                  <Route path='/employer' element={<EmployerCommon />}>
                    <Route index element={<Employer />} />
                    <Route path='jobs' element={<EmployerJobs />} />
                    <Route path='payments' element={<EmployerPayments />} />
                    <Route path='job-details/:id' element={<JobDetail />} />
                    <Route path='view-job-application/:id' element={<JobApplications />} />
                  </Route>
                  <Route path='/employer/login' element={<EmployerLogin />} />
                  <Route path='/employer/registration' element={<EmployerRegistration />} />
                  <Route path='/admin'>
                    <Route index element={<AdminRoute />} />
                    <Route path='account' element={<AdminDashboard />}>
                      <Route index element={<AdminDash />} />
                      <Route path='profile' element={<AdminProfile />} />
                      <Route path='jobs' element={<AdminJobs />} />
                      <Route path='subscriptions' element={<AdminSub />} />
                      <Route path='payments' element={<AdminWallet />} />
                    </Route>
                    <Route path='login' element={<AdminLogin />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </JobsProvider>
          </JobProvider>
        </UserProvider>
      </EmployerProvider>
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