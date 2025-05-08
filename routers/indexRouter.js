const {Router} = require('express');
const indexRouter = Router();
const appController = require("../controllers/appController")

const { body, validationResult } = require("express-validator");

const validatGame = [
    body("nameInput").trim().isLength({min: 1,max: 50}).withMessage('must be within 1 to 50 characters'),
    body("bioInput").trim().isLength({min: 1,max: 200}).withMessage('must be within 1 to 200 characters'),
    body("priceInput").trim().isInt().withMessage('must be a number'),
    body("stockInput").trim().isInt().withMessage('must be a number'),
    body("developerInput").trim().isLength({min: 1,max: 50}).withMessage('must be within 1 to 50 characters')
]

indexRouter.get("/", (req,res)=>{
    res.render("home",{title: "Homepage"})
})

indexRouter.get("/items",appController.listAllGames)

indexRouter.get("/categories",appController.getCategories)

indexRouter.get("/delete/:gameId",appController.deleteGame)

indexRouter.get("/editGameForm/:gameId", appController.editGameForm)

indexRouter.post("/editGame/:gameId",validatGame,appController.editGame)

indexRouter.post("/addGame",validatGame,appController.addGame)

indexRouter.get("/addgameform",appController.addGameForm)

module.exports = indexRouter;