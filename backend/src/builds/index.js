const buildings = require("./buildings");
const groups = require("./group");
const people = require("./people");
const express = require("express");
let router = express.Router();

router.use("/", buildings);
router.use("/", groups);
router.use("/", people);

module.exports = router;
