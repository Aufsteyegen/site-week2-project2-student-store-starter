const express = require("express");
const Store = require("../models/store.js");
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/", async (req, res, next) => {
    try {
      const products = await Store.listProducts();
      const purchases = await Store.listPurchases();
      res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
})

router.get("/purchases/", async (req, res, next) => {
    try {
      const purchases = await Store.listPurchases();
      res.status(200).json({ purchases });
    } catch (err) {
      next(err);
    }
})

router.get("/purchases/:purchaseId", async (req, res, next) => {
    try {
        const { purchaseId } = req.params;
      const purchase = await Store.findPurchases(purchaseId);
      res.status(200).json({ purchase });
    } catch (err) {
      next(err);
    }
})

router.get("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await Store.findProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ "product": product });
    } catch (err) {
      next(err);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { shoppingCart, user } = req.body
        if (!shoppingCart || !user) {
            next(400)
        }
        else {
            const data = fs.readFileSync('../student-store-express-api/data/db.json', 'utf8')
            const jsonData = JSON.parse(data)
            const count = jsonData.purchases.length

            const currentDate = new Date()
            const timestamp = currentDate.toISOString()
            
            const dbObject = {
                id: count + 1,
                name: user.name,
                email: user.email,
                order: shoppingCart,
                createdAt: timestamp
            }
            
            console.log(dbObject)
            
            jsonData.purchases.push(dbObject)
            fs.writeFileSync('../student-store-express-api/data/db.json', JSON.stringify(jsonData))
            const receipt = { ...req.body }
            res.status(201).json({ receipt })
        }
    }
    catch (err) {
        console.error(err)
        next(err)
    }
})


module.exports = router