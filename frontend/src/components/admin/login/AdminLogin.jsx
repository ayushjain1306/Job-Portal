import React from 'react';
import { Box, styled } from "@mui/material";
import Image from "../../../assets/image1.png";
import Account from './Account';

const NewBox = styled(Box)(({theme}) => ({
    height: "100vh",
    width: "100%",
    display: "flex"
}))

const AnotherBox = styled(Box)(({theme}) => ({
    width: "50%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebebe9"
}))

const ImageStyle = styled('img')(({theme}) => ({
    height: "80vh",
    width: "70%"
}))

const AdminLogin = () => {
  return (
    <NewBox>
        <AnotherBox>
            <ImageStyle src={Image} alt="admin-login" />
        </AnotherBox>
        <AnotherBox>
            <Account />
        </AnotherBox>
    </NewBox>
  )
}

export default AdminLogin