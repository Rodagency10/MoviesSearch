import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { FilterProvider } from './contexts/FilterContext';

import FilterBar from './components/FilterBar';
import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  return (
    <Provider store={store}>
      <FilterProvider>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Recherche ton film</h1>
          <FilterBar />
          {selectedMovie ? (
            <MovieDetails imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
          ) : (
            <MovieList onSelectMovie={setSelectedMovie} />
          )}
        </div>
      </FilterProvider>
    </Provider>
  );
}

export default App;
