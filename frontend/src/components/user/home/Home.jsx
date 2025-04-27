import React from 'react';
import { Box, styled } from "@mui/material";
import Header from '../../header/Header';
import HeroSection from './HeroSection';
import TopJobs from './TopJobs';

const NewBox = styled(Box)(({theme}) => ({
    backgroundColor: "#ebebe9",
    minHeight: "88vh",
    width: "100%",
}))

const Home = () => {
  return (
    <NewBox>
        <HeroSection />
        <TopJobs />
    </NewBox>
  )
}

export default Home;