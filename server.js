//Install express server
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const dotenv = require('dotenv');



const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var config = dotenv.config();
var port = process.env.PORT || 8080;


// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/vente2'));

// Page Angular de présentation des messages
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/vente2/index.html'));
});


// Start the app by listening on the default Heroku port
app.listen(port);
console.log('Serveur démarré sur le port ' + port);