const userController = require("./controller");
const express = require("express");
let router = express.Router();

router
  .route("/users")
  .get((_req, res) => {
    userController.recoverAllUsers((err, users) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, users: users });
      }
    });
  })
  .post((req, res) => {
    const { username, password, role } = req.body;

    userController.createUser(username, password, role, (err, user) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, user: user });
      }
    });
  });

router
  .route("/user/:username")
  .get((req, res) => {
    const username = req.params.username;

    userController.recoverUser(username, (err, user) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, user: user });
      }
    });
  })
  .put((req, res) => {
    const username = req.params.username;
    const { password, role } = req.body;

    userController.upsertUser(username, password, role, (err, user) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, user: user });
      }
    });
  })
  .patch((req, res) => {
    const username = req.params.username;
    if (!("password" in req.body) && !("rule" in req.body)) {
      res.status(500).send({ status: 500, message: "No `password` or `rule` found." });
    }
    if ("password" in req.body && "rule" in req.body) {
      res
        .status(500)
        .send({ status: 500, message: "Both `password` and `rule` was send. Use only one." });
    }

    if ("password" in req.body) {
      const { password, newPassword } = req.body;
      // TODO: check if password match before changing passwords
      userController.changeUserPassword(username, password, newPassword, (err, user) => {
        if (err) {
          res.status(500).send({ status: 500, message: err.message });
        } else {
          res.status(200).send({ status: 200, user: user });
        }
      });
    }
    if ("rule" in req.body) {
      const rule = req.body;
      userController.changeUserRole(username, rule, (err, user) => {
        if (err) {
          res.status(500).send({ status: 500, message: err.message });
        } else {
          res.status(200).send({ status: 200, user: user });
        }
      });
    }
  })
  .delete((req, res) => {
    const username = req.params.username;

    userController.deleteUser(username, (err, deleted) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        if (deleted) res.status(204).send({ status: 204 });
      }
    });
  });

module.exports = router;
