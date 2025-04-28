import React from 'react';
import { Box, styled, Divider, Typography } from "@mui/material";
import { Email, Smartphone } from '@mui/icons-material';

const NewBox = styled(Box)(({theme}) => ({
    display: "flex",
    backgroundColor: "#494949",
    alignItems: "center",
    color: "white",
    minHeight: "35vh",
    [theme.breakpoints.down('sm')]: {
        display: "block",
        paddingTop: "2vh"
    }
}))

const AnotherBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        paddingBottom: "2vh"
    }
}))

const NewAnotherBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    [theme.breakpoints.down('sm')]: {
        width: "100%"
    }
}))

const StyledBox = styled(Box)(({theme}) => ({
    width: "60%",
    [theme.breakpoints.down('sm')]: {
        width: "80%",
        flexDirection: "column"
    }
}))

const Footer = () => {
  return (
    <NewBox>
        <AnotherBox>
            <Typography style={{ fontSize: "25px" }}>Company Name and Logo</Typography>
        </AnotherBox>
        <NewAnotherBox>
            <StyledBox style={{ marginBottom: "2vh"}}>
                <Typography style={{ fontWeight: "bold", marginBottom: "2vh" }}>
                    About Company
                </Typography>
                <Typography style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet. Quis voluptates doloremque hic iste commodi id debitis quam,  illum? Libero?</Typography>
            </StyledBox>
            <StyledBox style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography style={{ display: "flex", alignItems: "center", marginBottom: "2vh" }}><Email fontSize="small" style={{ marginRight: "5px" }} />company@gmail.com</Typography>
                <Typography style={{ display: "flex", alignItems: "center" }}><Smartphone fontSize="small" style={{ marginRight: "5px" }} />+91 1234567890</Typography>
            </StyledBox>
        </NewAnotherBox>
    </NewBox>
  )
}

export default Footer