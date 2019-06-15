const Mongoose = require("mongoose");
const logger = require("../logger");
const config = require("../config");

const database = Mongoose.connect(config.mongo_uri, { useNewUrlParser: true }, err => {
  if (err) logger.error("Could not connect to database.");
  else logger.debug(`Connected to database with uri ${config.mongo_uri}`);
});

module.exports = database;
