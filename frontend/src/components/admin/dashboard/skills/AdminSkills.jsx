import React, { useState, useEffect } from 'react'
import { Box, Button, DialogContent, DialogActions, DialogTitle, DialogContentText, Backdrop, Typography, CircularProgress, styled, TextField, Dialog } from "@mui/material";
import Table from '../../../../utils/Table';
import { addSkill, deleteSkill, getAllSkills } from '../../../../services/admin/adminSkills';
import Swal from 'sweetalert2';

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

const SkillsBox = styled(Box)(({ theme }) => ({
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

const NewTextField = styled(TextField)(({ theme }) => ({
  width: "25vw"
}))

const headers = [ "Sr. No.", "Skill", "No. of Jobs", "Actions" ]
const targets = [ "Sr. No.", "skill", "no_of_jobs", "action" ]
const actions = [ "Delete" ]

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const result = await getAllSkills();
      setSkills(result);
      setLoading(false);
    }

    fetchJobs();
  }, []);

  const handleDelete = (id) => {
    setId(id);
    setOpenDel(true);
  }

  return (
    <Box>
      <HeadBox>
        <Typography style={{fontSize: "inherit"}}>All Skills</Typography>
        <Button variant="contained" color="warning" onClick={() => setOpen(true)}>Add New Skill</Button>
      </HeadBox>
      <SkillsBox>
        {
          loading ? 
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>
          :
          skills.length > 0 ?
          <Table data={skills} headers={headers} targets={targets} actions={actions} handleDelete={handleDelete} />
          :
          <Box style={{ width: "100%", borderRadius: "3px", boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)", backgroundColor: "white", padding: "2vh 0", display: "flex", justifyContent: "center", alignItems: "center" }}>No Skills to Show.</Box>
          
        }
      </SkillsBox>

      {
        open && <SkillDialog open={open} setOpen={setOpen} />
      }
      {
        openDel && <DeleteDialogBox open={openDel} setOpen={setOpenDel} _id={id} />
      }
    </Box>
  )
}

const SkillDialog = ({ open, setOpen }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const result = await addSkill({ skill: input });
    setLoading(false);

    if (result) {
      Swal.fire({ title: "Success", icon: "success", text: "Skill Added Successfully." })
    }
    else {
      Swal.fire({ title: "Error", icon: "error", text: "Failed to add Skill. Try Again Later." })
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>
        Add New Skill
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <NewTextField 
            label="Skill"
            id="skill"
            value={input}
            onChange={handleChange}
            margin='dense'
            size="small"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">Cancel</Button>
          <Button variant="contained" color="warning" type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const DeleteDialogBox = ({ open, setOpen, _id }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await deleteSkill(_id);
    setLoading(false);

    if (result) {
      setOpen(false);
      Swal.fire({ title: "Success", icon: "success", text: "Skill Deleted Successfully." });
    }
    else{
      setOpen(false);
      Swal.fire({ title: "Error", icon: "error", text: "Failed to Delete the Skill. Try Again Later." });
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>
        Delete Skill
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this skill? This step is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleClick}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminSkills