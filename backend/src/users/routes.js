const controller = require("./controller");

module.exports = router => {
  router
    .route("/users")
    .get(controller.recoverAllUsers)
    .post(controller.createUser);

  router
    .route("/user/:name")
    .get(controller.recoverUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser);
};
