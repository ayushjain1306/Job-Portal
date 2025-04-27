import React, { useContext, useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress, Avatar } from '@mui/material';
import { Person, Login, Home as HomeIcon, Add } from '@mui/icons-material';
import Header from '../header/Header';
import { UserContext } from '../../context/user/UserProvider';
import { getUserDetails } from '../../services/user/account';
import { Outlet, Link } from 'react-router-dom';
import Account from './home/Account';
import { JobsContext } from '../../context/user/JobsProvider';
import { topJobs } from '../../services/user/jobs';
import Footer from '../../utils/Footer';

const LinkStyle = {
    color: "inherit",
    textDecoration: "none",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
}

const UserCommon = () => {
  const { setUser, loadAgain } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { setJobsLoading, setTopJobs } = useContext(JobsContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
        setLoading(true);
        const result = await getUserDetails();
        setUser(result);
        setLoading(false);
    }

    const fetchTopJobs = async () => {
        setJobsLoading(true);
        const result = await topJobs();
        setTopJobs(result);
        setJobsLoading(false);
    }

    fetchUserDetails();
    fetchTopJobs();
  }, [loadAgain])

  return (
    loading ?
    <Box style={{ backgroundColor: "#ebebe9", height: "100vh", width: "100%", display: 'flex', alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
    </Box>
    :
    <><Box style={{ backgroundColor: "#ebebe9", minHeight: "88vh", width: "100%", paddingTop: "12vh", paddingBottom: "2vh"}}>
        <Header InsideSecondSection={SecondSection} />
        <Outlet />
        </Box>
        <Footer />
    </>
  )
}

const SecondSection = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("Login");
    const { user } = useContext(UserContext);

    return (
        <React.Fragment>
            <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Link style={LinkStyle} to="/"><HomeIcon style={{marginRight: "5px"}} />Home</Link>
            <Link style={LinkStyle} to="/profile"><Person style={{marginRight: "5px"}} />Your Profile</Link>
            <Link style={LinkStyle} to="/employer"><Add style={{marginRight: "5px"}} />Post a Job</Link>
            {
                user ?
                <Avatar sx={{ bgcolor: "primary.main" }}>{user.name[0]}</Avatar>
                :
                <Link style={LinkStyle} onClick={() => setOpen(true)}><Login style={{marginRight: "5px"}} />Login</Link>
            }
            
            {
                open && <Account open={open} setOpen={setOpen} type={type} setType={setType} />
            }
            
        </React.Fragment>
    )
}

export default UserCommon