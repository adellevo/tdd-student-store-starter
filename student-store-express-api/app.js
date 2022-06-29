// YOUR CODE HERE
const express = require('express')
const app = express()
app.use(express.json())
const StoreModel = require("./models/store.js")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/store', (req, res) => {
    const products = StoreModel.listAllProducts();
    res.status(200).send({"products": products});
})

app.get('/store/:productId', (req, res) => {
    const product = StoreModel.fetchProductById(req.params.productId);
    res.status(200).send({"product": product})
})

app.post('/store', (req, res) => {
    // console.log("in here 1")
    const shoppingCart = req.body.shoppingCart;
    const user = req.body.user;

    // console.log("in here");

    // console.log(shoppingCart)
    // console.log(user)
    // console.log("in here 2")

    if (!shoppingCart || !user) {
        // console.log("in here 3 ");
        throw new Error(400);
    }

    let totalCost = 0;
    let lines = [`Showing receipt for ${user.name} available at ${user.email}`];
    for (let i = 0; i < shoppingCart.length; i++) {
        if (!shoppingCart[i].quantity || !shoppingCart[i].itemId) {
            throw new Error(400);
        }
        const product = StoreModel.fetchProductById(shoppingCart[i].itemId);
        const cost = (shoppingCart[i].quantity*product.price);
        totalCost += cost;
        lines.push(`${shoppingCart[i].quantity} total ${product.name} purchased at a cost of $${product.price.toFixed(2)} for a total cost of $${cost.toFixed(2)}`);
    }
    lines.push(`Before taxes, the subtotal was $${totalCost.toFixed(2)}`);
    totalCost *= 1.875;
    lines.push(`After taxes and fees were applied, the total comes out to $${totalCost.toFixed(2)}`);

    const purchase = {
        "id": StoreModel.getPurchaseId(), 
        "name": user.name, 
        "email": user.email, 
        "order": shoppingCart, 
        "total": totalCost.toFixed(2), 
        "createdAt": new Date().toISOString(), 
        "receipt": {
            "userInfo": {
                "name": user.name,
                "email": user.email
            },
            "lines": lines
        }
    };
    
    // let hasDuplicate = shoppingCart.some((val, i) => shoppingCart.indexOf(val) !== i);
    // if (hasDuplicate) {
    //     // console.log("in here 4");
    //     throw new Error(400);
    // }

    // console.log("in here 5")
    // res.status(201).send({"shoppingCart": shoppingCart, "user": user})
    StoreModel.saveToDatabase(purchase);
    res.status(201).send({"purchase": purchase}) 
    // StoreModel.saveToDatabase(purchase);
});

module.exports = app;
