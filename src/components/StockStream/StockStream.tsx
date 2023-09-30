import StyledStockStream from "./StockStream.styled";

interface Stocks {
    [key: string]: number;
  }

interface StockStreamProps {
    data:Stocks,
    stocks:string[],
    selectedStocks: string[],
    setSelectedStocks: React.Dispatch<React.SetStateAction<string[]>>;
  }

const StockStream = ({selectedStocks, data, stocks, setSelectedStocks}: StockStreamProps) => {
    return (
    <StyledStockStream>
         {stocks.map((stock) => (
        <button onClick={() => setSelectedStocks([...selectedStocks, stock])} key={stock}>{stock}</button>
      ))}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </StyledStockStream>
    )
}

export default StockStream;