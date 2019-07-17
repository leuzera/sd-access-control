const builds = require("../builds");
const auth = require("../auth");
const users = require("../users");
let router = express.Router();

router.use("/builds", builds);
router.use("/auth", auth);
router.use("/", users);

module.exports = router;
