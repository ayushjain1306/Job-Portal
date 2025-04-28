import React from 'react';
import { Box, Typography, Backdrop, CircularProgress, Alert, Button, TextField, Stepper, StepLabel, Step, Table, TableBody, TableCell, TableRow, styled } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { registration } from '../../../services/employer/account';

const NewBox = styled(Box)(({theme}) => ({
  backgroundColor: "#ebebe9",
  height: "100vh",
  width: "100%",
  display: 'flex',
  alignItems: "center",
  justifyContent: "center",
  position: "relative"
}))

const AnotherBox = styled(Box)(({theme}) => ({
  height: "80vh",
  width: "80%",
  margin: "auto"
}))

const InputBox = styled(Box)(({theme}) => ({
  textAlign: "center"
}))

const NewTextField = styled(TextField)(({theme}) => ({
  width: "30%",
  [theme.breakpoints.down('sm')]: {
    width: "70%"
  }
}))

const steps = ['Personal Details', 'Company Details'];
const targets = [
  {
    name: "Name",
    element: "name"
  },
  {
    name: "Email",
    element: "email"
  },
  {
    name: "Phone",
    element: "phone"
  },
  {
    name: "Company Name",
    element: "company_name"
  },
  {
    name: "Company Address",
    element: "company_address"
  },
  {
    name: "Company Website",
    element: "company_website"
  }
]

const EmployerRegistration = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [input, setInput] = React.useState({ name: "", email: "", phone: "", password: "", company_name: "", company_address: "", company_website: "", subscription_plan: "", last_date_plan: "" })
  const [loading, setLoading] = React.useState(false);
  const [alertText, setAlertText] = React.useState({ text: "", type: "", highlight: "" });

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e) => {
    e.preventDefault();
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = { ...input, phone: parseInt(input.phone), subscription_plan: input.subscription_plan === "" ? null : input.subscription_plan, last_date_plan: input.last_date_plan ? null : input.last_date_plan }
    const result = await registration(data);
    setLoading(false);

    if (result === "Email Already Existed.") {
      setAlertText({ text: "Account on this email already exists.", type: "error", highlight: "" });
    }
    else if (result === "Phone Number Already Existed.") {
      setAlertText({ text: "Account on this phone number already exists.", type: "error", highlight: "" });
    }
    else if (result) {
      setAlertText({ text: "Your account has created successfully. You can ", type: "success", highlight: "login." });
    }
    else {
      setAlertText({ text: "Failed to register. Try Again Later.", type: "error" });
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  return (
    <NewBox>
      <Box style={{ position: "absolute", top: "5vh", left: "10%" }}><Link to="/employer/login" style={{ color: "blue", display: "flex", alignItems: "center", textDecoration: "none" }}><ArrowBack fontSize='small' style={{ marginRight: "5px" }} />Back to Login</Link></Box>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AnotherBox>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            {
              alertText.text !== "" &&
              <Alert variant='filled' severity={alertText.type}>
                {alertText.text} {alertText.highlight !== "" && <Link to="/employer/login">{alertText.highlight}</Link>}
              </Alert>
            }
            <Table>
              <TableBody>
                {
                  targets.map((target, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{target.name}:</TableCell>
                        <TableCell>
                          {
                            target.name === "Subscription Plan"
                            ?
                            (
                              input.subscription_plan !== ""
                              ?
                              input.subscription_plan
                              :
                              "Skipped for Now"
                            )
                            :
                            input[target.element]
                          }
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleSubmit}>Create Account</Button>
            </Box>
          </React.Fragment>
        ) : (
          <form onSubmit={handleNext}>
            {
              activeStep === 0
              ?
              <InputBox>
                <NewTextField
                  onChange={handleChange}
                  type="text" 
                  label="Name"
                  placeholder="Enter your Name"
                  id="name"
                  value={input.name}
                  margin="normal"
                  size="small"
                  required
                /> <br />
                <NewTextField
                  onChange={handleChange}
                  type="email" 
                  label="Email"
                  placeholder="Enter your Email"
                  id="email"
                  value={input.email}
                  margin="normal"
                  size="small"
                  required
                /> <br />
                <NewTextField
                  onChange={handleChange}
                  type="password" 
                  label="Password"
                  placeholder="Enter your Password"
                  id="password"
                  value={input.password}
                  margin="normal"
                  size="small"
                  required
                /> <br />
                <NewTextField
                  onChange={handleChange}
                  type="number" 
                  label="Phone"
                  placeholder="Enter your Phone"
                  id="phone"
                  value={input.phone}
                  margin="normal"
                  size="small"
                  required
                /> <br />
              </InputBox>
              : 
              <InputBox>
                <NewTextField
                  onChange={handleChange}
                  type="text" 
                  label="Company Name"
                  placeholder="Enter your Company Name"
                  id="company_name"
                  value={input.company_name}
                  margin="normal"
                  size="small"
                  required
                /> <br />
                <NewTextField
                  onChange={handleChange}
                  type="text" 
                  label="Company Address"
                  placeholder="Enter your Company Address"
                  id="company_address"
                  value={input.company_address}
                  margin="normal"
                  size="small"
                  required
                /> <br />
                <NewTextField
                  onChange={handleChange}
                  type="text" 
                  label="Company Website"
                  placeholder="Enter your Company Website"
                  id="company_website"
                  value={input.company_website}
                  margin="normal"
                  size="small"
                /> <br />
              </InputBox>
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip For Now
                </Button>
              )}
              <Button type="submit">
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </form>
        )}
      </AnotherBox>
    </NewBox>
  );
}

export default EmployerRegistration