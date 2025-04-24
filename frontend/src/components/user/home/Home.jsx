import React from 'react';
import { Box, styled } from "@mui/material";
import Header from '../../header/Header';
import HeroSection from './HeroSection';
import TopCompanies from './TopCompanies';
import TopFields from './TopFields';

const NewBox = styled(Box)(({theme}) => ({
    backgroundColor: "#ebebe9",
    minHeight: "88vh",
    width: "100%",
}))

const Home = () => {
  return (
    <NewBox>
        <HeroSection />
        <TopCompanies />
        <TopFields />
    </NewBox>
  )
}

export default Home;