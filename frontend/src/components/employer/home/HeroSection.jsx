import React from 'react';
import { Box, styled, Button } from "@mui/material";
import image2 from "../../../assets/image2.png";
import { useNavigate } from 'react-router-dom';

const NewBox = styled(Box)(({theme}) => ({
    width: "95%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    minHeight: "70vh",
    paddingTop: "5vh",
    paddingBottom: "5vh",
    marginBottom: "2vh",
    paddingLeft: "2vw",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      display: "block",
      paddingTop: "3vh"
    }
}))

const TitleBox = styled(Box)(({theme}) => ({
    width: "80%",
    fontSize: "50px",
    marginBottom: "5vh",
    fontWeight: "600",
    [theme.breakpoints.down('sm')]: {
      fontSize: "30px"
    }
}))

const StyledBox = styled(Box)(({theme}) => ({
  width: "50%",
  [theme.breakpoints.down('sm')]: {
    width: "100%"
  }
}))

const Image = styled('img')(({theme}) => ({
  height: "70vh",
  [theme.breakpoints.down('sm')]: {
    height: "40vh"
  }
}))

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <NewBox>
        <StyledBox>
          <TitleBox>
              Hire the Skilled, Experienced and Qualified Candidates for your Company.
          </TitleBox>

          <Button variant="contained" style={{fontWeight: "bold"}} color="warning" onClick={() => navigate('/employer/jobs')}>Start Posting Job</Button>
        </StyledBox>
        <StyledBox style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Image src={image2} alt="hero-pic" />
        </StyledBox>
    </NewBox>
  )
}

export default HeroSection