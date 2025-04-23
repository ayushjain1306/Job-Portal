import React, { useState } from 'react'
import { Dialog, Chip, Backdrop, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, Button, Typography } from '@mui/material'
import Swal from 'sweetalert2';
import { updateJobs } from '../../../../services/admin/adminJobs';

const ViewJobsDialog = ({ open, setOpen, job }) => {
    const [loading, setLoading] = useState(false);
  
    const handleClick = async (element) => {
      setLoading(true);
      const result = await updateJobs(job._id, element);
      setLoading(false);
  
      if (result) {
        setOpen(false);
        Swal.fire({ title: "Success", icon: "success", text: `Job ${element} Successfully.` });
      }
      else{
        setOpen(false);
        Swal.fire({ title: "Error", icon: "error", text: "Failed. Try Again Later." });
      }
    }
  
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>
          {job.job_title} {`(${job.duration})`}
        </DialogTitle>
        <DialogContent>
            <Typography style={{fontWeight: "600", marginBottom: "2vh"}}>Job Description</Typography>
            <DialogContentText style={{ whiteSpace: "pre-wrap" }}>
                { job.job_description }
            </DialogContentText>

            <Typography style={{fontWeight: "600", marginTop: "4vh", marginBottom: "2vh"}}>Required Skills</Typography>
            <DialogContentText style={{ whiteSpace: "pre-wrap" }}>
                {
                    job.skills.map((skill, index) => {
                        return <Chip key={index} label={skill} style={{ marginRight: "10px" }} />
                    })
                }
            </DialogContentText>

            <Typography style={{fontWeight: "600", marginTop: "4vh", marginBottom: "2vh"}}>Question Asked</Typography>
            <DialogContentText style={{ whiteSpace: "pre-wrap" }}>
                { job.questions }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {
                job.job_status === "Pending" ?
                    <><Button variant="contained" color="success" onClick={() => handleClick("Approved")}>Approve</Button>
                    <Button variant="contained" color="error" onClick={() => handleClick("Rejected")}>Reject</Button>
                    <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Close</Button></>
                :
                    <><Button variant="contained" disabled>Already {job.job_status}</Button>
                    <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Close</Button>
                    </>
            }
          
        </DialogActions>
      </Dialog>
    )
  }

export default ViewJobsDialog