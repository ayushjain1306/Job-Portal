import React, { useContext, useState } from "react";
import { Box, styled, TextField, Backdrop, CircularProgress, Button, InputAdornment, MenuItem } from "@mui/material";
import { Search } from "@mui/icons-material";
import { JobsContext } from "../../../context/user/JobsProvider";
import { searchedJobs } from "../../../services/user/jobs";
import OutputJobs from "./OutputJobs";

const NewBox = styled(Box)(({theme}) => ({
  width: "97%",
  margin: "auto",
  borderRadius: "3px",
  textAlign: "center",
  paddingTop: "2vh",
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
  width: "27%",
  [theme.breakpoints.down('sm')]: {
        width: "33%"
  }
}))

const AnotherTextField = styled(TextField)(({theme}) => ({
  marginRight: "10px",
  width: "15%",
  textAlign: "left",
  [theme.breakpoints.down('sm')]: {
    width: "25%"
  }
}))

const SearchJobs = () => {
  const { input, setInput, setSearchedJobs, setTopType } = useContext(JobsContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "experience") {
      setInput({ ...input, experience: e.target.value });
      return;
    }
    setInput({ ...input, [e.target.id]: e.target.value })
  }

  const handleSearch = async () => {
    setLoading(true);
    const result = await searchedJobs(input);
    setTopType(false);
    setSearchedJobs(result);
    setLoading(false);
  }

  return (
    <NewBox>
      <Backdrop open={loading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SearchBox>
        <NewTextField
          placeholder="Search for your Job"
          label="Find Your Job"
          type="text"
          variant="outlined"
          id="job"
          value={input.job}
          required
          onChange={handleChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment>
                  <Search fontSize="small" style={{ marginRight: "10px" }} />
                </InputAdornment>
              ),
            },
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
          name="experience"
          value={input.experience}
          onChange={handleChange}
        >
          <MenuItem key="Fresher" value="Fresher">
            Fresher
          </MenuItem>
          <MenuItem key="1" value="1">
            1
          </MenuItem>
          <MenuItem key="2" value="2">
            2
          </MenuItem>
          <MenuItem key="3" value="3">
            3
          </MenuItem>
          <MenuItem key="4" value="4+">
            4+
          </MenuItem>
        </AnotherTextField>
      </SearchBox>
      <Button variant="contained" style={{fontWeight: "bold"}} color="warning" onClick={handleSearch}>Search</Button>
      <OutputJobs />
    </NewBox>
  );
};

export default SearchJobs;
