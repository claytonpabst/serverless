const serverless = require('serverless-http');
const express = require('express');
const config = require('./config.js')
const app = express()

let dbInstance = {}

console.log("hit")
console.log(__dirname)
app.use(express.static(__dirname + './client/build'))

app.get('/', function (req, res) {
  fs.readFile()
})

//us

module.exports.handler = serverless(app);