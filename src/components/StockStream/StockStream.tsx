import StyledStockStream from './StockStream.styled';
import SearchBar from '../SearchBar/SearchBar';
import ChartCard from '../ChartCard/ChartCard';
import { useEffect } from 'react';

interface StockStreamProps {
  historicalData: any;
  stocks: [string, number][];
  selectedStocks: string[];
  handleRemoveStock: any;
  setSelectedStocks: React.Dispatch<React.SetStateAction<string[]>>;
  setHistoricalData: any;
  handleAddResult: any;
}

const StockStream = ({
  handleAddResult,
  handleRemoveStock,
  historicalData,
  setHistoricalData,
  selectedStocks,
  stocks,
}: StockStreamProps) => {
  const stocksArr = Object.entries(historicalData);
  //   useEffect(() => console.log(historicalData), [historicalData]);
  return (
    <StyledStockStream>
      <SearchBar setHistoricalData={setHistoricalData} stocks={stocks} handleAddResult={handleAddResult} />
      {!!stocksArr.length &&
        stocksArr
          .filter((symbol) => selectedStocks.includes(symbol[0]))
          .map((symbol) => (
            <ChartCard key={symbol} symbol={symbol[0]} data={historicalData} handleRemoveStock={handleRemoveStock} />
          ))}
    </StyledStockStream>
  );
};

export default StockStream;
