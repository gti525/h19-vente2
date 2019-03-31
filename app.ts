// lib/app.ts
import * as express from "express";
import "reflect-metadata";
import * as bodyParser from "body-parser";
import { createConnection, ConnectionOptions } from "typeorm";
import { Venue } from "./webserver/src/entity/Venue";
import { AppRoutes } from "./webserver/src/routes";
import * as PostgressConnectionStringParser from "pg-connection-string";

const port = process.env.PORT || 8080;
let LOCALHOST_SSL = true;
let DATABASE_URL;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
  if(process.env.LOCALHOST_SSL){
    LOCALHOST_SSL = (process.env.LOCALHOST_SSL === "true");
  }
}

if (process.env.DATABASE_URL){
  DATABASE_URL = process.env.DATABASE_URL;
} else {
  DATABASE_URL = "postgres://xuamcueiltwsar:35ad6253deb74e6f8aa19a178e9b3240744c30ca4a9f5719933ca168592e262c@ec2-54-243-228-140.compute-1.amazonaws.com:5432/dktnp0dql1q5k";
}
console.log("process.env.DATABASE_URL: " + process.env.DATABASE_URL);
console.log("DATABASE_URL: " + DATABASE_URL);
console.log("LOCALHOST_SSL: " + LOCALHOST_SSL);
// Create a new express application instancenpm
createConnection(<ConnectionOptions>{
  type: "postgres",

  // We need add the extra SSL to use heroku on localhost
  extra: {
    ssl: LOCALHOST_SSL,
  },

  // Change the next line to use the Heroku postgresql from other environment like localhost, remenber that heroku changes this data periodically for security reasons
  url: DATABASE_URL,

  entities: [
    __dirname + "/webserver/src/entity/*.ts"
  ],
  subscribers: [],
  synchronize: true,
  logging: "all",
}).then(async connection => {
  
  console.log("Opened connection to database.");

  var app: express.Application = express();
  //var cors = require('cors')
  //app.use(cors()) // Use this after the variable declaration
  app.use(bodyParser.json());
  const router = express.Router();

  // Utilisation de session
  var session = require('express-session');
  app.use(session({
    secret: 'keyboard cat', // Probably not secure hehe
    resave: false,
    saveUninitialized: true
  }))
  
  // Add headers
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });
  

  var path = require("path");
  //var Event = require("./src/app/models/event");

  // --------------------
  // ROUTES D'API
  // --------------------


  router.get("/", function (req, res) {
    res.json({ message: "Bienvenue suar l'API de vente2 GTI525" });
  });

 

  // register all application routes

  // example of a typescript TypeORM express https://github.com/typeorm/typescript-express-example

  AppRoutes.forEach(route => {
    // console.log(route);
    router[route.method](route.path, (request: Request, response: Response, next: Function) => {
        route.action(request, response)
            .then(() => next);
            // The routes sometime need to handle their errors (such as JSON issues).
            // TODO: I don't know how to do that without deactivating the next line.
            // .catch(err => next(err));
    });
  });

  // FIN DES ROUTES API
  //lier router à la route /api
  app.use("/api", router);

  // distribue l'application Angular par défaut.
  app.use(express.static(__dirname + "/dist/vente2"));

  // * permet de refresh une page à partir du même url. example /show/1 retournera toujours la même page.
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/dist/vente2/index.html"));
  });

  // on écoute sur process.env.port pour heroku et 8080 localement.
  app.listen(port);
  console.log("Listening on port : ", port );
  
//en cas d'erreur de connection à la DB 
}).catch(error => console.log("TypeORM connection error: ", error));