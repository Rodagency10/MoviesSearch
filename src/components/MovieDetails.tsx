import React from "react";
import { Button } from "./ui/button";
import { useGetMovieDetailsQuery } from "@/services/moviesApi";

interface MovieDetailsProps {
  movieId: number;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, onClose }) => {
  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(movieId);

  if (isLoading) return <div className="text-center text-white">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">Une erreur est survenue: {JSON.stringify(error)}</div>;
  if (!movie) return <div className="text-center text-white">Aucune donnée de film disponible</div>;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="relative min-h-screen w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center w-full" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      </div>
      <div className="relative z-10 p-8">
        <Button onClick={onClose} className="mb-4 bg-blue-600 hover:bg-blue-700">
          Retour
        </Button>
        <div className="flex flex-col md:flex-row gap-8">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full md:w-1/3 rounded-lg shadow-lg" 
          />
          <div className="flex-1 text-white">
            <h2 className="text-4xl font-bold mb-2">{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
            <p className="text-xl mb-4 text-gray-300">{movie.tagline}</p>
            <div className="mb-4">
              <span className="bg-blue-600 text-white text-lg font-bold py-1 px-3 rounded-full mr-2">
                {Math.round(movie.vote_average * 10)}%
              </span>
              <span className="text-gray-300">Score d'évaluation</span>
            </div>
            <p className="text-lg mb-4">{movie.overview}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">Genre</p>
                <p>{movie.genres.map(g => g.name).join(", ")}</p>
              </div>
              <div>
                <p className="font-bold">Durée</p>
                <p>{movie.runtime} minutes</p>
              </div>
              <div>
                <p className="font-bold">Budget</p>
                <p>${movie.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-bold">Recettes</p>
                <p>${movie.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-bold">Statut</p>
                <p>{movie.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
