import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, CircularProgress, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getAllPayments } from '../../../../services/admin/adminPayments';

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

const PaymentsBox = styled(Box)(({ theme }) => ({
  marginTop: "3vh",
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
  [theme.breakpoints.down('sm')]: {
      width: "90%",
      margin: "auto",
      marginTop: "2vh"
  }
}))

const headers = [ "Sr. No.", "Employer Name", "Company Name", "Subscription", "Amount" ];

const AdminWallet = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      const result = await getAllPayments();
      setPayments(result);
      setLoading(false);
    }

    fetchPayments();
  }, []);

  return (
    <Box>
      <HeadBox>
        <Typography style={{fontSize: "inherit"}}>All Payemnts</Typography>
      </HeadBox>
      <PaymentsBox>
        {
          loading ? 
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>
          :
          payments.length > 0 ?
          <Table>
            <TableHead>
              <TableRow>
                {
                  headers.map((element, index) => {
                    return <TableCell key={index} style={{fontWeight: "bold"}} align="center">{element}</TableCell>
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                payments.map((payment, index) => {
                  return (
                    <TableRow key={payment._id}>
                      <TableCell align="center">{index+1}</TableCell>
                      <TableCell align="center">{payment.employer_id.name}</TableCell>
                      <TableCell align="center">{payment.employer_id.company_name}</TableCell>
                      <TableCell align="center">{payment.plan_id.package_name}</TableCell>
                      <TableCell align="center">{payment.amount}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
          :
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}>No Payments to Show.</Box>
          
        }
      </PaymentsBox>
    </Box>
  )
}



export default AdminWallet