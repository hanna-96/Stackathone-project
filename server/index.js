'use strict'

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { accessKeyId, secretAccessKey,} = require('../secrets')
//connecting to dynamodb
// const ddb = require('dynamodb').ddb({accessKeyId,secretAccessKey})
const AWS = require("aws-sdk")
const app = express()
//testing
// ddb.listTables({},function(err,res){
//     console.log(res)
// })
// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./api/spots')) // include our routes!

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app


//taken from GOODIEbag