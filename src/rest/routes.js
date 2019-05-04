const users = require("../users");
const buildings = require("../buildings");

module.exports = router => {
  users(router);
  buildings(router);

  return router;
};
