import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'ed5c2f55';

interface Movie {
  imdbID: string;
  Title: string;
  Genre: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}


export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://www.omdbapi.com/' }),
  endpoints: (builder) => ({
    searchMovies: builder.query<SearchResponse, { search: string; page: number }>({
      query: ({ search = "social", page = 1 }) => `?apikey=${API_KEY}&s=${search}&page=${page}`,
    }),
    getMovieDetails: builder.query<MovieDetails, string>({
      query: (imdbID) => `?apikey=${API_KEY}&i=${imdbID}`,
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery } = omdbApi;
