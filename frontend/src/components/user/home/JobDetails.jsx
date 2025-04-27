import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Chip, styled, Typography, Button } from '@mui/material';
import { Work, AccessTime, Place, CurrencyRupee } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobDetails } from '../../../services/user/jobs';
import { UserContext } from '../../../context/user/UserProvider';
import Account from './Account';
import { checkApplication } from '../../../services/user/jobApplication';
import { JobsContext } from '../../../context/user/JobsProvider';

const NewBox = styled(Box)(({theme}) => ({
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
  width: "70%",
  margin: "auto",
  padding: "5vh 2% 2vh 2%"
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
  const { user } = useContext(UserContext);
  const { setQuestion } = useContext(JobsContext);
  const [type, setType] = useState("Login");
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appStatus, setAppStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      const result = await getJobDetails(id);
      setJob(result);
      setLoading(false);
    }

    const fetchJobStatus = async () => {
      const result = await checkApplication(id);
      setAppStatus(result);
    }

    fetchJobDetails();
    fetchJobStatus();
  }, []);

  const handleClick = () => {
    if (!user) {
      setOpen(true);
    }
    else {
      setQuestion(job?.questions);
      navigate(`/apply-for-job/${id}`);
    }
  }

  return (
    loading ?
    <Box style={{ height: "88vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>
    :
    job && JSON.stringify(job) !== "{}"
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
          return <Chip key={index} label={skill} style={{ marginRight: "10px" }} />
        })
      }

      <Box style={{ marginTop: "5vh", textAlign: "right" }}>
        {
          appStatus 
          ?
          <Button disabled>Already Applied</Button>
          :
          <Button variant="contained" color="warning" onClick={handleClick}>Apply For Job</Button>
        }
      </Box>
      {
        open && <Account open={open} setOpen={setOpen} type={type} setType={setType} />
      }
    </NewBox>
    :
    <Box style={{ height: "88vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography style={{ fontWeight: "600", fontSize: "20px" }}>Oops Page Not Found.</Typography>
    </Box>
  )
}

export default JobDetails