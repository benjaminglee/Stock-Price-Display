import StyledStockStream from './StockStream.styled';
import SearchBar from '../SearchBar/SearchBar';

interface Stocks {
  [key: string]: number;
}

interface StockStreamProps {
  data: Stocks;
  stocks: string[];
  selectedStocks: string[];
  setSelectedStocks: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddResult: any;
}

const StockStream = ({ handleAddResult, selectedStocks, data, stocks, setSelectedStocks }: StockStreamProps) => {
  const stocksArr = Object.entries(data);
  return (
    <StyledStockStream>
      <SearchBar handleAddResult={handleAddResult} />
      {stocksArr.map(([symbol, price]) => (
        <div>
          {symbol} {price}
        </div>
      ))}
    </StyledStockStream>
  );
};

export default StockStream;
