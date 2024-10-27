import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MovieList from "../src/components/MovieList";
import { moviesApi } from "../src/services/moviesApi";
import { FilterProvider } from "../src/contexts/FilterContext";
import searchReducer from "../src/store/searchSlice";
import "@testing-library/jest-dom";

// Mock complet du store Redux
const mockStore = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

jest.mock("../src/services/moviesApi");

describe("MovieList", () => {
  // Mock de la fonction onSelectMovie
  const mockOnSelectMovie = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders MovieList component", () => {
    // Setup mock return value
    (moviesApi.useDiscoverMoviesQuery as jest.Mock).mockReturnValue({
      data: {
        results: [
          { id: 1, title: "Test Movie 1" },
          { id: 2, title: "Test Movie 2" },
        ],
      },
      error: null,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <FilterProvider>
          <MovieList onSelectMovie={mockOnSelectMovie} />
        </FilterProvider>
      </Provider>
    );

    expect(screen.getByText("Résultats")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    (moviesApi.useDiscoverMoviesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });

    render(
      <Provider store={mockStore}>
        <FilterProvider>
          <MovieList onSelectMovie={mockOnSelectMovie} />
        </FilterProvider>
      </Provider>
    );

    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("displays error state", () => {
    (moviesApi.useDiscoverMoviesQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { message: "Error message" },
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <FilterProvider>
          <MovieList onSelectMovie={mockOnSelectMovie} />
        </FilterProvider>
      </Provider>
    );

    expect(screen.getByText(/Erreur serveur/i)).toBeInTheDocument();
  });
});
