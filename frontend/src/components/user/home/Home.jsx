import React, { useState } from 'react';
import { Box, Backdrop, CircularProgress, styled } from "@mui/material";
import { Link } from "react-router-dom";
import Header from '../../header/Header';
import { Home as HomeIcon, Login, Work, Add } from "@mui/icons-material";
import HeroSection from './HeroSection';
import TopCompanies from './TopCompanies';
import TopFields from './TopFields';
import Account from './Account';

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

const Home = () => {
  return (
    <NewBox>
        <Header InsideSecondSection={SecondSection} />
        <HeroSection />
        <TopCompanies />
        <TopFields />
    </NewBox>
  )
}

const SecondSection = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("Login");

    return (
        <React.Fragment>
            <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Link style={LinkStyle} to="/"><HomeIcon style={{marginRight: "5px"}} />Home</Link>
            <Link style={LinkStyle} to="/freelancer"><Work style={{marginRight: "5px"}} />Freelancer</Link>
            <Link style={LinkStyle} to="/employer"><Add style={{marginRight: "5px"}} />Post a Job</Link>
            <Link style={LinkStyle} onClick={() => setOpen(true)}><Login style={{marginRight: "5px"}} />Login</Link>

            <Account open={open} setOpen={setOpen} setLoading={setLoading} type={type} setType={setType} />
            
        </React.Fragment>
    )
}

export default Home;