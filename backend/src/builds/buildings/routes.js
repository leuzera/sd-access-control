const validadeToken = require("../../auth/controller").validadeToken;
const controller = require("./controller");
const logger = require("../../logger");
const express = require("express");
let router = express.Router();

router
  .route("/buildings")
  .get(validadeToken, (_req, res) => {
    controller.recoverAllBuildings((err, buildings) => {
      if (!err) {
        res.status(200).send({ status: 200, buildings: buildings });
      } else {
        res.status(500).send({ status: 500, err: err.message });
      }
    });
  })
  .post((req, res) => {
    const { name, group } = req.body;
    controller.createBuilding(name, group, (err, building) => {
      if (!err) {
        res.status(201).send({ status: 201, building: building });
      } else {
        res.status(500).send({ status: 500, err: err.message });
      }
    });
  });

router
  .route("/building/:name")
  .get(validadeToken, (req, res) => {
    controller.recoverBuilding(req.params.name, (err, building) => {
      if (!err) {
        res.status(200).send({ status: 200, building: building[0] });
      } else {
        res.status(500).send({ status: 500, err: err.message });
      }
    });
  })
  .put(validadeToken, (req, res) => {
    res.status(501).send({ status: 501, message: "Not implemented" });
  })
  .delete(validadeToken, (req, res) => {
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

router.route("/building/:name/floors").post(validadeToken, (req, res) => {
  const { number, capacity, group } = req.body;
  logger.error(number, capacity, req.params.name, group);
  controller.createFloor(number, capacity, req.params.name, group, (err, build) => {
    if (err) {
      res.status(500).send({ status: 500, err: err.message });
    } else {
      res.status(201).send({ status: 201, build: build });
    }
  });
});

router
  .route("/building/:name/floor/:id")
  .put(validadeToken, (req, res) => {
    controller.updateFloorCapacity(
      req.params.name,
      req.params.id,
      req.body.capacity,
      (err, build) => {
        if (!err) {
          res.status(201).send({ status: 201, build: build });
        } else {
          res.status(500).send({ status: 500, err: err.message });
        }
      }
    );
  })
  .delete(validadeToken, (req, res) => {
    controller.deleteFloor(req.params.name, req.params.id, (err, result) => {
      if (!err) {
        if (result) {
          res.status(204).send({ status: 204 });
        }
      } else {
        res.status(500).send({ status: 500, err: err.message });
      }
    });
  });

module.exports = router;
