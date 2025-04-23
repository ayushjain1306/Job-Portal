import React, { useState, useEffect } from 'react'
import { Box, Button, Backdrop, MenuItem, Typography, CircularProgress, styled, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { getJobs } from '../../../../services/admin/adminJobs';
import Table from "../../../../utils/Table";
import ViewJobsDialog from './ViewJobsDialog';

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

const JobBox = styled(Box)(({ theme }) => ({
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

const AnotherBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "25% 25% 25% 25%"
}))

const NewTextField = styled(TextField)(({ theme }) => ({
  width: "20%"
}))

const filters = [
  {
    value: "All",
    element: "All Jobs"
  },
  {
    value: "Pending",
    element: "Pending Jobs"
  },
  {
    value: "Approved",
    element: "Approved Jobs"
  },
  {
    value: "Rejected",
    element: "Rejected Jobs"
  }
]
const headers = [ "Sr. No.", "Title", "Status", "Type", "Actions" ]
const targets = [ "Sr. No.", "job_title", "job_status", "type", "action" ]
const actions = [ "View" ]

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(false);
  const [filter, setFilter] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const result = await getJobs();
      setJobs(result);
      setFilteredJobs(result);
      setLoading(false);
    }

    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);

    if (e.target.value === "All") {
      setFilteredJobs(jobs);
      return;
    }

    setFilteredJobs(jobs.filter((job) => job.job_status === e.target.value));  
  }

  const handleView = (job) => {
    setJob(job);

    setOpen(true);
  }

  return (
    <Box>
      <HeadBox>
        <Typography style={{fontSize: "inherit"}}>All Jobs</Typography>
        <NewTextField
          value={filter}
          onChange={handleChange}
          size="small"
          select
        >
          {
            filters.map((fil, index) => {
              return (
                <MenuItem key={index} value={fil.value}>
                  {fil.element}
                </MenuItem>
              )
            })
          }
        </NewTextField>
      </HeadBox>
      <JobBox>
        {
          loading ? 
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>
          :
          filteredJobs.length > 0 ?
          <Table data={filteredJobs} headers={headers} targets={targets} actions={actions} handleView={handleView} />
          :
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}>No Jobs to Show.</Box>
          
        }
      </JobBox>

      {
        open && <ViewJobsDialog open={open} setOpen={setOpen} job={job} />
      }
    </Box>
  )
}

export default AdminJobs