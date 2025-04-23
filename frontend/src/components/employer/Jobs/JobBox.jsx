import React, { useContext, useState, useEffect } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Backdrop, Typography, Divider, Tab, Button, CircularProgress, styled } from '@mui/material';
import { CalendarMonth } from "@mui/icons-material";
import { EmployerContext } from '../../../context/employer/EmployerProvider';
import { JobContext } from '../../../context/employer/JobProvider';
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { changeJobStatus, getEmployerJobs } from '../../../services/employer/jobs';
import AddJobDialog from './AddJobDialog';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const NewBox = styled(Box)(({theme}) => ({
    width: "95%",
    margin: "auto",
    paddingTop: "2vh"
}))

const AnotherBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}))

const StyledBox = styled(Box)(({theme}) => ({
    width: "60%",
    marginBottom: "2vh",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    backgroundColor: "white"
}))

const JobBox = () => {
  const { setJobs } = useContext(JobContext);
  const { employer } = useContext(EmployerContext);
  const [loading, setLoading] = useState(false);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [id, setId] = useState('');
  const [value, setValue] = React.useState('1');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchEmployerJobs = async () => {
        setLoading(true);
        const result = await getEmployerJobs();
        setJobs(result);
        setFilteredInternships(result.filter((element) => element.type === "Internship"))
        setFilteredJobs(result.filter((element) => element.type === "Job"))
        setLoading(false);
    }

    fetchEmployerJobs();
  }, []);

  const handleClick = () => {
    if (employer.subscription_plan !== "" && new Date(employer.last_date_plan) >= new Date()) 
        setOpen(true);

    else navigate("/employer/payments")
  }

  return (
    employer ? 
    <NewBox>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Box style={{ textAlign: "right" }}>
            <Button variant="contained" color="warning" onClick={handleClick}>Add New Job</Button>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} centered aria-label="lab API tabs example">
                        <Tab label="Internships" value="1" />
                        <Tab label="Jobs" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <AnotherBox>
                        {
                            filteredInternships.length > 0 ?
                            filteredInternships.map((element, index) => {
                                return (
                                    <StyledBox key={index}>
                                        <Box style={{display: "flex", justifyContent: "space-between", padding: "2vh 2% 2vh 2%"}}>
                                            <Typography style={{fontWeight: "600"}}>{element.job_title}</Typography>
                                            <Typography color={element.job_status === "Pending" ? 
                                                    "warning"
                                                    :
                                                    element.job_status === "Approved" ?
                                                    "success"
                                                    :
                                                    "error"}>
                                                {
                                                    element.job_status === "Pending" ? 
                                                    "Under Processing"
                                                    :
                                                    element.job_status === "Approved" ?
                                                    "Approved"
                                                    :
                                                    "Rejected"
                                                }
                                            </Typography>
                                        </Box>
                                        <Box style={{ display: "flex", alignItems: "center", paddingLeft: "2%", paddingBottom: "2vh" }}>
                                            <CalendarMonth fontSize='small' style={{ marginRight: "10px" }} /> { element.duration }
                                        </Box>
                                        <Divider />
                                        <Box style={{display: "flex", justifyContent: "space-between", padding: "2vh 2%"}}>
                                            {
                                                element.close_status ? 
                                                <Button disabled>Job Closed</Button>
                                                :<Button onClick={() => {setId(element._id); setOpenChange(true);}}>Close Job</Button>}
                                            <Button>View Applications</Button>
                                        </Box>
                                    </StyledBox>
                                )
                            })
                            :
                            "You haven't added any Internship."
                        }
                    </AnotherBox>
                </TabPanel>
                <TabPanel value="2">
                    <AnotherBox>
                        {
                            filteredJobs.length > 0 ?
                            filteredJobs.map((element, index) => {
                                return (
                                    <StyledBox key={index}>
                                        <Box style={{display: "flex", justifyContent: "space-between", padding: "2vh 2% 2vh 2%"}}>
                                            <Typography style={{fontWeight: "600"}}>{element.job_title}</Typography>
                                            <Typography color={element.job_status === "Pending" ? 
                                                    "warning"
                                                    :
                                                    element.job_status === "Approved" ?
                                                    "success"
                                                    :
                                                    "error"}>
                                                {
                                                    element.job_status === "Pending" ? 
                                                    "Under Processing"
                                                    :
                                                    element.job_status === "Approved" ?
                                                    "Approved"
                                                    :
                                                    "Rejected"
                                                }
                                            </Typography>
                                        </Box>
                                        <Box style={{ display: "flex", alignItems: "center", paddingLeft: "2%", paddingBottom: "2vh" }}>
                                            <CalendarMonth fontSize='small' style={{ marginRight: "10px" }} /> { element.duration }
                                        </Box>
                                        <Divider />
                                        <Box style={{display: "flex", justifyContent: "space-between", padding: "2vh 2%"}}>
                                            {
                                                element.close_status ? 
                                                <Button disabled>Job Closed</Button>
                                                :<Button onClick={() => {setId(element._id); setOpenChange(true);}}>Close Job</Button>}
                                            <Button>View Applications</Button>
                                        </Box>
                                    </StyledBox>
                                )
                            })
                            :
                            "You haven't added any Job."
                        }
                    </AnotherBox>
                </TabPanel>
            </TabContext>
        </Box>
        {
            open && <AddJobDialog open={open} setOpen={setOpen} />
        }

        {
            openChange && <ChangeJobStatus open={openChange} setOpen={setOpenChange} _id={id} />   
        }
    </NewBox>
    :
    <NewBox>
        <NavigateComponent />
    </NewBox>
  )
}

const ChangeJobStatus = ({ open, setOpen, _id }) => {
    const [loading, setLoading] = useState(false);
  
    const handleClick = async () => {
      setLoading(true);
      const result = await changeJobStatus(_id);
      setLoading(false);
  
      if (result) {
        setOpen(false);
        Swal.fire({ title: "Success", icon: "success", text: "Job Closed Successfully." });
      }
      else{
        setOpen(false);
        Swal.fire({ title: "Error", icon: "error", text: "Failed to close the Job. Try Again Later." });
      }
    }
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>
          Close the Job
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to close this job? You can't reopen this.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleClick}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

const NavigateComponent = () => {
    const navigate = useNavigate();

    useEffect(() => navigate("/employer/login"), []);

    return null;
}

export default JobBox