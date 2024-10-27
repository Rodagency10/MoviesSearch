import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setSearchTerm } from "../store/searchSlice";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search.searchTerm);

  return (
    <div className="flex mb-8 justify-center">
      <input
        type="text"
        value={search}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Rechercher un film, une série ..."
        className="p-3 border rounded-l-full w-full max-w-2xl text-black"
      />
      <Button onClick={() => onSearch(search)} className="rounded-r-full bg-teal-500 hover:bg-teal-600 h-15">
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
