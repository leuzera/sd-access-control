const { Group } = require("./model");
const database = require("../database");
const logger = require("../logger");

function createGroup(callback) {
  callback(null, null);
}
function recoverGroup(callback) {
  callback(null, null);
}
function recoverAllGroups(callback) {
  callback(null, null);
}
function deleteGroup(callback) {
  callback(null, null);
}
function updateGroup(callback) {
  callback(null, null);
}

module.exports = {
  createGroup,
  recoverGroup,
  recoverAllGroups,
  deleteGroup,
  updateGroup
};
