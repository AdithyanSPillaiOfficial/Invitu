'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [title, setTitle] = useState("Dashboard Overview")

  useEffect(() => {
    document.title = `Invitu - ${title}`
  }, [title])
  

  return (
    <DashboardContext.Provider value={{ title, setTitle }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
