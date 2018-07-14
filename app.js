/* Establish database connection */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Successfully connected to mongodb!");
});

const date = new Date();

// Schema for a Daily
const dailySchema = mongoose.Schema({
  title: String,
  content: String, // JSON string
  year: Number,
  month: { type: Number, min: 1, max: 12 },
  date: { type: Number, min: 1, max: 31 },
});

// Daily model
const Daily = mongoose.model('Daily', dailySchema);

/* Route/resource handling */
const http = require('http');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

const hostname = "localhost";
const port = 9000;
const express = require('express');
const app = new express();

app.use(express.static('public'));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

app.get('/daily/:year/:month/:date', function(request, response){
  Daily.findOne({
    year: parseInt(request.params.year),
    month: parseInt(request.params.month),
    date: parseInt(request.params.date),
  }, function(err, doc) {
    if (err) {
      next(err);
    }
    else {
      return response.json(doc);
    }
  });
});

app.put('/daily/:year/:month/:date', jsonParser, function(request, response){
  Daily.findOneAndUpdate({
    year: parseInt(request.params.year),
    month: parseInt(request.params.month),
    date: parseInt(request.params.date),
  }, { 
    $set: {
      title: request.body.title, 
      content: request.body.content
    }
  }, {
    upsert: true, new: true
  }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      response.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`
      Server is running at http://${hostname}:${port}/ 
      Server hostname ${hostname} is listening on port ${port}!
  `);
});