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
      updateName(responseBody.user.name);
      updateCreated(responseBody.user.created_at);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
    updateStatement(`The github user ${name}, was born on ${created}.`);
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <h2>{ statement }</h2>
  );
}

