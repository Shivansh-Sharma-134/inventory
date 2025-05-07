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
category VARCHAR(255)
);

INSERT INTO categories (category)
VALUES
    ('ACTION/RPG'),
    ('simulation');


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