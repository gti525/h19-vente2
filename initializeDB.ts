import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import { Venue } from "./server/entity/Venue"
import { Event } from "./src/entity/Event"
import { User } from "./src/entity/User"
import { Transaction } from "./src/entity/Transaction"
import { Ticket } from "./src/entity/Ticket"

//https://github.com/typeorm/typeorm/issues/571

var Venues: any = [
    { "name": "Place Saint-Paul", "address": "2983 Chemin Lacroix", "capacity": 2000 },
    { "name": "Chez Ricardo", "address": "333 Rue Dominique", "capacity": 500 },
    { "name": "BigBang Café", "address": "345 Place Bonaventure", "capacity": 300 },
    { "name": "Stadium BigBang", "address": "987 Rue Rivière-Rouge", "capacity": 25000 },
    { "name": "Seb", "address": "777 Avenue Du Jazz", "capacity": 400 },
    { "name": "La Roue du Diable", "address": "9043 Rue Fleury", "capacity": 350 },
    { "name": "Les foufounes électriques", "address": "87 Rue Sainte-Catherine E", "capacity": 500 },
    { "name": "Chez Maurice", "address": "1897 Chemin Ste Angélique", "capacity": 800 },
    { "name": "Stade Olympique", "address": "4141 Avenue Pierre-De-Coubertin", "capacity": 65000 },
    { "name": "Auditorium ÉTS", "address": "1100 Rue Notre-Dame", "capacity": 2000 },
    { "name": "Bandit Palace", "address": "333 Rue Gouin", "capacity": 25 },
    { "name": "La meilleure place pour événements", "address": "1 Rue Number One", "capacity": 200000 },
    { "name": "Parc La Méduse", "address": "564 Rue Algue", "capacity": 150 },
];

var Events: any = [
    { title: 'Baptème de Georges', description: 'Un baptème très symbolique. Venez voir le nouveau né Georges se faire baptiser! Cérémonie palpitante.', organisation: 'Église de la Place Saint-Paul', artist: 'Prêtre Jean-Jacques', date: '', image: 'http://paroissescathedraletoulouse.fr/wp-content/uploads/2016/09/BAPTEME-2-.jpg' },
    { title: 'Combat de Coq 2019', description: 'Venez parier sur le meilleur coq. Les males de cette année sont exceptionnels. En bonus, ponte en direct de poules géantes.', organisation: 'Team Ricardo', artist: ' ', dateEvent: ' ', image: 'https://c1.staticflickr.com/4/3414/4628611135_d94357c77a_b.jpg' },
    { title: 'Take A Moment', description: 'Le meilleur événement pour prendre un café et écouter des morceaux Jazz. Un groupe d\'étudiants en musique vous offre une soirée inoubliable',  organisation: ' ', artist: 'Take A Moment Jazz Group', dateEvent: ' ', image: 'https://st3.idealista.com/cms/archivos/styles/idcms_social_tablet/public/2018-07/news/festival%20de%20jazz%20vitoria-gasteiz.jpg?fv=btThqvaw&itok=iSZFcOpT' },
    { title: 'Concours scientifique', description: 'On mélange des solutions. Ça règle nos problèmes.', organisation: 'Science Group Convention', artist: ' ', dateEvent: ' ', image: 'http://science.sciencemag.org/content/sci/361/6400/342/F1.large.jpg?width=800&height=600&carousel=1' },
    { title: 'Piano Concert Sebastian', description: 'Le fantastique Sébastien vous joue des pièces au piano.', organisation: 'Chez Seb\'s', artist: 'Sébastien LePianiste', dateEvent: ' ', image: 'https://www.thomann.de/blog/wp-content/uploads/2017/10/piano-header.jpg' },
    { title: 'Spectacle d\'enfer', description: 'Assistez à un spectacle démoniaque mouahahaha!', organisation: 'Diable', artist: 'Démon', dateEvent: ' ', image: 'https://larchedegloire.com/wp-content/uploads/2016/05/enfer-hell-diable-1020x500.png' },
    { title: 'Lamb of god tour', description: 'Spectacle pour les fans de métal. Soirée métal, 10% de rabais aux brevages sur place si vous avez des cheveux punk.', organisation: 'Foufounes team', artist: 'Lamb of god', dateEvent: ' ', image: 'https://consequenceofsound.files.wordpress.com/2018/09/lamb-of-god.png?w=807' },
    { title: 'Boooo Bap Bop', description: 'Oh yeah, de Booo Bap Bop Bip.', organisation: 'Bop Bop Group', artist: 'Bip', dateEvent: ' ', image: 'http://www.quickmeme.com/img/b8/b85cfaa754ff4e78579a32b76296a87abb2291930b898969146891c9ea04927d.jpg' },
    { title: 'NHL Finale', description: 'Venez voir la finale de hockey. Pleins de joueurs joue au hockey avec des patins.', organisation: 'NHL Foundation', artist: 'Canadians vs Boston', dateEvent: ' ', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Capitals-Maple_Leafs_%2834075134291%29.jpg/1200px-Capitals-Maple_Leafs_%2834075134291%29.jpg' },
    { title: 'Une lecture plate', description: 'Des choses pas tant intéressante vont être dites à haute voix dans une salle.', organisation: 'Journal ÉTS', artist: 'Jean-Marc LeParleur', dateEvent: ' ', image: 'https://blog.nemours.org/wp-content/uploads/2016/08/ThinkstockPhotos-85449636-2048x800.jpg' },
    { title: 'Vol en direct', description: 'Tu viens, tu repars sans rien.', organisation: 'Les voleurs', artist: 'not null', dateEvent: ' ', image: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcshWifzHZxVA2CjEMWVMOj74oCiuNeCRiqJkupi7yVR_Qv4FBCiu6Jx4YfFW1TAl26HI8QVO7rfAqsHao6fpAUHzNhx9hK6m4nak1TG1djn7ySUKJObdCj6VyZSaW2pwFWjj03B72_kyY6h0auhL0tpH_B3x0nKHpyUEss42wm18-&h=1080&w=1920&format=jpg' },
    { title: 'Le meilleur show', description: 'Salut, faut absolument que tu viennes.', organisation: 'Trop cool association', artist: 'Un gars trop cool', dateEvent: ' ', image: 'http://4.bp.blogspot.com/-ZswtqEIhY0I/UzBxwMTGkpI/AAAAAAAABj8/VP7LbaM0W2Y/s1600/c\'est+trop+drole.jpg' },
    { title: 'Danse sous l\'eau', description: 'La danse des méduses, une expérience unique.', organisation: 'Ocean', artist: 'Les méduses', dateEvent: ' ', image: 'https://photos.lci.fr/images/613/344/meduse-1-22e63f-2@1x.jpeg' },
    { title: 'Sacrifice de la chèvre', description: 'Comme à chaque année, nous allons sacrifier une chèvre sur la pierre sacrée.', organisation: 'Église de la Place Saint-Paul', artist: 'Soeur Marie', dateEvent: ' ', image: 'http://blogs.pjstar.com/eye/files/2013/10/Eidal-Adha11.jpg' }
];

var Users: any = [
    { name:'Michael', surname: 'Leclerc', socialLink: null },
    { name:'Jean', surname: 'Laroche', socialLink: null },
    { name:'Trésor', surname: 'Ndeng', socialLink: null  },
    { name:'Simon', surname: 'Chevrier', socialLink: null },
    { name:'Samuel', surname: 'Charbonneau', socialLink: null },
    { name:'Francis', surname: 'De Vizio', socialLink: null },
    { name:'André', surname: 'Tah', socialLink: null },
    { name:'Marc', surname: 'James', socialLink: null },
    { name:'Robert', surname: 'Riché', socialLink: null },
    { name:'Luc', surname: 'Richard', socialLink: null },
    { name:'Paul', surname: 'Lemec', socialLink: null },
    { name:'Etienne', surname: 'Lecavalier', socialLink: null },
    { name:'Jean-Marc', surname: 'Duruisseau', socialLink: null },
    { name:'Audrey', surname: 'Charbonneau', socialLink: null },
    { name:'Ovuvuvwuvuvwen', surname: 'Ogbumwuenmwen Osas', socialLink: 'UNIDPOURSOCIAL'}
];

var Transactions: any = [
    { 15, 'UNIDPOURPASSERELLE'}
];
// var Tickets: any = [
//     { 1, 1, 'asdkfj-jk3fkasjdf-oiasdjfi839', 15},
//     { 1, 1, 'asdkfj-jk3fkasjdf-oiasdjfi838', 15},
//     { 1, 1, 'asdkfj-jk3fkasjdf-oiasdjfi837', 15},
//     { 1, 1, 'asdkfj-jk3fkasjdf-oiasdjfi836', 15},
//     { 1, 1, 'asdkfj-jk3fkasjdf-oiasdjfi835', 15},
//     { 1, null, 'asdkfj-jk3fkasjdf-oiasdjfi834', 15},
//     { 1, null, 'asdkfj-jk3fkasjdf-oiasdjfi833', 15},
//     { 1, null, 'asdkfj-jk3fkasjdf-oiasdjfi832', 15},
//     { 1, null, 'asdkfj-jk3fkasjdf-oiasdjfi831', 15},
//     { 1, null, 'asdkfj-jk3fkasjdf-oiasdjfi830', 15},
//     { 1, null, 'asdkfj-jk3fkasjdf-oiasdjfi829', 15},
//     { 1, null, 'asdkfj-jk3fkasjdf-oiasdjfi828', 15}
// ];

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
}).then(connection => {
     console.log("You are connected to the databese");



    Venues.forEach(element => {
        let venue = new Venue();
        console.log(element);
        console.log(element.name);
        venue.name = element.name;
        venue.address = element.address;
        venue.capacity = element.capacity;
        connection.manager.save(venue);
        console.log("Venue has been saved");
    });

    var i = 40
    Events.forEach(async element => {
        let event = new Event();
        console.log(element);
        event.title = element.title;
        event.description = element.description;
        event.artist = element.artist;
        event.organisation = element.organisation;
        event.image = element.image;
        var date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 50) + 1)  
        event.dateEvent = date;
        event.saleStatue = 0;
        const venue =  await connection.manager.getRepository(Venue).findOne(i);
        event.venue = venue
        connection.manager.save(event);
        i = i + 1;
        if (i > 52){
            i = 40;
        }
        console.log("Event has been saved");
    });

    
    Users.forEach(async element => {
        let user = new User();
        console.log(element);
        user.name = element.name;
        user.surname = element.surname;
        user.socialLink = element.socialLink;
        connection.manager.save(user);
        console.log("User has been saved");
    });

}).catch(error => console.log(error));

