const serverless = require('serverless-http');
const express = require('express');
const config = require('./config.js')
const app = express()

app.get('/user', function (req, res) {
  res.send('I am a person')
})

//us

module.exports.handler = serverless(app);