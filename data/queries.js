const pool = require("./pool");

async function listAllGames() {
    const {rows} = await pool.query("SELECT * FROM games");
    console.log(rows);
    return rows;
}

async function deleteGame(gameId) {
    await pool.query("DELETE FROM games WHERE id = $1",[gameId]);
}

module.exports = {
    listAllGames,
    deleteGame
}