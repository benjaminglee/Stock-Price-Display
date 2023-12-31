import StyledSearchBar from './SearchBar.styled';
import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { Stocks } from '../../interfaces';
import axios from 'axios';

interface SearchBarProps {
  handleAddResult: any;
  setHistoricalData: any;
  stocks: any;
  selectedStocks: string[];
}
const SearchBar = ({ handleAddResult, selectedStocks, stocks, setHistoricalData }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (searchContainerRef.current && !searchContainerRef.current?.contains(event.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsVisible(true);
    const filteredStocks = stocks.filter((stock: any) => !selectedStocks.includes(stock.symbol));
    if (query === '') setSearchResults(filteredStocks);
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/search?q=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event: any) => {
    setIsVisible(true);
    const newQuery = event.target.value;
    if (newQuery === '') {
      setQuery('');
      setSearchResults([]);
      return;
    }
    setQuery(newQuery.toUpperCase());
    debouncedSearch(newQuery);
  };

  const debouncedSearch = debounce((value) => {
    handleSearch(value);
  }, 300);

  const searchResultSizeSmall = searchResults.length > 5;

  return (
    <StyledSearchBar searchResultSizeSmall={searchResultSizeSmall}>
      <div className="backdrop">
        <input
          type="text"
          placeholder="Search stocks by symbol"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        <div className="resultsContainer" ref={searchContainerRef}>
          {isVisible &&
            searchResults.map((result) => {
              return (
                <div
                  className="searchResult"
                  key={'index_' + result.symbol}
                  onClick={() => {
                    setQuery('');
                    setSearchResults([]);
                    if (selectedStocks.includes(result.symbol)) return;
                    handleAddResult(result.symbol);
                    setHistoricalData((prevData: any) => {
                      const newData = { ...prevData };
                      const emptyArr = new Array(49).fill(null);
                      newData[result.symbol] = [...emptyArr];
                      return newData;
                    });
                  }}
                >
                  <div className="symbol">{result.symbol}</div>
                  <div className="price">{result.price}</div>
                </div>
              );
            })}
        </div>
      </div>
    </StyledSearchBar>
  );
};

export default SearchBar;
