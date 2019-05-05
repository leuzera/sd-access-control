const controller = require("./controller");
const logger = require("../logger");

module.exports = router => {
  router
    .route("/buildings")
    .get((_req, res) => {
      controller.recoverAllBuildings((err, buildings) => {
        if (!err) {
          res.status(200).send({ status: 200, buildings: buildings });
        } else {
          res.status(500).send({ status: 500 });
        }
      });
    })
    .post((req, res) => {
      const { name, capacity } = req.body;
      controller.createBuilding(name, capacity, (err, building) => {
        logger.debug(building);

        if (!err) {
          res.status(201).send({ status: 201, building: building });
        } else {
          res.status(500).send({ status: 500 });
        }
      });
    });

  router
    .route("/building/:name")
    .get((req, res) => {
      controller.recoverBuilding(req.params.name, (err, building) => {
        if (!err) {
          res.status(200).send({ status: 200, building: building });
        } else {
          res.status(500).send({ status: 500 });
        }
      });
    })
    .put((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    })
    .delete((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    });

  router.route("/building/:name/floors").post((req, res) => {
    const { number, capacity } = req.body;

    controller.createFloor(number, capacity, req.params.name, (err, build) => {
      if (err) {
        res.status(500).send({ status: 500, error: err });
      } else {
        res.status(201).send({ status: 201, build: build });
      }
    });
  });

  router
    .route("/building/:name/floor/:number")
    .put((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    })
    .delete((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    });
};
