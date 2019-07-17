const Mongoose = require("mongoose");
const logger = require("../logger");
const config = require("../config");

const database = dbName => {
  return Mongoose.connect(
    config.mongo_uri,
    { useNewUrlParser: true, useCreateIndex: true, autoIndex: false, dbName: dbName },
    err => {
      if (err) logger.error("Could not connect to database.");
      else logger.debug(`Connected to database with uri ${config.mongo_uri}`);
    }
  );
};

module.exports = database;
