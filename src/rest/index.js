const express = require("express");
const bodyParser = require("body-parser");
const logger = require("../logger");
var morgan = require("morgan");
const routes = require("./routes")(express.Router());

const RestServer = port => {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(morgan("combined"));
  app.use("/api/v1", routes);

  app.listen(`${port}`, () => {
    logger.info(`API Server started at port ${port}`);
  });
};

module.exports = RestServer;
