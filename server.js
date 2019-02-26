//Install express server
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const dotenv = require('dotenv');
const pg = require('pg');


var port = process.env.PORT || 8080;
var connectionString = "postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT*/*DATABASE*"
var router = express.Router();

connectionString = "postgres://:@:5432/dktnp0dql1q5k"
  
const config = {
  user: 'xuamcueiltwsar',
  password: '35ad6253deb74e6f8aa19a178e9b3240744c30ca4a9f5719933ca168592e262c',
  host: 'ec2-54-243-228-140.compute-1.amazonaws.com',
  port: '5432',
  database: 'dktnp0dql1q5k',
  ssl: true
};

var pool = new pg.Pool(config)



// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/vente2'));

// Route de test, sur /api
router.get('/', function(req, res) {
  res.json({ message: 'Bienvenue sur l\'API de GTI525'});   
});

router.get('/testdb', (req, res, next) => {
  console.log('testdb')
  pool.connect().then(client => {
    client.query('select * from information_schema.tables').then(res => {
      client.release();
      console.log(res);
      console.log('hello from', res.rows[0].name);
    })
    .catch(e => {
      client.release();
      console.error('query error', e.message, e.stack);
    })
  })
});


// --------------------
// ROUTES D'API
// --------------------

//Enregistre les routes d'API pour qu'elles soient accessibles sur /api
app.use('/api', router);


// FIN DES ROUTES



// Page Angular de présentation des messages
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/vente2/index.html'));
});



// Start the app by listening on the default Heroku port
app.listen(port);
console.log('Serveur démarré sur le port ' + port);