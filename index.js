const serverless = require('serverless-http');
const express = require('express');
const massive = require('massive');
const config = require('./config.js')
const app = express()

massive(config.connection).then( db => {
  app.set('db', db)
  console.log('db')
}).catch( err => {
  console.log(err)    
})

app.get('/', function (req, res) {
  console.log("hello")
  console.log(req.app.get('db'))
  res.send('Hello World!')
})

module.exports.handler = serverless(app);