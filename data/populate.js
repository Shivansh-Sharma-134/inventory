#! /usr/bin/env node

const {Client} = require ("pg");

const SQL =`
CREATE TABLE IF NOT EXISTS games (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255),
category VARCHAR(255),
bio VARCHAR(300),
price INT,
stock INT,
developer VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255),
description VARCHAR(255)
);

INSERT INTO categories (name,description)
VALUES
    ('ACTION','The story takes a backseat and full on action is the main focus'),
    ('RPG','Role playing games use character building and story as their elements'),
    ('ACTION/RPG','The best of both world'),
    ('simulation','Sticking to the real worls as much as possible');


INSERT INTO games (name,category,bio,price,stock,developer)
VALUES
    ('Red Dead Redemption','ACTION/RPG','RDR is a great story driven open world RPG',60,23,'Rockstar'),
    ('The Last Of Us','ACTION/RPG','TLOU is the magnum opus of developer Naughty dog with a great story and characters',60,34,'Naughty Dog'),
    ('Farming Simulator 23','simulation','FS 23 is the latest installation in the series',70,30,'Giants Software');
`;


async function main() {
    console.log("seeding")
    const client= new Client({
        connectionString: "postgresql://shivadmin:master@localhost:5432/inventory"
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done')
}

main()