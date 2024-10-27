import React from "react";
import { useFilter } from "../contexts/FilterContext";
import { useGetGenresQuery } from "@/services/moviesApi";

const FilterBar: React.FC = () => {
  const { genreId, setGenreId, releaseYear, setReleaseYear } = useFilter();
  const { data: genresData } = useGetGenresQuery();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6 mb-4">

      
      <div className="flex flex-col space-y-2 border border-gray-300 p-4 rounded-md shadow-md">
        <label htmlFor="genre" className="font-bold">Filtrer par genre</label>
        <select
          id="genre"
          value={genreId?.toString() || ""}
          onChange={(e) => setGenreId(Number(e.target.value) || undefined)}
          className="bg-gray-200 p-2 rounded-md"
        >
          <option value="">Tous les genres</option>
          {genresData?.genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col space-y-2 border border-gray-300 p-4 rounded-md shadow-md">
        <label htmlFor="releaseYear" className="font-bold">Filtrer par année</label>
        <select
          id="releaseYear"
          value={releaseYear?.toString() || ""}
          onChange={(e) => setReleaseYear(Number(e.target.value) || undefined)}
          className="bg-gray-200 p-2 rounded-md"
        >
          <option value="">Toutes les années</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
