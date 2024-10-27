import React, { useState } from "react";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FilterBar from "./components/FilterBar";
import { FilterProvider } from "./contexts/FilterContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <Provider store={store}>
      <FilterProvider>
        <div className="min-h-screen">
          <div
            className="bg-cover bg-center bg-no-repeat h-56"
            style={{ backgroundImage: `url(/public/homepage_banner.jpg)` }}
          >
            <header className="p-8 text-center bg-gradient-to-b from-blue-900 to-blue-700 opacity-80 flex flex-col justify-center items-center h-full text-white">
              <h1 className="text-4xl font-bold mb-2">Bienvenue,</h1>
              <p className="text-xl mb-8">
                Recherchez parmi des millions de films et séries ...
              </p>
            </header>
          </div>
          <main className="container mx-auto px-4">
            {selectedMovieId ? (
              <MovieDetails
                movieId={selectedMovieId}
                onClose={() => setSelectedMovieId(null)}
              />
            ) : (
              <div className="flex flex-col lg:flex-row mt-8">
                <aside className="lg:w-1/4 lg:pr-8">
                  <FilterBar />
                </aside>
                <div className="lg:w-3/4">
                  <MovieList onSelectMovie={setSelectedMovieId} />
                </div>
              </div>
            )}
          </main>

          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; {new Date().getFullYear()} | Made with ❤️ by <a href="https://github.com/Rodagency10" className="text-teal-500 hover:text-teal-600">Rodrigue EPUH</a></p>
          </footer>
        </div>
      </FilterProvider>
    </Provider>
  );
};

export default App;
