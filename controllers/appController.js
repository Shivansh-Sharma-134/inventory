const db = require("../data/queries");
const { validationResult } = require("express-validator");

async function listAllGames(req,res) {
    const games = await db.listAllGames();
    res.render("allitems",{title:"all games",games});
}

async function deleteGame(req,res) {
    const gameId = req.params.gameId;
    await db.deleteGame(gameId);
    res.redirect("/");
}

async function addGame(req,res) {
    
}

module.exports = {
    listAllGames,
    deleteGame,
    addGame
}
