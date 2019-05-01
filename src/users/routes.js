const controller = require("./controller");

module.exports = router => {
  router
    .route("/users")
    .get(controller.recoverAllUsers)
    .post(controller.createUser);

  router
    .route("/user/id")
    .get(controler.recoverUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser);
};
