import React from 'react';
import { Box, styled } from "@mui/material";
import Header from '../../header/Header';
import HeroSection from './HeroSection';
import { Link } from "react-router-dom";
import { Home, Work, Login, Payment } from "@mui/icons-material";

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

const Employer = () => {
  return (
    <NewBox>
      <Header InsideSecondSection={InsideSection} />
      <HeroSection />
    </NewBox>
  )
}

const InsideSection = () => {
  return (
    <React.Fragment>
      <Link style={LinkStyle} to="/"><Home style={{marginRight: "5px"}} />Home</Link>
      <Link style={LinkStyle} to="/"><Payment style={{marginRight: "5px"}} />Your Payments</Link>
      <Link style={LinkStyle} to="/employer/jobs"><Work style={{marginRight: "5px"}} />Your Jobs</Link>
      <Link style={LinkStyle}><Login style={{marginRight: "5px"}} />Login</Link>
    </React.Fragment>
  )
}

export default Employer;