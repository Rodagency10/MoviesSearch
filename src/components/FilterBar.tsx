import React from "react";
import { useFilter } from "../contexts/FilterContext";

const FilterBar: React.FC = () => {
  const { genre, year, setGenre, setYear } = useFilter();

  return (
    <div className="mb-4">
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="mr-2 p-2 border rounded"
      >
        <option value="">Tout</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Adventure">Adventure</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Thriller">Thriller</option>
        <option value="Horror">Horror</option>
      </select>
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Filtrer par année"
        className="p-2 border rounded"
      />
    </div>
  );
};

export default FilterBar;
