const buildings = require("./buildings");
const groups = require("./group");
const people = require("./people");
let router = express.Router();

route.use("/", buildings);
route.use("/", groups);
route.use("/", people);

module.exports = router;
