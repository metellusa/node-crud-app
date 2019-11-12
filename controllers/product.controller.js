const Product = require('../models/product.model');

exports.getAllProducts = function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            return next(err);
        }
        res.send({
            statusCode: 200,
            result: products,
            message: 'Products retrieved successfully!'
        });
    })
};

exports.createProduct = function (req, res) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function (err, product) {
        if (err) {
            return next(err);
        }
        res.send({
            statusCode: 201,
            result: product,
            message: 'Product created successfully!'
        })
    })
};

exports.getProductById = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return next(err);
        }
        res.statusCode = 200;
        res.message = 'Product retrieved successfully!';
        res.result = product;
        res.send();
    })
};

exports.updateProduct = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, product) {
        if (err) {
            return next(err);
        }
        res.statusCode = 204;
        res.message = 'Product updated successfully!';
        res.result = product;
        res.send();
    });
};

exports.deleteProduct = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
        res.send({
            statusCode: 204,
            message: 'Product deleted successfully!'
        });
    })
};