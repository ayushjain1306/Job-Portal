import React, { useContext, useState, useEffect } from 'react';
import { Box, Avatar, CircularProgress, styled } from "@mui/material";
import Header from '../header/Header';
import { Outlet, Link } from 'react-router-dom';
import { Home, Payment, Work, Login } from '@mui/icons-material';
import { EmployerContext } from '../../context/employer/EmployerProvider';
import { getEmployerDetails } from '../../services/employer/account';
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
  
const NewBox = styled(Box)(({theme}) => ({
  backgroundColor: "#ebebe9",
  minHeight: "88vh",
  width: "100%",
  paddingTop: "12vh"
}))

const EmployerCommon = () => {
  const { setEmployer } = useContext(EmployerContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      setLoading(true);
      const result = await getEmployerDetails();
      if (result) setEmployer(result)
      setLoading(false);
    }

    fetchEmployerDetails();
  }, [])
    
  return (
    loading ? 
      <Box style={{ backgroundColor: "#ebebe9", height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>
    :<><NewBox>
      <Header InsideSecondSection={InsideSection} />
      <Outlet />
    </NewBox>
    <Footer />
    </>
  )
}

const InsideSection = () => {
    const { employer } = useContext(EmployerContext);
  
    return (
      <React.Fragment>
        <Link style={LinkStyle} to="/employer"><Home style={{marginRight: "5px"}} />Home</Link>
        <Link style={LinkStyle} to="/employer/payments"><Payment style={{marginRight: "5px"}} />Your Payments</Link>
        <Link style={LinkStyle} to="/employer/jobs"><Work style={{marginRight: "5px"}} />Your Jobs</Link>
        {
          employer ? 
          <Box style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
            <Avatar style={{backgroundColor: "blue"}}>{employer?.name[0]}</Avatar>
          </Box>
          :
          <Link style={LinkStyle} to="/employer/login"><Login style={{marginRight: "5px"}} />Login</Link>
        }
      </React.Fragment>
    )
  }

export default EmployerCommon