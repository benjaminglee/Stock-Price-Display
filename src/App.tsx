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

    const messageQueue: any[] = []; // Define a type for your messageQueue array

    ws.onmessage = (event) => {
      // Handle incoming messages here
      if (typeof event.data === 'string') {
        const message: { [symbol: string]: number } = JSON.parse(event.data); // Define a type for your message object
        messageQueue.push(message); // Add the message to the queue
      }
    };

    // Use a timer to process the messages after a delay
    let processingTimer: NodeJS.Timeout | null = null; // Define a type for your timer

    function processQueuedMessages() {
      if (messageQueue.length > 0) {
        // Aggregate data from all messages in the queue
        const aggregatedData: { [symbol: string]: number[] } = {}; // Define a type for your aggregatedData object

        for (const message of messageQueue) {
          for (const symbol in message) {
            if (!aggregatedData[symbol]) {
              aggregatedData[symbol] = [];
            }
            aggregatedData[symbol].push(message[symbol]);
          }
        }

        // Update your historicalData state with the aggregated data
        setHistoricalData((prevData: any) => {
          const newData = { ...prevData };
          for (const symbol in aggregatedData) {
            if (newData[symbol]) {
              newData[symbol].push(...aggregatedData[symbol]);
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

      // Set a new timer for the next processing cycle
      processingTimer = setTimeout(processQueuedMessages, 500); // 500ms throttle duration
    }

    // Start the initial timer
    processingTimer = setTimeout(processQueuedMessages, 500);

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
