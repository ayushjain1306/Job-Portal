import React, { useContext, useState } from 'react';
import { Box, Button, Backdrop, CircularProgress, TextField, Checkbox, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Link, Typography, styled } from '@mui/material';
import { UserContext } from '../../../context/user/UserProvider';
import Account from '../home/Account';
import { Email, Smartphone, Edit, Add } from '@mui/icons-material';
import { addEducation, addExperience, addSkill, addProject, deleteEducation, deleteExperience, deleteProject, deleteSkill } from '../../../services/user/profile';
import Swal from "sweetalert2";

const NewBox = styled(Box)(({theme}) => ({
  margin: "auto",
  minHeight: "78vh",
  width: "97%",
  paddingTop: "4vh",
  backgroundColor: "#ebebe9",
  paddingBottom: "2vh"
}))

const NewTextField = styled(TextField)(({theme}) => ({
  width: "20vw"
}))

const AnotherBox = styled(Box)(({theme}) => ({

}))

const AnotherStyledBox = styled(Box)(({theme}) => ({
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
  width: "60%",
  margin: "auto",
  padding: "2vh 2%",
  marginBottom: "2vh"
}))

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [dialogType, setDialogType] = useState(false);
  const [type, setType] = useState("Login");
  const { user } = useContext(UserContext);

  const handleClick = (element) => {
    setDialogType(element);
    setOpenAdd(true);
  }

  return (
    user 
    ?
    <NewBox>
      <AnotherBox>
        <Typography style={{ fontWeight: "600", fontSize: "25px", textAlign: "center" }}>{user.name}</Typography>
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "30%", margin: "auto" }}>
          <Typography style={{ display: "flex", alignItems: "center", fontWeight: "600", marginTop: "2vh" }}><Email fontSize="small" style={{ marginRight: "5px" }} />{user.email}</Typography>
          <Typography style={{ display: "flex", alignItems: "center", fontWeight: "600", marginTop: "2vh" }}><Smartphone fontSize="small" style={{ marginRight: "5px" }} />{user.phone}</Typography>
        </Box>
        <Box>
          {
            user.resume !== "" 
            ?
            <Box style={{marginTop: "2vh", marginBottom: "5vh", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}><Link href={user.resume} target="_blank" style={{textDecoration: 'none', fontSize: "18px"}}>Your Resume</Link><Edit fontSize='small' style={{marginLeft: "5px"}} /></Box>
            :
            <Box style={{marginTop: "2vh", marginBottom: "5vh", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "600"}}><Add fontSize="small" style={{marginRight: "5px"}} /> Add Resume</Box>
          }
        </Box>
      </AnotherBox>
      <AnotherStyledBox>
        <Typography style={{ fontSize: "22px" }}>Education</Typography>
        <Box style={{marginTop: "2vh"}}>
          {
            user.education.map((edu) => {
              return (
                <Box key={edu._id} style={{ border: "1px solid lightgrey", borderRadius: "3px", marginBottom: "2vh" }}>

                </Box>
              )
            })
          }
        </Box>
        <Box style={{ marginTop: "2vh" }}>
          <Button onClick={() => handleClick("Education")}>Add Education</Button>
        </Box>
      </AnotherStyledBox>
      <AnotherStyledBox>
        <Typography style={{ fontSize: "22px" }}>Skill</Typography>
        <Box style={{marginTop: "2vh"}}>
          {
            user.skills.map((edu) => {
              return (
                <Box key={edu._id} style={{ border: "1px solid lightgrey", borderRadius: "3px", marginBottom: "2vh" }}>

                </Box>
              )
            })
          }
        </Box>
        <Box style={{ marginTop: "2vh" }}>
          <Button onClick={() => handleClick("Skill")}>Add Skill</Button>
        </Box>
      </AnotherStyledBox>
      <AnotherStyledBox>
        <Typography style={{ fontSize: "22px" }}>Projects</Typography>
        <Box style={{marginTop: "2vh"}}>
          {
            user.projects.map((edu) => {
              return (
                <Box key={edu._id} style={{ border: "1px solid lightgrey", borderRadius: "3px", marginBottom: "2vh" }}>

                </Box>
              )
            })
          }
        </Box>
        <Box style={{ marginTop: "2vh" }}>
          <Button onClick={() => handleClick("Project")}>Add Project</Button>
        </Box>
      </AnotherStyledBox>
      <AnotherStyledBox>
        <Typography style={{ fontSize: "22px" }}>Experience</Typography>
        <Box style={{marginTop: "2vh"}}>
          {
            user.experience.map((edu) => {
              return (
                <Box key={edu._id} style={{ border: "1px solid lightgrey", borderRadius: "3px", marginBottom: "2vh" }}>

                </Box>
              )
            })
          }
        </Box>
        <Box style={{ marginTop: "2vh" }}>
          <Button onClick={() => handleClick("Experience")}>Add Experience</Button>
        </Box>
      </AnotherStyledBox>

      {
        openAdd && <AddDialog open={openAdd} setOpen={setOpenAdd} type={dialogType} />
      }
      
    </NewBox>
    :
    <NewBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button variant="contained" color="warning" style={{ fontWeight: 'bold' }} onClick={() => setOpen(true)}>Login to access your Profile</Button>
      {open && <Account open={open} setOpen={setOpen} type={type} />}
    </NewBox>
  )
}

const AddDialog = ({ open, setOpen, type }) => {
  const [input, setInput] = useState({ institute_name: "", project_name: "", url: "", degree: "", marks: "", company_name: "", start_date: "", end_date: "", present: false, position: "", skill: "" })
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (input.start_date !== "" && input.end_date !== "" && new Date(input.start_date) > new Date(input.end_date)){
      Swal.fire({ title: "Error", icon: "error", text: "End Date cannot be greater than Start Date." });
      setOpen(false);
      return;
    } 

    const data = (type === "Project"  ? { project_name: input.project_name, url: input.url, start_date: input.start_date, end_date: input.end_date, present: input.present } :
                  type === "Skill" ? { skill: input.skill } :
                  type === "Education" ? { institute_name: input.institute_name, degree: input.degree, marks: input.marks } :
                  { company_name: input.company_name, position: input.position, start_date: input.start_date, end_date: input.end_date, present: input.present }
    )

    setLoading(true);
    const result = await (
      type === "Project" ? addProject(data) : type === "Skill" ? addSkill(data) : type === "Education" ? addEducation(data): addExperience(data)
    )
    setLoading(false);

    if (result) {
      Swal.fire({ title: "Success", icon: "success", text: "Success." })
    }
    else {
      Swal.fire({ title: "Error", icon: "error", text: "Failed." })
    }
    setOpen(false);
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer+1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>
        Add your {type}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {
            type === "Education" 
            ?
            <>
              <NewTextField
                onChange={handleChange} 
                label="Institute Name"
                value={input.institute_name}
                id="institute_name"
                margin="normal"
                size="small"
                required
                type="text"
              /> <br />
              <NewTextField
                onChange={handleChange} 
                label="Degree"
                value={input.degree}
                id="degree"
                margin="normal"
                size="small"
                required
                type="text"
              /><br />
              <NewTextField
                onChange={handleChange} 
                label="CGPA"
                value={input.marks}
                id="marks"
                margin="normal"
                size="small"
                required
                type="number"
              /><br />
            </>
            :
            type === "Skill"
            ?
              <><NewTextField
                onChange={handleChange} 
                label="Skill"
                value={input.skill}
                id="skill"
                margin="normal"
                size="small"
                required
                type="text"
              /><br /></>
            :
            type === "Project"
            ?
            <>
              <NewTextField
                onChange={handleChange} 
                label="Project Name"
                value={input.project_name}
                id="project_name"
                margin="normal"
                size="small"
                required
                type="text"
              /><br />
              <NewTextField
                onChange={handleChange} 
                label="URL"
                value={input.url}
                id="url"
                margin="normal"
                size="small"
                required
                type="text"
              /><br />
              <NewTextField
                onChange={handleChange} 
                value={input.start_date}
                id="start_date"
                margin="normal"
                size="small"
                helperText="Start Date"
                required
                type="date"
              /><br />
              <NewTextField
                onChange={handleChange} 
                helperText="End Date"
                value={input.end_date}
                id="end_date"
                margin="normal"
                size="small"
                disabled={input.position}
                type="date"
              /><br />
              <Checkbox checked={input.present} onChange={() => setInput({...input, present: !input.present})} /> Currently Working
            </>
            :
            <>
              <NewTextField
                onChange={handleChange} 
                label="Company Name"
                value={input.company_name}
                id="company_name"
                margin="normal"
                size="small"
                required
                type="text"
              /><br />
              <NewTextField
                onChange={handleChange} 
                label="Position"
                value={input.position}
                id="position"
                margin="normal"
                size="small"
                required
                type="text"
              /><br />
              <NewTextField
                onChange={handleChange} 
                helperText="Start Date"
                value={input.start_date}
                id="start_date"
                margin="normal"
                size="small"
                required
                type="date"
              /><br />
              <NewTextField
                onChange={handleChange} 
                helperText="End Date"
                value={input.end_date}
                id="end_date"
                margin="normal"
                size="small"
                disabled={input.position}
                type="date"
              /><br />
              <Checkbox checked={input.present} onChange={() => setInput({...input, present: !input.present})} /> Currently Working
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color="primary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='contained' color="warning" type='submit'>Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const DeleteDialog = ({ open, setOpen, type }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>

      </DialogTitle>
      <DialogContent>
        <DialogContentText>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color="primary">Cancel</Button>
        <Button variant='contained' color="warning" type='submit'>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserProfile