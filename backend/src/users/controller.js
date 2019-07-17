const User = require("./model");
const database = require("../database")("users");
const logger = require("../logger");

function createUser(username, password, role, callback) {
  database.then(
    () => {
      const user = new User({ username: username, password: password, role: role });

      user.save((err, user) => {
        if (!err) {
          logger.debug(`New user: ${user}`);

          callback(null, { username: user.username, role: user.role });
        } else {
          logger.error(`Error while saving user.`);
          logger.error(`${err}`);

          callback(err);
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

function recoverAllUsers(callback) {
  database.then(
    () => {
      User.find({}, "username role", (err, users) => {
        if (err) {
          logger.error("Error retrieving users.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, users);
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

function recoverUser(username, callback) {
  database.then(
    () => {
      User.find({ username: username }, "username role", (err, user) => {
        if (err) {
          logger.error("Error retrieving users.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, user);
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

function deleteUser(username, callback) {
  database.then(
    () => {
      User.findOneAndDelete({ username: username }, err => {
        if (err) {
          logger.error("Error deleting user.");
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

function changeUserPassword(username, oldPassword, newPassword, callback) {
  database.then(
    () => {
      // TODO: compare oldPassword with actual user.password before changing password
      User.findOneAndUpdate({ username: username }, { password: newPassword }, (err, user) => {
        if (err) {
          logger.error("Error updating user role.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, { username: user.username, role: user.role });
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

function changeUserRole(username, newRole, callback) {
  database.then(
    () => {
      User.findOneAndUpdate({ username: username }, { role: newRole }, (err, user) => {
        if (err) {
          logger.error("Error updating user role.");
          logger.error(err);
          callback(err);
        } else {
          callback(null, { username: user.username, role: user.role });
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

function upsertUser(username, password, role, callback) {
  database.then(
    () => {
      User.findOneAndUpdate(
        { username: username },
        { username, password, role },
        { upsert: true },
        (err, user) => {
          if (err) {
            logger.error("Error updating user.");
            logger.error(err);
            callback(err);
          } else {
            callback(null, { username: user.username, role: user.role });
          }
        }
      );
    },
    err => {
      logger.error("Error connecting to database.");
      logger.error(err);
      callback(err);
    }
  );
}

module.exports = {
  createUser,
  recoverAllUsers,
  recoverUser,
  deleteUser,
  changeUserPassword,
  changeUserRole,
  upsertUser
};
