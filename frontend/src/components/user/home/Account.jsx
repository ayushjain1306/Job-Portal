import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Backdrop, CircularProgress, Button, TextField, Link, styled } from "@mui/material"
import { Close } from "@mui/icons-material";
import { userLogin, userSignup } from '../../../services/user/account';
import Swal from "sweetalert2";

const NewTextField = styled(TextField)(({theme}) => ({
    width: "25vw"
}))

const Account = ({ open, setOpen, type, setType }) => {
  const [input, setInput] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    const result = await userLogin({ email: input.email, password: input.password });
    setLoading(false);

    if (result) {
        window.location.href="/";
    }
    else {
        Swal.fire({ title: "Error", icon: "error", text: "Failed to Log In. Try Again Later!" })
    }
    setOpen(false);
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    const result = await userSignup(input);
    setLoading(false);

    if (result === "Email Already Exists.") Swal.fire({ title: "Error", icon: "error", text: "Email Already Exists." })
    else if (result === "Phone Number Already Exists.") Swal.fire({ title: "Error", icon: "error", text: "Phone Number Already Exists." })
    else if (result) {
        Swal.fire({ title: "Success", icon: "success", text: "Signup Successful." });
    }
    else {
        Swal.fire({ title: "Error", icon: "error", text: "Failed to Log In. Try Again Later!" })
    }

    setInput({ name: "", email: "", password: "", phone: "" })

    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <form onSubmit={type ? handleLogin : handleSignup}>
            <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
                { type ? "Login" : "Create Your Account" }
                <Close onClick={() => setOpen(false)} />
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