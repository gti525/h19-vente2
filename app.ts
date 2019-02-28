// lib/app.ts
import * as express from "express";
import "reflect-metadata";
import * as bodyParser from "body-parser";
import { createConnection, ConnectionOptions } from "typeorm";
import { Venue } from "./webserver/src/entity/Venue";

// Create a new express application instance

createConnection(<ConnectionOptions>{
  type: "postgres",

  // We need add the extra SSL to use heroku on localhost
  extra: {
    ssl: true,
  },

  // Change the next line to use the Heroku postgresql from other environment like localhost, remenber that heroku changes this data periodically for security reasons
  url: "postgres://xuamcueiltwsar:35ad6253deb74e6f8aa19a178e9b3240744c30ca4a9f5719933ca168592e262c@ec2-54-243-228-140.compute-1.amazonaws.com:5432/dktnp0dql1q5k",

  entities: [
    __dirname + "/webserver/src/entity/*.ts"
  ],
  subscribers: [],
  synchronize: true,
}).then(async connection => {

  const app: express.Application = express();
  app.use(bodyParser.json());
  var router = express.Router();
  var path = require('path');

  // --------------------
  // ROUTES D'API
  // --------------------


  router.get('/', function (req, res) {
    res.json({ message: 'Bienvenue sur l\'API de vente2 GTI525' });
  });

  router.get('/venues', async (req, res, next) => {
    console.log('testdb');
    var venueRepo = connection.manager.getRepository(Venue);
    const venues = await venueRepo.find();
    console.log(venues);
    return res.send(venues);
  });


  // FIN DES ROUTES API
  app.use('/api', router);


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

}).catch(error => console.log("TypeORM connection error: ", error));