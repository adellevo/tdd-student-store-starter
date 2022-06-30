// YOUR CODE HERE
const express = require('express')
const app = express()
app.use(express.json())
const storeModel = require("./routes/store.js")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/store", storeModel);

app.get("/store", storeModel);
app.get("/store/:productId", storeModel);
app.post("/store", storeModel);

module.exports = app;
