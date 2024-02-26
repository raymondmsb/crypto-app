import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from'react';
import API from 'aws-amplify';

function App() {
  // create coins variable and set to empty array
  const [coins, updatedCoins] = useState([]);

  // Define function to all API
  const fetchCoins = async () => {
    try {
      const response = await API.get('cryptoAPI', '/coins');
      console.log(response);
      updatedCoins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
