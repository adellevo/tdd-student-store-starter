const express = require('express')
const router = express.Router()
const StoreModel = require("../models/store")

router.get('/store', (req, res) => {
    const products = StoreModel.listAllProducts();
    res.status(200).send({"products": products});
})

router.get('/store/:productId', (req, res) => {
    const product = StoreModel.fetchProductById(req.params.productId);
    res.status(200).send({"product": product})
})

router.post('/store', (req, res) => {
    const shoppingCart = req.body.shoppingCart;
    const user = req.body.user;

    // error checking
    StoreModel.validatePayloadFields(shoppingCart, user);
    StoreModel.checkForCartDuplicates(shoppingCart);

    // create receipt 
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

    // construct purchase and save to database file
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
    
    StoreModel.saveToDatabase(purchase);
    res.status(201).send({"purchase": purchase}) 
});

module.exports = router;
