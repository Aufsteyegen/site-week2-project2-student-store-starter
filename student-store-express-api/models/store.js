const { storage } = require("../data/storage");

class Store {
    static async listProducts () {
        return storage.get("products").value()
    }
    static async listPurchases () {
        return storage.get("purchases").value()
    }

    static async findProduct (productId) {
        const products = await storage.get("products").value();
        const product = products.find((p) => p.id == productId);
        if (product) {
          return product;
        } else {
          throw new Error("Product not found");
        }
    }
    static async findPurchases (purchaseId) {
        const purchases = await storage.get("purchases").value();
        const purchase = purchases.find((p) => p.id == purchaseId);
        if (purchase) {
          return purchase;
        } else {
          throw new Error("Purchase not found");
        }
    }
}

module.exports = Store