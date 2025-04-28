import React, { useEffect, useState } from 'react';
import { Box, Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Button, CircularProgress, styled } from "@mui/material";
import { getAllPlans, purchasePlan } from '../../../services/employer/payments';
import { useNavigate } from 'react-router-dom';
import { Discount, Close } from '@mui/icons-material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";

const NewBox = styled(Box)(({theme}) => ({
    height: "88vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const AnotherBox = styled(Box)(({theme}) => ({
    width: "80%",
    margin: "auto",
    minHeight: "88vh"
}))

const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    padding: "2vh 2%",
    marginBottom: "2vh"
}))

const InsideBox = styled(Box)(({theme}) => ({
    borderRadius: "3px",
    width: "80%",
    margin: "2vh 4%",
    padding: "2vh 6%",
    border: "1px solid lightgrey"
}))

const GridBox = styled(Box)(({theme}) => ({
    display: "grid",
    gridTemplateColumns: "20% 20% 20% 20% 20%",
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: "50% 50%"
    }
}))

const EmployerPayments = () => {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
        setLoading(true);
        const result = await getAllPlans();
        if (!result) navigate("/employer")

        setPlans(result);
        setLoading(false);
    }

    fetchPlans();
  }, []);

  return (
    loading ? 
    <NewBox>
        <CircularProgress />
    </NewBox>
    :
    plans && <AnotherBox>
        {
            plans.currentPlan && <StyledBox>
                <Typography style={{ fontWeight: "600", fontSize: "19px" }}>Your Plan</Typography>
                <GridBox>
                    <InsideBox>
                        <Typography style={{ marginBottom: "1vh", fontWeight: "600", display: "flex", alignItems: "center", }}><Discount style={{ paddingRight: "10px", color: "green" }} fontSize='small' />{plans.currentPlan.package_name}</Typography>
                        <Typography style={{ marginBottom: "1vh", color: "grey", fontSize: "15px" }}>{plans.currentPlan.package_description}</Typography>
                        <Typography style={{ marginTop: "1vh" }}>
                            <span style={{ color: "blue", fontWeight: "bold" }}>{"Rs. " + plans.currentPlan.price + " "}</span> for {plans.currentPlan.months} {plans.currentPlan.months > 1 ? "months" : "month"}
                        </Typography>
                        <Box style={{ textAlign: "right", marginTop: "1vh" }}>
                            <Button variant="outlined" color="warning" disabled>
                                Purchased
                            </Button>
                        </Box>
                    </InsideBox>
                </GridBox>
            </StyledBox>
        }

        <StyledBox>
            <Typography style={{ fontWeight: "600", fontSize: "19px" }}>All Plans For You</Typography>
            <GridBox>
                {
                    plans.otherPlans.map((element) => {
                        return (
                            <InsideBox key={element._id}>
                                <Typography style={{ marginBottom: "1vh", fontWeight: "600", display: "flex", alignItems: "center", }}><Discount style={{ paddingRight: "10px", color: "green" }} fontSize='small' />{element?.package_name}</Typography>
                                <Typography style={{ marginBottom: "1vh", color: "grey", fontSize: "15px" }}>{element?.package_description}</Typography>
                                <Typography style={{ marginTop: "1vh" }}>
                                    <span style={{ color: "blue", fontWeight: "bold" }}>{"Rs. " + element?.price + " "}</span> for {element?.months} {element?.months > 1 ? "months" : "month"}
                                </Typography>
                                <Box style={{ textAlign: "right", marginTop: "1vh" }}>
                                    <Button variant="outlined" disabled={plans.currentPlan} color="warning" onClick={() => {setPlan(element); setOpen(true);}}>
                                        {plans.currentPlan ? "Subscription Taken" : "Purchased"}
                                    </Button>
                                </Box>
                            </InsideBox>
                        )
                    })
                }
            </GridBox>
        </StyledBox>
        {
            open && <PaymentDialogBox open={open} setOpen={setOpen} plan={plan} />
        }
    </AnotherBox>
  )
}

const PaymentDialogBox = ({ open, setOpen, plan }) => {
    const [loading, setLoading] = useState(false);
  
    const handleClick = async () => {
      const data = {
        plan_id: plan._id,
        months: plan.months,
        amount: plan.price
      }

      setLoading(true);
      const result = await purchasePlan(data);
      setLoading(false);
  
      if (result) {
        setOpen(false);
        Swal.fire({ title: "Success", icon: "success", text: "Subscription Purchased Successful." });
      }
      else{
        setOpen(false);
        Swal.fire({ title: "Error", icon: "error", text: "Failed to Purchase the Subscription. Try Again Later." });
      }
    }

    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_SECRET_ID
    }
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle style={{width: "25vw", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          Purchase Plan <Close onClick={() => setOpen(false)} fontSize="large" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to purchase {plan.package_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons amount={plan.price} onApprove={handleClick} />
          </PayPalScriptProvider>
        </DialogActions>
      </Dialog>
    )
  }

export default EmployerPayments