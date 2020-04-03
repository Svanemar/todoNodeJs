
const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./router/todoRouter");
const config = require("./config/config")
var sassMiddleware = require('node-sass-middleware')
const path = require("path");
const app = express();

const dbUrl = process.env.MONGO_ATLAS_URL ||

    //middleware
    app.use(express.urlencoded({ extended: true }))

//en till middleware för css
app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}))

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//router 
app.use(todoRouter);

//listen to port 
const port = process.env.PORT || 2000;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
// koppling till databas
mongoose.connect(config.databaseURL, options).then(() => {
    console.log("Successful")
    //app is listening to port 
    app.listen(port);
})

module.exports = { port }