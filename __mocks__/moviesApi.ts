import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mockMovies = {
  page: 1,
  results: [
    {
      id: 1,
      title: "Test Movie 1",
      release_date: "2024-01-01",
      poster_path: "/test1.jpg",
      overview: "Test overview 1",
      vote_average: 7.5,
    },
    {
      id: 2,
      title: "Test Movie 2",
      release_date: "2024-01-02",
      poster_path: "/test2.jpg",
      overview: "Test overview 2",
      vote_average: 8.0,
    },
  ],
  total_pages: 10,
  total_results: 100,
};

export const mockGenres = {
  genres: [
    { id: 28, name: "Action" },
    { id: 35, name: "Comédie" },
    { id: 18, name: "Drame" },
  ],
};

export const mockMovieDetails = {
  id: 1,
  title: "Test Movie 1",
  release_date: "2024-01-01",
  poster_path: "/test1.jpg",
  backdrop_path: "/backdrop1.jpg",
  overview: "Test overview 1",
  vote_average: 7.5,
  genres: [
    { id: 28, name: "Action" },
    { id: 35, name: "Comédie" },
  ],
  runtime: 120,
  budget: 1000000,
  revenue: 2000000,
  status: "Released",
  tagline: "Test tagline",
};

// Créer une version mock de l'API avec la même structure que l'original
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      queryFn: () => ({ data: mockGenres }),
    }),
    discoverMovies: builder.query({
      queryFn: () => ({ data: mockMovies }),
    }),
    getMovieDetails: builder.query({
      queryFn: () => ({ data: mockMovieDetails }),
    }),
    searchMovies: builder.query({
      queryFn: () => ({ data: mockMovies }),
    }),
  }),
});

// Créer des versions mock des hooks avec Jest
export const {
  useGetGenresQuery,
  useDiscoverMoviesQuery,
  useGetMovieDetailsQuery,
  useSearchMoviesQuery,
} = moviesApi;

// Remplacer les fonctions par des mocks
jest.mock('../src/services/moviesApi', () => ({
  ...jest.requireActual('../__mocks__/moviesApi'),
  useGetGenresQuery: jest.fn(() => ({
    data: mockGenres,
    error: null,
    isLoading: false,
  })),
  useDiscoverMoviesQuery: jest.fn(() => ({
    data: mockMovies,
    error: null,
    isLoading: false,
  })),
  useGetMovieDetailsQuery: jest.fn(() => ({
    data: mockMovieDetails,
    error: null,
    isLoading: false,
  })),
  useSearchMoviesQuery: jest.fn(() => ({
    data: mockMovies,
    error: null,
    isLoading: false,
  })),
}));

export default moviesApi;
