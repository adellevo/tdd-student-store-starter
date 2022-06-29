// const { data } = require("../data/db.json");
const {storage} = require("../data/storage");

class StoreModel {
    constructor() {
        this.super();
    }

    static listAllProducts() {
        // console.log(storage);
        return storage.get("products");
    }

    static fetchProductById(productId) {
        const products = this.listAllProducts();
        const product = products.find((item) => item.id == productId);
        // console.log(product);
        return product;
    }

    static validShoppingCartFields(shoppingCart) {
        for (let i = 0; i < shoppingCart.length; i++) {
            if (! shoppingCart[i].itemId || ! shoppingCart[i].quantity) {
                return false;
            }
        }
        return true;
    }

    static saveToDatabase(value) {
        storage.add("purchases", value);
    }

    static getPurchaseId() {
        console.log("in here");
        const purchases = storage.get("purchases");
        return purchases.length+1;
    }
}

module.exports = StoreModel