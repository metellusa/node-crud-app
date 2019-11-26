const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const product = require('./routes/product.route');
const config = require('./config/config');
const app = module.exports = express();

mongoose.connect(config.db.url, config.db.options);
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, config.db.errorMessage));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/products', product);

app.listen(config.db.port, () => {
    console.log(config.appInfo);
    console.log(`Server is up and running on port number ${config.db.port}`);
    if (!config.PRODUCTION) {
        const yaml = require('yamljs');
        const swaggerUi = require('swagger-ui-express');
        const swaggerDocument = yaml.load('./yaml/products.yaml');
        app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerDocument, config.swagger.options));
    }
});