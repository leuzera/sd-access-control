const users = require("../users");
const buildings = require("../buildings");
const groups = require("../group");

module.exports = router => {
  router.route("/").get((_req, res) => {
    res.status(418).send({ message: "I am a Teapot." });
  });
  users(router);
  buildings(router);
  groups(router);

  return router;
};
