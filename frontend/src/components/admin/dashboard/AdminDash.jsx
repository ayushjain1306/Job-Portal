import React, { useState, useContext, useEffect } from 'react';
import { Box, CircularProgress, Typography, MenuItem, TextField, styled } from "@mui/material";
import { AdminContext } from "../../../context/admin/AdminProvider";
import { getDashboardData, getSalesData, getTopSellingSubscriptions, getYears } from '../../../services/admin/adminDashboard';
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Tooltip, Legend } from "recharts";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "25% 25% 25% 25%",
  paddingTop: "3vh",
  [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: "50% 50%",
      padding: "2vh"
  }
}))

const CardBox = styled(Box)(({ theme }) => ({
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
  padding: "10px",
  textAlign: "left",
  width: "90%",
  margin: "auto",
  height: "20vh",
  [theme.breakpoints.down('sm')]: {
      marginTop: "2vh",
      height: "15vh"
  },
  [theme.breakpoints.between('sm', 'lg')]: {
      height: "13vh"
  }
}))

const StyledHeading = styled('h4')(({theme}) => ({
  textAlign: "left",
  [theme.breakpoints.down('sm')]: {
      width: "90%",
      margin: "auto"
  }
}))

const NewTextField = styled(TextField)(({ theme }) => ({
  width: "50%",
  margin: "auto",
  marginBottom: "3vh",
  marginTop: "2vh"
}))

const StyledDiv = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
  width: "55%",
  padding: "2vh 2vw",
  [theme.breakpoints.down('sm')]: {
      width: "90%",
      margin: "auto"
  }
}))

const AnotherStyledBox = styled(Box)(({theme}) => ({
  paddingTop: "5vh",
  display: "flex",
  paddingBottom: "5vh",
  justifyContent: "space-between",
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}))

const AnotherBox = styled(Box)(({theme}) => ({
  width: "32%",
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
  padding: "2vh 2vw",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    margin: "auto",
    marginTop: "4vh",
    minHeight: "45vh"
  }
}))

const AnotherNewBox = styled('div')(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #e3e3e3",
  padding: "1.5vh 1vw"
}))

const AdminDash = () => {
  const { admin } = useContext(AdminContext);
  
  return (
    <Box style={{ height: "100vh", width: "100%" }}>
      <Typography style={{ fontSize: "25px", fontWeight: "600" }}>
        Hi { admin.name },
      </Typography>
      <DashboardData />
      <AnotherStyledBox>
        <SalesAnalytics />
        <SubscriptionsAnalytics />
      </AnotherStyledBox>
    </Box>
  )
}

const DashboardData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      const result = await getDashboardData();
      setData(result);
      setLoading(false)
    }

    fetchDetails();
  }, []);

  return (
    !loading ?
    <StyledBox>
      <CardBox sx={{ color: "white", bgcolor: "success.main" }}>
        <Typography style={{fontWeight: "600", fontSize: "18px"}}>Total Sales</Typography>
        <Typography>Rs. {data?.amount}</Typography>
      </CardBox>
      <CardBox sx={{ color: "white", bgcolor: "warning.main" }}>
        <Typography style={{fontWeight: "600", fontSize: "18px"}}>Total Jobs</Typography>
        <Typography>{data?.jobs}</Typography>
      </CardBox>
      <CardBox sx={{ color: "white", bgcolor: "error.main" }}>
        <Typography style={{fontWeight: "600", fontSize: "18px"}}>Total Employers</Typography>
        <Typography>{data?.employees}</Typography>
      </CardBox>
      <CardBox sx={{ color: "white", bgcolor: "primary.main" }}>
        <Typography style={{fontWeight: "600", fontSize: "18px"}}>Total Job Seekers</Typography>
        <Typography>{data?.users}</Typography>
      </CardBox>
    </StyledBox>
    :
    <Box style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "10vh" }}><CircularProgress /></Box>
  )
}

const SalesAnalytics = () => {
  const [years, setYears] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchSalesData = async () => {
      const result = await getSalesData();
      const currentDate = new Date().getFullYear();

      setData(result[currentDate]);
      setSalesData(result);
    }

    const fetchYears = async () => {
      const result = await getYears();
      if (result.length > 0) setInput(result[result.length-1]);
      setYears(result);
    }

    fetchYears();
    fetchSalesData();
  }, [])

  const handleChange = (e) => {
    setInput(e.target.value);
    setData(salesData[e.target.value]);
  }

  return (
    years.length > 0 && <StyledDiv>
      <Typography style={{ fontSize: "20px" }}>Sales Data</Typography>
      <NewTextField
        value={input}
        onChange={handleChange}
        size="small"
        select
      >
        {
          years.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)
        }
      </NewTextField>
      <div style={{overflowX: "auto"}}>
        <LineChart
          height={300}
          width={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sale" stroke="#1100ab" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </StyledDiv>
  )
}

const SubscriptionsAnalytics = () => {
  const [plansData, setPlansData] = useState([]);

  useEffect(() => {
    const fetchPlansData = async () => {
      const result = await getTopSellingSubscriptions();
      setPlansData(result);
    }

    fetchPlansData();
  }, []);

  return (
    <AnotherBox>
      <Typography style={{marginBottom: "2vh", fontSize: "20px"}}>Top Subscriptions</Typography>
        {
          plansData.length > 0 ?
            plansData.map((data, index) => {
              return (
                <AnotherNewBox key={index}>
                  <Typography>
                    {data._id.length > 30 ? data._id.substring(0, 30) + "..." : data._id }
                  </Typography>
                  <Typography>
                    {data.totalSales}
                  </Typography>
                </AnotherNewBox>
              )
            })
            :
            <div>
              No Subscriptions to be Shown.
            </div>
        }
    </AnotherBox>
  )
}

export default AdminDash