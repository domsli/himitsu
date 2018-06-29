var http = require('http');

const hostname = "localhost";
const port = 9000;
const express = require('express');
const app = new express();

app.use(express.static('public'));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`
      Server is running at http://${hostname}:${port}/ 
      Server hostname ${hostname} is listening on port ${port}!
  `);
});