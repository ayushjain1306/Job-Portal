import React, { useContext } from "react";
import { Box, Tab, Typography, Button, Divider, styled } from "@mui/material";
import { WorkOutline, Place, AccessTime, ChevronRight } from "@mui/icons-material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { JobsContext } from "../../../context/user/JobsProvider";
import { useNavigate } from "react-router-dom";

const NewBox = styled(Box)(({ theme }) => ({
    paddingTop: "5vh",
}));

const AnotherBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    borderRadius: "3px",
    marginTop: "2vh",
    padding: "2vh 2%",
    width: "60%",
}));

const OutputJobs = () => {
    const { searchedJobs, topJobs, topType } = useContext(JobsContext);
    const [value, setValue] = React.useState("1");
    const navigate = useNavigate();

    const filteredInternships = searchedJobs.filter(
        (job) => job.type === "Internship"
    );
    const filteredJobs = searchedJobs.filter((job) => job.type === "Job");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <NewBox>
            {
            topType ?
            <AnotherBox>
            {topJobs.length > 0 ? (
                topJobs.map((job) => {
                    return (
                        <StyledBox key={job._id}>
                            <Typography style={{fontSize: "18px", textAlign: 'left'}}>{job.job_title}</Typography>
                            <Typography style={{color: "grey", textAlign: 'left'}}>{job.employer_id.company_name}</Typography>
                            <Box style={{ display: 'flex', alignItems: "center", marginBottom: "2vh", marginTop: "2vh" }}>
                                <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                    <WorkOutline fontSize="small" style={{marginRight: "5"}} /> {job.experience_required === 0 ? "Fresher" : job.experience_required + " Years(s)"}
                                </Box>
                                {job.type === "Internship" && <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                    <AccessTime fontSize="small" style={{marginRight: "5"}} /> {job.duration}
                                </Box>}
                                <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                    <Place fontSize="small" style={{marginRight: "5"}} /> {job.location}
                                </Box>
                            </Box>
                            <Divider />
                            <Box style={{textAlign: "right", marginTop: "2vh"}}>
                                <Button endIcon={<ChevronRight />} onClick={() => navigate(`/search-jobs/${job._id}`)}>Check Details</Button>
                            </Box>
                        </StyledBox>
                    );
                })
            ) : (
                <Typography>
                    Oops, No Jobs found for Specified Criteria.
                </Typography>
            )}
        </AnotherBox>
            :
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            centered
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Internships" value="1" />
                            <Tab label="Jobs" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <AnotherBox>
                            {filteredInternships.length > 0 ? (
                                filteredInternships.map((job) => {
                                    return (
                                        <StyledBox key={job._id}>
                                            <Typography style={{fontSize: "18px", textAlign: 'left'}}>{job.job_title}</Typography>
                                            <Typography style={{color: "grey", textAlign: 'left'}}>{job.employer_id.company_name}</Typography>
                                            <Box style={{ display: 'flex', alignItems: "center", marginBottom: "2vh", marginTop: "2vh" }}>
                                                <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                                    <WorkOutline fontSize="small" style={{marginRight: "5"}} /> {job.experience_required === 0 ? "Fresher" : job.experience_required + " Years(s)"}
                                                </Box>
                                                <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                                    <AccessTime fontSize="small" style={{marginRight: "5"}} /> {job.duration}
                                                </Box>
                                                <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                                    <Place fontSize="small" style={{marginRight: "5"}} /> {job.location}
                                                </Box>
                                            </Box>
                                            <Divider />
                                            <Box style={{textAlign: "right", marginTop: "2vh"}}>
                                                <Button endIcon={<ChevronRight />} onClick={() => navigate(`/search-jobs/${job._id}`)}>Check Details</Button>
                                            </Box>
                                        </StyledBox>
                                    );
                                })
                            ) : (
                                <Typography>
                                    Oops, No Internships found for Specified Criteria.
                                </Typography>
                            )}
                        </AnotherBox>
                    </TabPanel>
                    <TabPanel value="2">
                        <AnotherBox>
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => {
                                    return (
                                        <StyledBox key={job._id}>
                                            <Typography style={{fontSize: "18px", textAlign: 'left'}}>{job.job_title}</Typography>
                                            <Typography style={{color: "grey", textAlign: 'left'}}>{job.employer_id.company_name}</Typography>
                                            <Box style={{ display: 'flex', alignItems: "center", marginBottom: "2vh", marginTop: "2vh" }}>
                                                <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                                    <WorkOutline fontSize="small" style={{marginRight: "5"}} /> {job.experience_required === 0 ? "Fresher" : job.experience_required + " Years(s)"}
                                                </Box>
                                                <Box style={{ display: "flex", alignItems: 'center', marginRight: "10px" }}>
                                                    <Place fontSize="small" style={{marginRight: "5"}} /> {job.location}
                                                </Box>
                                            </Box>
                                            <Divider />
                                            <Box style={{textAlign: "right", marginTop: "2vh"}}>
                                                <Button endIcon={<ChevronRight />} onClick={() => navigate(`/search-jobs/${job._id}`)}>Check Details</Button>
                                            </Box>
                                        </StyledBox>
                                    );
                                })
                            ) : (
                                <Typography>
                                    Oops, No Jobs found for Specified Criteria.
                                </Typography>
                            )}
                        </AnotherBox>
                    </TabPanel>
                </TabContext>
            </Box>
            }
        </NewBox>
    );
};

export default OutputJobs;
