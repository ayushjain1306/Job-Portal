import React, { useState, useContext } from 'react';
import { Box, Typography, Button, CircularProgress, styled } from "@mui/material";
import { JobsContext } from '../../../context/user/JobsProvider';
import { ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NewBox = styled(Box)(({theme}) => ({
    width: "97%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    textAlign: "center",
    height: "40vh",
    paddingTop: "3vh",
    marginBottom: "2vh",
    paddingBottom: "6vh"
}))

const TitleBox = styled(Box)(({theme}) => ({
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "7vh"
}))

const CompaniesBox = styled(Box)(({theme}) => ({
    display: "grid",
    padding: "0px 15%",
    gridTemplateColumns: "25% 25% 25% 25%"
}))

const StyledBox = styled(Box)(({theme}) => ({
    width: "95%",
    margin: "auto",
    border: "1px solid grey",
    borderRadius: "3px",
    padding: "2vh 2%"
}))

const TopJobs = () => {
  const { topJobs, jobsLoading, setTopType } = useContext(JobsContext);
  const navigate = useNavigate();

  return (
    <NewBox>
        <TitleBox>
            Top Jobs For You
        </TitleBox>
        <CompaniesBox>
            {
                jobsLoading ? 
                <CircularProgress />
                :
                topJobs.map((job, index) => {
                    return (
                        <StyledBox key={index}>
                            <Typography style={{fontSize: "18px"}}>{job.job_title}</Typography>
                            <Typography style={{color: "grey", marginBottom: "2vh"}}>{job.employer_id.company_name}</Typography>
                            <Button endIcon={<ChevronRight/>} onClick={() => navigate(`/search-jobs/${job._id}`)}>Check Details</Button>
                        </StyledBox>
                    )
                })
            }
        </CompaniesBox>
        <Box style={{ textAlign: "center", marginTop: "4vh" }}>
            <Button variant="contained" color="warning" endIcon={<ChevronRight/>} onClick={() =>{setTopType(true); navigate("/search-jobs");}}>Explore More Jobs</Button>
        </Box>
    </NewBox>
  )
}

export default TopJobs