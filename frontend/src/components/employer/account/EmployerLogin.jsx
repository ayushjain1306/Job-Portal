import React, { useState } from 'react'
import { Box, Typography, Backdrop, CircularProgress, Button, InputAdornment, TextField, styled } from '@mui/material'
import { Email, Lock,  } from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../../services/employer/account'
import Swal from "sweetalert2";

const NewBox = styled(Box)(({theme}) => ({
    backgroundColor: "#ebebe9",
    height: "100vh",
    width: "100%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center"
}))

const AnotherBox = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    height: "60vh",
    width: "30%",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    textAlign: "center"
}))

const HeadTitle = styled(Typography)(({theme}) => ({
    backgroundColor: "white",
    height: "10vh",
    borderRadius: "3px",
    boxShadow: "0px 8px 8px -3px rgba(0,0,0,0.2)",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    marginBottom: "2vh"
}))

const NewTextField = styled(TextField)(({theme}) => ({
    width: "85%"
}))

const EmployerLogin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const result = await login(input);
    setLoading(false);

    if (result) navigate("/employer")
    else Swal.fire({ title: "Error", icon: "error", text: "Failed to Log In or Invalid Credentials." })
  }

  return (
    <NewBox>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <AnotherBox>
            <HeadTitle>Company Name and Logo</HeadTitle>

            <form onSubmit={handleSubmit}>
                <NewTextField
                    label="Email"
                    value={input.email}
                    type="email"
                    size="small"
                    margin="normal"
                    id="email"
                    onChange={handleChange}
                    required
                    slotProps={{
                        input:{
                            startAdornment: (
                                <InputAdornment>
                                    <Email fontSize='small' style={{marginRight: "10px"}} />
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <NewTextField
                    label="Password"
                    value={input.password}
                    type="password"
                    size="small"
                    margin="normal"
                    id="password"
                    onChange={handleChange}
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

                <Button variant="contained" color="primary" type="submit" style={{ fontWeight: "bold", width: "70%", marginTop: "2vh" }}>Login</Button>
                <Button variant="outlined" color="warning" onClick={() => navigate("/employer/registration")} style={{ fontWeight: "bold", width: "70%", marginTop: "2vh", marginBottom: "2vh" }}>Don't Have An Account?</Button> <br />
                <Link to="/employer" style={{ color: "blue", textDecoration: "none" }}>Back to HomePage</Link>
            </form>
        </AnotherBox>
    </NewBox>
  )
}

export default EmployerLogin