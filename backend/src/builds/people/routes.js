const controller = require("./controller");
let router = express.Router();

router
  .route("/people")
  .get(controller.recoverAllUsers)
  .post(controller.createUser);

router
  .route("/people/:name")
  .get(controller.recoverUser)
  .put(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;