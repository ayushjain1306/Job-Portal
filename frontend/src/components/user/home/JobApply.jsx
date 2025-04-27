import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, styled, Alert, Link, Typography, Backdrop, CircularProgress, TextField, Button } from "@mui/material";
import { UserContext } from '../../../context/user/UserProvider';
import { Add, Edit } from '@mui/icons-material';
import { applyJob } from '../../../services/user/jobApplication';
import Swal from "sweetalert2";
import { JobsContext } from '../../../context/user/JobsProvider';

const NewBox = styled(Box)(({theme}) => ({
  width: "97%",
  margin: "auto"
}))

const AnotherBox = styled(Box)(({theme}) => ({
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
  padding: "3vh 2%",
  width: "60%",
  margin: "auto",
  marginBottom: "3vh"
}))

const NewTextField = styled(TextField)(({theme}) => ({
  width: "100%",
  marginTop: "2vh"
}))

const JobApply = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { question } = useContext(JobsContext);
  const [input, setInput] = useState({ cover_letter: "", answers_to_questions: "" });
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (question === "") navigate(`/search-jobs/${id}`);
  }, [])

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  const handleClick = async () => {
    if (input.cover_letter === "" || input.answers_to_questions === "" || user === null || user.resume === ""){
      setAlertText("Please fill all the fields.");
      return;
    }

    setLoading(true);
    const result = await applyJob({ ...input, job_id: id });
    setLoading(false);

    if (result) {
      Swal.fire({ title: "Success", icon: "success", text: "Successfully Applied For Job.", confirmButtonText: "Explore More Jobs" }).then((result) => window.location.href = "/search-jobs");
    }
    else {
      Swal.fire({ title: "Error", icon: "error", text: "Failed to Apply For Job. Try Again Later!" });
    }
  }

  return (
    user && id && <NewBox>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AnotherBox>
        <Typography style={{ fontWeight: "600", fontSize: "20px" }}>Cover Letter</Typography>
        <NewTextField
          placeholder="Add your Cover Letter"
          multiline
          onChange={handleChange}
          id="cover_letter"
          value={input.cover_letter}
          rows={4}
        />
      </AnotherBox>
      <AnotherBox>
        <Typography style={{ fontWeight: "600", fontSize: "20px" }}>Resume</Typography>
        {
          user.resume ? 
          <Box style={{display: "flex", alignItems: "center", marginTop: "2vh"}}>
            <Link href={user.resume} target="_blank">View Resume</Link><Edit onClick={() => navigate("/profile")} fontSize="small" style={{marginLeft: "5px"}} />
          </Box>
          :
          <Box style={{display: "flex", alignItems: "center", marginTop: "2vh"}}>
            <Button onClick={() => navigate("/profile")}>
              <Add fontSize="small" style={{marginRight: "5px"}} />Add Resume 
            </Button>
          </Box>
        }
      </AnotherBox>
      <AnotherBox>
        <Typography style={{ fontWeight: "600", fontSize: "20px" }}>Employer's Question</Typography>
        <NewTextField
          placeholder={question}
          multiline
          onChange={handleChange}
          id="answers_to_questions"
          value={input.answers_to_questions}
          rows={4}
        />
      </AnotherBox>
      {alertText && <Alert severity='error' variant="filled" style={{ margin: "auto", width: "60%" }}>{alertText}</Alert>}
      <Box style={{ textAlign: "right", width: "60%", margin: "auto", marginBottom: "2vh", marginTop: "2vh" }}>
        <Button variant="contained" color="warning" onClick={handleClick}>Submit your Application</Button>
      </Box>
    </NewBox>
  )
}

export default JobApply