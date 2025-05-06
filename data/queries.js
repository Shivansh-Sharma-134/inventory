const pool = require("./pool");

async function listAllGames() {
    const {rows} = await pool.query("SELECT * FROM games");
    console.log(rows);
    return rows;
}

async function deleteGame(gameId) {
    await pool.query("DELETE FROM games WHERE id = $1",[gameId]);
}

async function addGame(name,category,bio,price,stock,developer) {
    await pool.query("INSERT INTO games (name,category,bio,price,stock,developer)  VALUES ($1,$2,$3,$4,$5,$6)",[name,category,bio,price,stock,developer]);
}

module.exports = {
    listAllGames,
    deleteGame,
    addGame
}