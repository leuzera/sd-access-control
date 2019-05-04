const BuildingModel = require("./model");
const database = require("../database");
const logger = require("../logger");

function createBuilding(name, capacity) {}
function recoverBuilding(id) {}
function recoverAllBuildings() {}
function deleteBuilding(id) {}
function updateBuilding(id, params) {}

function createFloor(number, capacity, buildingId) {}
function recoverFloor(buildingId, number) {}
function recoverAllFloors(buildingId) {}
function deleteFloor(buildingId, number) {}
function updateFloor(buildingId, floor) {}

module.exports = {
  createBuilding,
  recoverBuilding,
  recoverAllBuildings,
  deleteBuilding,
  updateBuilding,

  createFloor,
  recoverFloor,
  recoverAllFloors,
  deleteFloor,
  updateFloor
};
