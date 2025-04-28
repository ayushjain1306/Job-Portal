import React, { useState } from 'react'
import { Box, styled, Typography, Backdrop, CircularProgress, InputAdornment, TextField, Button } from '@mui/material'
import { Lock, AccountCircle } from '@mui/icons-material'
import { adminLogin } from '../../../services/admin/adminAccount'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

const NewBox = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    height: "70vh",
    width: "50%",
    [theme.breakpoints.down('sm')]: {
        width: "70%"
    }
}))

const Title = styled(Typography)(({theme}) => ({
    padding: "3vh 0",
    boxShadow: "0px 8px 8px -3px rgba(0,0,0,0.2)",
    fontWeight: "600",
    textAlign: "center"
}))

const AnotherBox = styled(Box)(({theme}) => ({
    textAlign: "center",
    paddingTop: "5vh"
}))

const NewTextField = styled(TextField)(({theme}) => ({
    width: "90%",
}))

const Account = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await adminLogin(input);
    setLoading(false);

    if (result) navigate("/admin");
    else Swal.fire({ title: "Error", icon: "error", text: "Failed to Log In or Invalid Credentials." });
  }

  return (
    <NewBox>
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Title>Company Name and Logo</Title>

        <form onSubmit={handleClick}>
            <AnotherBox>
                <NewTextField
                    placeholder="Enter your Username"
                    variant="outlined"
                    id="username"
                    value={input.username}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
                    slotProps={{
                        input:{
                            startAdornment: (
                                <InputAdornment>
                                    <AccountCircle fontSize='small' style={{marginRight: "10px"}} />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <NewTextField
                    placeholder="Enter your Password"
                    variant="outlined"
                    id="password"
                    type="password"
                    value={input.password}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    required
                    slotProps={{
                        input:{
                            startAdornment: (
                                <InputAdornment>
                                    <Lock fontSize='small' style={{marginRight: "10px"}} />
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Button variant='contained' color="warning" type="submit" style={{ marginTop: "8vh", width: "90%", fontWeight: "bold" }}>Login</Button>
            </AnotherBox>
        </form>
    </NewBox>
  )
}

export default Account