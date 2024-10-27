import React, { useState } from "react";
import { useFilter } from "../contexts/FilterContext";
import { Button } from "./ui/button";
import {
  useDiscoverMoviesQuery,
  useSearchMoviesQuery,
} from "@/services/moviesApi";
import SearchBar from "./SearchBar";
import MovieItem from "./MovieItem";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface MovieListProps {
  onSelectMovie: (movieId: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ onSelectMovie }) => {
  const [page, setPage] = useState(1);
  const { genreId, releaseYear } = useFilter();

  const [activeSearch, setActiveSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (search: string) => {
    setActiveSearch(search);
    setIsSearching(true);
    setPage(1);
  };

  const discoverQuery = useDiscoverMoviesQuery({
    page,
    genreId,
    year: releaseYear,
  });
  const searchQuery = useSearchMoviesQuery(
    { query: activeSearch, page, year: releaseYear },
    { skip: !isSearching }
  );

  const { data, error, isLoading } = isSearching ? searchQuery : discoverQuery;

  if (isLoading) return <div className="text-center">Chargement...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Erreur serveur: {JSON.stringify(error)}
      </div>
    );

  return (
    <div>

      {/* Barre de recherche */}
      <SearchBar onSearch={handleSearch} />

      <h2 className="text-2xl font-bold mb-4">Résultats</h2>

      {/* Liste des films */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.results.map((movie) => (
          <MovieItem key={movie.id} movie={movie} onSelect={onSelectMovie} />
        ))}
      </div>

      {/* Boutons de pagination */}
      <div className="my-8 flex justify-center gap-4">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className=""
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Précédent
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === data?.total_pages}
          className=""
        >
          Suivant
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MovieList;
