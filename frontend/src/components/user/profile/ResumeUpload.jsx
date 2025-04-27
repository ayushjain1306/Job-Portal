import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, styled } from '@mui/material';

const NewTextField = styled(TextField)(({theme}) => ({
    width: "25vw"
}))

const ResumeUpload = ({ open, setOpen }) => {
  const [resume, setResume] = useState(null);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
            Upload Your Resume
        </DialogTitle>
        <DialogContent>
            <NewTextField />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary">Cancel</Button>
            <Button variant="contained" color="warning">Upload</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ResumeUpload