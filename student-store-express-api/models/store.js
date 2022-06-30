// const { data } = require("../data/db.json");
const {storage} = require("../data/storage");

class StoreModel {
    constructor() {
        this.super();
    }

    static listAllProducts() {
        return storage.get("products");
    }

    static fetchProductById(productId) {
        console.log('productId: ', productId);
        const products = this.listAllProducts();
        const product = products.find((item) => item.id == productId);
        return product;
    }

    // check validity of shoppingCart and user
    static validatePayloadFields(shoppingCart, user) {
        if (!shoppingCart || !user) {
            throw new Error(400);
        }
    }

    // check for duplicates in shopping cart
    static checkForCartDuplicates(shoppingCart) {
        const cartItemIds = shoppingCart.map((item) => item.itemId);
        const uniqueItems = new Set(cartItemIds);
        if (uniqueItems.size !== shoppingCart.length) {
            throw new Error(400);
        }
    }

    static saveToDatabase(purchase) {
        storage.add("purchases", purchase);
    }

    static getPurchaseId() {
        console.log("in here");
        const purchases = storage.get("purchases");
        return purchases.length+1;
    }
}

module.exports = StoreModel