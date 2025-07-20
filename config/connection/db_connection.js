const mongoose = require('mongoose');
const logger = require('../logger');

function connect() {
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.Promise = global.Promise;

    return mongoose.connection;
}

let DB = connect();
DB.on('error', (err) => {
    logger.error(`[EXT_CNT_ERR_DB] - DB - MongoDb - Database connection error. Please make sure MongoDB is running.`);
});

DB.on('connected', (err) => {
    logger.info(`[INFO_EXTERNAL_CONNECTIVITY] - DB - MongoDb - Database Connected`);
});

DB.on('reconnect', function (ref) {
    logger.info(`[INFO_EXTERNAL_CONNECTIVITY] - DB - MongoDb - reconnect to mongo server`);
});

DB.on('disconnected', function (ref) {
    logger.error(`[EXT_CNT_ERR_DB] - DB - MongoDb - Database connection error. Please make sure MongoDB is running.`);
});

DB.on('close', function (ref) {
    logger.error(`[EXT_CNT_ERR_DB] - DB - MongoDb - Database connection error. Please make sure MongoDB is running.`);
    console.log('🛑 MongoDB connection closed');
});

module.exports = connect();
