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

async function addGameForm(req,res) {
    const categories = await db.getCategories();
    console.log(categories);
    
    res.render("addgameform", {categories: categories });
}

async function addGame(req,res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render("addgameform",{
            title: "Add Game",
            errors: errors.array(),
            old: req.body
        })
    }
    const {nameInput,categoryInput,bioInput,priceInput,stockInput,developerInput} = req.body

    await db.addGame(nameInput,categoryInput,bioInput,priceInput,stockInput,developerInput);

    res.redirect("/items");
}

module.exports = {
    listAllGames,
    deleteGame,
    addGame,
    addGameForm
}
