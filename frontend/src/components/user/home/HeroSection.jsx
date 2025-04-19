import React, { useState } from 'react';
import { Box, TextField, styled, InputAdornment, MenuItem, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const NewBox = styled(Box)(({theme}) => ({
    width: "97%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    textAlign: "center",
    height: "40vh",
    paddingTop: "5vh",
    marginBottom: "2vh"
}))

const TitleBox = styled(Box)(({theme}) => ({
    fontSize: "45px",
    fontWeight: "700",
    marginBottom: "5vh"
}))

const SearchBox = styled(Box)(({theme}) => ({
    marginBottom: "5vh"
}))

const NewTextField = styled(TextField)(({theme}) => ({
    marginRight: "10px",
    width: "27%"
}))

const AnotherTextField = styled(TextField)(({theme}) => ({
    marginRight: "10px",
    width: "15%",
    textAlign: "left"
}))

const HeroSection = () => {
  const [input, setInput] = useState({ job: "", location: "", experience: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }

  return (
    <NewBox>
        <TitleBox>
            Start Finding Your Job
        </TitleBox>
        <SearchBox>
            <NewTextField
                placeholder="Search for your Job"
                label="Find Your Job"
                variant="outlined"
                id="job"
                value={input.job}
                required
                onChange={handleChange}
                slotProps={{
                    input:{
                        startAdornment: (
                            <InputAdornment>
                                <Search fontSize='small' style={{marginRight: "10px"}} />
                            </InputAdornment>
                        )
                    }
                }}
            />

            <AnotherTextField
                placeholder="Location"
                variant="outlined"
                label="Location"
                id="location"
                value={input.location}
                onChange={handleChange}
            />

            <AnotherTextField
                variant="outlined"
                select
                label="Select Experience"
                id="experience"
                value={input.experience}
                onChange={handleChange}
            >
                <MenuItem key="Fresher" value="Fresher">Fresher</MenuItem>
                <MenuItem key="1" value="1">1</MenuItem>
                <MenuItem key="2" value="2">2</MenuItem>
                <MenuItem key="3" value="3">3</MenuItem>
                <MenuItem key="4" value="4+">4+</MenuItem>    
            </AnotherTextField>  
            
        </SearchBox>

        <Button variant="contained" style={{fontWeight: "bold"}} color="warning">Search</Button>
    </NewBox>
  )
}

export default HeroSection