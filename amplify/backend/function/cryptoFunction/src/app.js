/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


const axios = require('axios');

app.get('/coins', (req, res) => {
  let apiURL = 'https://api.coinlore.com/api/tickers?start=0&limit=10';
  if (req.apiGateway && req.apiGateway.event.queryStringParameters) {
    const { start = 0, limit = 10 } = req.apiGateway.event.queryStringParameters;
    apiURL = `https://api.coinlore.com/api/tickers?start=${start}&limit=${limit}`;
  }

  axios.get(apiURL)
 .then(response => {
      res.json({ coins: response.data.data });
    })
 .catch(error => {
      res.status(500).send(error);
    });
});

app.get('/born', (req, res) => {
  let apiURL = 'https://api.github.com/users/raymondmsb';

  axios.get(apiURL)
 .then(response => {
      res.json({ user: response.data });
    })
 .catch(error => {
      res.status(500).send(error);
    });
});

/*app.get('/coins', (req, res) => {
  const coins = [
    {name: 'Bitcoin', symbol: 'BTC', price: "10000"},
    {name: 'Ethereum', symbol: 'ETH', price: "1000"},
    {name: 'Ripple', symbol: 'XRP', price: "2000"},
    {name: 'Litecoin', symbol: 'LTC', price: "1500"},
    {name: 'Dogecoin', symbol: 'DOGE', price: "500"},
  ]
  res.json({
    coins
  });
});*/


/**********************
 * Example get method *
 **********************/

app.get('/item', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
