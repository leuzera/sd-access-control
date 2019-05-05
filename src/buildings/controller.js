const BuildingModel = require("./model");
const database = require("../database");
const logger = require("../logger");

function createBuilding(name, max_capacity, callback) {
  database.then(
    () => {
      const building = new BuildingModel({ name, max_capacity });

      building.save((err, building) => {
        if (err) {
          logger.error(err);
          callback(err);
        } else {
          logger.info("Building added.");
          logger.debug(building);
          callback(null, building);
        }
      });
    },
    err => {
      logger.error("Error conecting to database.");
      logger.error(err);
      callback(err);
    }
  );
}

function recoverAllBuildings(callback) {
  database.then(() => {
    BuildingModel.find({}, (err, builds) => {
      if (err) {
        logger.error("Error retrieving buildings.");
        logger.error(err);
        callback(err);
      } else {
        callback(null, builds);
      }
    });
  });
}

function recoverBuilding(id, callback) {}
function deleteBuilding(id, callback) {}
function updateBuilding(id, params, callback) {}

function createFloor(number, capacity, buildingId, callback) {}
function recoverFloor(buildingId, number, callback) {}
function recoverAllFloors(buildingId, callback) {}
function deleteFloor(buildingId, number, callback) {}
function updateFloor(buildingId, floor, callback) {}

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
