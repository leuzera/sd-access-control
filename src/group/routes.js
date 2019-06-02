const controller = require("./controller");
const logger = require("../logger");

module.exports = router => {
  router
    .route("/groups")
    .get((_req, res) => {
      controller.recoverAllGroups((err, groups) => {
        if (!err) {
          res.status(200).send({ status: 200, groups: groups });
        } else {
          res.status(500).send({ status: 500, message: err.message });
        }
      });
    })
    .post((req, res) => {
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
    .get((req, res) => {
      controller.recovergroup(req.params.name, (err, group) => {
        if (!err) {
          res.status(200).send({ status: 200, group: group[0] });
        } else {
          res.status(500).send({ status: 500, message: err.message });
        }
      });
    })
    .put((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    })
    .delete((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    });
};
