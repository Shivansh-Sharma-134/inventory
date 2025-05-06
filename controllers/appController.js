const db = require("../data/queries");

async function listAllGames(req,res) {
    const games = await db.listAllGames();
    res.render("allitems",{title:"all games",games});
}

async function deleteGame(req,res) {
    const gameId = req.params.gameId;
    await db.deleteGame(gameId);
    res.redirect("/");
}

module.exports = {
    listAllGames,
    deleteGame
}