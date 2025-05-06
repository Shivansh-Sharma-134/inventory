const {Router} = require('express');
const { title } = require('process');
const indexRouter = Router();
const appController = require("../controllers/appController")

indexRouter.get("/", (req,res)=>{
    res.render("home",{title: "Homepage"})
})

indexRouter.use("/items",appController.listAllGames)

indexRouter.use("/delete/:gameId",appController.deleteGame)

module.exports = indexRouter;