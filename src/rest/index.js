const express = require("express");
const bodyParser = require("body-parser");
const logger = require("../logger");
const routes = require("./routes")(express.Router());
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const RestServer = port => {
  const app = express();

  let whitelist = ["https://sd-access-control.netlify.com"];
  let corsOptions = {
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  };

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(morgan("combined"));
  app.use("/api/v1", routes);

  app.listen(`${port}`, () => {
    logger.info(`API Server started at port ${port}`);
  });
};

module.exports = RestServer;
