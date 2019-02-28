// lib/app.ts
import express = require('express');
var path = require('path');

// Create a new express application instance
const app: express.Application = express();

app.get('/api/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static(__dirname + '/dist/vente2'));


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/vente2/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});