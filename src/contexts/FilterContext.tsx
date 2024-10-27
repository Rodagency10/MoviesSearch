import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FilterContextType {
  genre: string;
  year: string;
  setGenre: (genre: string) => void;
  setYear: (year: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  return (
    <FilterContext.Provider value={{ genre, year, setGenre, setYear }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
