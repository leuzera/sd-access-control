const Group = require("./model");
const database = require("../../database")("builds");
const logger = require("../../logger");

function createGroup(name, permission, callback) {
  database.then(
    () => {
      const group = new Group({ name: name, permissions: permission });

      group.save((err, group) => {
        if (err) {
          logger.error(err);
          callback(err);
        } else {
          logger.info("Group added.");
          logger.debug(group);
          callback(null, group);
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

function recoverAllGroups(callback) {
  database.then(
    () => {
      Group.find({}, (err, groups) => {
        if (err) {
          logger.error("Error retrieving groups.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, groups);
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

function recoverGroup(name, callback) {
  database.then(
    () => {
      Group.find({ name: name }, (err, group) => {
        if (err) {
          logger.error("Error retrieving group.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, group);
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

function deleteGroup(name, callback) {
  database.then(
    () => {
      Group.findOneAndDelete({ name: name }, err => {
        if (err) {
          logger.error("Error deleting group.");
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

function updateGroupPermission(name, permission, callback) {
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

module.exports = {
  createGroup,
  recoverGroup,
  recoverAllGroups,
  deleteGroup,
  updateGroupPermission
};
