import React from 'react';
import { Box, styled, Divider, Typography } from "@mui/material";
import { Email, Smartphone } from '@mui/icons-material';

const NewBox = styled(Box)(({theme}) => ({
    display: "flex",
    backgroundColor: "#494949",
    alignItems: "center",
    color: "white",
    minHeight: "30vh"
}))

const AnotherBox = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: "column",
    alignItems: "center"
}))

const Footer = () => {
  return (
    <NewBox>
        <AnotherBox style={{ width: "40%" }}>
            <Typography style={{ fontSize: "25px" }}>Company Name and Logo</Typography>
        </AnotherBox>
        <AnotherBox style={{ width: "60%" }}>
            <Box style={{width: "60%", marginBottom: "2vh"}}>
                <Typography style={{ fontWeight: "bold", marginBottom: "2vh" }}>
                    About Company
                </Typography>
                <Typography>Lorem ipsum dolor sit amet. Quis voluptates doloremque hic iste commodi id debitis quam,  illum? Libero?</Typography>
            </Box>
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "60%" }}>
                <Typography style={{ display: "flex", alignItems: "center" }}><Email fontSize="small" style={{ marginRight: "5px" }} />company@gmail.com</Typography>
                <Typography style={{ display: "flex", alignItems: "center" }}><Smartphone fontSize="small" style={{ marginRight: "5px" }} />+91 1234567890</Typography>
            </Box>
        </AnotherBox>
    </NewBox>
  )
}

export default Footer