const jwt = require("jsonwebtoken");
const logger = require("../logger");
const config = require("../config");
const userModel = require("../users/model");
const database = require("../database")("users");

function authenticateUser(username, password, callback) {
  database.then(() => {
    userModel.findOne({ username: username }, (err, user) => {
      if (err) {
        logger.debug("Error finding user.");
        logger.error(`${err}`);
        callback({ message: "Wrong password or username. 1" });
      } else if (!user) {
        logger.debug("No user found.");
        callback({ message: "Wrong password or username. 2" });
      } else {
        user.comparePassword(password, (err, match) => {
          if (err) {
            logger.debug("Error comparing passwords.");
            logger.error(`${err}`);
            callback({ message: "Wrong password or username." });
          } else {
            if (match) {
              // Create a token
              const payload = { user: user.username, role: user.role };
              const options = {
                expiresIn: config.jwt_expires_in,
                issuer: config.jwt_issuer
              };
              const secret = config.jwt_secret;
              const token = jwt.sign(payload, secret, options);

              callback(null, token);
            } else {
              logger.debug("User password don't match.");
              callback({ message: "Wrong password or username. 3" });
            }
          }
        });
      }
    });
  });
}

function validadeToken(req, res, next) {
  const authorizationHeaader = req.headers.authorization;
  let result;

  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN,
      issuer: process.env.JWT_ISSUER
    };

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET, options);

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new Error(err);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(result);
  }
}

module.exports = { authenticateUser, validadeToken };
