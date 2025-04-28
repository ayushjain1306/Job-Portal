import React from 'react';
import { AppBar, Toolbar, Drawer, Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu } from '@mui/icons-material';

const FirstSection = styled(Box)(({theme}) => ({
    width: "30%",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "18px",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        display: 'flex',
        alignItems: "center"
    }
}))

const SecondSection = styled(Box)(({theme}) => ({
    width: "40%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
        display: "none"
    }
}))

const MenuIcon = styled(Menu)(({theme}) => ({
    [theme.breakpoints.up('sm')]: {
        display: "none"
    }
}))

const Header = ({ InsideSecondSection }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <AppBar style={{ backgroundColor: "white", height: "10vh", width: "100%", color: "black" }}>
        <Toolbar style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between", height: "10vh", width: "100%", color: "black", padding: 0, margin: 0 }}>
            <FirstSection>
                <MenuIcon fontSize='large' style={{ marginLeft: "10px", marginRight: '10px' }} onClick={() => setOpen(true)} />
                <Link to="/" style={{ color: "inherit", textDecoration: 'inherit' }}>Company Name and Logo</Link>
            </FirstSection>
            <SecondSection>
                <InsideSecondSection />
            </SecondSection>
        </Toolbar>
        <Drawer open={open} onClose={() => setOpen(false)}>
            <InsideSecondSection />
        </Drawer>
    </AppBar>
  )
}

export default Header