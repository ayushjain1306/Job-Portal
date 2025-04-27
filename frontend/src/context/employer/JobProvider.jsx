import React, { createContext, useState } from 'react'

const JobContext = createContext(null);

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);

  return (
    <JobContext.Provider value={{ jobs, setJobs, job, setJob }}>
        { children }
    </JobContext.Provider>
  )
}

export { JobContext, JobProvider }