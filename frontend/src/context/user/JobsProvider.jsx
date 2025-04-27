import React, { createContext, useState } from 'react';

const JobsContext = createContext(null);

const JobsProvider = ({ children }) => {
  const [topJobs, setTopJobs] = useState([]);
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [input, setInput] = useState({ job: "", location: "", experience: "" });
  const [topType, setTopType] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [question, setQuestion] = useState("");

  return (
    <JobsContext.Provider value={{ topJobs, setTopJobs, searchedJobs, setSearchedJobs, input, setInput, jobsLoading, setJobsLoading, topType, setTopType, question, setQuestion }}>
        { children }
    </JobsContext.Provider>
  )
}

export { JobsContext, JobsProvider }