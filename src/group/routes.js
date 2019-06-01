const controller = require("./controller");
const logger = require("../logger");

module.exports = router => {
  router
    .route("/groups")
    .get((_req, res) => {
      res.status(501);
    })
    .post((req, res) => {
      res.status(501);
    });

  router
    .route("/group/:name")
    .get((req, res) => {
      res.status(501);
    })
    .put((req, res) => {
      res.status(501);
    })
    .delete((req, res) => {
      res.status(501);
    });
};
