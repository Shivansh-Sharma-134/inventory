const db = require("../data/queries");
const { validationResult } = require("express-validator");

async function listAllGames(req,res) {
    const games = await db.listAllGames();
    res.render("allitems",{title:"all games",games});
}

async function editGameForm(req,res) {
    const game = await db.getGame(req.params.gameId);
    const categories = await db.getCategories();
        console.log(game.id);
    res.render("editgameform", {game,
        categories: categories,
        old:{},
        errors: {}
    })
}

async function deleteGame(req,res) {
    const gameId = req.params.gameId;
    await db.deleteGame(gameId);
    res.redirect("/items");
}

async function addGameForm(req,res) {
    const categories = await db.getCategories();
    console.log(categories);
    
    res.render("addgameform", {categories: categories,
        old:{},
        errors: {}
    });
}

async function getCategories() {
    const categories = await db.getCategories()
    res.render("genres",{categories})
}

async function addGame(req,res) {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const errArray = errors.array();
        const errorMap = {}
        errArray.forEach(err => {
            errorMap[err.path] = err.msg;
        })
        console.log(errorMap);
        
        const categories = await db.getCategories();
        return res.status(400).render("addgameform",{
            title: "Add Game",
            errors: errorMap,
            old: req.body,
            categories
        })
    }
    const {nameInput,categoryInput,bioInput,priceInput,stockInput,developerInput} = req.body

    await db.addGame(nameInput,categoryInput,bioInput,priceInput,stockInput,developerInput);

    res.redirect("/items");
}

async function editGame(req,res) {
    const game = await db.getGame(req.params.gameId);
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const errArray = errors.array();
        const errorMap = {}
        errArray.forEach(err => {
            errorMap[err.path] = err.msg;
        })
        console.log(errorMap);
        
        const categories = await db.getCategories();
        return res.status(400).render(`editgameform`,{
            title: "Edit Game",
            errors: errorMap,
            old: req.body,
            categories,
            game
        })
    }
   
    const gameId = req.params.gameId;
    const {nameInput,categoryInput,bioInput,priceInput,stockInput,developerInput} = req.body

    await db.editGame(nameInput,categoryInput,bioInput,priceInput,stockInput,developerInput,gameId);

    res.redirect("/items");
}

module.exports = {
    listAllGames,
    deleteGame,
    addGame,
    addGameForm,
    getCategories,
    editGameForm,
    editGame
}
