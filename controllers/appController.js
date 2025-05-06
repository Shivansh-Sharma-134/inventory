const db = require("../data/queries");

async function listAllItems(req,res) {
    const games = db.listAllItems;
    res.render("allitems",{title:"all games",games: games});
}

module.exports = {
    listAllItems
}