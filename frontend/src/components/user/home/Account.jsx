import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Link, styled } from "@mui/material"
import { Close } from "@mui/icons-material";

const NewTextField = styled(TextField)(({theme}) => ({
    width: "25vw"
}))

const Account = ({ open, setOpen, setLoading, type, setType }) => {
  const [input, setInput] = useState({ name: "", email: "", password: "", phone: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const handleLogin = () => {

  }

  const handleSignup = () => {

  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={type ? handleLogin : handleSignup}>
            <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                { type ? "Login" : "Create Your Account" }
                <Close />
            </DialogTitle>
            <DialogContent>
                {
                    !type && <> <NewTextField required margin="normal" label="Name" id="name" value={input.name} onChange={handleChange} size="small" /> <br /> </>
                }
                <NewTextField required margin="normal" type="email" label="Email" id="email" value={input.email} onChange={handleChange} size="small" /> <br />

                {
                    !type && <> <NewTextField required margin="normal" type="number" label="Phone Number" id="phone" value={input.phone} onChange={handleChange} size="small" /> <br /> </>
                }

                <NewTextField required margin="normal" type="password" label="Password" id="password" value={input.password} onChange={handleChange} size="small" /> <br />
            </DialogContent>
            <DialogActions>
                <Link style={{ textDecoration: "none", cursor: "pointer", marginRight: "10px" }} onClick={() => setType(!type)}>{ type ? "Don't Have An Account?" : "Already Have An Account?" }</Link>
                <Button variant="contained" color="warning" type="submit">{ type ? "Login" : "Signup" }</Button>
            </DialogActions>
        </form>
    </Dialog>
  )
}

export default Account