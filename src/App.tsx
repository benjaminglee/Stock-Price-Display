import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({});

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
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;