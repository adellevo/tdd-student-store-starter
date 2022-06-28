// const { data } = require("../data/db.json");
const {storage} = require("../data/storage");

class StoreModel {
    constructor() {
        this.super();
    }

    static listAllProducts() {
        // console.log(storage);
      return storage.get("products").value();
    }

    static fetchProductById(productId) {
        const products = this.listAllProducts();
        const product = products.find((item) => item.id == productId);
        // console.log(product);
        return product;
    }
}

module.exports = StoreModel