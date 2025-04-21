import React, { useState, useEffect } from 'react'
import { Box, Button, Backdrop, Typography, CircularProgress, styled, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import { addSubs, deleteSubs, getSubs } from '../../../../services/admin/adminSubscriptions';
import { Discount, Delete } from "@mui/icons-material";
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

const SubscriptionBox = styled(Box)(({ theme }) => ({
  marginTop: "3vh",
  [theme.breakpoints.down('sm')]: {
      width: "90%",
      margin: "auto",
      marginTop: "2vh"
  }
}))

const AnotherBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "25% 25% 25% 25%"
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
  borderRadius: "3px",
  width: "88%",
  margin: "2vh 2%",
  padding: "2vh 4%"
}))

const NewTextField = styled(TextField)(({theme}) => ({
  width: "25vw"
}))

const elements = [
  {
    id: 1,
    package_name: "Basic Plan",
    package_description: "The basic plans for employers hiring using our services first time.",
    price: "500",
    months: 1
  },
  {
    id: 2,
    package_name: "Premium Plan",
    package_description: "The basic plans for employers hiring using our services first time.",
    price: "2000",
    months: 3
  }
]

const AdminSub = () => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      const result = await getSubs();
      setSubs(result);
      setLoading(false);
    }

    fetchPlans();
  }, []);

  return (
    <Box>
      <HeadBox>
        <Typography style={{fontSize: "inherit"}}>Subscriptions</Typography>
        <Button variant='contained' color="warning" onClick={() => setOpen(true)} style={{ fontWeight: "bold" }}>Add New Pricing Plan</Button>
      </HeadBox>
      <SubscriptionBox>
        {
          loading ? 
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>
          :
          subs.length > 0 ?
          <AnotherBox>
            {
              subs.map((element, index) => {
                return (
                  <StyledBox key={index}>
                    <Typography style={{ marginBottom: "1vh", fontWeight: "600", display: "flex", alignItems: "center", }}><Discount style={{ paddingRight: "10px", color: "green" }} fontSize='small' />{element?.package_name}</Typography>
                    <Typography style={{ marginBottom: "1vh", color: "grey", fontSize: "15px" }}>{element?.package_description}</Typography>
                    <Typography style={{ marginTop: "1vh" }}>
                      <span style={{ color: "blue", fontWeight: "bold" }}>{"Rs. " + element?.price + " "}</span> for {element?.months} {element?.months > 1 ? "months" : "month"}
                    </Typography>
                    <Box style={{ textAlign: "right", marginTop: "1vh" }}>
                      <Button variant="outlined" color="primary" onClick={() => { setId(element._id); setOpenDel(true); }}>
                        <Delete style={{ color: "black" }} />
                      </Button>
                    </Box>
                  </StyledBox>
                )
              })
            }
          </AnotherBox>
          :
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}>No Subscription Plans to Show.</Box>
          
        }
      </SubscriptionBox>

      {
        open && <DialogBox open={open} setOpen={setOpen} />
      }

      {
        openDel && <DeleteDialogBox open={openDel} setOpen={setOpenDel} _id={id} />
      }
    </Box>
  )
}

const DialogBox = ({ open, setOpen }) => {
  const [input, setInput] = useState({ package_name: "", package_description: "", months: "", price: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const temp = { ...input, months: parseInt(input.months), price: parseInt(input.price) }

    setLoading(true);
    const result = await addSubs(temp);
    setLoading(false);

    if (result) {
      setOpen(false);
      Swal.fire({ title: "Success", icon: "success", text: "Plan Added Successfully." });
    }
    else{
      setOpen(false);
      Swal.fire({ title: "Error", icon: "error", text: "Failed to add the Plan. Try Again Later." });
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>
        Add New Subscription Plan
      </DialogTitle>
      <form onSubmit={handleClick}>
        <DialogContent>
          <NewTextField 
            label="Subscription Title"
            id="package_name"
            value={input.package_name}
            onChange={handleChange}
            margin='normal'
            required
            size='small'
          /> <br />
          <NewTextField 
            label="Subscription Description"
            id="package_description"
            value={input.package_description}
            onChange={handleChange}
            margin='normal'
            required
            size='small'
          /> <br />
          <NewTextField 
            label="Month"
            id="months"
            value={input.months}
            onChange={handleChange}
            margin='normal'
            required
            size='small'
          /> <br />
          <NewTextField 
            label="Price"
            id="price"
            value={input.price}
            onChange={handleChange}
            margin='normal'
            required
            size='small'
          /> <br />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="warning" type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const DeleteDialogBox = ({ open, setOpen, _id }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await deleteSubs(_id);
    setLoading(false);

    if (result) {
      setOpen(false);
      Swal.fire({ title: "Success", icon: "success", text: "Plan Deleted Successfully." });
    }
    else{
      setOpen(false);
      Swal.fire({ title: "Error", icon: "error", text: "Failed to Delete the Plan. Try Again Later." });
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>
        Delete Subscription Plan
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this plan? This step is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleClick}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminSub