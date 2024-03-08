import React, { useState, useEffect } from'react';
import { get } from 'aws-amplify/api';

export const Born = () => {
  const [name, updateName] = useState([]);
  const [created, updateCreated] = useState([]);
  const [statement, updateStatement] = useState("Loading...");

  const fetchInfo = async () => {
    try {
      const restOperation = get({ 
        apiName: 'cryptoAPI',
        path: `/born` 
      });
      const response = await restOperation.response;
      const responseBody = await response.body.json();
      console.log('GET call succeeded: ', responseBody);
      updateName(responseBody.name);
      updateCreated(responseBody.date_created);
      updateStatement(`The github user ${name}, was born on ${created}.`);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <h2>{ statement }</h2>
  );
}

