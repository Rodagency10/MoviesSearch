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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          data.Search.forEach(movie => {
            dispatch(
              omdbApi.util.updateQueryData('getMovieDetails', movie.imdbID, () => {
                return { ...movie } as MovieDetails;
              })
            );
            dispatch(omdbApi.endpoints.getMovieDetails.initiate(movie.imdbID));
          });
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      },
    }),
    getMovieDetails: builder.query<MovieDetails, string>({
      query: (imdbID) => `?apikey=${API_KEY}&i=${imdbID}`,
    }),
    searchMoviesWithDetails: builder.query<MovieDetails[], { search: string; page: number }>({
      async queryFn(arg, queryApi, extraOptions, baseQuery) {
        const searchResult = await baseQuery(`?apikey=${API_KEY}&s=${arg.search}&page=${arg.page}`);
        if (searchResult.error) return { error: searchResult.error };
        
        const searchData = searchResult.data as SearchResponse;
        if (!searchData.Search || !Array.isArray(searchData.Search)) {
          return { data: [] };
        }
        
        const detailsPromises = searchData.Search.map(movie => 
          baseQuery(`?apikey=${API_KEY}&i=${movie.imdbID}`)
        );
        const detailsResults = await Promise.all(detailsPromises);
        const validDetails = detailsResults
          .filter((result): result is { data: MovieDetails } => 'data' in result)
          .map(result => result.data as MovieDetails);
        
        return { data: validDetails };
      },
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery, useSearchMoviesWithDetailsQuery } = omdbApi;
