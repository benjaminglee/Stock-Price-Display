import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockStream from './components/StockStream/StockStream';
import Popup from './components/Popup/Popup';
import throttle from 'lodash/throttle';

function App() {
  const [stocks, setStocks] = useState<[string, number][]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [historicalData, setHistoricalData] = useState<{ [symbol: string]: number[] }>({});
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleAddResult = (symbol: any) => {
    if (!selectedStocks.includes(symbol)) {
      setSelectedStocks([...selectedStocks, symbol]);
    }
  };

  const handleRemoveStock = (symbol: any) => {
    if (selectedStocks.includes(symbol)) {
      setSelectedStocks(selectedStocks.filter((stock) => stock !== symbol));
    }
    console.log(symbol);
  };

  useEffect(() => {
    // Fetch stocks from backend API
    axios
      .get('http://localhost:8080/api/stocks') // TODO: dynamically change backend URL
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching stocks:', error);
      });
  }, []);

  function createWebSocket(selectedStocks: any, setHistoricalData: any) {
    const ws = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket URL

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setShowErrorPopup(false);
      ws.send(JSON.stringify(selectedStocks));
    };

    ws.onmessage = (event) => {
      // Handle incoming messages here
      if (typeof event.data === 'string') {
        const message = JSON.parse(event.data);
        setHistoricalData((prevData: any) => {
          const newData = { ...prevData };
          for (const symbol in message) {
            if (newData[symbol]) {
              newData[symbol].push(message[symbol]);
            } else {
              const emptyArr = new Array(49).fill(null);
              console.log('emptyArr', emptyArr);
              newData[symbol] = [...emptyArr, message[symbol]];
            }
          }
          return newData;
        });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        setShowErrorPopup(true);
        console.error(`WebSocket connection lost: code=${event.code}, reason=${event.reason}`);
        // Implement your reconnection logic here
        setTimeout(() => {
          console.log('Reconnecting...');
          createWebSocket(selectedStocks, setHistoricalData); // Attempt to create a new WebSocket connection
        }, 3000); // Retry every 5 seconds (adjust as needed)
      }
    };

    return ws;
  }

  useEffect(() => {
    const ws = createWebSocket(selectedStocks, setHistoricalData);

    return () => {
      ws.close();
    };
  }, [selectedStocks, setHistoricalData]);

  return (
    <div className="App">
      {showErrorPopup && <Popup />}
      <StockStream
        handleAddResult={handleAddResult}
        setSelectedStocks={setSelectedStocks}
        stocks={stocks}
        selectedStocks={selectedStocks}
        historicalData={historicalData}
        setHistoricalData={setHistoricalData}
        handleRemoveStock={handleRemoveStock}
      />
    </div>
  );
}

export default App;
