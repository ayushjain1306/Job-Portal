import React from 'react';
import { Box, styled, Button } from "@mui/material";
import image2 from "../../../assets/image2.png";

const NewBox = styled(Box)(({theme}) => ({
    width: "95%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    height: "70vh",
    paddingTop: "5vh",
    paddingBottom: "5vh",
    marginBottom: "2vh",
    paddingLeft: "2vw",
    display: "flex",
    alignItems: "center"
}))

const TitleBox = styled(Box)(({theme}) => ({
    width: "80%",
    fontSize: "50px",
    marginBottom: "5vh",
    fontWeight: "600"
}))

const HeroSection = () => {
  return (
    <NewBox>
        <Box style={{width: "50%"}}>
          <TitleBox>
              Hire the Skilled, Experienced and Qualified Candidates for your Company.
          </TitleBox>

          <Button variant="contained" style={{fontWeight: "bold"}} color="warning">Start Posting Job</Button>
        </Box>
        <Box style={{width: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <img src={image2} alt="hero-pic" style={{ height: "70vh" }} />
        </Box>
    </NewBox>
  )
}

export default HeroSection