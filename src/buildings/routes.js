const controller = require("./controller");

module.exports = router => {
  router
    .route("/buildings")
    .get(controller.recoverAllBuildings)
    .post(controller.createBuilding);

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
