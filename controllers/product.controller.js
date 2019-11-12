const Product = require('../models/product.model');

exports.getAllProducts = function (req, res) {
    Product.find({}, function (err, products) {
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

exports.createProduct = function (req, res) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function (err, product) {
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

exports.getProductById = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return next(err);
        }
        res.statusCode = 200;
        res.send({
            message = 'Product retrieved successfully!',
            result = product
        });
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
        res.send('Product updated successfully!');
    });
};

exports.deleteProduct = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
        res.statusCode = 204;
        res.send('Product deleted successfully!');
    })
};