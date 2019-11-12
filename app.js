const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const product = require('./routes/product.route');
const app = express();

const dev_db_url = 'mongodb://metellusa:Diare*143@ds115866.mlab.com:15866/heroku_bkmsgpxw';

// Set up mongoose connection
let mongoDB = process.env.MONGODB_URI || dev_db_url;
let port = process.env.PORT || 1234;

mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/products', product);

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
    if (!process.env.PRODUCTION) {
        const swaggerUi = require('swagger-ui-express');
        const yaml = require('yamljs');
        const swaggerDocument = yaml.load ('./endpoints/products.yaml');
        app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false));
    }
});