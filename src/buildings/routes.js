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
          res.status(500).send({ status: 500, err: err.message });
        }
      });
    })
    .post((req, res) => {
      const { name } = req.body;
      controller.createBuilding(name, (err, building) => {
        logger.debug(building);

        if (!err) {
          res.status(201).send({ status: 201, building: building });
        } else {
          res.status(500).send({ status: 500, err: err.message });
        }
      });
    });

  router
    .route("/building/:name")
    .get((req, res) => {
      controller.recoverBuilding(req.params.name, (err, building) => {
        if (!err) {
          res.status(200).send({ status: 200, building: building[0] });
        } else {
          res.status(500).send({ status: 500, err: err.message });
        }
      });
    })
    .put((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    })
    .delete((req, res) => {
      controller.deleteBuilding(req.params.name, (err, result) => {
        if (!err) {
          logger.debug("Not error.");
          if (result) {
            logger.debug("Result === true");
            res.status(204).send({ status: 204 });
          }
        } else {
          res.status(500).send({ status: 500, err: err.message });
        }
      });
    });

  router.route("/building/:name/floors").post((req, res) => {
    const { number, capacity } = req.body;

    // TODO: Aumentar a capacidade maxima de predio de acordo com as capacidades de
    // cada piso
    controller.createFloor(number, capacity, req.params.name, (err, build) => {
      if (err) {
        res.status(500).send({ status: 500, err: err.message });
      } else {
        res.status(201).send({ status: 201, build: build });
      }
    });
  });

  router
    .route("/building/:name/floor/:number")
    .get((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    })
    .put((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    })
    .delete((req, res) => {
      res.status(501).send({ status: 501, message: "Not implemented" });
    });
};
