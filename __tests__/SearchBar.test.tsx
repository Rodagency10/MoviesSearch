import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../src/components/SearchBar';
import searchReducer from '../src/store/searchSlice';
import '@testing-library/jest-dom';

const mockStore = configureStore({
  reducer: {
    search: searchReducer,
  },
});

test('renders SearchBar component', () => {
  render(
    <Provider store={mockStore}>
      <SearchBar onSearch={() => {}} />
    </Provider>
  );
  expect(screen.getByPlaceholderText('Rechercher un film, une série ...')).toBeInTheDocument();
});

test('calls onSearch when button is clicked', () => {
  const mockOnSearch = jest.fn();
  render(
    <Provider store={mockStore}>
      <SearchBar onSearch={mockOnSearch} />
    </Provider>
  );
  fireEvent.click(screen.getByText('Rechercher'));
  expect(mockOnSearch).toHaveBeenCalled();
});
