const DEV_DB_URL = 'mongodb://metellusa:Diare*143@ds115866.mlab.com:15866/heroku_bkmsgpxw';

exports.PRODUCTION = process.env.PRODUCTION;

exports.appInfo = {
    version: "0.0.0.0",
    name: "Products API",
    logLevel: process.env.LOG_LEVEL || "INFO",
    environment: this.PRODUCTION ? "production" : "localhost"
}

exports.db = {
    url: process.env.MONGODB_URI || DEV_DB_URL,
    port: process.env.PORT || 1234,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    errorMessage: 'MongoDB connection error:'
}

exports.swagger = {
    options: {
        customCss: '.swagger-ui .topbar { display: none }'
    }
}