const serverless = require('serverless-http');
const express = require('express');
const config = require('./config.js')
const app = express()

app.get('/', function (req, res) {
  fs.readFile()
})

module.exports.handler = serverless(app);