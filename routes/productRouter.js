const express = require("express");
const Product = require("../models/product.js");

const productRouter = express.Router();

// Get All Products
productRouter.get("/", (req, res, next) => {
  Product.find((err, products) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(products);
  });
});


// Post new product
productRouter.post("/", (req, res, next) => {
  const newProduct = new Product(req.body);
  newProduct.save((err, savedProduct) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(201).send(savedProduct);
  });
});

// Delete Product
productRouter.delete("/:productID", (req, res, next) => {
  Product.findOneAndDelete(
    { _id: req.params.productID, user: req.user._id },
    (err, deletedProduct) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully deleted product: ${deletedProduct}`);
    }
  );
});

// Update Product
productRouter.put("/:productID", (req, res, next) => {
  Product.findByIdAndUpdate(
    { _id: req.params.productID },
    req.body,
    { new: true },
    (err, updatedProduct) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(updatedProduct);
    }
  );
});

module.exports = productRouter;
