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
    .route("/building/:id")
    .get(controller.recoverBuilding)
    .put(controller.updateBuilding)
    .delete(controller.deleteBuilding);

  router
    .route("/building/:id/floors")
    .get(controller.recoverAllFloors)
    .post(controller.createFloor);

  router
    .route("/building/:id/floor/:number")
    .get(controller.recoverFloor)
    .put(controller.updateFloor)
    .delete(controller.deleteFloor);
};
