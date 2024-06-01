import React from 'react';
import CandlestickChart from './CandlestickChart';
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

function App() {
  return (
    <div className="App">
      <h1>Candlestick Chart</h1>
      <CandlestickChart socket ={socket} />
    </div>
  );
}

export default App;
