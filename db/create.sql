-- Utilisation du pluriel à cause de plusieurs keyword réservés

-- Pour facilement delete toutes les tables:
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;

CREATE TABLE Venues (
	id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	address TEXT NOT NULL,
	capacity INT NOT NULL
);

CREATE TABLE Events (
	id BIGSERIAL PRIMARY KEY,
	idVenue BIGINT REFERENCES Venues(id) NOT NULL,
	title TEXT NOT NULL,
	description TEXT,
	organisation TEXT,
	artist TEXT,
	dateEvent TIMESTAMPTZ NOT NULL,
	image TEXT,
	saleStatus SMALLINT NOT NULL DEFAULT 0
);

-- At least one of the field
ALTER TABLE Events
ADD CONSTRAINT OrganisationOrArtist
CHECK (
	( CASE WHEN organisation IS NULL THEN 0 ELSE 1 END
	+ CASE WHEN artist IS NULL THEN 0 ELSE 1 END
	) >= 1
);

CREATE TABLE Users (
	id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	surname TEXT NOT NULL,
	socialLink TEXT UNIQUE -- TODO: Change or verify if correct data type
);

CREATE TABLE Transactions (
	id BIGSERIAL PRIMARY KEY,
	idUser BIGINT REFERENCES Users(id) NOT NULL,
	dateTransaction TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	transactionNumber TEXT UNIQUE NOT NULL -- TODO: Change or verify if correct data type
);

CREATE TABLE Tickets (
	id BIGSERIAL PRIMARY KEY,
	idEvent BIGINT REFERENCES Events(id) NOT NULL,
	idTransaction BIGINT REFERENCES Transactions(id),
	guid TEXT UNIQUE NOT NULL, -- TODO: Change or verify if correct data type
	price NUMERIC(8, 2) NOT NULL
);
