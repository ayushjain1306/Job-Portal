import React, { useContext } from 'react';
import { Box, Chip, styled, Typography, Button } from '@mui/material';
import { Work, AccessTime, Place, CurrencyRupee } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { JobContext } from '../../../context/employer/JobProvider';

const NewBox = styled(Box)(({theme}) => ({
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
  width: "70%",
  margin: "auto",
  padding: "5vh 2% 2vh 2%",
  [theme.breakpoints.down('sm')]: {
      width: "85%"
  }
}))

const AnotherBox = styled(Box)(({theme}) => ({
  display: "flex",
  width: "50%",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "2vh"
}))

const JobDetails = () => {
  const { id } = useParams();
  const { job } = useContext(JobContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/employer/view-job-application/${id}`);
  }

  return (
    job 
    ?
    <NewBox>
      <Typography style={{ fontWeight: "600", fontSize: "20px" }}>{job.job_title}</Typography>
      <Typography style={{  }}>{job.employer_id.company_name}</Typography>

      <AnotherBox>
        <Box style={{display: "flex", alignItems: 'center', width: "30%"}}>
          <Work fontSize='small' style={{marginRight: "5px"}} /> {job.experience_required === 0 ? "Fresher" : job.experience_required}
        </Box>
        <Box style={{display: "flex", alignItems: 'center', width: "30%"}}>
          <CurrencyRupee fontSize='small' style={{marginRight: "5px"}} /> {job.salary}
        </Box>
      </AnotherBox>
      <AnotherBox>
        <Box style={{display: "flex", alignItems: 'center', width: "30%"}}>
          <Place fontSize='small' style={{marginRight: "5px"}} /> {job.location}
        </Box>
        <Box style={{display: "flex", alignItems: 'center', width: "30%"}}>
          <AccessTime fontSize='small' style={{marginRight: "5px"}} /> {job.duration}
        </Box>
      </AnotherBox>

      <Typography style={{ fontWeight: "bold", marginTop: "5vh" }}>Job Description</Typography>
      <Typography style={{ marginTop: "2vh", whiteSpace: "pre-line" }}>{job.job_description}</Typography>

      <Typography style={{ fontWeight: "bold", marginTop: "5vh", marginBottom: "2vh" }}>Skills Required</Typography>
      {
        job.skills.map((skill, index) => {
          return <Chip key={index} label={skill} style={{ marginRight: "10px", marginTop: "2vh" }} />
        })
      }

      <Box style={{ marginTop: "5vh", textAlign: "right" }}>
        <Button variant="contained" color="warning" onClick={handleClick}>View Applications</Button>
      </Box>
    </NewBox>
    :
    <Box style={{ height: "88vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography style={{ fontWeight: "600", fontSize: "20px" }}>Oops Page Not Found.</Typography>
    </Box>
  )
}

export default JobDetails