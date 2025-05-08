const pool = require("./pool");

async function listAllGames() {
    const {rows} = await pool.query("SELECT * FROM games ORDER BY id ASC");
    console.log(rows);
    return rows;
}

async function deleteGame(gameId) {
    await pool.query("DELETE FROM games WHERE id = $1",[gameId]);
}

async function addGame(name,category,bio,price,stock,developer) {
    await pool.query("INSERT INTO games (name,category,bio,price,stock,developer) VALUES ($1,$2,$3,$4,$5,$6)",[name,category,bio,price,stock,developer]);
}

async function editGame(name,category,bio,price,stock,developer,gameId) {
    await pool.query("UPDATE games SET name = $1, category = $2, bio = $3, price = $4, stock = $5, developer = $6 WHERE id = $7",[name,category,bio,price,stock,developer,gameId])   
}

async function getGame(gameId) {
    const {rows} = await pool.query("SELECT * FROM games WHERE id = $1",[gameId]);
    return rows[0];
}

async function getCategories() {
    const {rows} = await pool.query("SELECT * FROM categories");
    return rows;
}

module.exports = {
    listAllGames,
    deleteGame,
    addGame,
    getCategories,
    getGame,
    editGame
}