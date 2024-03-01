import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from'react';
import { get } from 'aws-amplify/api';

function App() {
  // create coins variable and set to empty array
  const [coins, updatedCoins] = useState([]);

  const [input, updateInput] = useState({ limit: 5, start: 0 });

  const updateInputValue = (type, value) => {
    updateInput({ ...input, [type]: value });
  };

  // Define function to all API
  const fetchCoins = async () => {
    const { limit, start } = input;
    try {
      const restOperation = get({ 
        apiName: 'cryptoAPI',
        path: `/coins?limit=${limit}&start=${start}` 
      });
      const response = await restOperation.response;
      const responseBody = await response.body.json();
      console.log('GET call succeeded: ', responseBody);
      updatedCoins(responseBody.coins);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className='App'>
      {
        coins.map((coin, index) => (
          <div key={index}>
              <h1>{coin.name}</h1>
              <p>{coin.symbol}</p>
              <p>{coin.price}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;
