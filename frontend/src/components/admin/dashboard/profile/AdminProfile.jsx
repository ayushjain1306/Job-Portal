import { useState } from "react";
import { Box, Dialog, CircularProgress, DialogTitle, DialogContent, DialogActions, Accordion, AccordionDetails, AccordionSummary, Button, styled, TextField } from "@mui/material";
import { ExpandMore, Close } from "@mui/icons-material";
import { changeCredentials } from "../../../../services/admin/adminProfile";
import Swal from "sweetalert2";

const HeadBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "96%",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "3vh 2%",
    fontSize: "25px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
        padding: "2vh 5%",
        width: "90%",
        margin: "auto",
        fontSize: "20px"
    }
  }))

const ProfileBox = styled(Box)(({ theme }) => ({
    marginTop: "3vh",
    [theme.breakpoints.down('sm')]: {
        width: "90%",
        margin: "auto",
        marginTop: "2vh"
    }
}))

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: "2vh",
    [theme.breakpoints.down('sm')]: {
        flexDirection: "column"
    }
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    width: "30vw",
    [theme.breakpoints.down('lg')]: {
        width: "100%"
    }
}))

const StyledLabel = styled('label')(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down('sm')]: {
        width: "60%"
    }
}))

const StyledInput = styled(TextField)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down('sm')]: {
        width: "60%",
        margin: "2vh 0vw"
    }
}))

function AdminProfile() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const handleClick = (value) => {
        if (password === "" && username === "") {
            return;
        }

        if (username === "") {
            setData({ password });
        }
        else {
            setData({ username });
        }

        setOpen(true);
    }

    return (
        <Box>
            <HeadBox>
                Profile Section
            </HeadBox>
            <ProfileBox>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Change Your Username
                    </AccordionSummary>
                    <AccordionDetails>
                        <form>
                            <StyledBox style={{ display: "flex" }}>
                                <StyledLabel>New Username</StyledLabel>
                                <StyledInput
                                    type="text"
                                    placeholder="Enter New Username"
                                    required
                                    size="small"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Button variant="contained" color="warning" onClick={() => handleClick()}>Change Username</Button>
                            </StyledBox>
                        </form>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Change Your Password
                    </AccordionSummary>
                    <AccordionDetails>
                        <form>
                            <StyledBox>
                                <StyledLabel>New Password</StyledLabel>
                                <StyledInput
                                    type="password"
                                    placeholder="Enter New Password"
                                    value={password}
                                    required
                                    size="small"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="contained" color="warning" onClick={() => handleClick()}>Change Password</Button>
                            </StyledBox>
                        </form>
                    </AccordionDetails>
                </Accordion>
                {
                    open && <DialogBox open={open} setOpen={setOpen} data={data} />
                }
            </ProfileBox>
        </Box>
    )
}

function DialogBox({ open, setOpen, data }) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleClick = async () => {
        if (password === "") {
            return;
        }

        setError("");

        const d = { password, credentials: data };

        setLoading(true);
        const response = await changeCredentials(d);
        setLoading(false);

        if (response === "Invalid Password.") {
            setError("Wrong Password.");
        }
        else if (response) {
            
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Credentials Updated Successfully.",
                confirmButtonText: "OK"
            })

            window.location.reload();
            setOpen(false);
        }
        else {
            
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong!",
                confirmButtonText: "OK"
            })
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <StyledDialogTitle>
                <Box style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    Enter Current Password
                    <Button style={{ color: "black" }} onClick={() => setOpen(false)}><Close /></Button>
                </Box>
            </StyledDialogTitle>
            <Box style={{ textAlign: "center" }}>
                {
                    loading && <CircularProgress />
                }
            </Box>
            <DialogContent>
                <form>
                    <Box>
                        <TextField
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            required
                            size="small"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "80%" }}
                        />
                        <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => handleClick()} color="warning">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AdminProfile;