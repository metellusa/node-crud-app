const Product = require('../models/product.model');
const mongoose = require('mongoose');

exports.getAllProducts = (req, res) => {
    const operationId = 'product.controller.getAllProducts';

    Product.find({}, (err, products) => {
        if (err) {
            return next(err);
        }
        res.statusCode = 200;
        res.send({
            result: products,
            message: 'Products retrieved successfully!'
        });
    })
};

exports.createProduct = (req, res) => {
    const operationId = 'product.controller.createProduct';

    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save((err, product) => {
        if (err) {
            return next(err);
        }
        res.statusCode = 201;
        res.send({
            result: product,
            message: 'Product created successfully!'
        });
    })
};

exports.getProductById = (req, res) => {
    const operationId = 'product.controller.getProductById';

    Product.findById(req.params.id, (err, product) => {
            if (!err && !product) {
                res.statusCode = 404;
                res.send({
                    message: 'No product that matches this ID was found.'
                })
            } else if (!err) {
                res.statusCode = 200;
                res.send({
                    message: 'Product retrieved successfully!',
                    result: product
                });
            }
        })
        .catch((err) => {
            res.statusCode = 400
            res.send({
                message: 'Invalid ID was passed.'
            })
        })
};

exports.updateProduct = (req, res) => {
    const operationId = 'product.controller.updateProduct';

    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, product) => {
        if (err) {
            return next(err);
        }
        res.statusCode = 204;
        res.send('Product updated successfully!');
    });
};

exports.deleteProduct = (req, res) => {
    const operationId = 'product.controller.deleteProduct';
    
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return next(err);
        }
        res.statusCode = 204;
        res.send('Product deleted successfully!');
    })
};