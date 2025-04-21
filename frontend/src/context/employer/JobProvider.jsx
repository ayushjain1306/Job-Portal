import React, { createContext, useState } from 'react'

const JobContext = createContext(null);

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
        { children }
    </JobContext.Provider>
  )
}

export { JobContext, JobProvider }