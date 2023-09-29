import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      {stocks.map((stock) => (
        <button onClick={() => setSelectedStocks([...selectedStocks, stock])} key={stock}>{stock}</button>
      ))}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;