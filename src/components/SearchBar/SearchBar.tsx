import StyledSearchBar from './SearchBar.styled';
import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import { Stocks } from '../../interfaces';
import axios from 'axios';

interface SearchBarProps {
  handleAddResult: any;
}
const SearchBar = ({ handleAddResult }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/search?q=${query}`);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event: any) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const debouncedSearch = debounce((value) => {
    handleSearch(value);
  }, 300);

  return (
    <StyledSearchBar>
      <input type="text" placeholder="Search stocks..." value={query} onChange={handleInputChange} />
      <div className="resultsContainer">
        {searchResults.map((result) => {
          return (
            <div
              className="searchResult"
              key={'index_' + result.symbol}
              onClick={() => {
                handleAddResult(result.symbol);
                setQuery('');
                setSearchResults([]);
              }}
            >
              <div className="symbol">{result.symbol}</div>
              <div className="price">{result.price}</div>
            </div>
          );
        })}
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
