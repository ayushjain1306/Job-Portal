import React, { useContext, useState, useEffect } from 'react';
import { Box, Backdrop, Tab, Button, CircularProgress, styled } from '@mui/material';
import { EmployerContext } from '../../../context/employer/EmployerProvider';
import { JobContext } from '../../../context/employer/JobProvider';
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { getEmployerJobs } from '../../../services/employer/jobs';
import AddJobDialog from './AddJobDialog';

const NewBox = styled(Box)(({theme}) => ({
    width: "95%",
    margin: "auto",
    paddingTop: "2vh"
}))

const JobBox = () => {
  const { setJobs } = useContext(JobContext);
  const { employer } = useContext(EmployerContext);
  const [loading, setLoading] = useState(false);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState('1');

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
    setOpen(true);
  }

  return (
    employer ? 
    <NewBox>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Button variant="contained" color="warning" onClick={handleClick}>Add New Job</Button>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Internships" value="1" />
                        <Tab label="Jobs" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {
                        filteredInternships.map((element, index) => {

                        })
                    }
                </TabPanel>
                <TabPanel value="2">
                    {
                        filteredJobs.map((element, index) => {

                        })
                    }
                </TabPanel>
            </TabContext>
        </Box>
        {
            open && <AddJobDialog open={open} setOpen={setOpen} />
        }
    </NewBox>
    :
    <NewBox>

    </NewBox>
  )
}

export default JobBox