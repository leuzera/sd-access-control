const controller = require("./controller");

module.exports = router => {
  router
    .route("/users")
    .get(controller.recover)
    .post(controller.create)
    .put(controller.update)
    .delete(controller.delete);
};
