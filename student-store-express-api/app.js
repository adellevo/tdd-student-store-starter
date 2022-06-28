// YOUR CODE HERE
const express = require('express')
const app = express()
const StoreModel = require("./models/store.js")

app.get('/store', (req, res) => {
    const products = StoreModel.listAllProducts();
    res.status(200).send({"products": products});
})

app.get('/store/:productId', (req, res) => {
    const product = StoreModel.fetchProductById(req.params.productId);
    res.status(200).send({"product": product})
})

app.post('/store/:productId', (req, res) => {
    const shoppingCart = req.body.shoppingCart;
    const user = req.body.user;

    if (!shoppingCart || !user) {
        throw new Error(400);
    }

    let hasDuplicate = shoppingCart.some((val, i) => arr.indexOf(val) !== i);
    if (hasDuplicate) {
        throw new Error(400);
    }

    const product = StoreModel.fetchProductById(req.params.productId);
    res.status(200).send({"product": product})
})

module.exports = app;
