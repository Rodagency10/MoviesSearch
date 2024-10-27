import React, { useState } from "react";
import { useSearchMoviesQuery } from "../services/omdbApi";
import { useFilter } from "../contexts/FilterContext";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setSearchTerm } from "../store/searchSlice";

interface MovieListProps {
  onSelectMovie: (imdbID: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ onSelectMovie }) => {
  const [page, setPage] = useState(1);
  const { genre, year } = useFilter();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search.searchTerm);
  const { data, error, isLoading } = useSearchMoviesQuery({ search, page });

  console.log(data);

  console.log(genre);

  const filteredMovies = data?.Search?.filter(
    (movie) =>
      (!genre || movie.Genre?.split(",").includes(genre)) &&
      (!year || movie.Year === year)
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur serveur: {JSON.stringify(error)}</div>;

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Rechercher des films..."
        className="mb-4 p-2 border rounded"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies?.map((movie) => (
          <li key={movie.imdbID} className="border p-4 rounded">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-auto"
            />
            <h3 className="font-bold">{movie.Title}</h3>
            <p>{movie.Year}</p>
            <Button onClick={() => onSelectMovie(movie.imdbID)}>
              Voir les détails
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Précédent
        </Button>
        <Button onClick={() => setPage(page + 1)}>Suivant</Button>
      </div>
    </div>
  );
};

export default MovieList;
