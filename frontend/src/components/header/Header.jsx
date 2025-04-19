import React from 'react';
import { AppBar, Toolbar, Box, styled } from "@mui/material";

const FirstSection = styled(Box)(({theme}) => ({
    width: "30%",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "18px"
}))

const SecondSection = styled(Box)(({theme}) => ({
    width: "40%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
}))

const Header = ({ InsideSecondSection }) => {
  return (
    <AppBar style={{ backgroundColor: "white", height: "10vh", width: "100%", color: "black" }}>
        <Toolbar style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between", height: "10vh", width: "100%", color: "black", padding: 0, margin: 0 }}>
            <FirstSection>
                Company Name and Logo
            </FirstSection>
            <SecondSection>
                <InsideSecondSection />
            </SecondSection>
        </Toolbar>
    </AppBar>
  )
}

export default Header