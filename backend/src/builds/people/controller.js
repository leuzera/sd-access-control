const UserModel = require("./model");
const Group = require("../group/model");
const database = require("../../database")("builds");
const logger = require("../../logger");

function createUser(req, res) {
  database.then(
    () => {
      const { name, password, group } = req.body;

      const user = new UserModel({ name, password });

      Group.findOne({ name: group }, (err, group) => {
        if (err) {
          logger.error(err);
          callback(err);
        } else {
          user.group = group;

          user.save((err, user) => {
            if (!err) {
              logger.debug(`New user: ${user}`);

              res.status(201).send({ status: 201, result: user });
            } else {
              logger.error("Error while saving user.");
              logger.error(`${err}`);
              res.status(500).send({ status: 500, error: err.errmsg });
            }
          });
        }
      });
    },
    err => {
      logger.error("Error while creating user.");
      logger.error(`${err}`);

      res.status(500).send({ status: 500, error: err });
    }
  );
}

function recoverAllUsers(_req, res) {
  UserModel.find({})
    .populate("group")
    .exec((err, users) => {
      if (err) {
        logger.error(`Error retrieving users.\n${err}`);
        res.status(500).send({ status: 500, error: err.errmsg });
      } else {
        res.status(200).send({ status: 200, users: users });
      }
    });
}

function deleteUser(req, res) {
  logger.debug(`Deleting user ${req.params.name}`);

  UserModel.findOneAndDelete({ name: req.params.name }, err => {
    if (err) {
      logger.error(`Error deleting user.\n${err}`);
      res.status(500).send({ status: 500, error: err.errmsg });
    } else {
      res.status(204);
    }
  });
}

function updateUser(req, res) {
  // Not implemented
  res.status(501);
}

function recoverUser(req, res) {
  logger.debug(`Recovering user ${req.params.name}`);
  UserModel.find({ name: req.params.name })
    .populate("group")
    .exec((err, user) => {
      if (err) {
        logger.error(`Error retrieving user.\n${err}`);
        res.status(500).send({ status: 500, error: err.errmsg });
      } else {
        res.status(200).send({ status: 200, user: user[0] });
      }
    });
}

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  recoverUser,
  recoverAllUsers
};
