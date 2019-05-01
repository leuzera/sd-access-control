const UserModel = require("./model");
const database = require("../database");

function createUser(req, res) {
  database.then(
    () => {
      let result = {};
      let status = 201;

      const { name, password } = req.body;
      const user = new UserModel({ name, password });
      user.save((err, user) => {
        if (!err) {
          result.status = status;
          result.result = user;
        } else {
          status = 500;
          result.status = status;
          result.error = err;
        }
        res.status(status).send(result);
      });
    },
    err => {
      status = 500;
      result.status = status;
      result.error = err;
      res.status(status).send(result);
    }
  );
}

function deleteUser(req, res) {}
function updateUser(req, res) {}
function findUser(req, res) {}

module.exports = {
  create: createUser,
  delete: deleteUser,
  update: updateUser,
  recover: findUser
};
