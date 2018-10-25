const serverless = require('serverless-http');
const express = require('express')
const app = express()

massive(config.connection).then( db => {      // Returns database. See Massive docs for connection options
  app.set('db', db)
  console.log('db')
}).catch( err => {
  console.log(err)                          //If Dual Session can't connect to db
})

app.get('/so', function (req, res) {
  res.send('Hello World!')
})

module.exports.handler = serverless(app);