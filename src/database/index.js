const Mongoose = require("mongoose");
const config = require("../config");

const database = Mongoose.connect(config.mongo_uri, { useNewUrlParser: true });

module.exports = database;
