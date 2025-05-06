const Express = require("express");
const app = Express();
const path = require("node:path");
const indexRouter = require('./routers/indexRouter');

app.set('views',path.join(__dirname,"views"));
app.set("view engine","ejs")

app.use("/",indexRouter);

const PORT = 3000;
app.listen(PORT,()=> console.log("Listening"));