import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockStream from './components/StockStream/StockStream';

function App() {
  const [stocks, setStocks] = useState<string[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [historicalData, setHistoricalData] = useState<{ [symbol: string]: number[] }>({});

  const handleAddResult = (symbol: any) => {
    if (!selectedStocks.includes(symbol)) {
      setSelectedStocks([...selectedStocks, symbol]);
    }
  };

  useEffect(() => {
    // Fetch stocks from backend API
    axios
      .get('http://localhost:8080/api/stocks') // TODO: dynamically change backend URL
      .then((response) => {
        const result = [];
        for (let symbol in response.data) {
          result.push(symbol);
        }
        setStocks([...result]);
      })
      .catch((error) => {
        console.error('Error fetching stocks:', error);
      });
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // TODO: dynamically change backend URL

    ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const message = JSON.parse(event.data);
        console.log(message);
        setHistoricalData((prevData) => {
          const newData = { ...prevData };
          for (const symbol in message) {
            if (newData[symbol]) {
              newData[symbol].push(message[symbol]);
            } else {
              newData[symbol] = [null, null, null, null, message[symbol]];
            }
          }
          return newData;
        });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(selectedStocks));
    };

    return () => {
      ws.close();
    };
  }, [selectedStocks]);

  return (
    <div className="App">
      <StockStream
        handleAddResult={handleAddResult}
        setSelectedStocks={setSelectedStocks}
        stocks={stocks}
        selectedStocks={selectedStocks}
        historicalData={historicalData}
      />
    </div>
  );
}

export default App;
