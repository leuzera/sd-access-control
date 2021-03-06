const validadeToken = require("../auth/controller").validadeToken;
const logger = require("../logger");
const userController = require("./controller");
const express = require("express");
let router = express.Router();

router
  .route("/users")
  .get(validadeToken, (_req, res) => {
    userController.recoverAllUsers((err, users) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, users: users });
      }
    });
  })
  .post(validadeToken, (req, res) => {
    const { username, password, role } = req.body;

    userController.createUser(username, password, role, (err, user) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, user: user });
      }
    });
  });

router.route("/welcome").post((req, res) => {
  const { username, password } = req.body;

  if (userController.hasAdmin()) {
    res.status(500).send({ status: 500, message: "Already has an Admin User." });
  } else {
    userController.createUser(username, password, "ADMIN", (err, user) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, user: user });
      }
    });
  }
});

router.route("/user").get(validadeToken, (req, res) => {
  const username = req.decoded.user;

  logger.debug(JSON.stringify(req.decoded));
  logger.debug(`Loging with only token. user: ${username}`);

  userController.recoverUser(username, (err, user) => {
    if (err) {
      res.status(500).send({ status: 500, message: err.message });
    } else {
      res.status(200).send({ status: 200, user: user });
    }
  });
});

router
  .route("/user/:username")
  .get(validadeToken, (req, res) => {
    const username = req.params.username;

    userController.recoverUser(username, (err, user) => {
      if (err) {
        res.status(500).send({ status: 500, message: err.message });
      } else {
        res.status(200).send({ status: 200, user: user });
      }
    });
  })
  .put(validadeToken, (req, res) => {
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
  .patch(validadeToken, (req, res) => {
    const username = req.params.username;
    if (!("password" in req.body) && !("role" in req.body)) {
      res.status(500).send({ status: 500, message: "No `password` or `rule` found." });
    }
    if ("password" in req.body && "role" in req.body) {
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
    if ("role" in req.body) {
      const { role } = req.body;
      userController.changeUserRole(username, role.toUpperCase(), (err, user) => {
        if (err) {
          res.status(500).send({ status: 500, message: err.message });
        } else {
          res.status(200).send({ status: 200, user: user });
        }
      });
    }
  })
  .delete(validadeToken, (req, res) => {
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
