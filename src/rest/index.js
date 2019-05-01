const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes")(express.Router());

const RestServer = port => {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use("/api/v1", routes);

  app.listen(`${port}`, () => {
    console.log(`API Server started at port ${port}`);
  });
};

module.exports = RestServer;
