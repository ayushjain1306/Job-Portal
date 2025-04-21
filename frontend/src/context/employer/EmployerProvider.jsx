import React, { createContext, useState } from 'react'

const EmployerContext = createContext(null);

const EmployerProvider = ({ children }) => {
  const [employer, setEmployer] = useState(null);

  return (
    <EmployerContext.Provider value={{ employer, setEmployer }}>
        { children }
    </EmployerContext.Provider>
  )
}

export { EmployerContext, EmployerProvider }