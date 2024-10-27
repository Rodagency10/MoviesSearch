import { render, screen, fireEvent } from '@testing-library/react';
import MovieItem from '../src/components/MovieItem';
import '@testing-library/jest-dom';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  release_date: '2023-01-01',
  poster_path: '/test.jpg',
  vote_average: 7.5,
  overview: 'Test overview',
};

test('renders MovieItem component', () => {
  render(<MovieItem movie={mockMovie} onSelect={() => {}} />);
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText('75%')).toBeInTheDocument();
});

test('calls onSelect when clicked', () => {
  const mockOnSelect = jest.fn();
  render(<MovieItem movie={mockMovie} onSelect={mockOnSelect} />);
  fireEvent.click(screen.getByText('Test Movie'));
  expect(mockOnSelect).toHaveBeenCalledWith(1);
});
