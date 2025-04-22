import React, { useState } from 'react';
import { Box, Backdrop, CircularProgress, MenuItem, Dialog, DialogContent, DialogActions, DialogTitle, Button, TextField, styled, Chip } from '@mui/material';
import { createJob } from '../../../services/employer/jobs';
import Swal from "sweetalert2";

const NewTextField = styled(TextField)(({theme}) => ({
    width: "25vw"
}))
const AnotherTextField = styled(TextField)(({theme}) => ({
    width: "20vw"
}))

const AddJobDialog = ({ open, setOpen }) => {
  const [input, setInput] = useState({ job_title: "", skills: [], job_description: "", type: "", salary: "", duration: "", questions: "" });
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const result = await createJob(input);
    setLoading(false);

    if (result) {
        setOpen(false);
        Swal.fire({
            title: "Success",
            icon: "success",
            text: "Job Created Successfully. Wait for Approval."
        })
    }
    else {
        setOpen(false);
        Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to create job. Try Again later."
        })
    }
  } 

  const handleChange = (e) => {
    if (e.target.id === "skill") {
        setSkill(e.target.value);
        return;
    }

    if (e.target.name === "type") setInput({ ...input, type: e.target.value });
    else setInput({ ...input, [e.target.id]: e.target.value });
  }

  const handleAddSkill = (e) => {
    if (skill === "") return;

    setInput({ ...input, skills: [ ...input.skills, skill ] });

    setSkill("")
  }

  const handleDelete = (skill) => {
    setInput({ ...input, skills: input.skills.filter((element) => element !== skill) });
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>
            Add New Job
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <NewTextField 
                    margin="normal"
                    label="Job Title"
                    type="text"
                    size="small"
                    id="job_title"
                    value={input.job_title}
                    onChange={handleChange}
                    required
                /> <br />
                <NewTextField 
                    margin="normal"
                    label="Job Description"
                    type="text"
                    size="small"
                    id="job_description"
                    value={input.job_description}
                    onChange={handleChange}
                    required
                /> <br />
                <NewTextField 
                    margin="normal"
                    label="Salary"
                    type="number"
                    size="small"
                    id="salary"
                    value={input.salary}
                    onChange={handleChange}
                    required
                /> <br />
                <NewTextField 
                    margin="normal"
                    label="Select Type"
                    type="text"
                    select
                    size="small"
                    name="type"
                    value={input.type}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Job">Job</MenuItem>
                </NewTextField> <br />
                <NewTextField 
                    margin="normal"
                    label="Duration"
                    type="text"
                    size="small"
                    id="duration"
                    value={input.duration}
                    onChange={handleChange}
                    required
                /> <br />
                {
                    input.skills.length > 0 &&
                    input.skills.map((skill, index) => <Chip label={skill} key={index} onDelete={() => handleDelete(skill)} />)
                }
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <AnotherTextField 
                        margin="normal"
                        label="Skills Required"
                        type="text"
                        size="small"
                        id="skill"
                        value={skill}
                        onChange={handleChange}
                    /> <Button onClick={handleAddSkill}>Add</Button> <br />
                    </Box>
                <NewTextField 
                    margin="normal"
                    label="Ask the Question"
                    helperText="No need to ask for the cover letter."
                    type="text"
                    size="small"
                    id="questions"
                    value={input.questions}
                    onChange={handleChange}
                    required
                /> <br />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" color="warning" type="submit">Add Job</Button>
            </DialogActions>
        </form>
    </Dialog>
  )
}

export default AddJobDialog