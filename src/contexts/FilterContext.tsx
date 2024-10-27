import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FilterContextType {
  genreId: number | undefined;
  setGenreId: (genreId: number | undefined) => void;
  releaseYear: number | undefined;
  setReleaseYear: (year: number | undefined) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [genreId, setGenreId] = useState<number | undefined>(undefined);
  const [releaseYear, setReleaseYear] = useState<number | undefined>(undefined);

  return (
    <FilterContext.Provider value={{ genreId, setGenreId, releaseYear, setReleaseYear }}>
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
