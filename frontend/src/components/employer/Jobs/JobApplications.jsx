import React, { useEffect, useState } from 'react';
import { Box, Backdrop, Typography, CircularProgress, Button, Chip, Link, Tab, styled } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from 'react-router-dom';
import { getJobApplications, hireApplication, shortlistApplication } from '../../../services/employer/jobApplications';
import { Email, Smartphone } from '@mui/icons-material';
import Swal from 'sweetalert2';

const NewBox = styled(Box)(({theme}) => ({
  width: "97%",
  margin: "auto",
  minHeight: "88vh"
}))

const AnotherBox = styled(Box)(({theme}) => ({
  width: "60%",
  borderRadius: "3px",
  backgroundColor: "white",
  boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
  padding: "2vh 2%",
  margin: "auto",
  marginBottom: "2vh",
  [theme.breakpoints.down('sm')]: {
      width: "80%"
  }
}))

const JobApplications = () => {
  const { id } = useParams();
  const [value, setValue] = useState('1');
  const [jobApps, setJobApps] = useState([]);
  const [shortApps, setShortApps] = useState([]);
  const [hireApps, setHireApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loadAgain, setLoadAgain] = useState(1);

  useEffect(() => {
    const fetchJobApps = async () => {
      setLoading(true);
      const result = await getJobApplications(id);
      setJobApps(result.filter((apps) => apps.application_status === "Pending"));
      setShortApps(result.filter((apps) => apps.application_status === "Shortlisted"));
      setHireApps(result.filter((apps) => apps.application_status === "Hired"));
      setLoading(false);
    }

    fetchJobApps();
  }, [loadAgain]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = async (appId, type) => {
    setButtonLoading(true);
    const result = await ( type === "Shortlist" ? shortlistApplication(appId) : hireApplication(appId, id) );
    setButtonLoading(false);

    if (result) {
      setLoadAgain(loadAgain+1);
      Swal.fire({ title: "Success", icon: "success", text: "Success." })
    }
    else {
      Swal.fire({ title: "Error", icon: "error", text: "Error." })
    }
  }

  return (
    <NewBox>
      <Backdrop open={buttonLoading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {
        !loading 
        ?
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} centered aria-label="lab API tabs example">
              <Tab label="All Applications" value="1" />
              <Tab label="Shortlisted" value="2" />
              <Tab label="Hired" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {
              jobApps.length > 0 
              ?
              jobApps.map((apps, index) => {
                return (
                  <AnotherBox key={index}>
                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Typography style={{ fontSize: "20px" }}>{apps.user_id.name}</Typography>
                      <Link href={apps.user_id.resume} target="_blank" style={{textDecoration: "none"}}>View resume</Link>
                    </Box>
                    <Box style={{marginTop: "2vh"}}>
                      {
                        apps.user_id.skills.map((skill, index) => {
                          return <Chip key={index} label={skill.skill} style={{ marginRight: "10px" }} />
                        })
                      }
                    </Box>
                    <Typography style={{ fontWeight: "bold", marginTop: "2vh" }}>Cover Letter</Typography>
                    <Typography style={{ whiteSpace: "pre-line", marginTop: "2vh" }}>{apps.cover_letter}</Typography>
                    <Typography style={{ fontWeight: "bold", marginTop: "2vh" }}>{apps.job_id.questions}</Typography>
                    <Typography style={{ whiteSpace: "pre-line", marginTop: "2vh" }}>{apps.answers_to_questions}</Typography>
                    <Box style={{ textAlign: "right", marginTop: "2vh" }}>
                      <Button disabled={hireApps.length > 0} onClick={() => handleClick(apps._id, "Shortlist")}>Shortlist Application</Button>
                    </Box>
                  </AnotherBox>
                )
              })
              :
              <Typography style={{ textAlign: "center" }}>No Job Applications to be Shown.</Typography>
            }
          </TabPanel>
          <TabPanel value="2">
            {
              shortApps.length > 0 
              ?
              shortApps.map((apps, index) => {
                return (
                  <AnotherBox key={index}>
                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Typography style={{ fontSize: "20px" }}>{apps.user_id.name}</Typography>
                      <Link href={apps.user_id.resume} target="_blank" style={{textDecoration: "none"}}>View resume</Link>
                    </Box>
                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "50%", marginTop: "2vh" }}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Email fontSize="small" style={{ marginRight: "10px" }} />{apps.user_id.email}
                      </Box>
                      <Box style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
                        <Smartphone fontSize="small" style={{ marginRight: "10px" }} />{apps.user_id.phone}
                      </Box>
                    </Box>
                    <Box style={{marginTop: "2vh"}}>
                      {
                        apps.user_id.skills.map((skill, index) => {
                          return <Chip key={index} label={skill.skill} style={{ marginRight: "10px" }} />
                        })
                      }
                    </Box>
                    <Typography style={{ fontWeight: "bold", marginTop: "2vh" }}>Cover Letter</Typography>
                    <Typography style={{ whiteSpace: "pre-line", marginTop: "2vh" }}>{apps.cover_letter}</Typography>
                    <Typography style={{ fontWeight: "bold", marginTop: "2vh" }}>{apps.job_id.questions}</Typography>
                    <Typography style={{ whiteSpace: "pre-line", marginTop: "2vh" }}>{apps.answers_to_questions}</Typography>
                    <Box style={{ textAlign: "right", marginTop: "2vh" }}>
                      <Button disabled={hireApps.length > 0} onClick={() => handleClick(apps._id, "Hire")}>Hire Applicant</Button>
                    </Box>
                  </AnotherBox>
                )
              })
              :
              <Typography style={{ textAlign: "center" }}>You haven't Shortlist any Application for this job.</Typography>
            }
          </TabPanel>
          <TabPanel value="3">
            {
              hireApps.length > 0 
              ?
              hireApps.map((apps, index) => {
                return (
                  <AnotherBox key={index}>
                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Typography style={{ fontSize: "20px" }}>{apps.user_id.name}</Typography>
                      <Link href={apps.user_id.resume} target="_blank" style={{textDecoration: "none"}}>View resume</Link>
                    </Box>
                    <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "50%", marginTop: "2vh" }}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Email fontSize="small" style={{ marginRight: "10px" }} />{apps.user_id.email}
                      </Box>
                      <Box style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
                        <Smartphone fontSize="small" style={{ marginRight: "10px" }} />{apps.user_id.phone}
                      </Box>
                    </Box>
                    <Box style={{marginTop: "2vh"}}>
                      {
                        apps.user_id.skills.map((skill, index) => {
                          return <Chip key={index} label={skill.skill} style={{ marginRight: "10px" }} />
                        })
                      }
                    </Box>
                    <Typography style={{ fontWeight: "bold", marginTop: "2vh" }}>Cover Letter</Typography>
                    <Typography style={{ whiteSpace: "pre-line", marginTop: "2vh" }}>{apps.cover_letter}</Typography>
                    <Typography style={{ fontWeight: "bold", marginTop: "2vh" }}>{apps.job_id.questions}</Typography>
                    <Typography style={{ whiteSpace: "pre-line", marginTop: "2vh" }}>{apps.answers_to_questions}</Typography>
                    <Box style={{ textAlign: "right", marginTop: "2vh" }}>
                      <Button disabled>Applicant Hired</Button>
                    </Box>
                  </AnotherBox>
                )
              })
              :
              <Typography style={{ textAlign: "center" }}>You haven't Hired any Applicant for this Role.</Typography>
            }
          </TabPanel>
        </TabContext>
        :
        <Box style={{display: 'flex', alignItems: "center", justifyContent: 'center', height: "88vh", width: "100%"}}><CircularProgress /></Box>
      }
    </NewBox>
  )
}

export default JobApplications