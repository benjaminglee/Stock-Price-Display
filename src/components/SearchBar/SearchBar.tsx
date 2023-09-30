import StyledSearchBar from "./SearchBar.styled"
import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import { Stocks } from "../../interfaces";

interface SearchBarProps {
    stocks: Stocks,
    onSearch: (query: string) => void;
}
const SearchBar = ({ stocks, onSearch }:SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event:any) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const debouncedSearch = debounce((value) => {
    onSearch(value);
  }, 300);

const SearchBar = () => {
    return (
        <StyledSearchBar>
             <input
                type="text"
                placeholder="Search stocks..."
                value={query}
                onChange={handleInputChange}
            />
            <ul>
                {stocks
                .filter((stock) => stock.includes(query))
                .map((stock, index) => (
                    <li key={index}>{stock}</li>
                ))}
            </ul>
        </StyledSearchBar>
    )
}

export default SearchBar