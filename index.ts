import "reflect-metadata";
import {createConnection, ConnectionOptions } from "typeorm";
import { Photo } from "./src/entity/Photo"
//https://github.com/typeorm/typeorm/issues/571


createConnection(<ConnectionOptions>{
    type: "postgres",

    // We need add the extra SSL to use heroku on localhost
    extra: {
        ssl: true,
    },

    // Change the next line to use the Heroku postgresql from other environment like localhost, remenber that heroku changes this data periodically for security reasons
    url: "postgres://xuamcueiltwsar:35ad6253deb74e6f8aa19a178e9b3240744c30ca4a9f5719933ca168592e262c@ec2-54-243-228-140.compute-1.amazonaws.com:5432/dktnp0dql1q5k", 

    entities: [
        __dirname + "/src/entity/*.ts"
    ],
    subscribers: [],
    synchronize: true,
}).then(async connection => {
    console.log("hello");

    let photo = new Photo();
    photo.name = "Damn good photo";
    photo.description = "Nicest one";
    photo.filename = "photo-with-me.jpg";
    photo.views = 1;
    photo.isPublished = true;

    await connection.manager.save(photo);
    console.log("Photo has been saved");
}).catch(error => console.log(error));

