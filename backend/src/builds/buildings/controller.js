const { Building } = require("./model");
const Group = require("../group/model");
const database = require("../../database")("builds");
const logger = require("../../logger");

function createBuilding(name, group, callback) {
  database.then(
    () => {
      const building = new Building({ name: name });

      Group.findOne({ name: group }, (err, group) => {
        if (err) {
          logger.error(err);
          callback(err);
        } else {
          building.groups.push(group);
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

function recoverAllBuildings(callback) {
  database.then(
    () => {
      Building.find({})
        .populate("groups")
        .exec((err, builds) => {
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

function createFloor(number, maxCapacity, buildingName, group, callback) {
  database.then(
    () => {
      Building.findOne({ name: buildingName }, (err, build) => {
        if (err) {
          callback(err);
        } else {
          Group.findOne({ name: group }, (err, group) => {
            if (err) {
              logger.error(err);
              callback(err);
            } else {
              build.floors.addToSet({
                number: number,
                capacity: maxCapacity,
                groups: group
              });

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

function deleteFloor(buildingName, id, callback) {
  database.then(
    () => {
      Building.findOne({ name: buildingName }, (err, build) => {
        if (err) {
          callback(err);
        } else {
          build.max_capacity = build.max_capacity - build.floors.id(id).capacity;
          build.floors.id(id).remove();

          build.save((err, build) => {
            if (err) callback(err);
            callback(null, true);
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

function updateFloorCapacity(buildingName, id, capacity, callback) {
  database.then(
    () => {
      Building.findOne({ name: buildingName }, (err, build) => {
        if (err) {
          callback(err);
        } else {
          build.max_capacity = build.max_capacity - build.floors.id(id).capacity + Number(capacity);
          build.floors.id(id).capacity = capacity;

          build.save((err, build) => {
            if (err) callback(err);
            callback(null, build);
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

module.exports = {
  createBuilding,
  recoverBuilding,
  recoverAllBuildings,
  deleteBuilding,
  updateBuilding,

  createFloor,
  deleteFloor,
  updateFloorCapacity
};
