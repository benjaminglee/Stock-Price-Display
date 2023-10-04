import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockStream from './components/StockStream/StockStream';
import Popup from './components/Popup/Popup';

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

  const messageQueue: any[] = []; // Define a type for your messageQueue array
  // Use a timer to process the messages after a delay
  let processingTimer: NodeJS.Timeout | null = null;

  function processQueuedMessages() {
    if (processingTimer) {
      clearTimeout(processingTimer);
      processingTimer = null;
    }
    if (messageQueue.length > 0) {
      // Aggregate data from all messages in the queue
      const aggregatedData: { [symbol: string]: number[] } = {};

      for (const message of messageQueue) {
        for (const symbol in message) {
          if (!aggregatedData[symbol]) {
            aggregatedData[symbol] = [];
          }
          aggregatedData[symbol].push(message[symbol]);
        }
      }

      // Update historicalData state with the aggregated data
      setHistoricalData((prevData: any) => {
        const newData = { ...prevData };
        for (const symbol in aggregatedData) {
          if (newData[symbol]) {
            console.log(newData[symbol].length);
            newData[symbol].push(...aggregatedData[symbol]);
            if (newData[symbol].length > 50) newData[symbol] = newData[symbol].slice(-50);
          } else {
            const emptyArr = new Array(49).fill(null);
            newData[symbol] = [...emptyArr, ...aggregatedData[symbol]];
          }
        }
        return newData;
      });

      // Clear the message queue
      messageQueue.length = 0;
    }
    processingTimer = setTimeout(processQueuedMessages, 500);
  }
  let ws: any;
  function createWebSocket(selectedStocks: any, setHistoricalData: any) {
    if (ws) {
      ws.close();
    }

    ws = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket URL

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setShowErrorPopup(false);
      ws.send(JSON.stringify(selectedStocks));
    };

    ws.onmessage = (event: any) => {
      // Handle incoming messages here
      if (typeof event.data === 'string') {
        const message: { [symbol: string]: number } = JSON.parse(event.data); // Define a type for your message object
        messageQueue.push(message); // Add the message to the queue
      }
    };

    ws.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event: any) => {
      if (event.wasClean) {
        console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        // If not closed cleanly, attempt reconnect;
        setShowErrorPopup(true);
        console.error(`WebSocket connection lost: code=${event.code}, reason=${event.reason}`);
        setTimeout(() => {
          console.log('Reconnecting...');
          createWebSocket(selectedStocks, setHistoricalData);
        }, 3000);
      }
    };

    return ws;
  }

  useEffect(() => {
    const ws = createWebSocket(selectedStocks, setHistoricalData);
    setTimeout(processQueuedMessages, 500);
    return () => {
      ws.close();
    };
  }, [selectedStocks]);

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
