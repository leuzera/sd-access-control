const controller = require("./controller");
const validadeToken = require("../../auth/controller").validadeToken;
const express = require("express");
let router = express.Router();

router
  .route("/people")
  .get(validadeToken, controller.recoverAllUsers)
  .post(controller.createUser);

router
  .route("/people/:name")
  .get(validadeToken, controller.recoverUser)
  .put(validadeToken, controller.updateUser)
  .delete(validadeToken, controller.deleteUser);

module.exports = router;
