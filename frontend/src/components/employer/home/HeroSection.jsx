import React from 'react';
import { Box, styled, Button } from "@mui/material";

const NewBox = styled(Box)(({theme}) => ({
    width: "95%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    height: "70vh",
    paddingTop: "5vh",
    marginBottom: "2vh",
    paddingLeft: "2vw"
}))

const TitleBox = styled(Box)(({theme}) => ({
    width: "40%",
    fontSize: "50px",
    marginBottom: "5vh",
    fontWeight: "600"
}))

const HeroSection = () => {
  return (
    <NewBox>
        <TitleBox>
            Hire the Skilled, Experienced and Qualified Candidates for your Company.
        </TitleBox>

        <Button variant="contained" style={{fontWeight: "bold"}} color="warning">Start Posting Job</Button>
    </NewBox>
  )
}

export default HeroSection