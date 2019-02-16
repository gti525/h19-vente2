INSERT INTO Venues(name, address, capacity) VALUES 
	('Place Saint-Paul', '2983 Chemin Lacroix', 2000),
	('Chez Ricardo', '333 Rue Dominique', 500),
	('BigBang Café', '345 Place Bonaventure', 300),
	('Stadium BigBang', '987 Rue Rivière-Rouge', 25000),
	('Seb''s', '777 Avenue Du Jazz', 400),
	('La Roue du Diable', '9043 Rue Fleury', 350),
	('Les foufounes électriques', '87 Rue Sainte-Catherine E', 500),
	('Chez Maurice', '1897 Chemin Ste Angélique', 800),
	('Stade Olympique', '4141 Avenue Pierre-De-Coubertin', 65000),
	('Auditorium ÉTS', '1100 Rue Notre-Dame', 2000),
	('Bandit Palace', '333 Rue Gouin', 25),
	('La meilleure place pour événements', '1 Rue Number One', 200000),
	('Parc La Méduse', '564 Rue Algue', 150);

INSERT INTO Events(idVenue, title, description, organisation, artist, dateEvent, image) VALUES
	(1, 'Baptème de Georges', 'Un baptème très symbolique. Venez voir le nouveau né Georges se faire baptiser! Cérémonie palpitante.', 'Église de la Place Saint-Paul', 'Prêtre Jean-Jacques', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'http://paroissescathedraletoulouse.fr/wp-content/uploads/2016/09/BAPTEME-2-.jpg'),
	(2, 'Combat de Coq 2019', 'Venez parier sur le meilleur coq. Les males de cette année sont exceptionnels. En bonus, ponte en direct de poules géantes.', 'Team Ricardo', NULL, CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://c1.staticflickr.com/4/3414/4628611135_d94357c77a_b.jpg'),
	(3, 'Take A Moment', 'Le meilleur événement pour prendre un café et écouter des morceaux Jazz. Un groupe d''étudiants en musique vous offre une soirée inoubliable', NULL, 'Take A Moment Jazz Group', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://st3.idealista.com/cms/archivos/styles/idcms_social_tablet/public/2018-07/news/festival%20de%20jazz%20vitoria-gasteiz.jpg?fv=btThqvaw&itok=iSZFcOpT'),
	(4, 'Concours scientifique', 'On mélange des solutions. Ça règle nos problèmes.', 'Science Group Convention', NULL, CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'http://science.sciencemag.org/content/sci/361/6400/342/F1.large.jpg?width=800&height=600&carousel=1'),
	(5, 'Piano Concert Sebastian', 'Le fantastique Sébastien vous joue des pièces au piano.', 'Chez Seb''s', 'Sébastien LePianiste', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://www.thomann.de/blog/wp-content/uploads/2017/10/piano-header.jpg'),
	(6, 'Spectacle d''enfer', 'Assistez à un spectacle démoniaque mouahahaha!', 'Diable', 'Démon', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://larchedegloire.com/wp-content/uploads/2016/05/enfer-hell-diable-1020x500.png'),
	(7, 'Lamb of god tour', 'Spectacle pour les fans de métal. Soirée métal, 10% de rabais aux brevages sur place si vous avez des cheveux punk.', 'Foufounes team', 'Lamb of god', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://consequenceofsound.files.wordpress.com/2018/09/lamb-of-god.png?w=807'),
	(8, 'Boooo Bap Bop', 'Oh yeah, de Booo Bap Bop Bip.', 'Bop Bop Group', 'Bip', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'http://www.quickmeme.com/img/b8/b85cfaa754ff4e78579a32b76296a87abb2291930b898969146891c9ea04927d.jpg'),
	(9, 'NHL Finale', 'Venez voir la finale de hockey. Pleins de joueurs joue au hockey avec des patins.', 'NHL Foundation', 'Canadians vs Boston', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Capitals-Maple_Leafs_%2834075134291%29.jpg/1200px-Capitals-Maple_Leafs_%2834075134291%29.jpg'),
	(10, 'Une lecture plate', 'Des choses pas tant intéressante vont être dites à haute voix dans une salle.', 'Journal ÉTS', 'Jean-Marc LeParleur', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://blog.nemours.org/wp-content/uploads/2016/08/ThinkstockPhotos-85449636-2048x800.jpg'),
	(11, 'Vol en direct', 'Tu viens, tu repars sans rien.', 'Les voleurs', NULL, CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcshWifzHZxVA2CjEMWVMOj74oCiuNeCRiqJkupi7yVR_Qv4FBCiu6Jx4YfFW1TAl26HI8QVO7rfAqsHao6fpAUHzNhx9hK6m4nak1TG1djn7ySUKJObdCj6VyZSaW2pwFWjj03B72_kyY6h0auhL0tpH_B3x0nKHpyUEss42wm18-&h=1080&w=1920&format=jpg'),
	(12, 'Le meilleur show', 'Salut, faut absolument que tu viennes.', 'Trop cool association', 'Un gars trop cool', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'http://4.bp.blogspot.com/-ZswtqEIhY0I/UzBxwMTGkpI/AAAAAAAABj8/VP7LbaM0W2Y/s1600/c''est+trop+drole.jpg'),
	(13, 'Danse sous l''eau', 'La danse des méduses, une expérience unique.', 'Ocean', 'Les méduses', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'https://photos.lci.fr/images/613/344/meduse-1-22e63f-2@1x.jpeg'),
	(1, 'Sacrifice de la chèvre', 'Comme à chaque année, nous allons sacrifier une chèvre sur la pierre sacrée.', 'Église de la Place Saint-Paul', 'Soeur Marie', CURRENT_TIMESTAMP + interval '1 day' * random() * 50, 'http://blogs.pjstar.com/eye/files/2013/10/Eidal-Adha11.jpg');

INSERT INTO Tickets(idEvent, guid) VALUES
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi839'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi838'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi837'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi836'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi835'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi834'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi833'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi832'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi831'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi830'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi829'),
	(1, 'asdkfj-jk3fkasjdf-oiasdjfi828');

INSERT INTO Users(name, surname, socialLink) VALUES
	('Michael', 'Leclerc', NULL),
	('Jean', 'Laroche', NULL),
	('Trésor', 'Ndeng', NULL),
	('Simon', 'Chevrier', NULL),
	('Samuel', 'Charbonneau', NULL),
	('Francis', 'De Vizio', NULL),
	('André', 'Tah', NULL),
	('Marc', 'James', NULL),
	('Robert', 'Riché', NULL),
	('Luc', 'Richard', NULL),
	('Paul', 'Lemec', NULL),
	('Etienne', 'Lecavalier', NULL),
	('Jean-Marc', 'Duruisseau', NULL),
	('Audrey', 'Charbonneau', NULL),
	('Ovuvuvwuvuvwen', 'Ogbumwuenmwen Osas', 'UNIDPOURSOCIAL');

INSERT INTO Transactions(idUser, transactionNumber) VALUES
	(15, 'UNIDPOURPASSERELLE');

INSERT INTO TransactionsTickets VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5);
