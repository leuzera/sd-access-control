const { Building, Floor } = require("./model");
const database = require("../database");
const logger = require("../logger");

function createBuilding(name, callback) {
  database.then(
    () => {
      const building = new Building({ name: name });

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
  database.then(
    () => {
      Building.find({}, (err, builds) => {
        if (err) {
          logger.error("Error retrieving buildings.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, builds);
        }
      });
    },
    err => {
      logger.error("Error connecting to database.");
      logger.error(err);
      callback(err);
    }
  );
}

function recoverBuilding(name, callback) {
  database.then(
    () => {
      Building.find({ name: name }, (err, build) => {
        if (err) {
          logger.error("Error retrieving buildings.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, build);
        }
      });
    },
    err => {
      logger.error("Error connecting to database.");
      logger.error(err);
      callback(err);
    }
  );
}

function deleteBuilding(name, callback) {
  database.then(
    () => {
      Building.findOneAndDelete({ name: name }, err => {
        if (err) {
          logger.error("Error retrieving buildings.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, true);
        }
      });
    },
    err => {
      logger.error("Error connecting to database.");
      logger.error(err);
      callback(err);
    }
  );
}

function updateBuilding(name, params, callback) {
  database.then(
    () => {
      callback(null, null);
    },
    err => {
      logger.error("Error connecting to database.");
      logger.error(err);
      callback(err);
    }
  );
}

function createFloor(number, maxCapacity, buildingName, callback) {
  database.then(
    () => {
      Building.findOne({ name: buildingName }, (err, build) => {
        logger.debug(err);
        logger.debug(build);

        if (err) {
          callback(err);
        } else {
          logger.debug(build.floors);

          build.floors.push({
            number: number,
            capacity: maxCapacity
          });

          logger.debug(typeof maxCapacity);
          logger.debug(typeof build.max_capacity);

          build.max_capacity = build.max_capacity + Number(maxCapacity);

          build.save((err, build) => {
            if (err) {
              callback(err);
            } else {
              callback(null, build);
            }
          });
        }
      });
    },
    err => {
      logger.error("Error connecting to database.");
      logger.error(err);
      callback(err);
    }
  );
}

function deleteFloor(buildingName, number, callback) {}
function updateFloor(buildingName, floor, callback) {}

module.exports = {
  createBuilding,
  recoverBuilding,
  recoverAllBuildings,
  deleteBuilding,
  updateBuilding,

  createFloor,
  deleteFloor,
  updateFloor
};
