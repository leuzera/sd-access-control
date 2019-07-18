const express = require("express");
let router = express.Router();
const controller = require("./controller");

router.route("/").post((req, res) => {
  const { username, password } = req.body;

  controller.authenticateUser(username, password, (err, token) => {
    if (err) {
      res.status(500).send({ status: 500, message: err.message });
    } else {
      res.status(200).send({ status: 200, token: token });
    }
  });
});

module.exports = router;
