import React from "react";
import { useGetMovieDetailsQuery } from "../services/omdbApi";
import { Button } from "./ui/button";

interface MovieDetailsProps {
  imdbID: string;
  onClose: () => void;
}

// {
//   "Title": "Everything Everywhere All at Once",
//   "Year": "2022",
//   "Rated": "R",
//   "Released": "08 Apr 2022",
//   "Runtime": "139 min",
//   "Genre": "Action, Adventure, Comedy",
//   "Director": "Daniel Kwan, Daniel Scheinert",
//   "Writer": "Daniel Kwan, Daniel Scheinert",
//   "Actors": "Michelle Yeoh, Stephanie Hsu, Jamie Lee Curtis",
//   "Plot": "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
//   "Language": "English, Mandarin, Cantonese",
//   "Country": "United States",
//   "Awards": "Won 7 Oscars. 405 wins & 374 nominations total",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BOWNmMzAzZmQtNDQ1NC00Nzk5LTkyMmUtNGI2N2NkOWM4MzEyXkEyXkFqcGc@._V1_SX300.jpg",
//   "Ratings": [
//       {
//           "Source": "Internet Movie Database",
//           "Value": "7.8/10"
//       },
//       {
//           "Source": "Rotten Tomatoes",
//           "Value": "93%"
//       },
//       {
//           "Source": "Metacritic",
//           "Value": "81/100"
//       }
//   ],
//   "Metascore": "81",
//   "imdbRating": "7.8",
//   "imdbVotes": "552,248",
//   "imdbID": "tt6710474",
//   "Type": "movie",
//   "DVD": "N/A",
//   "BoxOffice": "$77,191,785",
//   "Production": "N/A",
//   "Website": "N/A",
//   "Response": "True"
// }

const MovieDetails: React.FC<MovieDetailsProps> = ({ imdbID, onClose }) => {
  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(imdbID);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue: {JSON.stringify(error)}</div>;
  if (!movie) return <div>Aucune donnée de film disponible</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <Button onClick={onClose} className="mb-4">
        Retour
      </Button>

      <div className="flex gap-4">
        <img src={movie.Poster} alt={movie.Title} className="h-auto" />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
          <p>
            <strong>Année:</strong> {movie.Year}
          </p>
          <p>
            <strong>Réalisateur:</strong> {movie.Director}
          </p>
          <p>
            <strong>Synopsis:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Acteurs:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Langue:</strong> {movie.Language}
          </p>
          <p>
            <strong>Pays:</strong> {movie.Country}
          </p>
          <p>
            <strong>Récompenses:</strong> {movie.Awards}
          </p>
          <p>
            <strong>Box Office:</strong> {movie.BoxOffice}
          </p>
          <p>
            <strong>Production:</strong> {movie.Production}
          </p>
          <p>
            <strong>Site web:</strong> {movie.Website}
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default MovieDetails;
