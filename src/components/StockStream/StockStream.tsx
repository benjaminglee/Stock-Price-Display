import StyledStockStream from './StockStream.styled';
import SearchBar from '../SearchBar/SearchBar';
import ChartCard from '../ChartCard/ChartCard';
import { useEffect } from 'react';

interface StockStreamProps {
  historicalData: any;
  stocks: string[];
  selectedStocks: string[];
  setSelectedStocks: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddResult: any;
}

const StockStream = ({ handleAddResult, historicalData }: StockStreamProps) => {
  const stocksArr = Object.entries(historicalData);
  //   useEffect(() => console.log(historicalData), [historicalData]);
  return (
    <StyledStockStream>
      <SearchBar handleAddResult={handleAddResult} />
      {!!stocksArr.length &&
        stocksArr.map((symbol) => <ChartCard key={symbol} symbol={symbol[0]} data={historicalData} />)}
    </StyledStockStream>
  );
};

export default StockStream;
