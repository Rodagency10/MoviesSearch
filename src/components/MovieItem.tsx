import React from 'react';
import { Movie } from '../services/moviesApi';

interface MovieItemProps {
  movie: Movie;
  onSelect: (movieId: number) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onSelect }) => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onSelect(movie.id)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-800">
          {new Date(movie.release_date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="mt-2 bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded-full inline-block">
          {Math.round(movie.vote_average * 10)}%
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
