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
  const cardArray = [];

  for (let stock of selectedStocks) {
    cardArray.push([stock, historicalData[stock]]);
  }
  //   useEffect(() => console.log(historicalData), [historicalData]);
  return (
    <StyledStockStream>
      <SearchBar
        selectedStocks={selectedStocks}
        setHistoricalData={setHistoricalData}
        stocks={stocks}
        handleAddResult={handleAddResult}
      />
      <div className="chartCardContainer">
        {!!cardArray.length &&
          cardArray
            .filter((symbol) => selectedStocks.includes(symbol[0]))
            .map((symbol) => (
              <ChartCard key={symbol} symbol={symbol[0]} data={historicalData} handleRemoveStock={handleRemoveStock} />
            ))}
      </div>
    </StyledStockStream>
  );
};

export default StockStream;
