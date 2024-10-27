import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FilterBar from '../src/components/FilterBar';
import { moviesApi } from '../src/services/moviesApi';
import { FilterProvider } from '../src/contexts/FilterContext';
import '@testing-library/jest-dom';

const mockStore = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

test('renders FilterBar component', () => {
  render(
    <Provider store={mockStore}>
      <FilterProvider>
        <FilterBar />
      </FilterProvider>
    </Provider>
  );
  expect(screen.getByText('Filtrer par genre')).toBeInTheDocument();
  expect(screen.getByText('Filtrer par année')).toBeInTheDocument();
});
