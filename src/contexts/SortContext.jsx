// src/contexts/SortContext.js
import React, { createContext, useContext, useState } from 'react';

const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [sortByValue, setSortByValue] = useState(true);

  const handleToggleSort = () => {
    setSortByValue(prev => !prev);
  };

  return (
    <SortContext.Provider value={{ sortByValue, handleToggleSort }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
};