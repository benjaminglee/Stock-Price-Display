import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockStream from './components/StockStream/StockStream';

function App() {
  const [data, setData] = useState({});
  const [stocks, setStocks] = useState<string[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])

  useEffect(() => {
    //fetch stocks from backend api
    axios.get('http://localhost:8080/api/stocks') //TODO dynamically change backend url
    .then((response) => {
      const result = [];
      for(let symbol in response.data) {
        result.push(symbol);
      }
      setStocks([...result]);
    })
    .catch((error) => {
      console.error('Error fetching stocks:', error);
    });
  }, [])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); //TODO dynamically change backend url

    ws.onmessage = (event) => {
      if (typeof event.data === 'string') {
        const message = JSON.parse(event.data);
        setData(message);
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
      <StockStream setSelectedStocks={setSelectedStocks} stocks={stocks} selectedStocks={selectedStocks} data={data}/>
    </div>
  );
}

export default App;