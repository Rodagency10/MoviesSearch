import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

interface DiscoverMoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  backdrop_path: string;
  status: string;
  tagline: string;
}

interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getGenres: builder.query<GenreResponse, void>({
      query: () => `genre/movie/list?api_key=${API_KEY}&language=fr-FR`,
    }),
    discoverMovies: builder.query<DiscoverMoviesResponse, { page?: number; genreId?: number; year?: number }>({
      query: ({ page = 1, genreId, year }) => 
        `discover/movie?api_key=${API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}${genreId ? `&with_genres=${genreId}` : ''}${year ? `&primary_release_year=${year}` : ''}`,
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (movieId) => `movie/${movieId}?api_key=${API_KEY}&language=fr-FR`,
    }),
    searchMovies: builder.query<SearchMoviesResponse, { query: string; page?: number; year?: number }>({
      query: ({ query, page = 1, year }) => 
        `search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}&page=${page}&include_adult=false${year ? `&primary_release_year=${year}` : ''}`,
    }),
  }),
});

export const { 
  useGetGenresQuery, 
  useDiscoverMoviesQuery, 
  useGetMovieDetailsQuery,
  useSearchMoviesQuery 
} = moviesApi;
