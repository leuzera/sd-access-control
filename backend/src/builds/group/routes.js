const validadeToken = require("../../auth/controller").validadeToken;
const controller = require("./controller");
const logger = require("../../logger");
const express = require("express");
let router = express.Router();

router
  .route("/groups")
  .get(validadeToken, (_req, res) => {
    controller.recoverAllGroups((err, groups) => {
      if (!err) {
        res.status(200).send({ status: 200, groups: groups });
      } else {
        res.status(500).send({ status: 500, message: err.message });
      }
    });
  })
  .post(validadeToken, (req, res) => {
    const { name, permission } = req.body;
    controller.createGroup(name, permission, (err, group) => {
      logger.debug(group);

      if (!err) {
        res.status(201).send({ status: 201, group: group });
      } else {
        res.status(500).send({ status: 500, message: err.message });
      }
    });
  });

router
  .route("/group/:name")
  .get(validadeToken, (req, res) => {
    controller.recovergroup(req.params.name, (err, group) => {
      if (!err) {
        res.status(200).send({ status: 200, group: group[0] });
      } else {
        res.status(500).send({ status: 500, message: err.message });
      }
    });
  })
  .put(validadeToken, (req, res) => {
    res.status(501).send({ status: 501, message: "Not implemented" });
  })
  .delete(validadeToken, (req, res) => {
    res.status(501).send({ status: 501, message: "Not implemented" });
  });

module.exports = router;
