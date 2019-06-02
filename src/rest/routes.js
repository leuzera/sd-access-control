const users = require("../users");
const buildings = require("../buildings");
const groups = require("../group");

module.exports = router => {
  users(router);
  buildings(router);
  groups(router);

  return router;
};
